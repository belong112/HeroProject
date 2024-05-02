# Hero Project

一個可以觀看不同英雄的數值且可以自由調整的網站。

## 如何啟動

clone 至你的資料夾

```bash
git clone https://github.com/belong112/HeroProject.git
```

下載套件並啟動

```bash
# 進入專案資料夾
cd HeroProject
# 下載所需套件
npm install
# 啟動
npm run dev
```

接著打開 [http://localhost:3000](http://localhost:3000) 就可看到畫面

## 專案架構

### 結構樹

```
.
├── src
│   ├── app // 主要頁面
│   ├── components // 子元件
│   ├── interfaces // 定義共用 interface
│   ├── store // 全域狀態管理
│   └── utils // 其他共用 function ex. request
│
...
```

### Route

Next.js 採用 file-base routing，會把資料夾看成 route 的一部分。ex. `app/heroes/pages.tsx` 代表 `/heroes` route

```
.
├── src
│   └── app
│       ├── heroes
│       │   ├── [id]
│       │   │   └── pages.tsx // /heroes/:id
│       │   └── pages.tsx // /heroes
│       └── pages.tsx // /
│
...
```

### Components

```
.
├── components
│   ├── HeroCard.tsx
│   ├── HeorList.tsx
│   └── HeroProfile.tsx
│
...
```

`HeroCard`: 單個hero的卡片，點擊後會跳轉至 heroes/:id 頁面

`HeroList`: 包裝 HeroCard 的容器，把打 api 獲得的資料傳進 HeroCard

`HeroProfile`: 用於調整英雄能力的 compoenent

## 使用的第三方套件

- axios
  - 提供簡潔的 api 來處理 http 請求的工具
- react-hot-toast
  - 在畫面中彈出通知的小工具
- styled-components
  - 撰寫 css-in-js 的好用 library
  - 專案中主要拿來設計自訂元件
- material-ui
  - 好用的 react component library
  - 專案中使用部分元件：Skeleton / Circular，作為數據完全載好之前的預覽。讓使用體驗較佳。
- zustand
  - 一個輕量的狀態管理工具
  - 專案中用於儲存英雄資料，使得轉換頁面時不必重新打api獲得資料

### Code Quality

引入下方套件來確保程式品質

- eslint
  - 程式碼檢查工具，檢查代碼中的錯誤和 coding style 一致
- prettier
  - 自動 format 程式碼的工具，確保 coding style 一致
- husky
  - git hooks 工具，在觸發 git 事件前後質性預設的指令，在專案中會在 commit 前檢查 lint 和用 prettier format，同時檢查 commit message 格式

### Testing

引入下方套件做測試

- jest-dom
  - 作為測試的執行環境，模擬瀏覽器的行為，api，讓開發者能在node.js的環境下模擬瀏覽器的操作。
- jest
  - 用於測試 JavaScript 應用程式的開源測試框架，可以讓開發者執行測試，撰寫斷言
- @testing-library/jest-dom
  - testing-library 的核心，可以透過 query 到到 DOM 元素
- @testing-library/user-event
  - 用於模擬使用者的行為測試與 UI 的互動，如:click
- @testing-library/react
  - 用於測試 react component 的工具，可以把 react 元件 render 到 DOM 上再執行其他操作

## 註解原則

在次專案中遇到 state 和 function 都會做註解說明其功用。
再來會針對 function 的判斷式寫註解說明為何有這個判斷。

## 專案遇到的困難

本次遇到的一個困難點在 useEffect 的使用。起初我在載入 /heroes/[id] 頁面時會一口氣呼叫 `https://hahow-recruit.herokuapp.com/heroes`（取得全英雄資料），`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile` （取得單一英雄能力）兩支 api，但在點選不同英雄切換 url 的時候因 useEffect 的 dependencies 沒設定好，相互影響，造成多餘的 api 呼叫。

後來，修改成只在 `/heroes` 頁面 呼叫 `https://hahow-recruit.herokuapp.com/heroes` 獲得全英雄的資料，並存入 store，進入 `/heroes/:id` 頁只需呼叫一次 api，不會造成重複渲染的問題。同時也符合 **"Hero List" 依然在相同位置，並且不因切換連結重新 render** 的需求。
