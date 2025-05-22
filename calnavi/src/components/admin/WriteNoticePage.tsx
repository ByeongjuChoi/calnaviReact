import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './WriteNoticePage.css';
import { useLocation } from 'react-router-dom';

const WriteNoticePage: React.FC = () => {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [noticeId, setNoticeId] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

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
                    id: noticeId,
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

    useEffect(() => {
        if(id !== null) {
            const token = sessionStorage.getItem('token');
            axios
                .get(`http://localhost:8080/api/main/Allnotices?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    const data = res.data[0];
                    // title과 content가 문자열인지 확인
                    if (data && typeof data.title === 'string' && typeof data.content === 'string') {
                        setTitle(data.title);
                        setContents(data.content);
                        setNoticeId(data.id);
                    }
                })
                .catch((err) => {
                    console.log("err: ", err);
                });
        }
    }, [id]);

    return (
        <div className="write-container">
            <h1>공지사항 작성</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title || ''}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contents">Contents</label>
                    <textarea
                        id="contents"
                        value={contents || ''}
                        onChange={(e) => setContents(e.target.value)}
                        rows={30}
                        cols={50}
                        required
                    />
                </div>
                <div>
                    <div className="button-group">
                        <button type="submit">작성 완료</button>
                        <button type="button" onClick={() => history.push("/AdminNoticesPage")}>前のぺーじへ</button>
                    </div>
                </div>
            </form>
        </div>
        
    );
};
export default WriteNoticePage;