# 复盘：官网从工程师叙事到商业叙事的转型（2026-10-30 ~ 10-31）

> 范围：www.aibay.asia 两日内的三次定位升级（合规清洗 → 双客群漏斗 →
> 工作坊入口）+ 下载板块接入。结论：已全部上线并验证。
> 沉淀规则：compliance-whitelabel / verify-before-live / funnel-consistency。

---

## 1. 决策链（为什么这么改）

| 阶段 | 触发 | 决策 | 效果 |
| --- | --- | --- | --- |
| 合规 | 客户/厂商名可被溯源 | 白标清洗：文本 grep + 截图重制 + OCR 兜底 | 品牌叙事成立 |
| 专业感 | 中小老板不会验代码 | Apple 浅色风 + 真实界面截图 + 20+ 落地版图 | 「像正经公司」 |
| 定位 | 软件不好卖、手机好卖 | 客群=能做 demo 做不了运营的中小老板；代理=增长引擎 | 漏斗成型 |
| 入口 | 培训/教练是最强武器 | 玄龙工作坊（对外无名，WorkBuddy/FDE 留课件） | 获客载体就位 |

**一句话商业逻辑**：工作坊筛人 → 手机成交 → 底座留客 → 代理放大。

## 2. 做对了的（可复制做法）

- **真实资产优先于造图**：产品截图全部来自真实运行界面（Loong TUI、
  Buddy 专家市场、手机实拍），比 mockup 说服力高一档；图片统一 1680w
  Web 压缩（q84）。
- **对比站打样**：白标话术框架参考 fuma-ai.com（playwright 抓 SPA，
  只学结构不抄品牌），性价比最高的市场调研。
- **验证流水线脚本化**：/tmp/octopus/test_new.py（双端渲染断言）一次
  编写全程复用；每次改动 sed 改端口即可。
- **一键换链接**：update_downloads.py + manifest JSON，发新版只改
  版本号/文件名/体积三处；干跑用假链接验证替换逻辑后再动真站。

## 3. 踩过的坑

| 坑 | 现象 | 对策（已立规） |
| --- | --- | --- |
| HTML 手拼漏闭合 | partner 卡片段少 `<ul>`，靠 html.parser 栈检查兜出 | verify-before-live 第 5 条 |
| 测试脚本模式过时 | badlink 误报新链接（只认旧路径） | 链接独立 curl 复验，不信脚本内模式 |
| Gitea 内网链接泄漏 | API 的 browser_download_url 是 39.108.95.179:3000 | 官网一律重写为 gitea.aibay.asia 域名 |
| API token 权限不足 | read:repository 建不了 org repo | 待办：换 write:organization token 或 UI 手建 |
| push 443 超时 | GitHub 连续两次失败 | 退避重试；第三次成功 |
| 旧板块残留 | #fde 关键词堆叠、与 #partner 重复 | funnel-consistency 第 4 条定期扫旧 |

## 4. 遗留

- Gitea `Loong/website-workflow` 独立仓库待建（权限不够），当前 SSOT
  在本仓 workflows/website/；建好后 `git subtree split` 一条命令拆出。
- GitHub token（ghp_tRqK…）轮换仍挂起；https_enforced 手动开关仍挂起。
