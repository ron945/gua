// 首頁專用：純背景特效 js (絕對不報錯版)
const canvas = document.getElementById('mathBackground');
const ctx = canvas.getContext('2d');

// 數學符號與公式清單
const symbols = ['+', '−', '×', '÷', '≈', '=', 'π', '√', 'Σ', '∞', 'Δ', 'log', 'y=ax+b', 'x²', '123', '456'];
const particles = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            text: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 20 + 15,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            opacity: Math.random() * 0.4 + 0.2,
            rot: Math.random() * Math.PI * 2,
            rotS: (Math.random() - 0.5) * 0.02
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.rot += p.rotS;
        // 邊界穿透
        if (p.x > canvas.width) p.x = 0; if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0; if (p.y < 0) p.y = canvas.height;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.font = `bold ${p.size}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
    });
    requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init();
draw();
