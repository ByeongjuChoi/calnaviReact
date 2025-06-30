import { Megaphone, Clock, FileText, Wallet, BookOpen, ClipboardList, FileSignature, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "./LibraryPage.css";
import api from "../api";

const menus = [
  { title: "入社時の手引き",　no: 1 },
  { title: "CALNAVI勤怠入力マニュアル",　no: 2 },
  { title: "テレワーク手当・通勤ルート入力マニュアル",　no: 3 },
  { title: "就業時の心構え及びその他基本情報",　no: 4 },
  { title: "CAL-2025カレンダー",　no: 5 },
  { title: "福利厚生（プログラミングサイトのご案内）",　no: 6 },

  { title: "▶️規程集", no: 7 },
  { title: "▶️育児休業に関する基本方針", no: 8 },
  { title: "▶️介護休業に関する基本方針", no: 9 },
  { title: "▶️ハラスメントに関する基本方針", no: 10 },
  { title: "▶️労使協定", no: 11 },
];

type submenu = {
    title: string;
    no: number[];
    submenus: string[];
}

export default function LibraryPage() {

    const history = useHistory();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMenu, setPopupMenu] = useState<submenu | null>(null);

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

    const handleMenuClick = (menuNo: number) => {
        switch (menuNo) {
            case 1:
                downloadFile("nyusyaannai");
                break;
            case 2:
                downloadFile("kintaimenu");
                break;
            case 3:
                downloadFile("teleworktate");
                break;
            case 4:
                downloadFile("syushokusisai");
                break;
            case 5:
                downloadFile("calender");
                break;
            case 6:
                downloadFile("hulurikousei");
                break;
            case 7:
                setPopupMenu({title: "規程集", 
                                no : [701, 702, 703,
                                    704, 705, 706,
                                    707, 708, 709
                                ], 
                          submenus : ["就業規則", "賃金規程", "人事考課規程", 
                                      "慶弔見舞金規程", "旅費規程", "育児介護休業規程", 
                                      "退職金規程", "テレワーク規程", "特定個人情報取扱規程"
                                    ]});
                setIsPopupOpen(true);
                break;
            case 8:
                setPopupMenu({title: "育児休業取得に関する意向確認", 
                                no : [801, 802
                                ], 
                          submenus : ["育児休業取得に関する意向確認", "育児休業および仕事と育児の両立支援に関する方針"
                                    ]});
                setIsPopupOpen(true);
                break;
            case 9:
                setPopupMenu({title: "介護休業に関する基本方針", 
                                no : [901
                                ], 
                          submenus : ["介護休業および仕事と介護の両立支援に関する方針"
                                    ]});
                setIsPopupOpen(true);
                break;
            case 10:
                setPopupMenu({title: "ハラスメントに関する基本方針", 
                                no : [1001, 1002, 1003
                                ], 
                          submenus : ["職場におけるパワーハラスメントに関する基本方針",
                                     "職場におけるセクシュアルハラスメントに関する基本方針",
                                     "職場における妊娠・出産等および育児・介護休業等ハラスメントに関する基本方針"
                                    ]});
                setIsPopupOpen(true);
                break;
            case 11:
                setPopupMenu({title: "労使協定", 
                                no : [1001, 1002, 1003
                                ], 
                          submenus : ["労使協定_大阪", "労使協定_東京", "労使協定_名古屋",
                                        "労使協定_福岡", "労使協定_札幌", "労使協定_横浜",
                                        "労使協定_仙台", "労使協定_広島", "労使協定_北九州"
                                    ]});
                setIsPopupOpen(true);
                break;
            default:
                alert("ページの準備中です。");
        }
    };

    const handleSubmenuClick = (menuId: number) => {
        // menuId는 popupMenu.no 배열에서 해당 서브메뉴에 매핑된 번호
        console.log("서브메뉴 번호 클릭됨:", menuId);

        // 여기서 별도 동작 (라우팅, API 호출 등)
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setPopupMenu(null);
    };

  return (
    <div className="main-container">
      <section className="menu-section">
        <h2 className="menu-title">ライブラリー</h2>
        <div className="menu-selection">
          {menus.map((menu, idx) => (
            <div key={idx} className="menu-selection-card" onClick={() => handleMenuClick(menu.no)}>
              <span className="menu-title">{menu.title}</span>
            </div>
          ))}
        </div>
      </section>

      {isPopupOpen && popupMenu && (
        <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h2 className="menu-title">{popupMenu.title}</h2>
            <div className="menu-selection">
                {popupMenu.submenus.map((item, index) => (
                <div 
                    key={index} 
                    className="menu-selection-card"
                    onClick={() => handleSubmenuClick(popupMenu.no[index])}
                >
                    <span className="menu-title">{item}</span>
                </div>
                ))}
            </div>
                <button className="close-button" onClick={closePopup}>閉じる</button>
            </div>
        </div>
      )}
    </div>
  );
}