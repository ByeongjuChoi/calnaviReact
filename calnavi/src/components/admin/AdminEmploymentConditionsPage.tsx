import "./AdminEmploymentConditionsPage.css";
import { useState, useEffect } from "react";
import api from "../../api";
import { error } from "console";

interface userEmplInfo {
    userid: string;
    year_month: string;

    companyname: string;        // 이름
    companypostno: string;      // 우편번호
    companyaddr: string;        // 주소
    companyempregion: string;   // 취업 장소 메모
    
    detailwork: string;         // 업무내용
    employmentperiod: string;   // 취업기간
    employmentkind: string;     // 고용구분
    workingtime1: string;       // 취업시간➀
    resttime1: string;          // 휴식시간➀
    workingtime2: string;       // 취업시간➁
    resttime2: string;          // 휴식시간➁
    workingtime3: string;       // 근무시간➂
    resttime3: string;          // 휴식시간➂
    worktimememo: string;       // 근무 시간 메모
    workday: string;            // 취업요일
    restday: string;            // 휴일
    otherworktime: string;      // 시간외 근무
    restwork: string;           // 휴일 근무
    vacation: string;           // 휴가
    salary: string;             // 일급 월급
    overtimepay: string;        // 내부 고정 시간 외 수당
    skillpay: string;           // 직능 수당
    technicalpay: string;       // 기술 수당
    workallowancepay: string;   // 업무수당
    specialpay: string;         // 특별 수당
    commutepay: string;         // 통근 수당
    housingpay: string;         // 주택 수당
    privatehousingexpenses: string; // 사택비 공제
    salrymemo: string;          // 급여 메모
    payterms: string;           // 지불 조건 등
    healthyexpenses: string;    // 건강 보험
    kouseiexpenses: string;     // 후생연금
    employmentexpenses: string; // 고용보험
    employmentbusyo: string;    // 고용관리상담창구부서명
    employmentph: string;       // 고용 관리 상담 창구 연락처
    etc: string;                // 비고
};

interface User {
  userid: string;
  username: string;
}

const AdminEmploymentConditionsPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [selectedUserid, setSelectedUserid] = useState<string>("");
    const [userEmpl, setUserEmpl] = useState<userEmplInfo | null>(null);
    const [total, setTotal] = useState(0);
    //const [yearMonth, setYearMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);

    const today = new Date();
    const [year, setYear] = useState(String(today.getFullYear()));
    const [month, setMonth] = useState(String(today.getMonth() + 1));

    const role = sessionStorage.getItem("role");
    const [adminRole, setAdminRole] = useState(false);
    const selectedUser = userInfo.find(user => user.userid === selectedUserid);

    // 전송버튼
    const handleUserEmplInfoSubmit = () => {
        if(!window.confirm("保存しますか？")) return;
        if (!userEmpl) return;

        const paddedMonth = String(month).padStart(2, '0');
        const yearMonth = `${year}-${paddedMonth}`;

        const updatedUserEmpl = {
            ...userEmpl,
            year_month: yearMonth,
        };

        api
            .post("/api/admin/userempl/save",updatedUserEmpl, {
                headers: {
                    role: role,
                },
            })
            .then(() => {
                console.log("success");
                alert("保存出来ました。");
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    };
    

    // 유저 아이디 가져오기
    useEffect(() => {
        if (role === "ADMIN") setAdminRole(true);

        api
            .get("/api/admin/allusers", {})
            .then((res) => {
                const users = res.data.map((item: {userid: string, username: string, role: string}) => ({
                    userid: item.userid,
                    username: item.username,
                }));
                setUserInfo(users);
            })
            .catch((error) => {
                console.log("error: ", error);
            })
    },[]);

    useEffect(() => {
        if (!selectedUserid) {
            setUserEmpl(null);
            return;
        }

        if (!userEmpl || userEmpl.userid !== selectedUserid) {
            setUserEmpl({
                userid: selectedUserid,
                year_month: String(year) + "-" + String(month),
                companyname: "キャル株式会社",
                companypostno: "〒101-0029",
                companyaddr: "東京都千代田区神田相生町1 秋葉原ｾﾝﾀｰﾌﾟﾚｲｽﾋﾞﾙ5階",
                companyempregion: "及び上記会社の指定する場所",
                detailwork: "",        
                employmentperiod: "",
                employmentkind: "",
                workingtime1: "",
                resttime1: "",
                workingtime2: "",
                resttime2: "",
                workingtime3: "",
                resttime3: "",
                worktimememo: "",
                workday: "",
                restday: "",
                otherworktime: "",
                restwork: "",
                vacation: "",
                salary: "",
                overtimepay: "",
                skillpay: "",
                technicalpay: "",
                workallowancepay: "",
                specialpay: "",
                commutepay: "",
                housingpay: "",
                privatehousingexpenses: "",
                salrymemo: "",
                payterms: "",
                healthyexpenses: "",
                kouseiexpenses: "",
                employmentexpenses: "",
                employmentbusyo: "",
                employmentph: "",
                etc: "",
            });
        }
    }, [selectedUserid]);

    const handleInputChange = (field: keyof userEmplInfo, value: string) => {
        if (!userEmpl) return;
        setUserEmpl({ ...userEmpl, [field]: value });
    };

    return (
        <div className="empl-container">
            <h1 className="empl-title">就業条件明示書</h1>
            <h5>
                {adminRole ? "" : `雇用主:「キャル株式会社」と被雇用者:「${selectedUser?.username || ''}」は次の条件に基づき雇用契約を締結する。`}
            </h5>
            <div>
                <select value={selectedUserid} onChange={(e) => setSelectedUserid(e.target.value)}>
                    <option value="">--  ユーザー選択  --</option>
                    {userInfo.map((user) => (
                        <option key={user.userid} value={user.userid}>
                            {user.username} ({user.userid})
                        </option>
                    ))}
                </select>
            </div>

            <div className="empl-select-row">
                <select value={year} onChange={(e) => setYear(e.target.value)} className="empl-year-select">
                {[...Array(5)].map((_, idx) => {
                    const y = today.getFullYear() - 4 + idx;
                    return <option key={y} value={y}>{y}年</option>;
                })}
                </select>

                <select value={month} onChange={(e) => setMonth(e.target.value)} className="empl-month-select">
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}月</option>
                ))}
                </select>
            </div>

            <section className="empl-section">
                <h2>就業場所</h2>
                <table className="empl-table">
                    <tbody>
                        <tr>
                            <td>名称</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.companyname || "キャル株式会社"}
                                    onChange={(e) => handleInputChange("companyname", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>郵便番号</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.companypostno || "〒101-0029"}
                                    onChange={(e) => handleInputChange("companypostno", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>住所</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.companyaddr || "東京都千代田区神田相生町1 秋葉原ｾﾝﾀｰﾌﾟﾚｲｽﾋﾞﾙ5階"}
                                    onChange={(e) => handleInputChange("companyaddr", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業場所メモ</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.companyempregion || "及び上記会社の指定する場所"}
                                    onChange={(e) => handleInputChange("companyempregion", e.target.value)}
                                />
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </section>

            <section className="empl-section">
                <h2>就業条件等</h2>
                <table className="empl-table">
                <tbody>
                        <tr>
                            <td>業務内容</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.detailwork || ""}
                                    onChange={(e) => handleInputChange("detailwork", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業期間</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.employmentperiod || ""}
                                    onChange={(e) => handleInputChange("employmentperiod", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>雇用区分</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.employmentkind || ""}
                                    onChange={(e) => handleInputChange("employmentkind", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業時間➀</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.workingtime1 || ""}
                                    onChange={(e) => handleInputChange("workingtime1", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休憩時間➀</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.resttime1 || ""}
                                    onChange={(e) => handleInputChange("resttime1", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業時間➁</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.workingtime2 || ""}
                                    onChange={(e) => handleInputChange("workingtime2", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休憩時間➁</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.resttime2 || ""}
                                    onChange={(e) => handleInputChange("resttime2", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業時間➂</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.workingtime3 || ""}
                                    onChange={(e) => handleInputChange("workingtime3", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休憩時間➂</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.resttime3 || ""}
                                    onChange={(e) => handleInputChange("resttime3", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業時間メモ</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.worktimememo || ""}
                                    onChange={(e) => handleInputChange("worktimememo", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>就業曜日</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.workday || ""}
                                    onChange={(e) => handleInputChange("workday", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休日</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.restday || ""}
                                    onChange={(e) => handleInputChange("restday", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>時間外勤務</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.otherworktime || ""}
                                    onChange={(e) => handleInputChange("otherworktime", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休日勤務</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.restwork || ""}
                                    onChange={(e) => handleInputChange("restwork", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>休暇</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.vacation || ""}
                                    onChange={(e) => handleInputChange("vacation", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>日給月給</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.salary || ""}
                                    onChange={(e) => handleInputChange("salary", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>内  固定的時間外手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.overtimepay || ""}
                                    onChange={(e) => handleInputChange("overtimepay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>職能手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.skillpay || ""}
                                    onChange={(e) => handleInputChange("skillpay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>技術手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.technicalpay || ""}
                                    onChange={(e) => handleInputChange("technicalpay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>業務手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.workallowancepay || ""}
                                    onChange={(e) => handleInputChange("workallowancepay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>特別手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.specialpay || ""}
                                    onChange={(e) => handleInputChange("specialpay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>通勤手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.commutepay || ""}
                                    onChange={(e) => handleInputChange("commutepay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>住宅手当</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.housingpay || ""}
                                    onChange={(e) => handleInputChange("housingpay", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>社宅費控除</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.privatehousingexpenses || ""}
                                    onChange={(e) => handleInputChange("privatehousingexpenses", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>給与メモ</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.salrymemo || ""}
                                    onChange={(e) => handleInputChange("salrymemo", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>支払い条件等</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.payterms || ""}
                                    onChange={(e) => handleInputChange("payterms", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>健康保険</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.healthyexpenses || ""}
                                    onChange={(e) => handleInputChange("healthyexpenses", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>厚生年金</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.kouseiexpenses || ""}
                                    onChange={(e) => handleInputChange("kouseiexpenses", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>雇用保険</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.employmentexpenses || ""}
                                    onChange={(e) => handleInputChange("employmentexpenses", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>雇用管理相談窓口部署名</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.employmentbusyo || ""}
                                    onChange={(e) => handleInputChange("employmentbusyo", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>雇用管理相談窓口連絡先</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.employmentph || ""}
                                    onChange={(e) => handleInputChange("employmentph", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>備考</td>
                            <td>
                                <input
                                    type="text"
                                    value={userEmpl?.etc || ""}
                                    onChange={(e) => handleInputChange("etc", e.target.value)}
                                />
                            </td>
                        </tr>
                </tbody>
                </table>
            </section>

            <div>
                <button onClick={() => handleUserEmplInfoSubmit() } disabled={!selectedUserid} >作成</button>
            </div>
        </div>
    );
}

export default AdminEmploymentConditionsPage;