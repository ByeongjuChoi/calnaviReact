import "./SalaryPage.css";

const SalaryPage: React.FC = () => {
    return (
        <div className="salary-container">
        <h1 className="salary-title">給与明細管理</h1>

        <section className="salary-section">
            <h2>合計</h2>
            <div className="salary-amount">
            <strong>支給額:</strong> ¥200,000
            </div>
        </section>

        <section className="salary-section">
            <h2>明細</h2>
            <table className="salary-table">
            <tbody>
                <tr><td>基本給</td><td>¥150,000</td></tr>
                <tr><td>支給対象時間外手当</td><td>¥0</td></tr>
                <tr><td>60時間超時間外手当</td><td>¥0</td></tr>
                <tr><td>法定休日手当</td><td>¥0</td></tr>
                <tr><td>深夜手当</td><td>¥0</td></tr>
                <tr><td>職能手当</td><td>¥20,000</td></tr>
                <tr><td>技術手当</td><td>¥0</td></tr>
                <tr><td>業務手当</td><td>¥0</td></tr>
                <tr><td>特別手当</td><td>¥0</td></tr>
                <tr><td>通勤手当</td><td>¥10,000</td></tr>
                <tr><td>住宅手当</td><td>¥4,000</td></tr>
                <tr><td>その他課税</td><td>¥10,000</td></tr>
                <tr><td>テレワーク手当</td><td>¥0</td></tr>
                <tr><td>その他非課税</td><td>¥0</td></tr>
                <tr><td>経費精算</td><td>¥40,000</td></tr>
                <tr><td>遅刻控除</td><td>-¥0</td></tr>
                <tr><td>欠勤控除</td><td>-¥0</td></tr>
                <tr><td>その他控除</td><td>-¥10,000</td></tr>
                <tr><td>住民税</td><td>-¥0</td></tr>
                <tr><td>社宅費控除</td><td>-¥10,000</td></tr>
                <tr><td>雇用保険料</td><td>-¥1,000</td></tr>
                <tr><td>健康保険料</td><td>-¥10,000</td></tr>
                <tr><td>厚生年金保険料</td><td>-¥25,000</td></tr>
                <tr><td>介護保険料</td><td>-¥0</td></tr>
                <tr><td>源泉徴収</td><td>-¥4,000</td></tr>
                <tr><td>年末調整額</td><td>¥0</td></tr>
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