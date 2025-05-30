import "./SalaryPage.css";
import api from "../api";
import { useEffect, useState } from "react";

type UserSAL = {
    default_sal: number;
    holyday_sal: number;
    night_sal: number;
    career_sal: number;
    skill_sal: number;
    special_sal: number;
    commute_sal: number;
    housing_sal: number;
    other_taxation_sal: number;
    telework_sal: number;
    other_nontaxable: number;
    expense_adjustment_sal: number;
    lateness_deduction: number;
    absenteeism_deduction: number;
    other_deduction: number;
    resident_tax: number;
    social_housing_fee_excluded: number;
    employment_insurance_premium: number;
    health_insurance_premium: number;
    welfare_pension_premium: number;
    care_insurance_premium: number;
    withholding_tax: number;
    year_end_adjustment: number;
};

const SalaryPage: React.FC = () => {

    const [salary, setSalary] = useState<UserSAL | null>(null);

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);

    useEffect(() => {
        api
            .get(`/api/admin/usersal/selectsal?userid=${sessionStorage.getItem('userid')}&year_month=${String(year) + "-" + String(month).padStart(2, '0')}`)
            .then((res) => {
                console.log("res.data: ", res.data);
                setSalary(res.data);
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }, [year, month]);

    const formatAmount = (value: number, isDeduction = false): string => {
        if (value == null) return "¥0";
        const prefix = isDeduction && value !== 0 ? "-" : "";
        return `${prefix}¥${value.toLocaleString()}`;
    };

    const totalPay = (salary ? (
            salary.default_sal +
            salary.holyday_sal +
            salary.night_sal +
            salary.career_sal +
            salary.skill_sal +
            salary.special_sal +
            salary.commute_sal +
            salary.housing_sal +
            salary.other_taxation_sal +
            salary.telework_sal +
            salary.other_nontaxable +
            salary.expense_adjustment_sal
            ) : 0);

    const totalDeduct = (salary ? (
            salary.lateness_deduction +
            salary.absenteeism_deduction +
            salary.other_deduction +
            salary.resident_tax +
            salary.social_housing_fee_excluded +
            salary.employment_insurance_premium +
            salary.health_insurance_premium +
            salary.welfare_pension_premium +
            salary.care_insurance_premium +
            salary.withholding_tax
            ) : 0);

    const netPay = totalPay - totalDeduct;

    return (
        <div className="salary-container">
        <h1 className="salary-title">給与明細管理</h1>

        <div className="select-row">
            <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="year-select">
            {[...Array(5)].map((_, idx) => {
                const y = today.getFullYear() - 4 + idx;
                return <option key={y} value={y}>{y}年</option>;
            })}
            </select>

            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="month-select">
            {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}月</option>
            ))}
            </select>
        </div>

        <section className="salary-section">
            <h2>合計</h2>
            <div className="salary-amount">
                <strong>支給額:</strong> {formatAmount(netPay)}
            </div>
        </section>

        <section className="salary-section">
            <h2>明細</h2>
            <table className="salary-table">
            <tbody>
                <tr><td>基本給</td><td>{formatAmount(salary?.default_sal ?? 0)}</td></tr>
                <tr><td>法定休日手当</td><td>{formatAmount(salary?.holyday_sal ?? 0)}</td></tr>
                <tr><td>深夜手当</td><td>{formatAmount(salary?.night_sal ?? 0)}</td></tr>
                <tr><td>職能手当</td><td>{formatAmount(salary?.career_sal ?? 0)}</td></tr>
                <tr><td>技術手当</td><td>{formatAmount(salary?.skill_sal ?? 0)}</td></tr>
                <tr><td>特別手当</td><td>{formatAmount(salary?.special_sal ?? 0)}</td></tr>
                <tr><td>通勤手当</td><td>{formatAmount(salary?.commute_sal ?? 0)}</td></tr>
                <tr><td>住宅手当</td><td>{formatAmount(salary?.housing_sal ?? 0)}</td></tr>
                <tr><td>その他課税</td><td>{formatAmount(salary?.other_taxation_sal ?? 0)}</td></tr>
                <tr><td>テレワーク手当</td><td>{formatAmount(salary?.telework_sal ?? 0)}</td></tr>
                <tr><td>その他非課税</td><td>{formatAmount(salary?.other_nontaxable ?? 0)}</td></tr>
                <tr><td>経費精算</td><td>{formatAmount(salary?.expense_adjustment_sal ?? 0)}</td></tr>

                <tr><td>遅刻控除</td><td>{formatAmount(salary?.lateness_deduction ?? 0, true)}</td></tr>
                <tr><td>欠勤控除</td><td>{formatAmount(salary?.absenteeism_deduction ?? 0, true)}</td></tr>
                <tr><td>その他控除</td><td>{formatAmount(salary?.other_deduction ?? 0, true)}</td></tr>
                <tr><td>住民税</td><td>{formatAmount(salary?.resident_tax ?? 0, true)}</td></tr>
                <tr><td>社宅費控除</td><td>{formatAmount(salary?.social_housing_fee_excluded ?? 0, true)}</td></tr>
                <tr><td>雇用保険料</td><td>{formatAmount(salary?.employment_insurance_premium ?? 0, true)}</td></tr>
                <tr><td>健康保険料</td><td>{formatAmount(salary?.health_insurance_premium ?? 0, true)}</td></tr>
                <tr><td>厚生年金保険料</td><td>{formatAmount(salary?.welfare_pension_premium ?? 0, true)}</td></tr>
                <tr><td>介護保険料</td><td>{formatAmount(salary?.care_insurance_premium ?? 0, true)}</td></tr>
                <tr><td>源泉徴収</td><td>{formatAmount(salary?.withholding_tax ?? 0, true)}</td></tr>
                <tr><td>年末調整額</td><td>{formatAmount(salary?.year_end_adjustment ?? 0)}</td></tr>
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
        </div>
    );
}

export default SalaryPage;