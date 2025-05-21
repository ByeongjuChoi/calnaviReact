import React, { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const history = useHistory();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // 회원가입 처리 함수
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필드가 입력되었는지 체크
    if (!userid || !password || !confirmPassword || !username) {
      setError('ID, パスワード, パスワード確認, ユーザー名を全部入力してくだしい。');
      return;
    }

    // 비밀번호와 확인 비밀번호가 일치하는지 체크
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    // 실제 회원가입 로직을 추가하세요.
    try {
      const response = await axios.post('http://localhost:8080/api/join', {
        userid,
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true  // CORS 쿠키 인증이 필요한 경우 (세션 등)
      });
      console.log('会員登録成功：', response.data);

      history.push('/login');

    } catch (err) {
      setError('会員登録失敗しました。');
      console.error('会員登録失敗：', err);
    }
  };

  return (
    <div className="signup-container">
      <h2>会員登録</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <div>
          <label htmlFor="confirmPassword">パスワード確認</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">ユーザー名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">会員登録</button>
      </form>

      <button type="button" onClick={() => history.push('/login')} className="back-to-login">
        ログイン画面へ
      </button>
    </div>
  );
};

export default SignUpPage;