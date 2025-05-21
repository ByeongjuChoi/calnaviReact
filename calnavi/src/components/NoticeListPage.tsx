import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./NoticeListPage.css";

interface Announcement {
  id: number;
  title: string;
  updatedAt: string;
}

export default function NoticeListPage() {
  const [notices, setNotices] = useState<Announcement[]>([]);
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get("http://localhost:8080/api/main/Mainnotices?MainOrAll=A", { 
      headers: {
          Authorization: `Bearer ${token}`,
        },
      withCredentials: true 
    })
      .then((res) => setNotices(res.data))
      .catch(() => alert("お知らせ読み込み失敗"));
  }, []);

  const handlenotice = (id: number) => {
    const token = sessionStorage.getItem('token');
    axios
      .get(`http://localhost:8080/api/main/Allnotices?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        history.push({
          pathname: "/notices",
          state: { id }, // ← state로 id 전달
        });
      })
      .catch((err) => {
        console.error("お知らせ移動失敗：", err);
      });
  };

  return (
    <div className="notice-list-container">
      <header className="notice-header">
        <h1>お知らせ一覧</h1>
        <button className="back-button" onClick={() => history.push("/mainPage")}>← メインに戻る</button>
      </header>

      <ul className="notice-list">
        {notices.map((notice) => (
          <li key={notice.id} className="notice-item" onClick={ () => handlenotice(notice.id)}>
            <span className="notice-date">{new Date(notice.updatedAt).toLocaleDateString("ja-JP")}</span>
            <span className="notice-title">{notice.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}