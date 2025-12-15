import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface EditableImageProps {
  imageKey: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'image' | 'background'; // 'image' renders <img>, 'background' renders <div>
}

const EditableImage: React.FC<EditableImageProps> = ({ 
  imageKey, 
  defaultSrc, 
  alt = '', 
  className = '', 
  style = {}, 
  mode = 'image' 
}) => {
  const { isAuthenticated, token } = useAuth();
  const [src, setSrc] = useState<string>(defaultSrc);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch the dynamic image URL from backend
    axios.get(`/api/site-images/${imageKey}`)
      .then(res => {
        if (res.data.image_url) {
          setSrc(`/api${res.data.image_url}`);
        }
      })
      .catch(() => {
        // If 404 or error, keep defaultSrc
      });
  }, [imageKey]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post(`/api/site-images/${imageKey}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      // Append timestamp to force refresh
      setSrc(`/api${res.data.image_url}?t=${new Date().getTime()}`);
    } catch (err) {
      alert('이미지 업로드 실패');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: mode === 'image' ? 'inline-block' : 'block',
    ...style
  };

  // Overlay for edit button
  const EditOverlay = () => (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'opacity 0.2s',
        opacity: 0,
      }}
      className="editable-overlay"
      onClick={handleEditClick}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
    >
      <div className="btn btn-light btn-sm shadow">
        <i className="bi bi-pencil-fill me-1"></i> 편집
      </div>
    </div>
  );

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      {mode === 'image' ? (
        <div className="h-100 w-100">
           <img 
            src={src} 
            alt={alt} 
            className={className} 
            style={{ ...style, width: '100%', height: '100%' }} 
          />
          {isAuthenticated && <EditOverlay />}
          {loading && (
             <div className="position-absolute top-50 start-50 translate-middle">
               <div className="spinner-border text-light" role="status"></div>
             </div>
          )}
        </div>
      ) : (
        <div 
          className={className}
          style={{ 
            ...style, 
            backgroundImage: `url(${src})`,
            position: 'relative' // Ensure overlay is positioned correctly
          }}
        >
          {isAuthenticated && <EditOverlay />}
          {loading && (
             <div className="position-absolute top-50 start-50 translate-middle">
               <div className="spinner-border text-light" role="status"></div>
             </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditableImage;
