import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminSimulate.css';

const AdminSimulate: React.FC = () => { 

    const items = [
        { name: '⭐⭐⭐⭐⭐차스카', chance: 0.02, image: '/images/chasuka.jpg' },
        { name: '⭐⭐⭐⭐⭐감우', chance: 0.02, image: '/images/gannu.jpg' },
        { name: '⭐⭐⭐⭐⭐라이덴 쇼군', chance: 0.02, image: '/images/raiden.jpg' },
        { name: '⭐⭐⭐⭐⭐스커크', chance: 0.02, image: '/images/skuk.jpg' },
        { name: '⭐⭐⭐⭐⭐비뢰의고동', chance: 0.02, image: '/images/wepon1.png' },
        { name: '⭐⭐⭐⭐⭐카미사토 아야카', chance: 0.02, image: '/images/ayaka.jpg' },
        { name: '⭐⭐⭐⭐⭐클레', chance: 0.02, image: '/images/klee.jpg' },
        { name: '⭐⭐⭐⭐⭐호두', chance: 0.02, image: '/images/hodu.png' },
        { name: '⭐⭐⭐⭐⭐모나', chance: 0.02, image: '/images/mona.jpg' },
        { name: '⭐⭐⭐⭐⭐소', chance: 0.02, image: '/images/so.jpg' },
        { name: '⭐⭐⭐⭐⭐다이루크', chance: 0.02, image: '/images/dairuku.jpg' },
        { name: '⭐⭐⭐⭐⭐알베도', chance: 0.02, image: '/images/albedo.jpg' },
        { name: '⭐⭐⭐⭐⭐각청', chance: 0.02, image: '/images/gakchung.jpg' },
        { name: '⭐⭐⭐⭐⭐클로린드', chance: 0.02, image: '/images/klorind.png' },
        { name: '⭐⭐⭐⭐⭐아를레키노', chance: 0.02, image: '/images/arurekino.jpg' },
        { name: '⭐⭐⭐⭐⭐카미사토 아야토', chance: 0.02, image: '/images/ayato.jpg' },
        { name: '⭐⭐⭐⭐⭐방랑자', chance: 0.02, image: '/images/banrangja.jpg' },
        { name: '⭐⭐⭐⭐⭐데히야', chance: 0.02, image: '/images/dehiya.jpg' },
        { name: '⭐⭐⭐⭐⭐다이루크', chance: 0.02, image: '/images/diruku.webp' },
        { name: '⭐⭐⭐⭐⭐푸리나', chance: 0.02, image: '/images/furina.jpg' },
        { name: '⭐⭐⭐⭐⭐한운', chance: 0.02, image: '/images/hanun.jpg' },
        { name: '⭐⭐⭐⭐⭐진', chance: 0.02, image: '/images/jin.jpg' },
        { name: '⭐⭐⭐⭐⭐카에데하라 카즈하', chance: 0.02, image: '/images/kazuha.jpg' },
        { name: '⭐⭐⭐⭐⭐산고노미야 코코미', chance: 0.02, image: '/images/kokomi.jpg' },
        { name: '⭐⭐⭐⭐⭐말라니', chance: 0.02, image: '/images/malani.jpg' },
        { name: '⭐⭐⭐⭐⭐마비카', chance: 0.02, image: '/images/mavika.jpg' },
        { name: '⭐⭐⭐⭐⭐닐루', chance: 0.02, image: '/images/nilou.jpg' },
        { name: '⭐⭐⭐⭐⭐느비예트', chance: 0.02, image: '/images/nuvi.jpg' },
        { name: '⭐⭐⭐⭐⭐리니', chance: 0.02, image: '/images/riny.jpg' },
        { name: '⭐⭐⭐⭐⭐시그윈', chance: 0.02, image: '/images/sigwin.jpg' },
        { name: '⭐⭐⭐⭐⭐슈브르즈', chance: 0.02, image: '/images/syuburuzu.jpg' },
        { name: '⭐⭐⭐⭐⭐타르탈리야', chance: 0.02, image: '/images/tarutalria.png' },
        { name: '⭐⭐⭐⭐⭐벤티', chance: 0.02, image: '/images/venti.jpg' },
        { name: '⭐⭐⭐⭐⭐야란', chance: 0.02, image: '/images/yaran.jpg' },
        { name: '⭐⭐⭐⭐⭐요이미야', chance: 0.02, image: '/images/yoimiya.png' },
        { name: '⭐⭐⭐⭐⭐연비', chance: 0.02, image: '/images/yonbee.png' },

        { name: '⭐⭐⭐⭐토마', chance: 0.02, image: '/images/thoma.jpg' },
        { name: '⭐⭐⭐⭐바바라', chance: 0.02, image: '/images/babara.jpg' },
        { name: '⭐⭐⭐⭐베넷', chance: 0.02, image: '/images/benet.png' },
        { name: '⭐⭐⭐⭐켄디스', chance: 0.02, image: '/images/candies.jpg' },
        { name: '⭐⭐⭐⭐달리야', chance: 0.02, image: '/images/dalia.jpg' },
        { name: '⭐⭐⭐⭐사유', chance: 0.002, image: '/images/sayu.jpg' },
        { name: '⭐⭐⭐⭐설탕', chance: 0.02, image: '/images/seoltang.jpg' },
        { name: '⭐⭐⭐⭐신염', chance: 0.02, image: '/images/shinyom.jpg' },
        { name: '⭐⭐⭐⭐리넷', chance: 0.002, image: '/images/rinet.jpg' },
        { name: '⭐⭐⭐⭐시카노인 헤이조', chance: 0.02, image: '/images/heizo.jpg' },
        { name: '⭐⭐⭐⭐행추', chance: 0.02, image: '/images/hengchu.jpg' },
        { name: '⭐⭐⭐⭐향릉', chance: 0.02, image: '/images/hyangrung.jpg' },
        { name: '⭐⭐⭐⭐가명', chance: 0.02, image: '/images/gamyong.jpg' },
        { name: '⭐⭐⭐⭐파루잔', chance: 0.002, image: '/images/faruzan.jpg' },
        { name: '⭐⭐⭐⭐세토스', chance: 0.02, image: '/images/setos.jpg' },


        { name: '⭐⭐⭐⭐⭐알하이탐', chance: 0.02, image: '/images/alhaitam.jpg' },
        { name: '⭐⭐⭐⭐⭐바레사', chance: 0.02, image: '/images/baresa.jpg' },
        { name: '⭐⭐⭐⭐⭐백출', chance: 0.02, image: '/images/beakchul.jpg' },
        { name: '⭐⭐⭐⭐북두', chance: 0.02, image: '/images/bukdu.jpg' },
        { name: '⭐⭐⭐⭐⭐치치', chance: 0.02, image: '/images/chichi.jpg' },
        { name: '⭐⭐⭐⭐콜레이', chance: 0.02, image: '/images/colley.jpg' },
        { name: '⭐⭐⭐⭐디오나', chance: 0.02, image: '/images/diona.jpg' },
        { name: '⭐⭐⭐⭐도리', chance: 0.02, image: '/images/dori.jpg' },
        { name: '⭐⭐⭐⭐⭐에밀리', chance: 0.02, image: '/images/emily.jpg' },
        { name: '⭐⭐⭐⭐피슬', chance: 0.02, image: '/images/fishul.jpg' },
        { name: '⭐⭐⭐⭐이파', chance: 0.02, image: '/images/ipa.jpg' },
        { name: '⭐⭐⭐⭐중운', chance: 0.02, image: '/images/jyungun.jpg' },
        { name: '⭐⭐⭐⭐카베', chance: 0.02, image: '/images/kabe.jpg' },
        { name: '⭐⭐⭐⭐케이아', chance: 0.02, image: '/images/keia.jpg' },
        { name: '⭐⭐⭐⭐⭐키니치', chance: 0.02, image: '/images/kinichi.jpg' },
        { name: '⭐⭐⭐⭐키라라', chance: 0.02, image: '/images/kirara.jpg' },
        { name: '⭐⭐⭐⭐⭐야에 미코', chance: 0.02, image: '/images/miko.jpg' },
        { name: '⭐⭐⭐⭐⭐유메미즈키 미즈키', chance: 0.02, image: '/images/mizuki.jpg' },
        { name: '⭐⭐⭐⭐⭐나히다', chance: 0.02, image: '/images/nahida.jpg' },
        { name: '⭐⭐⭐⭐남연', chance: 0.02, image: '/images/namyon.jpg' },
        { name: '⭐⭐⭐⭐올로룬', chance: 0.02, image: '/images/ollolun.jpg' },
        { name: '⭐⭐⭐⭐레이저', chance: 0.02, image: '/images/raiser.jpg' },
        { name: '⭐⭐⭐⭐리사', chance: 0.02, image: '/images/risa.jpg' },
        { name: '⭐⭐⭐⭐로자리아', chance: 0.02, image: '/images/rozaria.jpg' },
        { name: '⭐⭐⭐⭐⭐사이노', chance: 0.02, image: '/images/saino.jpg' },
        { name: '⭐⭐⭐⭐쿠조 사라', chance: 0.02, image: '/images/sara.jpg' },
        { name: '⭐⭐⭐⭐시노부', chance: 0.02, image: '/images/sinobu.jpg' },
        { name: '⭐⭐⭐⭐⭐타이나리', chance: 0.02, image: '/images/tainari.jpg' },
        { name: '⭐⭐⭐⭐얀사', chance: 0.02, image: '/images/yansa.jpg' },
        { name: '⭐⭐⭐⭐요요', chance: 0.02, image: '/images/yoyo.jpg' },
        

        { name: '⭐⭐⭐꾸짖을 칼!', chance: 0.01, image: '/images/calnavi.png' },
    ];

    const items2 = [
        { name: '⭐⭐⭐⭐⭐김정현', chance: 0.15, image: '/images/skuk.jpg' },
        { name: '⭐⭐⭐⭐⭐최병주', chance: 0.15, image: '/images/raiden.jpg' },
        { name: '⭐⭐⭐⭐⭐김유신', chance: 0.15, image: '/images/gannu.jpg' },
        { name: '⭐⭐⭐⭐⭐양재연', chance: 0.15, image: '/images/chasuka.jpg' },
        { name: '⭐⭐⭐⭐⭐조성일', chance: 0.15, image: '/images/wepon1.png' },
        { name: '⭐⭐⭐⭐⭐김태인', chance: 0.15, image: '/images/ayaka.jpg' },
        { name: '⭐⭐⭐⭐⭐성준혁', chance: 0.15, image: '/images/clre.jpg' },
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