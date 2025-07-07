import api from './api';

export default function logout() {

    const token = sessionStorage.getItem('token');
    api
      .post("/api/logout", {}, { 
        withCredentials: true 
      })
      .then(() => {
        // sessionStorage.removeItem('token');
        // sessionStorage.removeItem('username');
        // sessionStorage.removeItem('userid');
        // sessionStorage.removeItem('role');
        sessionStorage.clear();
      })
      .catch((err) => {
        console.error("ログアウトに失敗:", err);
        alert("ログアウトに失敗しました。");
      });

  
    window.location.href = '/login'; // 로그인 페이지로 이동
}


const handleLogout = () => {
    
  };