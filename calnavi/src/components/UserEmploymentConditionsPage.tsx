import "./UserEmploymentConditionsPage.css";
import { useState, useEffect } from "react";
import api from "../api";
import { useHistory } from 'react-router-dom';

interface userEmplInfo {
  userid: string;
  year_month: string;
  companyname: string;
  companypostno: string;
  companyaddr: string;
  companyempregion: string;
  detailwork: string;
  employmentperiod: string;
  employmentkind: string;
  workingtime1: string;
  resttime1: string;
  workingtime2: string;
  resttime2: string;
  workingtime3: string;
  resttime3: string;
  worktimememo: string;
  workday: string;
  restday: string;
  otherworktime: string;
  restwork: string;
  vacation: string;
  salary: string;
  overtimepay: string;
  skillpay: string;
  technicalpay: string;
  workallowancepay: string;
  specialpay: string;
  commutepay: string;
  housingpay: string;
  privatehousingexpenses: string;
  salrymemo: string;
  payterms: string;
  healthyexpenses: string;
  kouseiexpenses: string;
  employmentexpenses: string;
  employmentbusyo: string;
  employmentph: string;
  etc: string;
}

const UserEmploymentConditionsPage: React.FC = () => {
  const [userEmpl, setUserEmpl] = useState<userEmplInfo | null>(null);

  const today = new Date();
  const [year, setYear] = useState(String(today.getFullYear()));
  const [month, setMonth] = useState(String(today.getMonth() + 1));
  const history = useHistory();

  useEffect(() => {
    api
      .get(
        `/api/admin/userempl/selectempl?userid=${sessionStorage.getItem(
          "userid"
        )}&year_month=${String(year) + "-" + String(month).padStart(2, "0")}`
      )
      .then((res) => {
        setUserEmpl(res.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, [year, month]);

  return (
    <div className="user-empl-container">
      <h1 className="user-empl-title">就業条件明示書</h1>
      <div className="button-container">
          <button className="back-button" onClick={() => history.push("/mainPage")}>
          ← メインに戻る
          </button>
      </div>

      <div className="user-empl-select-row">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="user-empl-year-select"
        >
          {[...Array(5)].map((_, idx) => {
            const y = today.getFullYear() - 4 + idx;
            return (
              <option key={y} value={y}>
                {y}年
              </option>
            );
          })}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="user-empl-month-select"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}月
            </option>
          ))}
        </select>
      </div>

      <section className="user-empl-section">
        <h2>就業場所</h2>
        <table className="user-empl-table">
          <tbody>
            <tr>
              <td>名称</td>
              <td>{userEmpl?.companyname || ""}</td>
            </tr>
            <tr>
              <td>郵便番号</td>
              <td>{userEmpl?.companypostno || ""}</td>
            </tr>
            <tr>
              <td>住所</td>
              <td>
                {userEmpl?.companyaddr ||
                  ""}
              </td>
            </tr>
            <tr>
              <td>就業場所メモ</td>
              <td>{userEmpl?.companyempregion || ""}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="user-empl-section">
        <h2>就業条件等</h2>
        <table className="user-empl-table">
          <tbody>
            <tr>
              <td>業務内容</td>
              <td>{userEmpl?.detailwork || ""}</td>
            </tr>
            <tr>
              <td>就業期間</td>
              <td>{userEmpl?.employmentperiod || ""}</td>
            </tr>
            <tr>
              <td>雇用区分</td>
              <td>{userEmpl?.employmentkind || ""}</td>
            </tr>
            <tr>
              <td>就業時間➀</td>
              <td>{userEmpl?.workingtime1 || ""}</td>
            </tr>
            <tr>
              <td>休憩時間➀</td>
              <td>{userEmpl?.resttime1 || ""}</td>
            </tr>
            <tr>
              <td>就業時間➁</td>
              <td>{userEmpl?.workingtime2 || ""}</td>
            </tr>
            <tr>
              <td>休憩時間➁</td>
              <td>{userEmpl?.resttime2 || ""}</td>
            </tr>
            <tr>
              <td>就業時間➂</td>
              <td>{userEmpl?.workingtime3 || ""}</td>
            </tr>
            <tr>
              <td>休憩時間➂</td>
              <td>{userEmpl?.resttime3 || ""}</td>
            </tr>
            <tr>
              <td>就業時間メモ</td>
              <td>{userEmpl?.worktimememo || ""}</td>
            </tr>
            <tr>
              <td>就業曜日</td>
              <td>{userEmpl?.workday || ""}</td>
            </tr>
            <tr>
              <td>休日</td>
              <td>{userEmpl?.restday || ""}</td>
            </tr>
            <tr>
              <td>時間外勤務</td>
              <td>{userEmpl?.otherworktime || ""}</td>
            </tr>
            <tr>
              <td>休日勤務</td>
              <td>{userEmpl?.restwork || ""}</td>
            </tr>
            <tr>
              <td>休暇</td>
              <td>{userEmpl?.vacation || ""}</td>
            </tr>
            <tr>
              <td>日給月給</td>
              <td>{userEmpl?.salary || ""}</td>
            </tr>
            <tr>
              <td>内 固定的時間外手当</td>
              <td>{userEmpl?.overtimepay || ""}</td>
            </tr>
            <tr>
              <td>職能手当</td>
              <td>{userEmpl?.skillpay || ""}</td>
            </tr>
            <tr>
              <td>技術手当</td>
              <td>{userEmpl?.technicalpay || ""}</td>
            </tr>
            <tr>
              <td>業務手当</td>
              <td>{userEmpl?.workallowancepay || ""}</td>
            </tr>
            <tr>
              <td>特別手当</td>
              <td>{userEmpl?.specialpay || ""}</td>
            </tr>
            <tr>
              <td>通勤手当</td>
              <td>{userEmpl?.commutepay || ""}</td>
            </tr>
            <tr>
              <td>住宅手当</td>
              <td>{userEmpl?.housingpay || ""}</td>
            </tr>
            <tr>
              <td>社宅費控除</td>
              <td>{userEmpl?.privatehousingexpenses || ""}</td>
            </tr>
            <tr>
              <td>給与メモ</td>
              <td>{userEmpl?.salrymemo || ""}</td>
            </tr>
            <tr>
              <td>支払い条件等</td>
              <td>{userEmpl?.payterms || ""}</td>
            </tr>
            <tr>
              <td>健康保険</td>
              <td>{userEmpl?.healthyexpenses || ""}</td>
            </tr>
            <tr>
              <td>厚生年金</td>
              <td>{userEmpl?.kouseiexpenses || ""}</td>
            </tr>
            <tr>
              <td>雇用保険</td>
              <td>{userEmpl?.employmentexpenses || ""}</td>
            </tr>
            <tr>
              <td>雇用管理相談窓口部署名</td>
              <td>{userEmpl?.employmentbusyo || ""}</td>
            </tr>
            <tr>
              <td>雇用管理相談窓口連絡先</td>
              <td>{userEmpl?.employmentph || ""}</td>
            </tr>
            <tr>
              <td>備考</td>
              <td>{userEmpl?.etc || ""}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserEmploymentConditionsPage;