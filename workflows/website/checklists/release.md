# 发布前检查清单（网站类）

> 按序执行，全部通过才允许 push。配套规则见 rules/verify-before-live.md。

## 内容合规

- [ ] `grep -nE '中通服|南网|圣贝|万丰|福马|Fuma|龙虾|甜新|OPC' index.html` 零命中
- [ ] 新增/替换的截图已过 OCR 黑名单检查（rapidocr）
- [ ] 心光仅出现在页脚法律实体位
- [ ] 无内部黑话（FDE/DAG/工作流引擎）出现在对外文案

## 结构

- [ ] html.parser 标签配对检查通过（栈空、无 stray）
- [ ] CSS `{` `}` 配平
- [ ] 新板块卡片类已追加进 js/main.js reveal 选择器
- [ ] nav 锚点与页面 section id 一一对应

## 漏斗

- [ ] 新内容能回答"落在漏斗哪一环"
- [ ] CTA 双轨：企业客户 / 行业伙伴 subject 区分
- [ ] `<title>` / meta description / og:* 与改动同步

## 验证（铁律四步）

- [ ] Playwright 双端：零破图 / 零溢出 / 零 pageerror / 敏感词零命中
- [ ] 新增链接逐条 `curl -r 0-255 -L` 打 200
- [ ] push 成功且 `git log origin/main -1` 确认远端 SHA
- [ ] 等 55s 后 live 回读，grep 新特征字符串命中

## 提交卫生

- [ ] commit message 无凭据值（规则见 loong-workflow credential-hygiene）
- [ ] 测试用 http.server 进程已 kill
