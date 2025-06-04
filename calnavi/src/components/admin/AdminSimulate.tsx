import api from "../../api";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminSimulate.css';

const AdminSimulate: React.FC = () => { 

    const items = [
        { name: '⭐⭐⭐⭐⭐차스카', chance: 0.12, image: '/images/chasuka.jpg' },
        { name: '⭐⭐⭐⭐⭐감우', chance: 0.05, image: '/images/gannu.jpg' },
        { name: '⭐⭐⭐⭐⭐라이덴 쇼군', chance: 0.14, image: '/images/raiden.jpg' },
        { name: '⭐⭐⭐⭐⭐스커크', chance: 0.30, image: '/images/skuk.jpg' },
        { name: '⭐⭐⭐⭐⭐비뢰의고동', chance: 0.05, image: '/images/wepon1.png' },
        { name: '⭐⭐⭐⭐⭐카미사토 아야카', chance: 0.05, image: '/images/ayaka.jpg' },
        { name: '⭐⭐⭐⭐⭐클레', chance: 0.02, image: '/images/clre.jpg' },
        { name: '⭐⭐⭐⭐⭐호두', chance: 0.05, image: '/images/hodo.jpg' },
        { name: '⭐⭐⭐⭐⭐모나', chance: 0.05, image: '/images/mona.jpg' },
        { name: '⭐⭐⭐⭐⭐소', chance: 0.01, image: '/images/so.jpg' },
        { name: '⭐⭐⭐⭐⭐다이루크', chance: 0.01, image: '/images/dairuku.jpg' },
        { name: '⭐⭐⭐⭐⭐알베도', chance: 0.05, image: '/images/albedo.jpg' },
        { name: '⭐⭐⭐⭐⭐각청', chance: 0.05, image: '/images/gakchung.jpg' },
        { name: '⭐⭐⭐⭐⭐클로린드', chance: 0.05, image: '/images/klorind.png' },
        { name: '⭐⭐⭐⭐세토스', chance: 0.01, image: '/images/setos.jpg' },
        { name: '⭐⭐⭐꾸짖을 칼!', chance: 0.01, image: '/images/calnavi.png' },
    ];

    const [isRolling, setIsRolling] = useState(false);
    const [results, setResults] = useState<{ name: string; image: string }[]>([]);
    const [rollCount, setRollCount] = useState(1);

    const rollGacha = (count: number) => {
        setIsRolling(true);
        setResults([]);     // 결과 초기화
        setRollCount(count); // 뽑을 개수 상태로 저장
    };

    const handleVideoEnded = () => {
        const rollResults: { name: string; image: string }[] = [];
            for (let i = 0; i < rollCount; i++) {
                const roll = Math.random();
                let cumulative = 0.0;
                let selectedItem = null;
                for (let item of items) {
                    cumulative += item.chance;
                    if (roll < cumulative) {
                        selectedItem = item;
                        break;
                    }
                }
                if (!selectedItem) selectedItem = items[items.length - 1];
                rollResults.push(selectedItem);
        }

        setResults(rollResults);
        setIsRolling(false);
    };

    return (
        <div className="gacha-container">
            <h1 className="gacha-title">원신 캐릭터 뽑기</h1>
            <div className="gacha-buttons">
                <button
                    className={`gacha-button ${isRolling ? 'disabled' : ''}`}
                    onClick={() => rollGacha(1)}
                    disabled={isRolling}
                >
                    {isRolling ? '뽑는 중...' : '기원 1회'}
                </button>
                <button
                    className={`gacha-button ${isRolling ? 'disabled' : ''}`}
                    onClick={() => rollGacha(10)}
                    disabled={isRolling}
                >
                    {isRolling ? '뽑는 중...' : '기원 10회'}
                </button>
            </div>
            
            {/* 컷씬 */}
            {isRolling && (
                <div className="gacha-cutscene">
                    <video
                    key={isRolling ? 'rolling' : 'stopped'}
                    src="/videos/genshin2.mp4"
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={(e) => {
                        if (e.currentTarget.currentTime >= 6) {
                        e.currentTarget.pause();
                        handleVideoEnded();
                        }
                    }}
                    />
                </div>
            )}

            {/* 결과 */}
            {results.length > 0 && !isRolling && (
                <div className="gacha-results">
                    <p>✨ 뽑기 결과 ✨</p>
                    {results.length === 1 ? (
                        <div className="gacha-result-single">
                            <img src={results[0].image} alt={results[0].name} className="gacha-result-image-large" />
                            <p>{results[0].name}</p>
                        </div>
                    ) : (
                    <>
                        {/* 위쪽 5개 */}
                        <div className="gacha-result-grid">
                            {results.slice(0, 5).map((item, index) => (
                                <div key={index} className="gacha-result-item">
                                    <img src={item.image} alt={item.name} className="gacha-result-image" />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* 아래쪽 5개 (만약 5개 이상일 때만) */}
                        {results.length > 5 && (
                            <div className="gacha-result-grid">
                                {results.slice(5, 10).map((item, index) => (
                                    <div key={index + 5} className="gacha-result-item">
                                        <img src={item.image} alt={item.name} className="gacha-result-image" />
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                </div>
            )}
        </div>
    );
}

export default AdminSimulate;