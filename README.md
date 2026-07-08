<div align="center">
  <h1>🎒 别忘带了</h1>
  <p><strong>出门物品清单助手 — 按场景检查随身物品，一件不落</strong></p>
  <p>
    <img src="https://img.shields.io/badge/PWA-✅-brightgreen" alt="PWA" />
    <img src="https://img.shields.io/badge/离线可用-✅-brightgreen" alt="离线可用" />
    <img src="https://img.shields.io/badge/零依赖-纯前端-blue" alt="零依赖" />
    <img src="https://img.shields.io/badge/平台-Mac%20%7C%20iPhone%20%7C%20任何浏览器-orange" alt="平台" />
  </p>
</div>

---

## 🎯 痛点

> "钥匙带了没？" "充电器呢？" "糟了，身份证忘带了……"

你是不是每次出门前都这样？**别忘带了** 帮你解决。

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🎯 **场景清单** | 预设 8 种出门场景（看剧、撸铁、出差…），也可自由创建 |
| ✅ **打钩检查** | 出门前逐项打钩，全部勾完 = 成功出门 🎉 |
| 🎉 **鼓励弹窗** | 东西带齐后弹出祝福，开心出门 |
| 📷 **物品详情** | 给物品拍照、选图标、记录存放位置，再也不会找不到 |
| 🔍 **全局搜索** | 搜场景、搜物品，一秒定位 |
| 💡 **智能 Emoji 联想** | 输入"充电宝"自动选中 🔋，输"口红"自动选中 💄 |
| 📌 **场景置顶** | 常用场景置顶，快速找到 |
| 🔒 **纯本地数据** | 所有数据存在你的设备，不上传任何服务器 |
| 📱 **PWA 支持** | iPhone 添加到主屏幕，像原生 App 一样全屏运行，离线可用 |

---

## 🖥️ 快速使用

### 直接打开

下载项目，用浏览器打开 `index.html` 即可使用。

### 添加到主屏幕（推荐）

**iPhone：** Safari 打开 → 分享按钮 → 添加到主屏幕
**Mac：** Chrome 地址栏右侧安装按钮 → 安装"别忘带了"

之后像原生 App 一样使用，无需网络。

---

## 🛠️ 技术栈

```
📄 HTML5       — 语义化标签，单页应用
🎨 CSS3        — Flexbox 布局，CSS 变量，动画
⚡ Vanilla JS  — 零框架，极致性能
💾 LocalStorage — 数据持久化
📦 PWA         — manifest.json + Service Worker
```

**零依赖，零构建，一个 HTML 文件打开即用。**

---

## 📂 项目结构

```
别忘带了/
├── index.html          # 主入口
├── manifest.json       # PWA 配置
├── sw.js               # Service Worker（离线缓存）
├── css/style.css       # 全部样式
├── js/
│   ├── store.js        # 数据模型 + LocalStorage
│   ├── scenes.js       # 场景管理
│   ├── items.js        # 物品清单
│   ├── item-detail.js  # 物品详情
│   ├── checkout.js     # 成功出门流程
│   ├── search.js       # 搜索功能
│   └── emoji-suggest.js # 智能 Emoji 联想
├── assets/             # PWA 图标
└── docs/               # 项目文档
```

---

## 👨‍💻 开发

项目文档见 `docs/` 目录。

```bash
# 无需构建，直接打开
open index.html
```

---

## 📜 许可证

MIT

---

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，给个 Star 吧！</p>
</div>
<div align="center">
  <h1>🎒 别忘带了 <i>Biewanglele</i></h1>
  <p><b>Don't forget your stuff.</b> A zero‑dependency PWA packing‑checklist that lives in your browser and on your home screen.</p>
  <p>
    <img src="https://img.shields.io/badge/status-launched-success" alt="status"/>
    <img src="https://img.shields.io/badge/platform-PWA-%23F5D742" alt="PWA"/>
    <img src="https://img.shields.io/github/license/Giamiemieshu/biewanglele" alt="license"/>
    <img src="https://img.shields.io/badge/离线可用-✅-brightgreen" alt="offline"/>
    <img src="https://img.shields.io/badge/零依赖-纯前端-blue" alt="zero-dep"/>
    <br/>
    <a href="https://giamiemieshu.github.io/biewanglele/"><strong>🌐 Live Demo</strong></a>
    ·
    <a href="https://github.com/Giamiemieshu/biewanglele/issues"><strong>🐛 Report Bug</strong></a>
  </p>
</div>

---

## 📖 简介 · About

**中文** | 每次出门总担心忘带东西？别忘带了帮你按场景整理物品清单，出门前打个✓就出发。预设 8 种场景（撸铁、出差、散步…），也可以自己创建。数据全存在本地，无需注册，离线可用。

**English** | A packing checklist PWA that groups items by scene. Check them off, get a little celebration, and never forget a thing. 8 preset scenes, fully customizable. Zero servers, zero sign‑up, works offline.

---

## ✨ Features

| | Feature | |
|--|---------|--|
| 📋 | **Scene‑based checklists** — group items by activity | 🎯 |
| ✅ | **Check‑off flow** — tick every box → celebration → reset | 🎉 |
| 📷 | **Item details** — photo, icon, storage location | 🔍 |
| 💡 | **Smart emoji** — type "充电宝" → auto‑selects 🔋 | 🤖 |
| 📌 | **Pin scenes** + **usage stats** | 📊 |
| 🔎 | **Global search** — find scenes and items instantly | ⚡ |
| 📦 | **PWA** — add to home screen, works offline | 📱 |
| 🔒 | **Privacy first** — all data stays in your browser | 🛡️ |

---

## 🚀 Quick Start

```bash
# Live demo
open https://giamiemieshu.github.io/biewanglele/

# Or clone & open locally
git clone https://github.com/Giamiemieshu/biewanglele.git
cd biewanglele && open index.html
```

**iPhone** — Safari → Share → **Add to Home Screen**.

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| UI | HTML5 + CSS3 | Zero dependencies, no build |
| Logic | Vanilla JS | Lightweight, easy to hack |
| Storage | localStorage | Enough for scenes × items |
| Offline | Service Worker | Caches all static assets |
| Icons | Unicode Emoji | Universal, no loading |

**0 deps. 0 build. 1 file to open.**

---

## 📁 Structure

```
biewanglele/
├── index.html          # SPA entry
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── css/style.css       # All styles
├── js/                 # 7 modular files
│   ├── store.js        # Data model
│   ├── scenes.js       # Scene CRUD
│   ├── items.js        # Item checklist
│   ├── item-detail.js  # Photo, icon, location
│   ├── checkout.js     # Celebration flow
│   ├── search.js       # Global search
│   └── emoji-suggest.js # Smart emoji match
└── assets/             # PWA icons
```

---

## 🤝 Contributing

PRs welcome! This project is small and simple — great to learn from.

1. Fork it
2. Make your change
3. Open a PR

---

## 📜 License

MIT © [Giamiemieshu](https://github.com/Giamiemieshu)

---

<div align="center">
  <p>⭐ If this helped you, give it a star — it helps others find it too.</p>
  <img src="https://api.star-history.com/svg?repos=Giamiemieshu/biewanglele&type=Date" width="500" alt="Star History"/>
</div>
