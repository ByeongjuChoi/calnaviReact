import React, { useRef, useState } from 'react';
import './AdminRulltetPage.css';

const initialSegments = ['김정현', '최병주', '김유신', '양재연', '조성일', '김태인', '성준혁'];

const AdminRulltetPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [segments, setSegments] = useState<string[]>(initialSegments);

  // 배열을 무작위로 섞는 함수
  const shuffleSegments = (arr: string[]): string[] => {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // 룰렛 돌리기
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    // segments를 매번 섞음
    const shuffledSegments = shuffleSegments(initialSegments);
    setSegments(shuffledSegments);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spins = 5; // 몇 바퀴 돌릴지
    const randomStopAngle = Math.random() * 2 * Math.PI;
    const totalAngle = spins * 2 * Math.PI + randomStopAngle;
    const duration = 5000; // 애니메이션 시간(ms)
    const startTime = performance.now();

    const drawFrame = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const angle = totalAngle * easeOutCubic(progress);

        drawWheel(ctx, angle, shuffledSegments);

        if (progress < 1) {
            requestAnimationFrame(drawFrame);
        } else {
            const totalSegments = shuffledSegments.length;
            const segmentAngle = 360 / totalSegments;
            const degrees = (angle * 180) / Math.PI;
            const normalizedDegrees = (degrees + 90) % 360; 
            const selectedIndex = Math.floor(normalizedDegrees / segmentAngle) % totalSegments;
            setResult(shuffledSegments[selectedIndex]);
            setSpinning(false);
        }
    };

    requestAnimationFrame(drawFrame);
  };

  // 룰렛 그리기
  const drawWheel = (
    ctx: CanvasRenderingContext2D,
    rotation: number,
    segments: string[]
  ) => {
    const centerX = 300;
    const centerY = 300;
    const radius = 250;

    ctx.clearRect(0, 0, 600, 600);

    const anglePerSegment = (2 * Math.PI) / segments.length;
    const colors = ['#FFCC00', '#FF6600', '#FF3366', '#66CC66', '#3399FF', '#9966CC', '#FF99CC', '#FF6666'];

    segments.forEach((segment, i) => {
      const startAngle = rotation + i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      // 텍스트
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(segment, radius - 20, 10);
      ctx.restore();
    });

    // 화살표
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 20);
    ctx.lineTo(centerX - 20, centerY - radius - 50);
    ctx.lineTo(centerX + 20, centerY - radius - 50);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
  };

  // easeOutCubic 함수
  const easeOutCubic = (t: number) => --t * t * t + 1;

  return (
    <div className="roulette-container">
      <h2>랜덤 룰렛</h2>
      <canvas ref={canvasRef} width={600} height={600}></canvas>
      <button onClick={spinWheel} disabled={spinning}>
        Spin!
      </button>
    </div>
  );
};

export default AdminRulltetPage;