import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const history = useHistory();

  // 권한 확인
  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role !== 'ADMIN') {
      alert('権限がございません。');
      history.push('/MainPage'); // 일반 사용자 페이지로 리디렉션
    }
  }, [history]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">管理者ボード</h1>
      <p className="admin-subtitle">管理項目を選択してください。</p>

      <div className="admin-card-container">
        <div className="admin-card" onClick={() => history.push('/UsersPage')}>
          <h2>👤 会員管理</h2>
          <p>会員目録照会および権限設定</p>
        </div>

        <div className="admin-card" onClick={() => history.push('/AdminNoticesPage')}>
          <h2>📢 お知らせ管理</h2>
          <p>お知らせ登録、修正、削除</p>
        </div>

        <div className="admin-card" onClick={() => history.push('/AdminAttendancePage')}>
          <h2>📅 勤怠管理</h2>
          <p>職員の出勤/退勤記録照会</p>
        </div>

        <div className="admin-card" onClick={() => history.push('/AdminSalaryPage')}>
          <h2>💲 給与明細管理</h2>
          <p>給与明細管理/登録</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;