import api from "../../api";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminAttendancePage.css';

interface userAttendanceInfo{
    userid: string;
    attendance_cnt: number | null;
    attendance_alltime: string;
    used_vacation: number | null;
    vacation: number | null;
    absent: number | null;
    workdays: number | null;
}

const AdminAttendancePage: React.FC = () => {

    const [userInfo, setUserInfo] = useState<userAttendanceInfo[]>([]); // 사용자 정보 상태
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        api
            .get(`/api/admin/attendance/selectUserAttendanceInfo`, {})
            .then((res) => {
                const data = res.data;
                setUserInfo(data);
            })
            .catch((err) => {
                setError('근태 데이터를 불러오는 데 실패했습니다.');
                console.log("err: ", err);
            });
    },[]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    const filteredData = userInfo.filter((user) => 
        user.userid.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="attendance-page">
        <h1>근태 상황</h1>
        
        {/* 검색 기능 */}
        <div className="search-bar">
            <input
                type="text"
                placeholder="아이디로 검색..."
                value={search}
                onChange={handleSearchChange}
            />
        </div>

        {error && <p className="error">{error}</p>}

        <table className="attendance-table">
            <thead>
            <tr>
                <th>유저 아이디</th>
                <th>근무 일수</th>
                <th>근무 총 시간</th>
                <th>사용한 휴일</th>
                <th>휴일</th>
                <th>남은 휴일</th>
                <th>결석 일수</th>
                <th>평일 일수</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((user, index) => (
                <tr key={index}>
                <td>{user.userid}</td>
                <td>{user.attendance_cnt ?? 0}</td>
                <td>{user.attendance_alltime ?? '00:00:00'}</td>
                <td>{user.used_vacation ?? 0}</td>
                <td>{user.vacation ?? 0}</td>
                <td>
                    {(user.vacation ?? 0) - (user.used_vacation ?? 0)}
                </td>
                <td>{user.absent ?? 0}</td>
                <td>{user.workdays ?? 0}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default AdminAttendancePage;