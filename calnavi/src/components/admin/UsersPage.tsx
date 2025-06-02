import React, { useEffect, useState } from 'react';
import api from '../../api';
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
  const [editNames, setEditNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await api.get<User[]>('/api/admin/allusers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('読み込みに失敗しました。');
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

  const handleInputChange = (userid: string, value: string) => {
    setEditNames((prev) => ({
      ...prev,
      [userid]: value,
    }));
  };

  const handleUpdateUserName = (userid: string) => {
    const newName = editNames[userid];
    if (!newName) {
      alert("変更するユーザー名を入力してください。");
      return;
    }

    api.
      post(`/api/admin/updateusername`, { userid, username: newName })
      .then(() => {
        alert("ユーザー名が変更されました。");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userid === userid ? { ...user, username: newName } : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userid === userid ? { ...user, username: newName } : user
          )
        );
      })
      .catch((error) => {
        console.error("error", error);
        alert("ユーザー名の変更に失敗しました。");
      });
  }

  return (
    <div className="user-manage-container">
      <h1>会員管理</h1>
      {error && <p className="error">{error}</p>}

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="ID,ユーザー名で検索。。。"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* 테이블 */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ユーザーID</th>
            <th>ユーザー名</th>
            <th>権限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>
                <input
                  type="text"
                  value={editNames[user.userid] ?? user.username}
                  onChange={(e) => handleInputChange(user.userid, e.target.value)}
                />
              </td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUpdateUserName(user.userid)}>修正</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;