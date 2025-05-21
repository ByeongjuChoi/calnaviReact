import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  // 로그인 폼 상태
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // useHistory 훅을 사용하여 페이지 이동

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userid || !password) {
      setError('IDとパスワードを全部入力してくだしい。');
      return;
    }

    // 실제 로그인 로직을 추가하세요.
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        userid,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // 로그인 성공 시 받은 JWT 토큰을 localStorage 또는 sessionStorage에 저장
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('userid', response.data.userid);
      sessionStorage.setItem('role', response.data.role);
      //history.push('/MainPage');
      if (response.data.role === 'ADMIN') {
        history.push('/AdminPage');
      } else {
        history.push('/MainPage');
      }

    } catch (err) {
      setError('ログイン失敗しました。');
    }
  };

  // 회원가입 페이지로 이동
  const navigateToSignUp = () => {
    history.push('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="userid">ID</label>
          <input
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>

      <p>Accountがいないんですか？</p>
      <button onClick={navigateToSignUp}>会員登録</button>
    </div>
  );
};

export default LoginPage;