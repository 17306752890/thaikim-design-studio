# Thai Kim Textile · 20 套官网设计样板

用于设计评审的静态网站，不是正式交易系统。

## 在线地址
- 20 套总览：https://17306752890.github.io/thaikim-design-studio/
- 看完整设计：https://17306752890.github.io/thaikim-design-studio/01/?lang=zh&view=design
- 体验聊天：https://17306752890.github.io/thaikim-design-studio/01/?lang=zh&view=customer
- 泰国面料官网参考：https://17306752890.github.io/thaikim-design-studio/references/

将 01 换成 02–20 可查看其他样板。`lang=zh/th/en` 切换网页语言；聊天目前为中文 Demo。

## 已实现
20 种品牌视觉方向、三语页面、商品搜索与筛选、面料详情、选样、示例米样价格开关、库存方向、精选轮换、评审收藏/备注/导出，以及聊天界面。
聊天首次发送只要求地区和手机号；称呼和业务介绍选填。默认 BKK，可选 IDK、HCM、HAN、其他手填。没有 IP 定位、验证码或真实客户识别。

## 公开范围与演示边界
这是公开仓库，GitHub Pages 也是公开可访问的演示页面；`noindex` 不是访问控制。
未包含本机日志、备份、私人路径、内网地址、真实客户资料、密钥或同事的浏览记录。
商品、推荐、规格、库存标签和米样价格均为示例。未接真实匹配、报价、库存、数据库、CRM、LINE、邮件、订单或支付。
请仅填写测试联系方式。聊天资料和记录暂存在访问者当前标签页的 sessionStorage；评审备注及官网选样保存在该访问者的 localStorage。不会自动汇总或同步给团队。

## 项目结构
- `site/`：可编辑的静态源文件。图片均已本地化。
- `docs/`：适配 GitHub Pages 项目子路径的发布目录。
- `scripts/build_pages.py`：零依赖静态构建器。
- `ASSET-CREDITS.json`：氛围摄影的来源与作者记录。

## 本地预览与更新
```sh
npm run preview
# 浏览 http://127.0.0.1:8080/
npm run build
# 把 site/ 和生成的 docs/ 一起提交到 main。
```
也可以直接使用 Python 运行上述脚本，无需安装 npm 包。
GitHub Pages 的发布源为 `main` 分支 `/docs`。推送新的 docs 后，由 GitHub 重新发布。
仓库改名时，请运行 `python3 scripts/build_pages.py --base-path /新仓库名/`，并同步修改 README 在线地址。

## 图片与品牌
摄影为第三方氛围素材，不是 Thai Kim 的真实产品、厂房或展厅。来源见 ASSET-CREDITS.json；第三方作品权利归各自权利人。
参考库仅发布企业官网链接和设计说明，不发布竞争品牌官网截图、商标资源或源码。
正式商用前需核验品牌法律关系、Logo、公司信息、产品数据、泰语文案、素材许可与隐私流程。

本次 20 套项目与之前的 5 版、10 版网站独立，不覆盖旧仓库。
