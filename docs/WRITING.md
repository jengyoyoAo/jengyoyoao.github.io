# 撰寫與更新內容

## 一篇解題文章，只維護一份 Markdown

以 `solutions/leetcode/0003-longest-substring-without-repeating-characters.md` 為例：

```yaml
---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3
title: Longest Substring Without Repeating Characters
date: "2026-11-05"
difficulty: medium
topic: Sliding window
summary: Track last-seen character indices to move the window past duplicates.
problem_url: https://leetcode.com/problems/longest-substring-without-repeating-characters/
permalink: online-judge/leetcode/problem-3.html
solutions:
  - label: Python
    path: solutions/leetcode/0003-longest-substring-without-repeating-characters.py
  - label: C
    path: solutions/leetcode/0003-longest-substring-without-repeating-characters.c
---
```

接著直接寫內容：

```markdown
## Key idea

以 $n = |s|$ 表示字串長度。

## Solution

{% solution solutions %}

## Complexity

- **Time:** $O(n)$.
- **Extra space:** $O(1)$ for a fixed alphabet.
```

`solutions` 中的原始碼會自動讀取、配色，組成語言分頁和 Copy 按鈕。不要在 Markdown 另外貼一份相同程式碼。若要放暴力解或其他做法，宣告另一組，例如 `bruteForce`，在想放的位置寫 `{% solution bruteForce %}`。

題號排序、Easy/Medium/Hard 顏色、文章日期與平台刊登題數由資料自動產生。每日題可加 `daily: "2026-11-05"`。不要在列表或圓環圖手改已刊登題數。平台總題數不會自行爬取，需更新 `online-judge/progress-data.json` 的快照及來源。

## 新增草稿

```sh
npm run new:solution -- leetcode 4 "Median of Two Sorted Arrays" --difficulty=hard --languages=python,c
npm run new:note -- linear-algebra-basics "Linear Algebra Basics" --topic=Mathematics
```

預設 `draft: true`，不會出現在產生的網站、列表或計數。完成內容後改成 `draft: false`，再跑 `npm run dev` 預覽。草稿仍存在 Git repository；這不是儲存私人資料的機制。

一般知識筆記使用 `layout: note.njk`、`tags: [note]`，網址例如 `notes/linear-algebra-basics/index.html`。Notes 列表依日期由新到舊排列。不要把舊的 Journal（`notes.html`）與新的 Notes（`notes/`）混在一起。

## LaTeX

行內公式用 `$...$`；獨立公式如下：

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

程式碼中的 `$` 不會轉成公式。函式名稱與實際程式語法可繼續使用反引號。LaTeX 寫錯會使建置失敗，避免把壞掉的公式發布出去。

## 預覽與發布

1. `npm run dev`，開啟 `http://localhost:8765/`。
2. `npm test` 確認文章、連結與自動化通過。
3. Commit Markdown、原始碼、模板等來源檔；不要 commit `_site/` 或 `node_modules/`。
4. Push 到 `master` 後，GitHub Actions 會建置並發布（首次需完成部署設定）。

目前首頁、About、Community 和 Journal 仍保留原本的靜態 HTML；已自動化的是解題文章、平台列表、進度與新增的學習筆記。未來新增全站導覽項目時，也要同步這些既有靜態頁。
