import React from 'react';
import EditableImage from '../components/EditableImage';

const CompanyIntro: React.FC = () => {
  return (
    <div className="company-intro">
      <div className="text-center py-5 mb-3">
        <h2 className="display-4 fw-bold text-success mb-3">회사소개</h2>
        <p className="lead text-muted fs-4">자연과 사람이 함께 건강한 녹지를 누리는 세상</p>
      </div>
      
      {/* Intro Section - Refined for better UX/UI */}
      <div className="section-padding border-bottom bg-white">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 text-center">
                    <div className="mb-5">
                        <h3 className="display-6 fw-bold text-dark lh-base mb-4">
                            <span className="d-block mb-2 text-muted fs-4 fw-normal">Natural Healing & Urban Care</span>
                            "나무를 치료하는 병원,<br/>
                            <span className="text-success position-relative d-inline-block">
                                도시의 회복탄력성을 키우는 전문가
                                <span className="position-absolute bottom-0 start-0 w-100 bg-success opacity-25" style={{height: '15px', zIndex: -1}}></span>
                            </span>"
                        </h3>
                    </div>
                    
                    <div className="mx-auto" style={{ maxWidth: '700px' }}>
                        <p className="lead text-secondary mb-5 lh-lg">
                            안녕하세요, <strong>느티나무병원협동조합</strong>입니다.<br/>
                            우리는 단순한 치료를 넘어, 자연과 도시가 건강하게 공존하는 내일을 만듭니다.<br/>
                            수목복지문화의 선도자로서 더 나은 생태 환경을 위한 가치를 실현합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="section-padding bg-light">
        <div className="container">
            <h3 className="fw-bold text-center mb-5 display-6">미션과 비전</h3>
            <div className="row g-5 text-center">
                <div className="col-lg-4">
                    <div className="bg-white p-5 rounded-4 shadow-sm h-100 hover-effect transition">
                        <div className="mb-4 text-success"><i className="bi bi-flag fs-1"></i></div>
                        <h4 className="fw-bold mb-3">Mission</h4>
                        <p className="text-muted fs-5">자연과 사람이 함께 누리는<br/>건강한 녹지를 만든다</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-white p-5 rounded-4 shadow-sm h-100 hover-effect transition">
                        <div className="mb-4 text-success"><i className="bi bi-eye fs-1"></i></div>
                        <h4 className="fw-bold mb-3">Vision</h4>
                        <p className="text-muted fs-5">수목복지문화를 선도하는<br/>대한민국 최고의 나무병원</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-white p-5 rounded-4 shadow-sm h-100 hover-effect transition">
                        <div className="mb-4 text-success"><i className="bi bi-diagram-3 fs-1"></i></div>
                        <h4 className="fw-bold mb-3">Strategy</h4>
                        <p className="text-muted fs-5">기술력 기반 맞춤형 관리<br/>협동조합 모델의 지속가능 경영</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Major Business Areas */}
      <div className="section-padding">
         <h3 className="fw-bold text-center mb-5 display-6">주요 사업 영역</h3>
         
         {/* Forest Business */}
         <div className="mb-5 pb-5">
            <div className="text-center mb-5">
                <h4 className="fw-bold text-success d-inline-block border-bottom border-success border-3 pb-2 fs-3">나무병원 사업분야(산림사업)</h4>
                <p className="text-muted mt-3 fs-5">사람과 나무에 모두 안전하고 건강한 공간을 약속드립니다.</p>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                {[
                    { title: "수목 진단·처방", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "수목 치료·방제", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "생육환경 개선", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "위험수목 진단 및 연구", defaultImg: "/assets/IMG_7943.jpeg" }
                ].map((item, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 border-0 shadow-sm hover-effect">
                            <div className="ratio ratio-1x1 overflow-hidden rounded-top">
                                 <EditableImage 
                                    imageKey={`company_forest_${idx}`}
                                    defaultSrc={item.defaultImg}
                                    alt={item.title}
                                    className="card-img-top object-fit-cover w-100 h-100"
                                 />
                            </div>
                            <div className="card-body py-3 text-center bg-light rounded-bottom">
                                <p className="card-text fw-bold fs-5 mb-0">{item.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Landscaping Business */}
         <div>
            <div className="text-center mb-5">
                <h4 className="fw-bold text-success d-inline-block border-bottom border-success border-3 pb-2 fs-3">조경식재 사업분야(전문건설업)</h4>
                <p className="text-muted mt-3 fs-5">환경 조건에 맞는 수목과 식재공간을 제안하고, 관리해드립니다.</p>
            </div>
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                {[
                    { title: "조경 계획·설계·시공", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "학교숲 관리", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "주민참여 마을정원 가꾸기", defaultImg: "/assets/IMG_7943.jpeg" },
                    { title: "도시재생구역 환경개선", defaultImg: "/assets/IMG_7943.jpeg" }
                ].map((item, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 border-0 shadow-sm hover-effect">
                             <div className="ratio ratio-1x1 overflow-hidden rounded-top">
                                 <EditableImage 
                                    imageKey={`company_landscape_${idx}`}
                                    defaultSrc={item.defaultImg}
                                    alt={item.title}
                                    className="card-img-top object-fit-cover w-100 h-100"
                                 />
                            </div>
                            <div className="card-body py-3 text-center bg-light rounded-bottom">
                                <p className="card-text fw-bold fs-5 mb-0">{item.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Competitiveness */}
      <div className="section-padding bg-light">
        <h3 className="fw-bold text-center mb-5 display-6">느티나무만의 경쟁력</h3>
        <div className="row g-4">
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm bg-success text-white p-4">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-award fs-1 me-3"></i>
                            <h4 className="card-title fw-bold mb-0">차별화된 전문성</h4>
                        </div>
                        <p className="card-text fs-5 opacity-90">
                        조경·녹지 전문가 및 나무병원 1급 자격을 갖춘 전문 인력이 직접 진단하고 처방하여 최상의 결과를 보장합니다.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm bg-dark text-white p-4">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-people fs-1 me-3"></i>
                            <h4 className="card-title fw-bold mb-0">고객 맞춤 서비스</h4>
                        </div>
                        <p className="card-text fs-5 opacity-90">
                        공공기관, 공동주택, 기업체, 개인 주택 등 각 환경에 최적화된 관리 솔루션을 제공하여 고객 만족을 실현합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Location */}
      <div className="section-padding">
        <div className="p-5 rounded-4 border bg-white shadow-sm">
            <h4 className="fw-bold mb-4 fs-3 border-bottom pb-3">오시는 길</h4>
            <div className="row g-4">
                <div className="col-md-6 border-end-md">
                   <ul className="list-unstyled mb-0">
                      <li className="mb-4 d-flex align-items-center fs-5">
                          <i className="bi bi-geo-alt-fill text-danger fs-3 me-3"></i>
                          <div>
                              <strong>본점</strong><br/>
                              <span className="text-muted">성남시 수정구 공원로 445번길 8</span>
                          </div>
                      </li>
                      <li className="d-flex align-items-center fs-5">
                          <i className="bi bi-geo-alt text-danger fs-3 me-3"></i>
                          <div>
                              <strong>지점</strong><br/>
                              <span className="text-muted">성남시 분당구 성남대로 331번길 8, 킨스타워 2층</span>
                          </div>
                      </li>
                   </ul>
                </div>
                <div className="col-md-6 ps-md-5">
                   <ul className="list-unstyled mb-0">
                      <li className="mb-4 d-flex align-items-center fs-5">
                          <i className="bi bi-telephone-fill text-success fs-3 me-3"></i>
                          <div>
                              <strong>전화문의</strong><br/>
                              <span className="text-muted">031-752-6000</span>
                          </div>
                      </li>
                      <li className="d-flex align-items-center fs-5">
                          <i className="bi bi-globe text-primary fs-3 me-3"></i>
                          <div>
                              <strong>홈페이지</strong><br/>
                              <span className="text-muted">www.느티나무병원협동조합.com</span>
                          </div>
                      </li>
                   </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIntro;
