import React from 'react';
import EditableImage from '../components/EditableImage';

const MajorBusiness: React.FC = () => {
  return (
    <div className="major-business">
      <h2 className="mb-4 border-bottom pb-2">주요사업</h2>

      <div className="mb-5">
        <h4 className="text-success fw-bold mb-3">나무병원 사업분야</h4>
        <div className="row align-items-center">
            <div className="col-md-6">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>수목 진단·처방:</strong> 병해충, 생육 이상 등 원인 분석</li>
                    <li className="list-group-item"><strong>수목 치료·방제:</strong> 예방·치료를 위한 약제 처리 및 관리</li>
                    <li className="list-group-item"><strong>생육환경 개선:</strong> 토양 개량, 통풍 및 관수 시스템 개선</li>
                    <li className="list-group-item"><strong>위험수목 진단:</strong> 구조적 위험성을 과학적으로 분석</li>
                </ul>
            </div>
            <div className="col-md-6 text-center">
                {/* Placeholder for split image 1 */}
                <div style={{ overflow: 'hidden', height: '300px' }} className="rounded shadow-sm position-relative">
                   <EditableImage 
                        imageKey="major_biz_1"
                        defaultSrc="/assets/IMG_7943.jpeg"
                        alt="나무병원 사업"
                        className="img-fluid object-fit-cover"
                   />
                </div>
            </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-success fw-bold mb-3">조경식재 사업분야</h4>
        <div className="row align-items-center">
             <div className="col-md-6 order-md-2">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>조경 설계·시공:</strong> 환경 조건에 맞는 수목 식재</li>
                    <li className="list-group-item"><strong>유지관리:</strong> 사계절 건강한 녹지 유지</li>
                    <li className="list-group-item"><strong>대형목 이식:</strong> 특수 장비를 통한 고난도 이식 수행</li>
                    <li className="list-group-item"><strong>도시재생 구역 녹지 개선:</strong> 마을정원 프로젝트 등 참여</li>
                </ul>
            </div>
            <div className="col-md-6 order-md-1 text-center">
                {/* Placeholder for split image 2 */}
                <div style={{ overflow: 'hidden', height: '300px' }} className="rounded shadow-sm position-relative">
                   <EditableImage
                        imageKey="major_biz_2"
                        defaultSrc="/assets/IMG_7943.jpeg"
                        alt="조경식재 사업"
                        className="img-fluid object-fit-cover"
                   />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MajorBusiness;
