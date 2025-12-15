from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
import shutil

# --- Configuration ---
SECRET_KEY = "your-secret-key" # Change this in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
UPLOAD_DIR = "uploads"

# --- Database Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Models ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Post(Base): # For Notices
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    views = Column(Integer, default=0)

class Inquiry(Base): # For Inquiries
    __tablename__ = "inquiries"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    author = Column(String)
    password = Column(String) # Simple password for edit/delete by user
    created_at = Column(DateTime, default=datetime.utcnow)
    reply = Column(Text, nullable=True) # Admin reply

class GalleryItem(Base): # For Projects & Diagnosis
    __tablename__ = "gallery_items"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True) # 'project' or 'diagnosis'
    title = Column(String)
    image_url = Column(String)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SiteImage(Base):
    __tablename__ = "site_images"
    key = Column(String, primary_key=True, index=True)
    image_url = Column(String)
    updated_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

import bcrypt # Import bcrypt directly

# --- Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class PostBase(BaseModel):
    title: str
    content: str
    author: str

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    created_at: datetime
    views: int
    class Config:
        orm_mode = True

class InquiryCreate(BaseModel):
    title: str
    content: str
    author: str
    password: str

class InquiryResponse(InquiryCreate):
    id: int
    created_at: datetime
    reply: Optional[str] = None
    class Config:
        orm_mode = True

class InquiryReply(BaseModel):
    reply: str

class GalleryItemCreate(BaseModel):
    category: str
    title: str
    description: Optional[str] = None

class GalleryItemResponse(GalleryItemCreate):
    id: int
    image_url: str
    created_at: datetime
    class Config:
        orm_mode = True

class SiteImageResponse(BaseModel):
    key: str
    image_url: str
    updated_at: datetime
    class Config:
        orm_mode = True

def create_user(db: Session, username: str, password: str):
    hashed_password = get_password_hash(password)
    db_user = User(username=username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Auth Helper ---
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password: str):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data

# --- App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload dir exists
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# --- Routes ---

# Auth (Simple Admin Login)
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: dict, db: Session = Depends(get_db)):
    username = form_data.get("username")
    password = form_data.get("password")
    
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    return {"access_token": create_access_token(data={"sub": user.username}), "token_type": "bearer"}

@app.get("/users/me", response_model=TokenData)
async def read_users_me(current_user: TokenData = Depends(get_current_user)):
    return current_user

# Site Images (Dynamic Images)
@app.get("/site-images/{key}", response_model=SiteImageResponse)
def get_site_image(key: str, db: Session = Depends(get_db)):
    image = db.query(SiteImage).filter(SiteImage.key == key).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image

@app.post("/site-images/{key}", response_model=SiteImageResponse)
async def update_site_image(
    key: str,
    file: UploadFile = File(...),
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save file with a timestamp or unique name to avoid caching issues on frontend
    import time
    timestamp = int(time.time())
    filename = f"{key}_{timestamp}_{file.filename}"
    file_location = f"{UPLOAD_DIR}/{filename}"
    
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    image_url = f"/uploads/{filename}"
    
    db_image = db.query(SiteImage).filter(SiteImage.key == key).first()
    if not db_image:
        db_image = SiteImage(key=key, image_url=image_url)
        db.add(db_image)
    else:
        # Optional: Delete old file to save space
        db_image.image_url = image_url
        db_image.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_image)
    return db_image

# Notices

# Notices
@app.get("/posts", response_model=List[PostResponse])
def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

@app.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.views += 1
    db.commit()
    return post

# Inquiries
@app.get("/inquiries", response_model=List[InquiryResponse])
def get_inquiries(db: Session = Depends(get_db)):
    return db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()

@app.post("/inquiries", response_model=InquiryResponse)
def create_inquiry(inquiry: InquiryCreate, db: Session = Depends(get_db)):
    db_inquiry = Inquiry(**inquiry.dict())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

@app.put("/inquiries/{inquiry_id}/reply")
def reply_inquiry(inquiry_id: int, reply_data: InquiryReply, db: Session = Depends(get_db)):
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    inquiry.reply = reply_data.reply
    db.commit()
    return {"message": "Reply added"}

# Gallery (Projects & Diagnosis)
@app.get("/gallery", response_model=List[GalleryItemResponse])
def get_gallery_items(category: str, db: Session = Depends(get_db)):
    return db.query(GalleryItem).filter(GalleryItem.category == category).order_by(GalleryItem.created_at.desc()).all()

@app.post("/gallery", response_model=GalleryItemResponse)
async def create_gallery_item(
    category: str, 
    title: str, 
    description: Optional[str] = None, 
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    file_location = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    # In Docker, this URL should be accessible from outside.
    # We use relative path for simplicity, frontend needs to prefix API URL.
    image_url = f"/uploads/{file.filename}"
    
    db_item = GalleryItem(category=category, title=title, description=description, image_url=image_url)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

if __name__ == "__main__":
    db = SessionLocal()
    try:
        # Create default admin user if not exists
        admin_username = "admin123"
        admin_password = "123123"
        
        existing_admin = db.query(User).filter(User.username == admin_username).first()
        if not existing_admin:
            print(f"Creating default admin user: {admin_username}")
            create_user(db, admin_username, admin_password)
        
    finally:
        db.close()
    
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)