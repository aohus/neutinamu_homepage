import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import EditableImage from '../components/EditableImage';

interface Post {
  id: number;
  title: string;
  date: string;
}

interface GalleryItem {
  id: number;
  image_url: string;
  title: string;
}

const Home: React.FC = () => {
  const [notices, setNotices] = useState<Post[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Fetch latest notices
    axios.get('/api/posts?limit=5')
      .then(res => setNotices(res.data))
      .catch(err => console.error(err));

    // Fetch latest gallery items (projects)
    axios.get('/api/gallery?category=project&limit=4')
      .then(res => setGalleryItems(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section mb-0 position-relative">
        <Carousel fade interval={5000}>
          <Carousel.Item>
            <EditableImage
              mode="background"
              imageKey="home_carousel_1"
              defaultSrc="/assets/img/방제.jpg"
              className="d-block w-100"
              style={{ 
                height: '600px', 
                backgroundColor: '#2e7d32', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'brightness(0.6)'
              }}
            />
            <Carousel.Caption className="text-start pb-5 mb-5 container">
              <h1 className="display-3 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                자연과 사람이 함께 누리는<br/> 
                건강한 녹지공간
              </h1>
              <p className="lead text-white fs-4 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                건강한 나무, 아름다운 녹지공간<br/>
                느티나무병원협동조합이 약속드립니다.
              </p>
              <div className="d-flex gap-3">
                <Link to="/intro">
                  <Button variant="success" size="lg" className="px-5 py-3 rounded-0">조합 소개 바로가기</Button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
           <Carousel.Item>
            <EditableImage
              mode="background"
              imageKey="home_carousel_2"
              defaultSrc="/assets/img/치료.jpg"
              className="d-block w-100"
              style={{ 
                height: '600px', 
                backgroundColor: '#1b5e20',
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                filter: 'brightness(0.6)'
              }} 
            />
            <Carousel.Caption className="text-start pb-5 mb-5 container">
              <h1 className="display-3 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                나무가 아플 땐<br/>1종 나무병원을 찾아주세요
              </h1>
              <p className="lead text-white fs-4 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                국가공인 나무의사의 정확한 진단과 처방,<br/>
                농약 오·남용 없는 안전한 관리를 제공합니다.
              </p>
              <div className="d-flex gap-3">
                 <Link to="/diagnosis">
                  <Button variant="outline-light" size="lg" className="px-5 py-3 rounded-0">진단 의뢰하기</Button>
                </Link>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* 2. Mission Statement Banner */}
      <section className="bg-white py-5 border-bottom">
        <Container className="text-center">
            <h3 className="fw-bold text-dark mb-0" style={{ letterSpacing: '-1px' }}>
                "느티나무병원은 최고의 기술력과 전문성으로 <span className="text-success">사람과 나무에 모두 안전한 공간</span>을 만들어갑니다."
            </h3>
        </Container>
      </section>

      {/* 3. Landscaping Section (조경/정원) */}
      <section className="py-4 bg-light">
        <Container>
            <Row className="align-items-center g-5">
                <Col lg={6}>
                    <div className="mb-4">
                        <span className="text-success fw-bold text-uppercase">Landscaping & Garden</span>
                        <h2 className="display-5 fw-bold mb-3">조경/정원 사업</h2>
                        <h4 className="text-muted fw-light mb-4">환경 조건에 맞는 수목과 식재공간 제안</h4>
                        <p className="lead text-muted mb-4">
                            공간에 적합한 조경계획을 제안하고, 생육환경에 맞는 수종의 계획과 설계를 통해 
                            지속가능하고 아름다운 공간을 조성합니다. 
                            대형목 이식부터 도시재생구역 환경개선까지 전문가가 함께합니다.
                        </p>
                    </div>
                    <ul className="list-unstyled mb-4">
                        <li className="mb-3 d-flex align-items-center">
                            <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                            <span className="fs-5">조경/정원 계획, 설계 및 컨설팅</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                            <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                            <span className="fs-5">조경/정원 시공 (식재, 시설물)</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                            <i className="bi bi-check-circle-fill text-success fs-4 me-3"></i>
                            <span className="fs-5">체계적인 조경 유지관리</span>
                        </li>
                    </ul>
                    <Link to="/business">
                        <Button variant="outline-success" size="lg" className="rounded-0 px-4">사업분야 자세히 보기</Button>
                    </Link>
                </Col>
                <Col lg={6}>
                    <div className="position-relative">
                        <div className="ratio ratio-4x3 shadow-lg">
                            <EditableImage
                                mode="image"
                                imageKey="home_landscaping_img"
                                defaultSrc="/assets/IMG_7945.jpeg"
                                alt="Landscaping"
                                className="object-fit-cover rounded w-100 h-100"
                            />
                        </div>
                        <div className="position-absolute bottom-0 start-0 bg-white p-4 shadow d-none d-md-block" style={{ maxWidth: '250px', transform: 'translate(-30px, 30px)' }}>
                            <p className="fw-bold mb-0 text-success">Professional Touch</p>
                            <p className="small text-muted mb-0">전문가의 손길로 완성되는<br/>품격있는 공간</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>

      {/* 4. Tree Hospital Section (나무병원) */}
      <section className="section-padding bg-white">
        <Container>
            <div className="text-center mb-5">
                <span className="text-success fw-bold text-uppercase">Tree Hospital</span>
                <h2 className="display-5 fw-bold">나무병원 (1종)</h2>
                <p className="lead text-muted">농약 오·남용 없는 안전한 관리, 나무의사 주치의 서비스</p>
            </div>
            
            <Row className="g-4">
                {[
                    { title: "수목피해 진단/처방", icon: "bi-clipboard2-pulse", desc: "전문 장비를 활용한 정확한 피해 원인 분석 및 처방전 발급" },
                    { title: "수목 정밀/안전진단", icon: "bi-search", desc: "보호수, 노거수 등 주요 수목에 대한 정밀 진단 및 위험도 평가" },
                    { title: "병해충 방제", icon: "bi-bug", desc: "친환경 약제 및 물리적 방법을 통한 효과적인 병해충 방제" },
                    { title: "생육환경 개선", icon: "bi-flower1", desc: "토양 개량, 통기성 확보 등 수목 활력 증진을 위한 환경 개선" },
                    { title: "외과수술", icon: "bi-bandaid", desc: "부패부 제거, 살균/방부 처리 및 인공수피 처리를 통한 수명 연장" },
                    { title: "영양주사/수간주사", icon: "bi-capsule", desc: "부족한 영양분 공급 및 약제 주입을 통한 신속한 회복 도모" },
                ].map((item, idx) => (
                    <Col md={6} lg={4} key={idx}>
                        <Card className="h-100 border-0 shadow-sm hover-effect text-center p-4">
                            <Card.Body>
                                <div className="mb-3 text-success">
                                    <i className={`bi ${item.icon} display-4`}></i>
                                </div>
                                <Card.Title className="fw-bold mb-3">{item.title}</Card.Title>
                                <Card.Text className="text-muted small mb-4">
                                    {item.desc}
                                </Card.Text>
                                <Link to="/diagnosis" className="text-success text-decoration-none fw-bold small">
                                    자세히 보기 <i className="bi bi-arrow-right"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
             <div className="text-center mt-5">
                <Link to="/diagnosis">
                     <Button variant="success" size="lg" className="rounded-0 px-5">진단 및 치료 문의하기</Button>
                </Link>
            </div>
        </Container>
      </section>

      {/* 5. Recent Updates (News & Projects) */}
      <section className="section-padding bg-light">
        <Container>
            <Row className="g-5">
                {/* News Column */}
                <Col lg={5}>
                    <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
                         <h3 className="fw-bold m-0">Recent Updates</h3>
                         <Link to="/notices" className="text-success text-decoration-none small fw-bold">전체보기 <i className="bi bi-plus-lg"></i></Link>
                    </div>
                    <div className="list-group list-group-flush">
                        {notices.map(post => (
                            <Link 
                                key={post.id} 
                                to="/notices" 
                                className="list-group-item list-group-item-action bg-transparent border-bottom py-3 px-0 d-flex flex-column align-items-start"
                            >
                                <div className="d-flex w-100 justify-content-between align-items-center mb-1">
                                    <h6 className="mb-0 fw-bold text-dark text-truncate" style={{ maxWidth: '75%' }}>{post.title}</h6>
                                    <small className="text-muted">{new Date(post.date).toLocaleDateString()}</small>
                                </div>
                                <p className="mb-0 small text-muted text-truncate w-100">
                                    공지사항 내용 확인하기...
                                </p>
                            </Link>
                        ))}
                        {notices.length === 0 && <div className="text-muted py-3">등록된 공지사항이 없습니다.</div>}
                    </div>
                </Col>
                
                {/* Projects Column */}
                <Col lg={7}>
                     <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
                         <h3 className="fw-bold m-0">Major Projects</h3>
                         <Link to="/projects" className="text-success text-decoration-none small fw-bold">전체보기 <i className="bi bi-plus-lg"></i></Link>
                    </div>
                    <Row className="g-3">
                        {galleryItems.map(item => (
                            <Col xs={6} md={6} key={item.id}>
                                <div className="project-card position-relative overflow-hidden rounded shadow-sm" style={{ aspectRatio: '16/10' }}>
                                    <img 
                                        src={`/api${item.image_url}`} 
                                        alt={item.title} 
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ transition: 'transform 0.5s' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark text-white" 
                                         style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <h6 className="mb-0 fw-bold text-white text-shadow">{item.title}</h6>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        {galleryItems.length === 0 && (
                            <Col><div className="text-muted py-3">등록된 실적 이미지가 없습니다.</div></Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
      </section>

      {/* Final CTA Banner */}
      <section className="py-5 bg-success text-white text-center">
        <Container>
            <h2 className="fw-bold mb-3">도심 속 녹지 공간은<br/>우리 삶의 쉼터이자 삶터입니다</h2>
            <p className="lead mb-4 text-white-50">건강하고 아름다운 녹지 공간, 나무의사의 전문적인 관리가 필수적입니다.</p>
            <Link to="/inquiries">
                <Button variant="light" size="lg" className="px-5 rounded-pill text-success fw-bold">무료 견적 상담하기</Button>
            </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home;
