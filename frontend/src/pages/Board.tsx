import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Badge, Spinner, Alert } from 'react-bootstrap';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string; // Backend returns content in list too currently
  created_at: string;
  views?: number;
  reply?: string;
}

interface BoardProps {
  type: 'notice' | 'inquiry';
  title: string;
}

const Board: React.FC<BoardProps> = ({ type, title }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Write Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const fetchPosts = () => {
    setLoading(true);
    setError(null);
    const endpoint = type === 'notice' ? 'posts' : 'inquiries';
    
    axios.get(`/api/${endpoint}`)
      .then(res => {
        console.log(`Fetched ${type}:`, res.data); // Debug log
        setPosts(res.data);
      })
      .catch(err => {
        console.error(`Error fetching ${type}:`, err);
        setError('게시글을 불러오는데 실패했습니다.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [type]);

  const handleWrite = async () => {
    if(!newTitle || !newContent || !newAuthor) {
        alert("제목, 내용, 작성자를 모두 입력해주세요.");
        return;
    }

    const endpoint = type === 'notice' ? 'posts' : 'inquiries';
    const payload = {
        title: newTitle,
        content: newContent,
        author: newAuthor,
        password: newPassword
    };

    try {
        await axios.post(`/api/${endpoint}`, payload);
        setShowWriteModal(false);
        // Reset form
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        setNewPassword('');
        // Refresh list
        fetchPosts();
    } catch (err) {
        alert('글 작성 실패');
        console.error(err);
    }
  };
  
  const handleView = (post: Post) => {
      setSelectedPost(post);
      setShowViewModal(true);
      
      // If notice, fetch detail to increase view count
      if (type === 'notice') {
          axios.get(`/api/posts/${post.id}`)
            .then(res => {
                // Update selected post with detailed info (if any diff)
                setSelectedPost(res.data);
                // Also update the list item's view count locally without refetching all
                setPosts(prev => prev.map(p => p.id === post.id ? {...p, views: (p.views || 0) + 1} : p));
            })
            .catch(err => console.error("Error fetching detail:", err));
      }
  };

  return (
    <div className="board-container">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
         <h2 className="text-success fw-bold">{title}</h2>
         <Button variant="success" size="sm" onClick={() => setShowWriteModal(true)}>
            <i className="bi bi-pencil-fill me-1"></i>글쓰기
         </Button>
      </div>

      {loading && (
          <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
          </div>
      )}

      {error && (
          <Alert variant="danger">{error}</Alert>
      )}

      {!loading && !error && (
          <>
            <Table hover responsive className="align-middle">
                <thead className="table-light">
                <tr>
                    <th style={{width: '60px'}}>No</th>
                    <th>제목</th>
                    <th style={{width: '120px'}}>작성자</th>
                    <th style={{width: '120px'}}>날짜</th>
                    {type === 'notice' && <th style={{width: '80px'}}>조회</th>}
                    {type === 'inquiry' && <th style={{width: '100px'}}>상태</th>}
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id} onClick={() => handleView(post)} style={{ cursor: 'pointer' }}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    {type === 'notice' && <td>{post.views}</td>}
                    {type === 'inquiry' && (
                        <td>
                            {post.reply ? <Badge bg="success">답변완료</Badge> : <Badge bg="secondary">대기중</Badge>}
                        </td>
                    )}
                    </tr>
                ))}
                </tbody>
            </Table>
            
            {posts.length === 0 && (
                <div className="text-center p-5 text-muted bg-light rounded">
                    등록된 게시글이 없습니다.
                </div>
            )}
          </>
      )}

      {/* Write Modal */}
      <Modal show={showWriteModal} onHide={() => setShowWriteModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title} 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="제목을 입력하세요" />
            </Form.Group>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="이름" />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder={type === 'notice' ? "관리자 비밀번호" : "수정/삭제용"} />
                    </Form.Group>
                </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={10} value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="내용을 입력하세요" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWriteModal(false)}>취소</Button>
          <Button variant="success" onClick={handleWrite}>등록</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex justify-content-between text-muted border-bottom pb-3 mb-3 small">
                <div>
                    <span className="me-3"><i className="bi bi-person me-1"></i>{selectedPost?.author}</span>
                    <span><i className="bi bi-calendar me-1"></i>{selectedPost?.created_at && new Date(selectedPost.created_at).toLocaleString()}</span>
                </div>
                {type === 'notice' && <span><i className="bi bi-eye me-1"></i>{selectedPost?.views}</span>}
            </div>
            
            <div className="py-2" style={{ minHeight: '200px', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                {selectedPost?.content}
            </div>
            
            {type === 'inquiry' && selectedPost?.reply && (
                <div className="mt-4 p-4 bg-light rounded border-start border-4 border-success">
                    <h5 className="text-success fw-bold mb-3"><i className="bi bi-arrow-return-right me-2"></i>관리자 답변</h5>
                    <p className="mb-0">{selectedPost.reply}</p>
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Board;