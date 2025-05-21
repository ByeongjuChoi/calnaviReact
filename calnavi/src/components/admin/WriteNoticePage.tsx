import axios from "axios";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './WriteNoticePage.css';

const WriteNoticePage: React.FC = () => {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const role = sessionStorage.getItem('role');
            const userid = sessionStorage.getItem('userid');

            console.log("title: ", title);
            console.log("contents: ", contents);
            console.log("userid: ", userid);

            await axios.post('http://localhost:8080/api/admin/notices/save',
                {
                    title,
                    contents,
                    userid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Role: role,
                    },
                }
            );
            history.push('AdminNoticesPage');
        } catch(err) {
            setError('공지사항에 등록에 실패하였습니다.');
            console.log("err: ", err);
        }
    }

    return (
        <div className="write-container">
            <h1>공지사항 작성</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contents">contents</label>
                    <textarea
                        id="contents"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        rows={30}
                        cols={50}
                        required
                    />
                </div>
                <div>
                    <button type="submit">작성 완료</button>
                </div>
            </form>
        </div>
        
    );
};
export default WriteNoticePage;