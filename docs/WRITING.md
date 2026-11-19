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

### Notes 中繼資料

每個 `notes/**/*.md` 檔案（包括草稿和章節頁）都必須提供以下欄位：

- `layout`：`note.njk`、`mathematics-section.njk`、`geometry-section.njk` 或 `vocabulary.njk`。
- `tags`：恰好一個內容標籤：`note`、`math-section` 或 `vocabulary-section`。
- `title`、`summary`：非空字串。
- `topic`：必須符合 `_data/noteTopics.json` 中某個分類的 `name`。
- `date`：有效的 `YYYY-MM-DD` 日期。
- `permalink`：唯一的 `notes/<slug>/index.html` 路徑。
- `draft`：選填；若提供，必須是 YAML 布林值 `true` 或 `false`。

`npm run build` 會在 Eleventy 建置前檢查所有筆記，包括草稿，並列出來源檔及欄位問題。一般筆記使用 `layout: note.njk`、`tags: [note]`，例如 `notes/linear-algebra-basics/index.html`。Notes 列表依日期由新到舊排列。

Journal 與 Notes 是不同內容：Journal 收錄個人經驗和反思，來源在 `journal/*.njk`，索引頁來源為 `notes.njk`、公開網址仍是 `/notes.html`；Notes 收錄數學、程式、AI、英文和工具等學習內容，來源在 `notes/`。

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

首頁、About、Community、Journal 索引與 Journal 文章共用 `_includes/base.njk` 的導覽、頁尾和頁面外框。新增全站導覽項目時，只需更新共用模板。各頁仍以明確的 `permalink` 保留既有公開網址。
