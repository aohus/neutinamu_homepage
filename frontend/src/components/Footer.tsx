import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-success fw-bold mb-3"><i className="bi bi-tree-fill me-2"></i>느티나무병원협동조합</h5>
            <p className="small text-white-50">
              자연과 사람이 함께 건강한 녹지를 누리는 세상을 꿈꾸는 병원, 
              느티나무병원협동조합입니다.
            </p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-white mb-3">CONTACT INFO</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2"><i className="bi bi-geo-alt me-2"></i>성남시 수정구 공원로 445번길 8 (본점)</li>
              <li className="mb-2"><i className="bi bi-telephone me-2"></i>031-752-6000</li>
              <li className="mb-2"><i className="bi bi-envelope me-2"></i>contact@namoo.coop</li>
            </ul>
          </div>
           <div className="col-lg-4 col-md-12">
            <h6 className="fw-bold text-white mb-3">QUICK LINKS</h6>
             <div className="row small">
                 <div className="col-6">
                    <ul className="list-unstyled">
                        <li><a href="/intro" className="text-white-50 text-decoration-none">회사소개</a></li>
                        <li><a href="/business" className="text-white-50 text-decoration-none">주요사업</a></li>
                        <li><a href="/projects" className="text-white-50 text-decoration-none">주요실적</a></li>
                    </ul>
                 </div>
                 <div className="col-6">
                    <ul className="list-unstyled">
                        <li><a href="/notices" className="text-white-50 text-decoration-none">공지사항</a></li>
                        <li><a href="/diagnosis" className="text-white-50 text-decoration-none">수목진단의뢰</a></li>
                        <li><a href="/inquiries" className="text-white-50 text-decoration-none">견적문의</a></li>
                    </ul>
                 </div>
             </div>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center small text-white-50">
          &copy; 느티나무병원협동조합. All Rights Reserved.
          <a href="/login" className="text-secondary text-decoration-none ms-2" style={{ fontSize: '0.8em' }}>Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
