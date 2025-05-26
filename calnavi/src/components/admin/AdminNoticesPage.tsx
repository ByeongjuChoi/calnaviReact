import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./AdminNoticesPage.css";
import api from "../../api";

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

    const handleDelete = (id: number) => {

        if (!window.confirm("정말로 이 공지사항을 삭제하시겠습니까？")) return;

        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');
        api.post(`/api/admin/notices/delete`, {id}, {
            headers: {
                role: role
            }
        })
        .then(() => {
            setNotices((prev) => prev.filter(notice => notice.id !== id));
        })
        .catch((err) => {
            console.log("err: ", err);
        });
    };

    return (
        <div className="admin-notice-container">
            <h1 className="admin-notice-header">お知らせ管理</h1>

            <ul className="notice-list">
                {notices.map(notice => (
                <li key={notice.id} className="notice-item">
                    <span className="notice-date">
                    {new Date(notice.updatedAt).toLocaleDateString("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                    <span className="notice-title">{notice.title}</span>
                    <button
                        className="notice-edit-btn"
                        onClick={() => history.push(`/WriteNoticePage?id=${notice.id}`)}
                        aria-label={`공지사항 ${notice.title} 수정`}
                    >
                    修正
                    </button>
                    <button
                        className="notice-delete-btn"
                        onClick={() => handleDelete(notice.id)}
                    >
                        削除
                    </button>
                </li>
                ))}
            </ul>

            <button className="notice-write-btn" onClick={() => history.push("/writeNoticePage")}>
                書き
            </button>
        </div>
  );
};

export default AdminNoticesPage;