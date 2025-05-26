import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersPage.css';

interface User {
  userid: string;
  username: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get<User[]>('http://localhost:8080/api/admin/allusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('사용자 목록을 불러오지 못했습니다.');
      }
    };

    fetchUsers();
  }, []);

  // 검색 필터링 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (value === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.userid.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="user-manage-container">
      <h1>회원 관리</h1>
      {error && <p className="error">{error}</p>}

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="아이디 또는 이름으로 검색..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* 테이블 */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;