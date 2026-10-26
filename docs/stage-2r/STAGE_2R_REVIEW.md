# L2M-Web · Stage 2-R 评审交接

> 状态：设计原型修正完成，等待评审。**未正式发布，未进入 Stage 3。**
> 最终提交 SHA：见本文件所在提交（`git log -1 -- docs/stage-2r/STAGE_2R_REVIEW.md`），交付时在回复中给出。

## 1. 修复的事实冲突

| 问题 | 修正 |
| --- | --- |
| 客户旅程（第 3 屏）使用“蝶阀 / DN150”，与样例网站的“球阀 316 SS / PN40”冲突 | 全部改为读取单一事实源 `lib/demo-facts.ts` |
| `home-copy.ts` 内重复维护产品族名称（familyNames） | 删除重复，产品族、型号、应用、网址统一由事实源派生 |
| 样例网站、设备视口、诊断报告中各有硬编码的 Hartwell 事实（型号数量、域名、页面路径） | 改为事实源引用 |
| 无防回归手段 | 新增 `pnpm check:demo`（`scripts/check-demo-facts.mjs`），扫描组件中硬编码的 DEMO 事实 |

## 2. 八屏设计变化摘要

1. **首屏**：主标题与核心 CTA 未改（已冻结）。保留共享 Before/After。
2. **改造对比**：保持深入解释（三处变化 + 热点 + 桌面/手机切换），不重复首屏。
3. **客户旅程**：Discover / Evaluate / Act 的数据全部来自事实源，冲突消除。
4. **网站报告**：每个发现增加“页面证据”视觉（页面片段重建 + 来源路径），明确标注 SAMPLE REPORT 与“未分析”范围。
5. **从网址到交付**：四步流程不变，每步标注 DEMO。
6. **你得到什么**：重做为单一产品展示（桌面 + 手机同一升级网站），四项交付物为文字说明，去掉卡片堆叠。
7. **证明与信任**：重做为三支柱——真实作品验证、交付边界、客户控制权。每项都标记待补或演示，不暗示已证明。详细未验证状态移入折叠的“原型评审说明”。
8. **邀请**：与首屏共享 URL 状态，“网址格式有效”和“真实诊断”严格区分。

## 3. 构建与浏览器测试（实际执行）

| 检查 | 命令 / 方式 | 结果 |
| --- | --- | --- |
| 依赖安装 | `pnpm install` | PASS |
| TypeScript | `pnpm exec tsc --noEmit` | PASS（0 错误） |
| 正式构建 | `pnpm build`（Next.js 16） | PASS |
| DEMO 事实一致性 | `pnpm check:demo` | PASS |
| 八屏渲染 | agent-browser，section id：transformation, journey, report, url-to-delivery, what-you-get, proof（另含首屏与邀请） | PASS |
| 页面横向溢出 | `scrollWidth` 实测：1440→1440、768→768、390→390、360→360 | PASS |
| 控制台错误 | `agent-browser errors` | 无 |
| 中文页面 | 切换后 `lang="zh-CN"`，h1 正确，1440 无溢出 | PASS（见注） |
| Before/After 同步 | 首屏切换后第 2 屏 4 个 radio 同步为 Before | PASS |
| 商业热点 | 仅 After 视图存在，Before 下不可见（设计如此） | PASS |
| URL 输入 | 非法地址显示格式错误；`acme-valves.com` 规范为 `https://acme-valves.com`，显示“仅检查格式、未抓取或分析”和 DEMO 下一步 | PASS |
| 触控目标 | 初测导航链接、登录、评审链接高度 < 24px，**已修复**为 ≥ 44px（顶部原型条链接 ≥ 24px） | PASS（修复后） |
| 焦点 | 所有交互元素带 `focus-visible` 轮廓 | PASS（代码检查 + 键盘抽查） |

注：无头浏览器缺少中文字体，截图中的中文显示为方框，属于测试环境问题，不是页面问题。中文字形请在真实浏览器中复核。

## 4. 截图位置

- `docs/stage-2r/screenshots/en-1440-full.png` — 英文 1440 全页
- `docs/stage-2r/screenshots/en-390-full.png` — 英文 390 全页
- `docs/stage-2r/screenshots/en-768-hero.png` — 768 平板首屏
- `docs/stage-2r/screenshots/zh-1440-full.png` — 中文 1440 全页（字形见上注）
- 360px：只做了数值溢出检查，未保存截图

## 5. G1—G7 状态

| 门禁 | 状态 | 说明 |
| --- | --- | --- |
| G1 商业表达 | **NOT VERIFIED** | 需要 5 位真实目标客户做 10 秒测试，v0 不能代替 |
| G2 视觉品质 | 待评审 | 层级与排版已加强，需评审人主观判断 |
| G3 真实对比 | PARTIAL | Before/After 可操作、事实一致；对比对象是虚构样例，不是真实客户作品 |
| G4 产品闭环 | PARTIAL | URL → 格式检查 → DEMO 下一步已有；诊断、方案、购买未接入（按本阶段范围） |
| G5 交付认知 | PASS（原型层） | 预览、验收、独立交付、一次性上线已表达，托管不是主线 |
| G6 响应式与可访问性 | PASS（自动化层） | 四个宽度无溢出，触控已修复；未做读屏器全流程测试 |
| G7 商业真实性 | PASS（原型层） | 所有样例标 DEMO/SAMPLE/FICTIONAL，没有虚构评价、指标或收费 |

## 6. Demo 占位与真实素材缺口

- Hartwell Fluid Systems 为虚构公司，产品图由 AI 生成（`public/demo/valve.png`）
- 网站报告为 SAMPLE，没有真实分析
- 注册、登录、诊断、价格页、导航中的“价格与交付”均为不可用占位（已标注）
- 真实客户案例、授权素材、推荐语：**全部缺失**
- 真实价格与交付周期：未提供

## 7. 尚未解决的设计问题

1. 缺少第一个真实授权案例，第 7 屏“真实作品验证”只能显示待补状态
2. 中文排版需在有中文字体的真实浏览器中复核断行与字重
3. 第 4 屏报告在 360px 下信息密度偏高，可考虑移动端折叠
4. 读屏器全流程与 Lighthouse 可访问性评分未执行

## 8. 是否推荐进入 Stage 3

**暂不推荐。** 原型层工程验收已通过，但 G1 未验证，G3 缺少真实案例。建议先做 5 人 10 秒测试，并取得至少一个授权案例，再决定是否进入 Stage 3。
