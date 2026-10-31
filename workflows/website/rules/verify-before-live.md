# 规则：真实验证发布（Verify Before Live）

> 来源：2026-10-31 下载板块接入——测试脚本的"坏链检查"只认旧路径模式
> （loong-release），对新接入的 Buddy/Harness 链接误报 badlink；同一晚
> git push 逢 GitHub 443 超时连续失败两次。教训：检查工具的模式会过时，
> "验证通过"必须拆成"本地渲染 + 链接独立复验 + live 回读"三段。

## 铁律（Iron Law）

**宣布"已上线"前必须完成四步，缺一不可：**

1. **本地双端渲染**：Playwright（`--no-sandbox`，本机 google-chrome）
   1440×900 桌面 + 390×844 移动各跑一遍，断言：
   零破图、零横向溢出（scrollWidth == clientWidth）、零 pageerror、
   敏感词清单零命中、目标板块存在。
2. **链接独立复验**：新增的每个外链/下载链，`curl -r 0-255 -L` 逐条
   打 200；**不依赖测试脚本内的路径模式**（模式会过时）。
3. **真实 push 成功**：push 后 `git log origin/main -1` 确认远端 SHA
   等于本地；GitHub 443 超时是常态，退避重试（sleep 20→45→60），
   连续失败超过三次再考虑其他通道。
4. **live 回读**：push 后等 ~55s（Pages 自动部署），带 cache-bust 参数
   `curl "https://www.aibay.asia/?v=N"` 拉回 HTML，grep 本次新增的
   特征字符串（板块 id、新文案、新链接域名），命中才算上线成立。

## 辅助纪律

- **HTML 结构校验**：结构变更后跑一次标签配对检查（python html.parser
  数栈），双栏卡片类改动最容易漏 `</ul>`/`</div>`。
- **端口卫生**：本地 http.server 用 8931-8944 段，测试脚本改端口前先
  确认旧进程已 kill（复用 pid 文件），避免"测试跑在旧内容上"。
- **CSS 改动**：提交前 `python3 -c` 数一遍 `{` `}` 是否配平；
  reveal 动画选择器在 js/main.js，新板块的卡片类要记得追加进去。
