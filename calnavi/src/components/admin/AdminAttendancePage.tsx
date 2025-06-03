import api from "../../api";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminAttendancePage.css';

interface userAttendanceInfo{
    userid: string;
    username: string;
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

    const today = new Date();
    const [year, setYear] = useState<number>(today.getFullYear());
    const [month, setMonth] = useState<number>(today.getMonth() + 1);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const monthParam = `${year}${month < 10 ? '0' + month : month}`;
        api
            .get(`/api/admin/attendance/selectUserAttendanceInfo?month=${monthParam}`, {})
            .then((res) => {
                const data = res.data;
                setUserInfo(data);
            })
            .catch((err) => {
                setError('勤怠データの読み込みに失敗しました。');
                console.log("err: ", err);
            });
    },[year, month]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    const filteredData = userInfo.filter((user) => 
        user.userid.toLowerCase().includes(search.toLowerCase())
    );

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(event.target.value));
    };

    return (
        <div className="attendance-page">
        <h1>勤怠管理</h1>

        <div className="filters">
            <div className="year-month-picker">
                <select value={year} onChange={handleYearChange}>
                    {[2023, 2024, 2025, 2026].map((y) => (
                        <option key={y} value={y}>
                            {y}年
                        </option>
                    ))}
                </select>

                <select value={month} onChange={handleMonthChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                        <option key={m} value={m}>
                            {m}月
                        </option>
                    ))}
                </select>
            </div>
        </div>
        
        {/* 검색 기능 */}
        <div className="search-bar">
            <input
                type="text"
                placeholder="ID　検索。。。"
                value={search}
                onChange={handleSearchChange}
            />
        </div>

        {error && <p className="error">{error}</p>}

        <table className="attendance-table">
            <thead>
            <tr>
                <th>ユーザーID</th>
                <th>ユーザー名</th>
                <th>勤怠日数</th>
                <th>勤務時間</th>
                <th>使用した有給</th>
                <th>有給</th>
                <th>残る有給</th>
                <th>欠勤日数</th>
                <th>今月の勤務日数</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((user, index) => (
                <tr key={index}>
                <td>{user.userid}</td>
                <td>{user.username}</td>
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