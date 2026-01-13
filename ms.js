/* ==========================================
   1. 背景畫布 (Canvas) - 確保全頁面常駐且不報錯
   ========================================== */
const canvas = document.getElementById('mathBackground');
const ctx = canvas.getContext('2d');
const symbols = ['+', '−', '×', '÷', '≈', '=', 'π', '√', 'Σ', '∞', 'Δ', 'log', '123', '456', 'x²'];
const particles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initCanvas();
}

class MathSymbol {
    constructor() { this.init(); }
    init() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.text = symbols[Math.floor(Math.random() * symbols.length)];
        this.size = Math.random() * 20 + 15;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY; this.rotation += this.rotSpeed;
        if (this.x > window.innerWidth + 50) this.x = -50;
        if (this.x < -50) this.x = window.innerWidth + 50;
        if (this.y > window.innerHeight + 50) this.y = -50;
        if (this.y < -50) this.y = window.innerHeight + 50;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.font = `bold ${this.size}px Arial`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

function initCanvas() {
    particles.length = 0;
    for (let i = 0; i < 60; i++) particles.push(new MathSymbol());
}

function animateBackground() {
    if (!canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateBackground);
}

// 初始化背景
if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateBackground();
}

/* ==========================================
   2. 遊戲數值與通用特效
   ========================================== */
let pHp = 7, pMax = 7, eHp = 9, eMax = 9;
let currentCorrectAns = 0, currentExp = "", currentBattleType = 'mixed';
const bossIcons = ['👹', '🐉', '👾', '👿', '🤖'];

function createConfetti(x, y) {
    const colors = ['#f1c40f', '#a29bfe', '#00b894', '#ff7675', '#ffffff'];
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:8px;height:8px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:50%;z-index:1000;pointer-events:none;`;
        document.body.appendChild(div);
        const angle = Math.random() * Math.PI * 2, v = Math.random() * 8 + 4;
        const vx = Math.cos(angle) * v, vy = Math.sin(angle) * v;
        let op = 1;
        const move = () => {
            div.style.left = (parseFloat(div.style.left) + vx) + 'px';
            div.style.top = (parseFloat(div.style.top) + vy) + 'px';
            op -= 0.02; div.style.opacity = op;
            if (op > 0) requestAnimationFrame(move); else div.remove();
        };
        requestAnimationFrame(move);
    }
}

function createPopText(txt, color, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const div = document.createElement('div');
    div.className = 'damage-txt';
    div.innerText = txt;
    div.style.cssText = `position:absolute;color:${color};font-weight:900;z-index:100;pointer-events:none;`;
    target.appendChild(div);
    setTimeout(() => div.remove(), 800);
}

/* ==========================================
   3. 戰鬥核心 (自動判斷頁面元素)
   ========================================== */
function startPractice(mode) {
    currentBattleType = mode; eHp = 3; eMax = 3;
    if (document.getElementById('modeSelect')) document.getElementById('modeSelect').style.display = 'none';
    if (document.getElementById('battleZone')) document.getElementById('battleZone').style.display = 'block';
    nextRound();
}

function nextRound() {
    const qContent = document.getElementById('qContent');
    if (!qContent) return;

    const n = Math.floor(Math.random() * 90000) + 10000;
    const modes = ['ceil', 'floor', 'round'];
    const m = (currentBattleType === 'mixed') ? modes[Math.floor(Math.random() * 3)] : currentBattleType;
    const targets = [{n:'十位',v:10}, {n:'百位',v:100}, {n:'千位',v:1000}, {n:'萬位',v:10000}];
    const t = targets[Math.floor(Math.random() * 4)];

    const titleEl = document.getElementById('modeTitle');
    if (titleEl) {
        const names = {ceil:'【無條件進位攻擊】', floor:'【無條件捨去攻擊】', round:'【四捨五入攻擊】'};
        titleEl.innerText = names[m];
        titleEl.classList.remove('mode-pop');
        void titleEl.offsetWidth; titleEl.classList.add('mode-pop');
    }

    qContent.innerHTML = `將 <span class="highlight" style="font-size:2.4rem">${n.toLocaleString()}</span> 取到 <span class="highlight" style="color:var(--accent)">${t.n}</span>`;

    if(m === 'ceil') {
        currentCorrectAns = (n % t.v === 0) ? n : (Math.floor(n/t.v)*t.v + t.v);
        currentExp = `解析：取到${t.n}，後面不為0須進位。答案：${currentCorrectAns.toLocaleString()}`;
    } else if(m === 'floor') {
        currentCorrectAns = Math.floor(n/t.v)*t.v;
        currentExp = `解析：取到${t.n}，後面通通變0。答案：${currentCorrectAns.toLocaleString()}`;
    } else {
        currentCorrectAns = Math.round(n / t.v) * t.v;
        const next = Math.floor((n % t.v) / (t.v / 10));
        currentExp = `解析：取到${t.n}看下一位(${next})，${next>=5?'滿5進位':'捨去'}。答案：${currentCorrectAns.toLocaleString()}`;
    }

    const grid = document.getElementById('optionsGroup');
    if (grid) {
        let opts = new Set([currentCorrectAns]);
        while(opts.size < 4) {
            let fake = currentCorrectAns + (Math.floor(Math.random() * 5) - 2) * t.v;
            if(fake > 0 && fake !== currentCorrectAns) opts.add(fake);
        }
        grid.innerHTML = "";
        [...opts].sort(() => Math.random() - 0.5).forEach(val => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn'; btn.innerText = val.toLocaleString();
            btn.onclick = () => handleChoice(val); grid.appendChild(btn);
        });
    }
}

function handleChoice(val) {
    const boss = document.getElementById('boss');
    if (val === currentCorrectAns) {
        eHp--;
        document.body.classList.add('flash-white');
        setTimeout(() => document.body.classList.remove('flash-white'), 200);
        if(boss) {
            const slash = document.createElement('div'); slash.className = 'slash';
            document.getElementById('bossZone').appendChild(slash);
            setTimeout(() => slash.remove(), 300);
            boss.style.transform = "translateX(100px) scale(0.5)";
            setTimeout(() => boss.style.transform = "", 200);
        }
        createPopText("💥 CRITICAL!!", "#ffeb3b", "bossZone");
        createConfetti(window.innerWidth/2, window.innerHeight/3);
    } else {
        pHp--;
        document.body.classList.add('flash-red');
        setTimeout(() => document.body.classList.remove('flash-red'), 200);
        if(document.querySelector('.action-card')) {
            document.querySelector('.action-card').classList.add('shake-it');
            setTimeout(() => document.querySelector('.action-card').classList.remove('shake-it'), 400);
        }
        createPopText("💔 OUCH!!", "#ff7675", "playerHpFill");
        setTimeout(() => {
            if(document.getElementById('errorExp')) document.getElementById('errorExp').innerText = currentExp;
            if(document.getElementById('errorOverlay')) document.getElementById('errorOverlay').style.display = 'flex';
        }, 400);
    }
    updateUI();
}

function updateUI() {
    if(!document.getElementById('enemyHpFill')) return;
    document.getElementById('enemyHpFill').style.width = (eHp/eMax*100) + "%";
    document.getElementById('playerHpFill').style.width = (pHp/pMax*100) + "%";
    document.getElementById('eHpTxt').innerText = `${eHp} / ${eMax}`;
    document.getElementById('pHpTxt').innerText = `${pHp} / ${pMax}`;

    if (eHp <= 0) { alert("🎉 獲勝！"); window.location.href = 'ms.html'; }
    else if (pHp <= 0) { alert("💀 戰敗..."); window.location.href = 'ms.html'; }
    else if (document.getElementById('errorOverlay')?.style.display !== 'flex') nextRound();
}

function closeError() {
    if(document.getElementById('errorOverlay')) document.getElementById('errorOverlay').style.display = 'none';
    nextRound();
}

// 頁面初始化
window.addEventListener('DOMContentLoaded', () => {
    const b = document.getElementById('boss');
    if (b) b.innerText = bossIcons[Math.floor(Math.random()*bossIcons.length)];
    // 如果是綜合練習頁
    if (document.getElementById('optionsGroup') && !document.getElementById('modeSelect')) {
        currentBattleType = 'mixed'; nextRound();
    }
});
