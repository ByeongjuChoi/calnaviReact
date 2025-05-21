import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

interface Announcement {
    id: number;
    title: string;
    updatedAt: string;
}

const AdminNoticesPage: React.FC = () => {

    const [notices, setNotices] = useState<Announcement[]>([]);
    const history = useHistory();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get("http://localhost:8080/api/main/Mainnotices?MainOrAll=A", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => setNotices(res.data))
        .catch(() => alert("공지사항 불러오기 실패"))
    }, []);

    return (
        <div className="admin-notice">
            <h1>공지사항 페이지</h1>

            <ul className="notice-list">
                {notices.map((notice) => (
                <li key={notice.id} className="notice-item">
                    <span className="notice-date">{new Date(notice.updatedAt).toLocaleDateString("ja-JP")}</span>
                    <span className="notice-title">{notice.title}</span>
                </li>
                ))}
            </ul>
            <button onClick={() => history.push("/writeNoticePage")}>글쓰기</button>
        </div>
    );
};

export default AdminNoticesPage;