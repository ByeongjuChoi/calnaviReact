import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { getToken, getTokenRemainingTime } from '../../auth';
import './Header.css';
const Header: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const name = sessionStorage.getItem('username');
    setUsername(name);

    const token = getToken();
    if (token) {
      setRemainingTime(getTokenRemainingTime(token));

      const interval = setInterval(() => {
        const timeLeft = getTokenRemainingTime(token);
        setRemainingTime(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(interval);
          alert("セッションの有効期限が切れました。再ログインしてください。");
          handleLogout();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);


  const handleLogout = () => {
    const token = sessionStorage.getItem('token');
    if (!token || getTokenRemainingTime(token) <= 0) {
      // 이미 만료 → 그냥 세션 정리 후 로그인 페이지 이동
      sessionStorage.clear();
      history.push("/login");
      return;
    }
    axios
      .post("http://localhost:8080/api/logout", {}, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true 
      })
      .then(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('role');
        history.push('/login');
      })
      .catch((err) => {
        console.error("ログアウトに失敗:", err);
        alert("ログアウトに失敗しました。");
      });
  };

  const moveMain = () => {
    const role = sessionStorage.getItem('role');
    if(role === 'ADMIN') {
      history.push("/AdminPage");
    } else {
      history.push("/mainPage");
    }
  }

  // 시 분 초
  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  return (
    <header className="header">
      <img src="/images/calnavi.png" alt="CAL Navi" className="logo" onClick={() => moveMain()} />
      {username && (
        <span className="username-label">
          {username} 様（残り時間: {formatTime(remainingTime)}秒）
        </span>
      )}
      <button className="logout-button" onClick={handleLogout}>
        ログアウト
      </button>
    </header>
  );
};

export default Header;