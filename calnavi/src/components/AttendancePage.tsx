import { useState, useEffect } from "react";
import axios from "axios";
import "./AttendancePage.css";
import { useHistory } from "react-router-dom";

interface AttendanceRecord {
  date: string;
  type: string;
  start_Time: string;
  end_Time: string;
  leave_Time?: string;
}

const AttendancePage = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [attnedanceTypes, setAttnedanceTypes] = useState<string[]>([]);
  const history = useHistory();

  // 출근 타입 가져오기 (출근, 휴가 등등등)
  const getAttnedanceTypes = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get("http://localhost:8080/api/attendance/getAttendanceType", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const type = response.data.map((item: {id: number; type: string}) => item.type);
      setAttnedanceTypes(type);
    } catch (error) {
      console.log("リストの読み込みに失敗： ", error);
    }
  }

  // 월 전체 날짜 생성
  const generateInitialRecords = (y: number, m: number) => {
    const daysInMonth = new Date(y, m, 0).getDate(); // m월의 마지막 날을 구함
    const temp: AttendanceRecord[] = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(y, m - 1, day);  // 여기서 month는 0부터 시작하므로 m-1이 적절
            const japanTime = date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }).split(" ")[0];
            //const formatted = date.toISOString().split("T")[0];

            const japanTimeRemake = japanTime.split("/")[0] 
                                + "-" + japanTime.split("/")[1].padStart(2, "0") 
                                + "-" + japanTime.split("/")[2].padStart(2, "0");

            temp.push({
            date: japanTimeRemake,
            type: "出勤",
            start_Time: "",
            end_Time: "",
            leave_Time: ""
        });
    }

    return temp;
  };

  // 출근 기록 불러오기
  const fetchAttendanceRecords = async () => {
    const token = sessionStorage.getItem("token");
    const defaultRecords = generateInitialRecords(year, month);

    try {
      const response = await axios.get("http://localhost:8080/api/attendance/selectM", {
        params: { year, month },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const serverRecords = response.data;

      if (Array.isArray(serverRecords) && serverRecords.length > 0) {
            const merged = defaultRecords.map((defaultRecord) => {
              const found = serverRecords.find((r) => r.date === defaultRecord.date);
              if (found) {
                return {
                    ...defaultRecord,
                    type: found.type || defaultRecord.type,
                    start_Time: found.start_Time ?? "",
                    end_Time: found.end_Time ?? "",
                    leave_Time: found.leave_Time ?? ""
                };
              }
            return defaultRecord;
        });

        setRecords(merged);
      } else {
        setRecords(defaultRecords);
      }
    } catch (error) {
      console.error("出勤記録読み込み失敗：", error);
      setRecords(defaultRecords); // 실패 시 기본값
    }
  };

  // 인풋값 변경시 입력해서 useState에 저장
  const handleInputChange = (index: number, field: keyof AttendanceRecord, value: string) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  // 출근 버튼
  const handleAttendanceSubmit = (index: number) => {
    const record = records[index];
    const updated = [...records];
    const token = sessionStorage.getItem("token");

    if (!record.start_Time) updated[index].start_Time = "09:00";
    if (!record.end_Time) updated[index].end_Time = "18:00";
    if (!record.leave_Time) updated[index].leave_Time = "01:00";

    setRecords(updated);

    axios
      .post("http://localhost:8080/api/attendance/save", updated[index], {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response.data: ", response.data);
        if (response.data === "저장 완료") {
          alert(`${updated[index].date} 出勤情報が保存されました。`);
        } else {
          alert("保存失敗：サーバーから予想外の回答が来ました。");
        }
      })
      .catch((err) => {
        console.error("出勤情報保存失敗：", err);
        alert("保存に失敗しました。");
      });
  };

  useEffect(() => {
    fetchAttendanceRecords();
    getAttnedanceTypes();
  }, [year, month]);

  return (
    <div className="attendance-container">
      <h1>勤怠入力</h1>
      <div className="button-container">
        <button className="back-button" onClick={() => history.push("/mainPage")}>
          ← メインに戻る
        </button>
      </div>
      <div className="select-row">
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="year-select">
          {[...Array(5)].map((_, idx) => {
              const y = today.getFullYear() - 2 + idx;
              return <option key={y} value={y}>{y}年</option>;
          })}
          </select>

          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="month-select">
          {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}月</option>
          ))}
          </select>
      </div>

      <table className="attendance-table">
          <thead>
          <tr>
              <th>日付</th>
              <th>勤怠区分</th>
              <th>出勤時間</th>
              <th>退勤時間</th>
              <th>休憩時間</th>
              <th>出勤</th>
          </tr>
          </thead>
          <tbody>
          {records.map((record, index) => (
              <tr key={record.date}>
              <td>{record.date}</td>
              <td>
                  <select value={record.type} onChange={(e) => handleInputChange(index, "type", e.target.value)}>
                    {attnedanceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
              </td>
              <td>
                  <input
                  type="time"
                  value={record.start_Time}
                  onChange={(e) => handleInputChange(index, "start_Time", e.target.value)}
                  />
              </td>
              <td>
                  <input
                  type="time"
                  value={record.end_Time}
                  onChange={(e) => handleInputChange(index, "end_Time", e.target.value)}
                  />
              </td>
              <td>
                  <input
                      type="time"
                      value={record.leave_Time}
                      onChange={(e) => handleInputChange(index, "leave_Time", e.target.value)}
                  />
              </td>
              <td>
                  <button className="submit-button" onClick={() => handleAttendanceSubmit(index)}>出勤</button>
              </td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;