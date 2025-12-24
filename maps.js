// maps.js - 2025 修正版：加入出生點座標與視覺參數
const mapData = {
  flat: {
    platforms: [{ x: 0, y: 420, w: 900, h: 15, color: '#3B82F6', glow: 20 }],
    spawn: { p1: { x: 100, y: 360 }, p2: { x: 750, y: 360 } }
  },
  platform: {
    platforms: [
      { x: 0, y: 420, w: 900, h: 15, color: '#3B82F6', glow: 20 },
      { x: 200, y: 320, w: 120, h: 12, color: '#8B5CF6', glow: 25 },
      { x: 450, y: 270, w: 100, h: 12, color: '#8B5CF6', glow: 25 },
      { x: 650, y: 360, w: 100, h: 12, color: '#8B5CF6', glow: 25 },
      { x: 350, y: 180, w: 100, h: 12, color: '#06B6D4', glow: 30 }
    ],
    spawn: { p1: { x: 50, y: 360 }, p2: { x: 800, y: 360 } }
  },
  canyon: {
    platforms: [
      { x: 0, y: 420, w: 250, h: 15, color: '#EF4444', glow: 25 },
      { x: 650, y: 420, w: 250, h: 15, color: '#EF4444', glow: 25 }
    ],
    spawn: { p1: { x: 50, y: 360 }, p2: { x: 800, y: 360 } }
  },
  moving: {
    platforms: [
      { x: 0,   y: 420, w: 900, h: 15, color: '#10B981', glow: 20 },
      { x: 150, y: 350, w: 120, h: 12, dx: 2, dy: 0, range: 160, color: '#F59E0B', glow: 20 },
      { x: 500, y: 270, w: 150, h: 12, dx: -2, dy: 0, range: 200, color: '#F59E0B', glow: 20 },
      { x: 300, y: 150, w: 100, h: 12, dx: 0, dy: 1, range: 60, color: '#F59E0B', glow: 20 }
    ],
    spawn: { p1: { x: 50, y: 360 }, p2: { x: 800, y: 360 } }
  },
  shattered: {
    platforms: [
      { x: 100, y: 350, w: 80, h: 12, color: '#FF00FF', glow: 30 },
      { x: 300, y: 250, w: 80, h: 12, color: '#FF00FF', glow: 30 },
      { x: 520, y: 250, w: 80, h: 12, color: '#FF00FF', glow: 30 },
      { x: 720, y: 350, w: 80, h: 12, color: '#FF00FF', glow: 30 },
      { x: 410, y: 400, w: 80, h: 12, color: '#FFFFFF', glow: 40 }
    ],
    spawn: { p1: { x: 110, y: 280 }, p2: { x: 730, y: 280 } } // 修正：出生在小平台上
  },
  core: {
    platforms: [
      { x: 0, y: 420, w: 200, h: 15, color: '#FFA500', glow: 20 },
      { x: 700, y: 420, w: 200, h: 15, color: '#FFA500', glow: 20 },
      { x: 350, y: 350, w: 200, h: 15, dx: 0, dy: -2, range: 180, color: '#00FF00', glow: 25 }
    ],
    spawn: { p1: { x: 50, y: 360 }, p2: { x: 800, y: 360 } }
  }
};

const mapNames = {
  flat: '電訊平原 (Cyber Plains)',
  platform: '虛空浮島 (Void Island)',
  canyon: '熔岩峽谷 (Magma Canyon)',
  moving: '脈衝工廠 (Pulse Factory)',
  shattered: '破碎虛空 (Shattered Void)',
  core: '重力核心 (Gravity Core)'
};
