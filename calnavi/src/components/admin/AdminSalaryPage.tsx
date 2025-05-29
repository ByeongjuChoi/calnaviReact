import "./AdminSalaryPage.css";
import { useState, useEffect } from "react";
import api from "../../api";
import { error } from "console";

interface userSalInfo {
    userid: string;
    default_sal: number;                    // 기본급
    holyday_sal: number;                    // 법정 휴일 수당	法定休日手当
    night_sal: number;                      // 심야 수당		深夜手当
    career_sal: number;                     // 업무 수당		職能手当
    skill_sal: number;                      // 기술 수당		技術手当
    special_sal: number;                    // 특별 수당		特別手当
    commute_sal: number;                    // 통근 수당		通勤手当
    housing_sal: number;                    // 주택 수당		住宅手当
    other_taxation_sal: number;             // 기타 과세		その他課税
    telework_sal: number;                   // 텔레워크 수당	テレワーク手当
    other_nontaxable: number;               // 기타 비과세		その他非課税
    expense_adjustment_sal: number;         // 경비 정산		経費精算
    lateness_deduction: number;             // 지각 공제		遅刻控除
    absenteeism_deduction: number;          // 결근 공제		欠勤控除
    other_deduction: number;                // 기타 공제		その他控除
    resident_tax: number;                   // 주민세			住民税
    social_housing_fee_excluded: number;    // 사택비 공제		社宅費控除
    employment_insurance_premium: number;   // 고용 보험료		雇用保険料
    health_insurance_premium: number;       // 건강 보험료		健康保険料
    welfare_pension_premium: number;        // 후생 연금 보험료	厚生年金保険料
    care_insurance_premium: number;         // 개호 보험료		介護保険料
    withholding_tax: number;                // 원천 징수		源泉徴収
    year_end_adjustment: number;            // 연말정산액		年末調整額
};

interface User {
  userid: string;
  username: string;
}

const AdminSalaryPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [selectedUserid, setSelectedUserid] = useState<string>("");
    const [userSal, setUserSal] = useState<userSalInfo | null>(null);
    const [total, setTotal] = useState(0);
    
    // 유저 세금계산서 변경할때마다 값 저장
    const handleInputChange = (field: keyof userSalInfo, value: number) => {
        if (!userSal) return;
        setUserSal({
            ...userSal,
            [field]: value,
        });
    };

    // 토탈 금액 계산
    const handleTotal = () => {
        if (!userSal) {
            setTotal(0);
            return;
        }

        const totalAdd = [
            userSal.default_sal,
            userSal.holyday_sal,
            userSal.night_sal,
            userSal.career_sal,
            userSal.skill_sal,
            userSal.special_sal,
            userSal.commute_sal,
            userSal.housing_sal,
            userSal.other_taxation_sal,
            userSal.telework_sal,
            userSal.other_nontaxable,
            userSal.expense_adjustment_sal,
        ].reduce((acc, val) => acc + (val || 0), 0);

        const totalDeduct = [
            userSal.lateness_deduction,
            userSal.absenteeism_deduction,
            userSal.other_deduction,
            userSal.resident_tax,
            userSal.social_housing_fee_excluded,
            userSal.employment_insurance_premium,
            userSal.health_insurance_premium,
            userSal.welfare_pension_premium,
            userSal.care_insurance_premium,
            userSal.withholding_tax,
            userSal.year_end_adjustment,
        ].reduce((acc, val) => acc + (val || 0), 0);

        setTotal(totalAdd - totalDeduct);
    }

    // 전송버튼
    const handleUserSalInfoSubmit = () => {
        if (!userSal) return;
        
        console.log("userSal: ", userSal);
        debugger;

        const role = sessionStorage.getItem('role');
        api
            .post("/api/admin/usersal/save",userSal, {
                headers: {
                    role: role,
                },
            })
            .then(() => {
                console.log("success");
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    };
    

    // 유저 아이디 가져오기
    useEffect(() => {
        const role = sessionStorage.getItem("role");
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
            setUserSal(null);
            return;
        }

        // 기존 userSal이 selectedUserid와 같으면 유지, 아니면 새 객체 생성
        if (!userSal || userSal.userid !== selectedUserid) {
            setUserSal({
                userid: selectedUserid,
                default_sal: 0,
                holyday_sal: 0,
                night_sal: 0,
                career_sal: 0,
                skill_sal: 0,
                special_sal: 0,
                commute_sal: 0,
                housing_sal: 0,
                other_taxation_sal: 0,
                telework_sal: 0,
                other_nontaxable: 0,
                expense_adjustment_sal: 0,
                lateness_deduction: 0,
                absenteeism_deduction: 0,
                other_deduction: 0,
                resident_tax: 0,
                social_housing_fee_excluded: 0,
                employment_insurance_premium: 0,
                health_insurance_premium: 0,
                welfare_pension_premium: 0,
                care_insurance_premium: 0,
                withholding_tax: 0,
                year_end_adjustment: 0,
            });
        }
    }, [selectedUserid]);

    // 금액 입력할때마다 토탈 금액 계산
    useEffect(() => {
        handleTotal();
    }, [userSal]);

    return (
        <div className="salary-container">
            <h1 className="salary-title">給与明細管理</h1>

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

            <section className="salary-section">
                <h2>合計</h2>
                <div className="salary-amount">
                    <strong>支給額:</strong> ¥{total.toLocaleString()}
                </div>
            </section>

            <section className="salary-section">
                <h2>明細</h2>
                <table className="salary-table">
                    <tbody>
                        <tr>
                            <td>基本給</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.default_sal || 0}
                                    onChange={(e) => handleInputChange("default_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>支給対象時間外手当</td>
                            <td>¥0
                                
                            </td>
                        </tr>
                        <tr><td>60時間超時間外手当</td><td>¥0</td></tr>
                        <tr>
                            <td>法定休日手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.holyday_sal || 0}
                                    onChange={(e) => handleInputChange("holyday_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>深夜手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.night_sal || 0}
                                    onChange={(e) => handleInputChange("night_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>職能手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.career_sal || 0}
                                    onChange={(e) => handleInputChange("career_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>技術手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.skill_sal || 0}
                                    onChange={(e) => handleInputChange("skill_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>業務手当</td>
                            <td>¥0</td>
                        </tr>
                        <tr>
                            <td>特別手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.special_sal || 0}
                                    onChange={(e) => handleInputChange("special_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>通勤手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.commute_sal || 0}
                                    onChange={(e) => handleInputChange("commute_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>住宅手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.housing_sal || 0}
                                    onChange={(e) => handleInputChange("housing_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>その他課税</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.other_taxation_sal || 0}
                                    onChange={(e) => handleInputChange("other_taxation_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>テレワーク手当</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.telework_sal || 0}
                                    onChange={(e) => handleInputChange("telework_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>その他非課税</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.other_nontaxable || 0}
                                    onChange={(e) => handleInputChange("other_nontaxable", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>経費精算</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.expense_adjustment_sal || 0}
                                    onChange={(e) => handleInputChange("expense_adjustment_sal", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>遅刻控除</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.lateness_deduction || 0}
                                    onChange={(e) => handleInputChange("lateness_deduction", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>欠勤控除</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.absenteeism_deduction || 0}
                                    onChange={(e) => handleInputChange("absenteeism_deduction", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>その他控除</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.other_deduction || 0}
                                    onChange={(e) => handleInputChange("other_deduction", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>住民税</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.resident_tax || 0}
                                    onChange={(e) => handleInputChange("resident_tax", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>社宅費控除</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.social_housing_fee_excluded || 0}
                                    onChange={(e) => handleInputChange("social_housing_fee_excluded", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>雇用保険料</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.employment_insurance_premium || 0}
                                    onChange={(e) => handleInputChange("employment_insurance_premium", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>健康保険料</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.health_insurance_premium || 0}
                                    onChange={(e) => handleInputChange("health_insurance_premium", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>厚生年金保険料</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.welfare_pension_premium || 0}
                                    onChange={(e) => handleInputChange("welfare_pension_premium", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>介護保険料</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.care_insurance_premium || 0}
                                    onChange={(e) => handleInputChange("care_insurance_premium", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>源泉徴収</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.withholding_tax || 0}
                                    onChange={(e) => handleInputChange("withholding_tax", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>年末調整額</td>
                            <td>
                                <input
                                    type="number"
                                    value={userSal?.year_end_adjustment || 0}
                                    onChange={(e) => handleInputChange("year_end_adjustment", Number(e.target.value))}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="salary-section">
                <h2>勤務詳細</h2>
                <table className="salary-table">
                <tbody>
                    <tr><td>総稼働時間</td><td>0 時間</td></tr>
                    <tr><td>支給対象時間外</td><td>0 時間</td></tr>
                    <tr><td>60時間超時間外</td><td>0 時間</td></tr>
                    <tr><td>法定休日時間</td><td>0 時間</td></tr>
                    <tr><td>深夜時間</td><td>0 時間</td></tr>
                    <tr><td>遅刻早退時間</td><td>0 時間</td></tr>
                    <tr><td>欠勤日数</td><td>0 日</td></tr>
                    <tr><td>有給使用日数</td><td>0 日</td></tr>
                    <tr><td>有給残日数</td><td>0 日</td></tr>
                </tbody>
                </table>
            </section>

            <section className="salary-section">
                <h2>摘要</h2>
                <p>その他課税、その他控除：Amazonカード手渡し10,000円、ICカード3,000円調整分</p>
            </section>
            <div>
                <button onClick={() => handleUserSalInfoSubmit() } disabled={!selectedUserid} >作成</button>
            </div>
        </div>
    );
}

export default AdminSalaryPage;