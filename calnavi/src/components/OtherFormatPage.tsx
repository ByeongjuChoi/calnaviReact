import { Megaphone, Clock, FileText, Wallet, BookOpen, ClipboardList, FileSignature, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./OtherFormatPage.css";
import api from "../api";

const menus = [
  { title: "（社内用）経費精算書", no: 1 },
  { title: "【入力見本】（社内用）経費精算書", no: 2 },
  { title: "通勤手当支給（変更）申請書", no: 3 },
  { title: "口座振込依頼書", no: 4 },
  { title: "令和7年分扶養控除申告書", no: 5 },
  { title: "【入力見本】令和7年分扶養控除申告書",　no: 6 },
];

export default function OtherFormatPage() {

    const history = useHistory();

    useEffect(() => {
        // 공지사항 데이터를 불러오기
        const token = sessionStorage.getItem('token');
        
    }, []);

    const downloadFile = async (type: string) => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await api.get(`/api/files/download/${type}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            let fileName = "downloaded-file";
            const disposition = response.headers["content-disposition"];

            if (disposition) {
                const fileNameMatch =
                    disposition.match(/filename\*=UTF-8''(.+)/) ||
                    disposition.match(/filename="?([^"]+)"?/);

                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = decodeURIComponent(fileNameMatch[1]);
                }
            }

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
            alert("ファイルのダウンロードに失敗しました。");
        }
    };

    const getFileName = (type: string): string => {
        switch (type) {
            case "excel":
            return "経費精算書.xlsx";
            case "pdf":
            return "扶養控除申告書.pdf";
            case "word":
            return "口座振込依頼書.docx";
            default:
            return "downloaded-file";
        }
    };

    const handleMenuClick = (menuNo: number) => {
        switch (menuNo) {
            case 1:
                downloadFile("keihi");
                break;
            case 2:
                downloadFile("keihisyanai");
                break;
            case 3:
                downloadFile("tuukinteate");
                break;
            case 4:
                downloadFile("kouza");
                break;
            case 5:
                downloadFile("kyuyosodokmihon");
                break;
            case 6:
                downloadFile("kyuyosodok");
                break;
            default:
                alert("ページの準備中です。");
        }
    };

  return (
    <div className="main-container">
      <section className="menu-section">
        <h2 className="menu-title">各種フォーマット</h2>
        <div className="button-container">
            <button className="back-button" onClick={() => history.push("/mainPage")}>
            ← メインに戻る
            </button>
        </div>
        <div className="menu-selection">
          {menus.map((menu, idx) => (
            <div key={idx} className="menu-selection-card" onClick={() => handleMenuClick(menu.no)}>
              <span className="menu-title">{menu.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}