import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const history = useHistory();

  // 권한 확인
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role !== 'ADMIN') {
      alert('접근 권한이 없습니다.');
      history.push('/MainPage'); // 일반 사용자 페이지로 리디렉션
    }
  }, [history]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">관리자 대시보드</h1>
      <p className="admin-subtitle">관리 항목을 선택하세요.</p>

      <div className="admin-card-container">
        <div className="admin-card" onClick={() => history.push('/UsersPage')}>
          <h2>👤 회원관리</h2>
          <p>회원 목록 조회 및 권한 설정</p>
        </div>

        <div className="admin-card" onClick={() => history.push('/AdminNoticesPage')}>
          <h2>📢 공지사항 관리</h2>
          <p>공지 등록, 수정, 삭제</p>
        </div>

        <div className="admin-card" onClick={() => history.push('/attendance')}>
          <h2>📅 근태상황</h2>
          <p>직원의 출근/퇴근 기록 조회</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;