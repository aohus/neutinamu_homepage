import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CompanyIntro from './pages/CompanyIntro';
import MajorBusiness from './pages/MajorBusiness';
import Gallery from './pages/Gallery';
import Board from './pages/Board';
import DiagnosisRequest from './pages/DiagnosisRequest';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 font-sans">
          <Header />
          <main className="flex-grow-1">
            <div className="container py-5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/intro" element={<CompanyIntro />} />
                <Route path="/business" element={<MajorBusiness />} />
                <Route path="/diagnosis" element={<DiagnosisRequest />} />
                
                {/* Reusing Gallery Component */}
                <Route path="/trees" element={<Gallery category="tree_hospital" title="나무병원" />} />
                <Route path="/landscapes" element={<Gallery category="landscape" title="조경식재" />} />

                {/* Reusing Board Component */}
                <Route path="/notices" element={<Board type="notice" title="공지사항" />} />
                <Route path="/inquiries" element={<Board type="inquiry" title="시공/견적문의" />} />
                
                {/* Admin Login */}
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
