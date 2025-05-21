import { useEffect, useState } from "react";
import axios from "axios";
import "./NoticesPage.css";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

interface Announcement {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
}

const formatToJapanTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function NoticesPage() {
  const history = useHistory();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const noticeId = location.state && (location.state as { id: number }).id;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios
      .get(`http://localhost:8080/api/main/Allnotices?id=${noticeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true 
      })
      .then((res) => setAnnouncements(res.data))
      .catch((err) => {
        console.error("お知らせのロードに失敗：", err);
        setError("お知らせの読み込みが出来ませんでした。");
      });
  }, []);

  return (
    <div className="notices-container">
      <h1>お知らせ一覧</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          {announcements.map((notice) => (
            <div key={notice.id}>
              <div className="notice-header">
                <div className="notice-title">{notice.title}</div>
                <div className="notice-date">{formatToJapanTime(notice.updatedAt)}</div>
              </div>
              <div className="notice-content">{notice.content}</div>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => history.goBack()} className="back-button">← 戻る</button>
    </div>
  );
}