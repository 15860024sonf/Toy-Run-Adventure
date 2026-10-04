# Toy Run Adventure

《跑跑玩具總動員 / Toy Run Adventure》是以原創玩具世界為背景的 HTML5 Canvas 跑酷遊戲，作為「金融科技個案與實務」課程展示作品。角色、背景與遊戲特效由 Canvas 和 CSS 程式繪製，不載入外部圖片或音樂。

## Project Overview

玩家扮演一位原創玩具角色，在午夜玩具屋、星空夢境或霓虹玩具工廠奔跑。跳過地面障礙、滑過空中障礙、收集玩具寶物並使用道具，盡量跑得更遠、取得更高分數。

## Features

- Canvas 程式繪製的原創角色、玩具房間、星空和霓虹工廠背景。
- 多層視差背景、塑膠高光、木紋玩具箱、漂浮積木、發光收藏物和碰撞粒子。
- 動態跑步、跳躍、滑行、受傷閃爍與擊退。
- 三種主題各自使用不同場景、障礙、速度、收藏頻率和音效音色。
- 隨距離提高速度與障礙密度；支援暫停、結算和重新開始。
- Web Audio API 即時合成原創音效；沒有音檔依賴。
- 匿名 Top 10 排行榜使用瀏覽器 `localStorage`，無需帳號或伺服器。
- 響應式桌面與手機介面；手機遊戲控制固定於畫面底部。

## Characters

| Character | Ability |
| --- | --- |
| 星際玩偶 | 跳躍高度 +20%；結算分數 +5% |
| 牛仔玩偶 | 結算分數 +10% |
| 恐龍玩偶 | 多 1 點起始體力；結算分數 +5% |
| 機器人玩偶 | 移動速度 +15%；結算分數 +8% |

每位角色以不同的程式繪圖配色、外型、配件與動作呈現。

## Themes

- **午夜玩具屋**：月光窗戶、玩具櫃、半開房門、薄霧與較密集的暗色障礙。
- **星空夢境**：星點、月亮、雲朵、漂浮積木、流星粒子與更多收藏物。
- **霓虹玩具工廠**：發光輸送帶、管線、機械手臂、霓虹積木、速度線與較快速度。

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Jump | Space 或 ↑ | 點擊遊戲畫面或 JUMP |
| Slide | ↓ | 下滑或 SLIDE |
| Pause / resume | P 或 Esc | 暫停按鈕 |

## Game Mechanics

- 初始 5 點體力；恐龍玩偶有 6 點。碰撞扣除 1 點並給予短暫無敵時間。
- 午夜主題有垂掛玩具，夢境有低雲，工廠有雷射線；這些空中障礙需要滑行避開。
- 收集道具會觸發磁鐵、護盾、衝刺或能量恢復效果。
- 難度距離分級：0–499 m EASY、500–999 m NORMAL、1000–1999 m HARD、2000 m 以上 EXTREME。

## Scoring

- 星星 +10、玩具金幣 +20、特殊玩具 +50、彩虹星 +100。
- 每跑 10 公尺 +10 分。
- 成功越過障礙可取得 50、100 或 150 分。
- 最終總分套用角色分數倍率。

## Power-ups

- 磁鐵：8 秒內吸取附近的星星和金幣。
- 護盾：10 秒內抵擋一次碰撞。
- 超級衝刺：5 秒內提高速度。
- 能量電池：恢復 1 點體力。

## Difficulty

跑得越遠，速度上升，障礙間隔逐漸縮短。午夜主題有更高障礙密度，夢境主題有更多收藏物，工廠主題速度最快。開始階段保留較長反應時間。

## Leaderboard

排行榜最多保存 10 筆，依最終分數由高到低排序，記錄匿名名稱、角色、主題、距離、分數與日期。「清除本機排行榜」會先要求確認。資料僅存在目前瀏覽器，不會跨裝置同步。

## Technology

- HTML5、CSS3、Vanilla JavaScript、Canvas 2D API、Web Audio API。
- 沒有第三方套件、遠端素材、後端或建置步驟。

## Project Structure

```text
.
├── index.html
├── style.css
├── style-extra.css
├── game.js
├── visuals.js
├── README.md
└── assets/
    ├── audio/
    └── images/
```

`visuals.js` 提供 Canvas 程式繪製，`game.js` 負責遊戲狀態、玩法與輸入。保留 `assets/` 供未來加入合法素材使用；目前不需要任何外部資源。

## Local Development

直接以現代瀏覽器開啟 `index.html` 即可，不需要安裝依賴或啟動伺服器。修改 JavaScript 後可使用 `node --check game.js` 檢查語法。

## GitHub Pages Deployment

1. 將專案檔案提交到 GitHub repository。
2. 在 repository 的 **Settings → Pages** 選擇部署分支與根目錄（`/`）。
3. 儲存後等待 GitHub Pages 發佈，入口為 `index.html`。

頁面只使用相對路徑，無需 Node server、localhost、API 或後端服務。

## How ChatGPT Codex Was Used

ChatGPT Codex 協助建立遊戲 MVP、改善 Canvas 程式美術、介面、音效與本機自動檢查。隔離測試不是實際瀏覽器驗證；手機觸控與 GitHub Pages 線上環境仍需在對應裝置上確認。

## Copyright / Original Assets Notice

本專案角色、場景、圖形與音效皆為原創或程式生成。沒有使用 Disney、Pixar、Toy Story 官方角色、Logo、圖片、影片或音樂素材。
