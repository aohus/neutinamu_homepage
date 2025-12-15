import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface GalleryProps {
  category: 'tree_hospital' | 'landscape';
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ category, title }) => {
  const { isAuthenticated, token } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  // Upload State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const fetchItems = () => {
    // Docker environment: backend is at localhost:8000 (proxied or direct)
    // For browser execution, we assume localhost:8000 is accessible
    axios.get(`/api/gallery?category=${category}`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const handleUpload = async () => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', uploadTitle);
    formData.append('description', uploadDesc);
    formData.append('file', uploadFile);

    try {
      await axios.post('/api/gallery', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
      });
      setShowModal(false);
      setUploadTitle('');
      setUploadDesc('');
      setUploadFile(null);
      fetchItems();
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
         <h2>{title}</h2>
         {isAuthenticated && (
           <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
              + 이미지 등록
           </Button>
         )}
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map(item => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={`/api${item.image_url}`} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted small">
                  {new Date(item.created_at).toLocaleDateString()}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
      {items.length === 0 && (
          <div className="text-center p-5 text-muted bg-light rounded">
              등록된 이미지가 없습니다.
          </div>
      )}

      {/* Upload Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>이미지 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>설명</Form.Label>
              <Form.Control as="textarea" rows={3} value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>이미지 파일</Form.Label>
              <Form.Control type="file" onChange={(e: any) => setUploadFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
          <Button variant="primary" onClick={handleUpload}>등록</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Gallery;
