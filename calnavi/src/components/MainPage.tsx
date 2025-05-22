import { Megaphone, Clock, FileText, Wallet, BookOpen, ClipboardList, FileSignature, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./MainPage.css";
import api from "../api";

interface Announcement {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
}

const menus = [
  { icon: <Clock />, title: "勤怠入力", no: 1 },
  { icon: <Wallet />, title: "給与明細", no: 2 },
  { icon: <FileText />, title: "各種フォーマット", no: 3 },
  { icon: <BookOpen />, title: "ライブラリー", no: 4 },
  { icon: <ClipboardList />, title: "就業条件明示書", no: 5 },
  { icon: <FileSignature />, title: "雇用契約書",　no: 6 },
  { icon: <ReceiptText />, title: "源泉徴収票", no: 7 },
];

// 날짜를 일본 시간으로 변환하는 함수
const formatToJapanTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function MainPage() {

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    // 공지사항 데이터를 불러오기
    const token = sessionStorage.getItem('token');
    api
      .get(`/api/main/Mainnotices?MainOrAll=M`, {
        withCredentials: true,
      })
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => {
        console.error("お知らせ読み込み失敗：", err);
        setError("お知らせ読み込み出来ませんでした。");
      });
  }, []);

  const handlenotice = (id: number) => {
    const token = sessionStorage.getItem('token');
    api
      .get(`/api/main/Allnotices?id=${id}`, {
        withCredentials: true,
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

  const handleMenuClick = (menuNo: number) => {
    switch (menuNo) {
      case 1:
        history.push("/AttendancePage");
        break;
      default:
        alert("ページの準備中です。");
    }
  };

  return (
    <div className="main-container">
      <section className="announcement-section">
        <h2 className="section-title">
          <Megaphone className="icon" />
          お知らせ
          <button className="view-all-button" onClick={() => history.push('/NoticeListPage')}>
          一覧を見る →
        </button>
        </h2>
        

        {announcements.length === 0 && !error ? (
          <p>お知らせを読み込んでいます。。。</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ul className="announcement-list">
            {announcements.map((a, idx) => (
              <li key={idx} className="announcement-item" onClick={ () => handlenotice(a.id)}>
                <span className="announcement-date">{formatToJapanTime(a.updatedAt)}</span>
                <span className="announcement-text">{a.title}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="menu-section">
        <h2 className="section-title">メニュー</h2>
        <div className="menu-grid">
          {menus.map((menu, idx) => (
            <div key={idx} className="menu-card" onClick={() => handleMenuClick(menu.no)}>
              <div className="menu-icon">{menu.icon}</div>
              <span className="menu-title">{menu.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}