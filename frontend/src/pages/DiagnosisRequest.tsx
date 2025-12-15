import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert, Container } from 'react-bootstrap';

const DiagnosisRequest: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Mock submission
            setSubmitted(true);
            window.scrollTo(0, 0);
        }

        setValidated(true);
    };

    if (submitted) {
        return (
            <Container className="py-5">
                <Alert variant="success" className="text-center p-5">
                    <h2 className="alert-heading fw-bold mb-3"><i className="bi bi-check-circle-fill me-2"></i>접수가 완료되었습니다.</h2>
                    <p className="lead">
                        보내주신 의뢰 내용이 성공적으로 접수되었습니다.<br />
                        담당 나무의사가 내용 확인 후 빠른 시일 내에 연락드리겠습니다.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-center gap-3 mt-4">
                         <Button variant="outline-success" href="/">홈으로 돌아가기</Button>
                         <Button variant="success" onClick={() => { setSubmitted(false); setValidated(false); }}>추가 접수하기</Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <div className="diagnosis-request-page">
            <div className="mb-5 border-bottom pb-3">
                 <h2 className="text-success fw-bold">수목진단 의뢰</h2>
                 <p className="text-muted">전문적인 수목 진단이 필요하신가요? 온라인으로 간편하게 신청하세요.</p>
            </div>

            {/* Offline Form Download Section */}
            <Card className="mb-5 bg-light border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center justify-content-between flex-wrap p-4">
                    <div>
                        <h5 className="fw-bold mb-2"><i className="bi bi-file-earmark-text me-2 text-success"></i>오프라인 접수 안내</h5>
                        <p className="mb-0 text-muted small">
                            서면 작성이 편하시거나 상세 도면 첨부가 필요하신 경우, 의뢰서를 다운로드하여 작성 후 이메일(help@neutinamu.co.kr) 또는 팩스로 보내주세요.
                        </p>
                    </div>
                    <Button variant="success" href="/assets/docs/수목진단의뢰.hwp" download className="mt-3 mt-md-0 rounded-pill px-4">
                        <i className="bi bi-download me-2"></i>의뢰서 다운로드 (HWP)
                    </Button>
                </Card.Body>
            </Card>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h4 className="fw-bold mb-3 border-start border-4 border-success ps-3">신청자 정보</h4>
                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group controlId="applicantName" className="mb-3">
                            <Form.Label>이름 (또는 회사명) <span className="text-danger">*</span></Form.Label>
                            <Form.Control required type="text" placeholder="신청자 또는 담당자 성함" />
                            <Form.Control.Feedback type="invalid">이름을 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="applicantContact" className="mb-3">
                            <Form.Label>연락처 <span className="text-danger">*</span></Form.Label>
                            <Form.Control required type="tel" placeholder="010-0000-0000" />
                            <Form.Control.Feedback type="invalid">연락처를 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="applicantEmail" className="mb-3">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="email@example.com" />
                        </Form.Group>
                    </Col>
                </Row>

                <h4 className="fw-bold mb-3 border-start border-4 border-success ps-3">진단 대상 정보</h4>
                <Row className="mb-4">
                    <Col md={12}>
                        <Form.Group controlId="treeLocation" className="mb-3">
                            <Form.Label>수목 위치 (주소) <span className="text-danger">*</span></Form.Label>
                            <Form.Control required type="text" placeholder="진단받을 나무가 위치한 정확한 주소를 입력해주세요." />
                            <Form.Control.Feedback type="invalid">주소를 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="treeType" className="mb-3">
                            <Form.Label>수종 (나무 종류)</Form.Label>
                            <Form.Control type="text" placeholder="예: 소나무, 벚나무 (모를 경우 '모름' 입력)" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="treeAge" className="mb-3">
                            <Form.Label>식재 시기 (또는 수령)</Form.Label>
                            <Form.Control type="text" placeholder="예: 2020년 식재, 약 10년생" />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="symptoms" className="mb-3">
                            <Form.Label>증상 및 의뢰 내용 <span className="text-danger">*</span></Form.Label>
                            <Form.Control required as="textarea" rows={5} placeholder="증상 (잎 변색, 가지 마름, 해충 발생 등)과 의뢰하시고자 하는 내용을 상세히 적어주세요." />
                            <Form.Control.Feedback type="invalid">의뢰 내용을 입력해주세요.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                         <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>사진 첨부 (선택)</Form.Label>
                            <Form.Control type="file" multiple />
                            <Form.Text className="text-muted">
                                나무의 전체 모습, 병반 부위, 주변 환경 등의 사진을 첨부해주시면 더 정확한 진단에 도움이 됩니다.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Card className="mb-4 bg-light border">
                    <Card.Body>
                        <Form.Group controlId="privacyCheck">
                            <Form.Check 
                                required
                                type="checkbox"
                                label="개인정보 수집 및 이용에 동의합니다."
                                feedback="개인정보 수집 이용에 동의해야 합니다."
                                feedbackType="invalid"
                            />
                            <div className="mt-2 text-muted small">
                                * 수집된 정보는 상담 및 진단 목적으로만 사용되며, 관련 법령에 따라 안전하게 관리됩니다.
                            </div>
                        </Form.Group>
                    </Card.Body>
                </Card>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                     <Button variant="secondary" size="lg" className="px-5" href="/">취소</Button>
                     <Button variant="success" size="lg" type="submit" className="px-5">진단 신청하기</Button>
                </div>
            </Form>
        </div>
    );
};

export default DiagnosisRequest;
