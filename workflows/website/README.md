# 网站建设工作流（website-workflow）

> 继承自 [Loong/loong-workflow](https://gitea.aibay.asia/Loong/loong-workflow)（SSOT 语料库），
> 是其在本站场景的**领域特化**：官网迭代的经验、教训、规则沉淀。
> 本目录是网站类项目的唯一权威源；拆分为独立 Gitea 仓库后此行改为同步说明。

## 范围

适用于：www.aibay.asia（营销主站）、chai.aibay.asia（课程站）、
dsh-workbench（演示站）等对外站点的内容迭代、视觉改版、合规审查、发布与验证。

不适用于：产品工程（走 loong-workflow 本体）。

## 布局

| 路径 | 内容 |
|---|---|
| `rules/` | 网站类铁律（合规、发布、验证） |
| `retrospectives/` | 事故与教训复盘（按 `YYYY-MM-DD-主题.md`） |
| `checklists/` | 发布前检查清单 |

## 铁律索引（优先读）

1. **合规红线（白标）** —— [rules/compliance-whitelabel.md](rules/compliance-whitelabel.md)
   客户名与厂商痕迹永不出现；上任何新内容前先过敏感词清单。
2. **真实验证发布** —— [rules/verify-before-live.md](rules/verify-before-live.md)
   无本地双端渲染验证 + live 回读，不许宣布上线。
3. **漏斗一致性** —— [rules/funnel-consistency.md](rules/funnel-consistency.md)
   任何新板块/新文案，先回答"落在漏斗哪一环"，落不进去不做。
