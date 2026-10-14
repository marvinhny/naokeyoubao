const DATABASES: [string, string, string, string][] = [
  ["美国", "FDA", "651,397", "510(k)、PMA、列名、De Novo、产品分类数据库等"],
  ["欧盟", "CE/EUDAMED", "2,785,689", "EUDAMED 数据库 与成员国独立数据库合并去重"],
  ["意大利", "RDM", "2,425,862", "卫生部器械数据库快照"],
  ["中国", "NMPA", "135,690", "国家药监局医疗器械注册记录"],
  ["澳大利亚", "TGA ARTG", "98,554", "治疗用品登记册"],
  ["加拿大", "Health Canada", "153,183", "MDALL 器械许可"],
  ["英国", "MHRA", "1,541,151", "英国器械产品记录"],
  ["新加坡", "HSA", "1,164,557", "卫生科学局产品记录"],
  ["印度", "CDSCO", "97,299", "已批准器械记录"],
  ["沙特阿拉伯", "SFDA", "178,923", "医疗设备产品记录"],
  ["巴西", "ANVISA", "99,327", "国家卫生监督局记录"],
  ["俄罗斯", "RZN", "80,943", "俄文原文，附英文译文"],
  ["日本", "PMDA", "14,378", "医药品医疗器械综合机构记录"],
  ["以色列", "AMAR", "29,681", "卫生部注册记录"],
  ["泰国", "Thai FDA", "570,126", "公共许可检索中心，附英文译文"],
  ["阿根廷", "ANMAT", "28,753", "器械注册记录"],
  ["墨西哥", "COFEPRIS", "21,630", "年度发证文件中的卫生注册"],
  ["乌兹别克斯坦", "Uzpharm", "6,571", "器械与 IVD 国家登记"],
  ["中国台湾", "TFDA", "93,348", "食药署开放数据中的许可证"],
  ["菲律宾", "FDA", "30,340", "CPR 与 CMDN 产品授权"],
  ["印度尼西亚", "Kemenkes", "83,135", "e-Info Alkes 的 AKD/AKL"],
  ["马来西亚", "MDA", "49,917", "公共登记中的有效注册"],
];

export function renderResume(notice = "") {
  const askNote =
    notice === "sent"
      ? `<p class="alert" role="status">已收到。接下来的需求，我们会看到。</p>`
      : notice === "short"
        ? `<p class="alert" role="status">写具体一点，至少留一句话。</p>`
          : notice === "mail"
          ? `<p class="alert" role="status">留一个能联系上的方式：邮箱、电话或微信号。</p>`
          : notice === "send"
            ? `<p class="alert" role="status">刚刚没发出去，过一会儿再试。</p>`
            : notice === "rate"
              ? `<p class="alert" role="status">刚提交过，稍等再发下一条。</p>`
              : "";
  const rows = DATABASES.map(
    ([place, name, count, note]) =>
      `<tr><td>${place}</td><td>${name}</td><td class="num">${count}</td><td>${note}</td></tr>`,
  ).join("");
  const tries = ["监护仪", "Insulin pump", "迈瑞", "Endoscope", "呼吸机"]
    .map(
      (query) =>
        `<a href="https://cn.medregdata.com" target="_blank" rel="noreferrer">${query}</a>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>全球医械数据库 统一搜索入口</title>
<meta name="description" content="medregdata.com · 作者 Marvin">
<meta name="author" content="Marvin">
<meta property="og:type" content="website">
<meta property="og:locale" content="zh_CN">
<meta property="og:site_name" content="脑壳有包">
<meta property="og:url" content="https://naokeyoubao.com/medregdata">
<meta property="og:title" content="全球医械数据库 统一搜索入口">
<meta property="og:description" content="medregdata.com · 作者 Marvin">
<meta property="og:image" content="https://naokeyoubao.com/medregdata/share.png?v=1">
<meta property="og:image:secure_url" content="https://naokeyoubao.com/medregdata/share.png?v=1">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1080">
<meta property="og:image:height" content="1080">
<meta property="og:image:alt" content="全球医械数据库 统一搜索入口">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="全球医械数据库 统一搜索入口">
<meta name="twitter:description" content="medregdata.com · 作者 Marvin">
<meta name="twitter:image" content="https://naokeyoubao.com/medregdata/share.png?v=1">
<link rel="icon" href="/icon.png?v=4" type="image/png" sizes="32x32">
<link rel="icon" href="/favicon.ico?v=4" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4">
<style>
:root {
  --bg: #f5f5ef;
  --ink: #2a2a26;
  --muted: #6f6f66;
  --primary: #234d3d;
  --primary-soft: #e6eeea;
  --line: #d8d8ce;
  --card: #fdfdf9;
  --amber: #b07a2a;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif;
  line-height: 1.7;
  letter-spacing: 0.01em;
}
a { color: var(--primary); }
a.gh { display: inline-flex; margin: 0 2px; color: var(--ink); vertical-align: -3px; }
a.gh:hover { color: var(--primary); }
a.gh svg { width: 16px; height: 16px; display: block; }
.wrap { max-width: 980px; margin: 0 auto; padding: 0 28px 88px; }
.topbar {
  position: sticky; top: 0; z-index: 20;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  margin: 0 -28px; padding: 18px 28px 14px;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
  font-size: 14px; color: var(--muted);
}
.back { color: var(--primary); text-decoration: none; font-weight: 650; }
.back:hover { opacity: .72; }
.mast { padding-top: 42px; max-width: 760px; margin-left: auto; margin-right: auto; }
.kicker {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.18em;
}
h1 {
  margin: 0;
  font-size: clamp(44px, 7vw, 68px);
  line-height: 1.08;
  letter-spacing: -0.035em;
}
.role { margin: 16px 0 0; font-size: 20px; font-weight: 600; }
.meta { margin: 8px 0 0; color: var(--muted); font-size: 14px; }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
main { max-width: 760px; margin-left: auto; margin-right: auto; }
.btn {
  display: inline-flex; align-items: center;
  padding: 4px 12px; border-radius: 999px;
  border: 1px solid var(--primary); color: var(--primary);
  background: transparent; text-decoration: none;
  font-size: 13px; line-height: 1.3;
}
.btn:hover { background: var(--primary); color: #fff; }
.btn.solid { background: var(--primary); color: #fff; }
.btn.solid:hover { opacity: .88; }
h2 {
  margin: 0 0 14px;
  font-size: 22px;
  letter-spacing: -0.02em;
}
section { margin-top: 56px; }
#log { margin-top: 112px; }
#about { margin-top: 72px; }
p { margin: 0 0 12px; }
.lede { font-size: 17px; }
.pains { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px; margin: 8px 0 0; padding: 0; list-style: none; }
.pains li {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
}
.pains b { display: block; margin-bottom: 2px; }
.pains span { color: var(--muted); font-size: 13px; }
.rolecard { padding: 4px 0 18px; border-top: 1px solid var(--line); }
.rolecard header { display: flex; align-items: baseline; gap: 10px; margin-top: 16px; }
.rolecard h3 { margin: 0; font-size: 18px; }
.badge {
  font-size: 12px; color: var(--primary); background: var(--primary-soft);
  border-radius: 999px; padding: 1px 8px;
}
.fab { margin: 8px 0 0; padding: 0; list-style: none; font-size: 14.5px; }
.fab li { padding: 3px 0; }
.fab b { font-weight: 650; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 8px 0 18px; }
.stat { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px 14px; }
.stat .line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.stat b { color: var(--primary); font-size: 26px; letter-spacing: -0.03em; line-height: 1.15; }
.stat .name { font-size: 15px; font-weight: 650; }
.stat .more { display: block; margin-top: 8px; color: var(--muted); font-size: 12.5px; line-height: 1.45; }
.tablewrap { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; background: var(--card); }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--line); vertical-align: top; }
th { color: var(--muted); font-weight: 550; font-size: 12px; }
tr:last-child td { border-bottom: none; }
td.num { font-variant-numeric: tabular-nums; white-space: nowrap; }
.soon { color: var(--amber); font-size: 13.5px; }
.row {
  display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 18px;
  padding: 16px 0; border-top: 1px solid var(--line);
}
.when { color: var(--muted); font-size: 13px; padding-top: 3px; }
.row h3 { margin: 0 0 4px; font-size: 16px; }
figure { margin: 18px 0; }
img { width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--line); display: block; }
figcaption { margin-top: 8px; color: var(--muted); font-size: 13px; }
.outlinks, .tries { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tries a {
  border: 1px solid var(--line); background: var(--card); border-radius: 999px;
  padding: 3px 12px; font-size: 13px; text-decoration: none;
}
.tries a:hover { border-color: var(--primary); }
.ask-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 14px; }
form.ask { display: grid; gap: 10px; margin-top: 14px; }
form.ask[hidden] { display: none; }
form.ask input:not([type="radio"]), form.ask textarea {
  width: 100%; font-family: inherit; font-size: 15px; line-height: 1.3; color: inherit;
  background: var(--card); border: 1px solid var(--line); border-radius: 10px;
  padding: 7px 12px;
}
form.ask textarea { min-height: 96px; resize: vertical; }
.ways { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.ways input { text-align: left; }
.wx-modal[hidden] { display: none; }
.wx-modal {
  position: fixed; inset: 0; z-index: 80;
  display: grid; place-items: center; padding: 24px;
}
.wx-backdrop { position: absolute; inset: 0; border: 0; background: rgba(42, 42, 38, .46); cursor: pointer; }
.wx-card {
  position: relative; z-index: 1; width: min(360px, 100%);
  background: #fff; border-radius: 16px; padding: 28px 20px 20px;
  box-shadow: 0 18px 50px rgba(42, 42, 38, .22);
}
.wx-card img { width: min(280px, 100%); height: auto; margin: 0 auto; border: 0; border-radius: 0; }
.wx-close {
  position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; padding: 0;
  border: 0; border-radius: 999px; background: transparent; color: var(--muted);
  font-size: 22px; line-height: 1; cursor: pointer;
}
.wx-close:hover { background: var(--primary-soft); color: var(--ink); }
button.btn {
  appearance: none;
  font-family: inherit; font-size: 13px; line-height: 1.3; font-weight: 400;
  cursor: pointer;
}
.hp { position: absolute; left: -9999px; }
.alert { color: var(--amber); font-size: 14px; }
.to-top {
  position: fixed; right: 22px; bottom: 22px; z-index: 50;
  width: 44px; height: 44px; padding: 0; border-radius: 999px;
  border: 1px solid var(--primary); background: var(--card); color: var(--primary);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 14px rgba(35, 77, 61, .12);
  opacity: 0; pointer-events: none; transform: translateY(8px);
  transition: opacity .2s ease, transform .2s ease, background .18s ease, color .18s ease;
}
.to-top.on { opacity: 1; pointer-events: auto; transform: none; }
.to-top:hover { background: var(--primary); color: #fff; }
.foot { margin-top: 64px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 12.5px; }
@media (max-width: 800px) {
  .pains, .stats, .row { grid-template-columns: 1fr; }
  h1 { font-size: 40px; }
  .wrap { padding: 0 18px 64px; }
  .topbar { margin: 0 -18px; padding: 18px 18px 14px; }
  .to-top { right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); }
  form.ask { gap: 8px; }
  form.ask input:not([type="radio"]), form.ask textarea {
    font-size: 16px; line-height: 1.25; padding: 6px 10px;
  }
  form.ask textarea { min-height: 80px; }
  .ways { gap: 8px; }
}
</style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <a class="back" href="/">‹ 回到脑壳</a>
    <a class="btn" href="https://cn.medregdata.com" target="_blank" rel="noreferrer">前往搜索</a>
  </div>
  <header class="mast">
    <p class="kicker">项目简历 · GLOBAL MED DEVICE REGISTRY</p>
    <h1>全球医械数据库</h1>
    <p class="role">medregdata.com</p>
    <p class="meta">一份写给医疗器械从业者的项目简历</p>
    <div class="links">
      <a class="btn solid" href="https://cn.medregdata.com" target="_blank" rel="noreferrer">打开中文站点</a>
      <a class="btn" href="https://medregdata.com" target="_blank" rel="noreferrer">打开英文站点</a>
    </div>
  </header>
  <main>
      <section id="about">
        <h2>关于</h2>
        <p class="lede">MedRegData 把散落在各监管机构的医疗器械注册数据汇到一处，统一清洗、翻译和关联。一个搜索框，就能查到谁、在哪个国家、注册了什么产品、关联了哪些公司。</p>
        <p>注册数据不只是合规档案，也是一张看市场、找机会的地图。这页主要写给要出海的中国企业：先看清政策、路径、竞争对手和已经在当地销售的人，再谈费用、周期和下一步。</p>
        <div class="stats">
          <div class="stat">
            <div class="line"><b>22</b><span class="name">全球数据库</span></div>
            <span class="more">持续收录全球数据库，预计覆盖100 多个国家。</span>
          </div>
          <div class="stat">
            <div class="line"><b>1034 万</b><span class="name">注册记录</span></div>
            <span class="more">持续收录，预计收录 5000 万+，同时进化独有字段</span>
          </div>
          <div class="stat">
            <div class="line"><b>中 / 英</b><span class="name">双语检索</span></div>
            <span class="more">同时支持当地小语种语言检索。</span>
          </div>
        </div>
      </section>

      <section id="pain">
        <h2>初衷</h2>
        <ul class="pains">
          <li><b>数据分散</b><span>FDA、EUDAMED、PMDA、TGA 等，每个国家各有一套独立系统。即便同一联盟里的成员国也各自为战，查一个产品要对着几十个官网，结果还放不到一起比。</span></li>
          <li><b>路径隐蔽</b><span>官方入口层层嵌套，有的只给批量下载包。不熟悉那套法规的人，常常连从哪查都不知道。</span></li>
          <li><b>体量庞大</b><span>单个来源动辄数十万到数百万条。Excel 打不开、筛不动，原始文件又往往是 XML 或压缩包。</span></li>
          <li><b>语言障碍</b><span>日语、德语、俄语、泰语、阿拉伯语等界面和字段。同一类产品在不同国家叫法不同，关键词对不齐。</span></li>
          <li><b>无法贯通</b><span>企业、产品、分类、证书之间没有统一关联。想看一家公司在全球拿了哪些证，几乎做不到。</span></li>
          <li><b>字段太少</b><span>官方常常只让按证号或名称查，没法按产品类别、分类代码、时间和国家组合筛选。</span></li>
        </ul>
      </section>

      <section id="way">
        <h2>解决方案</h2>
        <ul class="pains">
          <li><b>统一结构</b><span>企业、产品、分类、风险等级、日期、状态收成同一套字段，不同国家可以放在一张表里比。</span></li>
          <li><b>一键搜索</b><span>一个搜索框同时查多个监管机构。产品名、企业名、证号、分类代码都能作为入口。</span></li>
          <li><b>关联分析</b><span>按企业或产品类别聚合，看趋势和分布。从一条记录延伸到竞品、上下游和它的注册历史。</span></li>
          <li><b>多语言对齐</b><span>中英文都能检索，产品术语做了跨语言映射。用中文搜「血糖仪」，也能找到各国对应的记录。</span></li>
        </ul>
      </section>

      <section id="who">
        <h2>它为谁创造价值</h2>

        <article class="rolecard">
          <header><h3>法规</h3></header>
          <p>检索等同器械，对比各国分类和审批路径，找到可以引用的对比产品，判断哪条路更合适。注册周期和成本可以提前估，少在申报时才发现走错了。</p>
        </article>
        <article class="rolecard">
          <header><h3>销售</h3></header>
          <p>按产品词找出全球同类产品，以及进口商、经销商和授权代表，相当于对合规下游客户做一次深度背景调查。数据里能看到竞品在每个国家谁在卖、卖给谁，哪些证书已经过期或快要失效。替代机会和下游渠道因此有名单，开发信更有依据，陌生拜访也不再只靠碰运气。</p>
        </article>
        <article class="rolecard">
          <header><h3>研发</h3></header>
          <p>按分类代码和预期用途，找到已经获批的对标产品，看它的技术特征和适用范围。立项少走弯路，设计输入更贴近已被监管认可的方案。</p>
        </article>
        <article class="rolecard">
          <header><h3>市场</h3></header>
          <p>站在上帝视角，俯瞰全量数据，按国家、类别和时间统计下证数量和企业分布，用合规数据而不是传闻看格局和竞争。进入新市场、定年度策略时，依据可以回查到来源。</p>
        </article>
        <article class="rolecard">
          <header><h3>产品</h3></header>
          <p>用产品词聚合同类产品和生产企业，同时看竞品布局，以及同类产品的 OEM 和供应商。竞品分析和供应链选型可以放在同一次检索里完成。</p>
        </article>
      </section>

      <section id="data">
        <h2>数据收录</h2>
        <p>条数取自 2026 年 10 月 14 日中文站公开页面，合计 10,340,454 条。收录范围以 <a href="https://medregdata.com" target="_blank" rel="noreferrer">medregdata.com</a> 当时数据为准，会随各机构更新。</p>
        <div class="tablewrap">
          <table>
            <thead><tr><th>市场</th><th>来源</th><th>条数</th><th>收录内容</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="soon">韩国 MFDS、德国 BfArM、瑞士 Swissmedic 已在站上标为即将上线，不计入上面的条数。</p>
      </section>

      <section id="shots">
        <h2>网页</h2>
        <p>提供多数据库串联的统一检索入口、以及每个国家独立专库检索入口。</p>
        <div class="outlinks">
          <a class="btn solid" href="https://cn.medregdata.com" target="_blank" rel="noreferrer">统一检索入口</a>
          <a class="btn" href="https://cn.medregdata.com/fda" target="_blank" rel="noreferrer">FDA专库</a>
          <a class="btn" href="https://cn.medregdata.com/ce" target="_blank" rel="noreferrer">CE专库</a>
          <a class="btn" href="https://cn.medregdata.com/applicants" target="_blank" rel="noreferrer">持证企业库</a>
        </div>
        <figure>
          <img src="/medregdata/hero.png" alt="中文站搜索页，一个搜索框覆盖多个监管数据库" width="1280" height="415">
          <figcaption>搜索页。一个框检索器械名称、生产企业或注册编号，下方是常见产品词。<a href="https://cn.medregdata.com" target="_blank" rel="noreferrer">打开原页</a></figcaption>
        </figure>
        <figure>
          <img src="/medregdata/coverage.png" alt="中文站已上线数据库的全球覆盖" width="1280" height="800">
          <figcaption>已上线数据库的覆盖。结果会按 FDA、NMPA、EUDAMED 等来源分组。<a href="https://cn.medregdata.com" target="_blank" rel="noreferrer">打开原页</a></figcaption>
        </figure>
      </section>

      <section id="tries">
        <h2>试试这些搜索</h2>
        <p>在检索框里直接输入。中文产品名和英文通用名都可以。</p>
        <div class="tries">
          ${tries}
        </div>
      </section>

      <section id="log">
        <h2>更新日志</h2>
        <article class="row">
          <div class="when">2026.04</div>
          <div>
            <h3>最初五个市场</h3>
            <p>接入美国 FDA、欧盟 CE、中国 NMPA、澳大利亚 TGA、加拿大。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.07</div>
          <div>
            <h3>英国、新加坡、印度、沙特、巴西</h3>
            <p>接入 MHRA、HSA、CDSCO、SFDA、ANVISA。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.07</div>
          <div>
            <h3>日本、以色列、阿根廷</h3>
            <p>接入 PMDA、AMAR、ANMAT。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.08</div>
          <div>
            <h3>俄罗斯</h3>
            <p>接入俄罗斯 RZN。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.09</div>
          <div>
            <h3>泰国和墨西哥的器械记录</h3>
            <p>接入泰国公共许可检索、墨西哥卫生注册。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.09</div>
          <div>
            <h3>乌兹别克斯坦</h3>
            <p>接入 Uzpharm 器械与 IVD 登记。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.09</div>
          <div>
            <h3>CE 证书 PDF</h3>
            <p>提取并接入 CE 公开证书 PDF。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.09</div>
          <div>
            <h3>美国补上 PMA 和列名</h3>
            <p>接入 PMA、510(k)-exempt 列名。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.09</div>
          <div>
            <h3>记录查询 MCP</h3>
            <p>将网站查询包装为标准化Skill，上线记录查询 MCP，可接入到 workbuddy、豆包、千问、Codex等，方便用自然语言查询。项目在 <a class="gh" href="https://github.com/marvinhny" target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.68 7.68 0 0 1 8 4.77c.68.003 1.36.092 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a>，欢迎 Star。</p>
          </div>
        </article>
        <article class="row">
          <div class="when">2026.10</div>
          <div>
            <h3>意大利和东南亚四库</h3>
            <p>接入意大利 RDM、中国台湾 TFDA、菲律宾、印度尼西亚、马来西亚。</p>
          </div>
        </article>
        <article class="row" id="ask">
          <div class="when">2026.10</div>
          <div>
            <h3>中文站开放检索</h3>
            <p><a href="https://cn.medregdata.com" target="_blank" rel="noreferrer">cn.medregdata.com</a> 上线。已收录的监管库可以在中文站用一个搜索框查询。更多数据库持续清洗入库中，敬请关注。</p>
            <div class="ask-actions">
              <a class="btn solid" href="https://cn.medregdata.com" target="_blank" rel="noreferrer">前往搜索</a>
              <button class="btn" type="button" id="showAsk" aria-expanded="${notice ? "true" : "false"}" aria-controls="askForm">提交需求</button>
            </div>
            ${askNote}
            <form class="ask" id="askForm" method="post" action="/medregdata#ask"${notice ? "" : " hidden"}>
              <label class="hp">不要填写<input name="company" tabindex="-1" autocomplete="off"></label>
              <div class="ways">
                <input name="phone" maxlength="40" placeholder="电话" autocomplete="tel" inputmode="tel" aria-label="电话">
                <input name="email" maxlength="80" placeholder="邮箱" autocomplete="email" inputmode="email" aria-label="邮箱">
                <input name="wechat" maxlength="40" placeholder="微信号" autocomplete="off" aria-label="微信号">
              </div>
              <textarea name="message" maxlength="800" required placeholder="留言"></textarea>
              <div class="ask-actions">
                <button class="btn" type="submit">点击提交</button>
                <button class="btn" type="button" id="showWx">加我微信</button>
              </div>
            </form>
          </div>
        </article>
      </section>

      <p class="foot">MedRegData 与 FDA、欧盟委员会、NMPA、PMDA、TGA 等监管机构无隶属关系，记录仅供检索参考。口径日期：2026-10-14。</p>
  </main>
</div>
<div class="wx-modal" id="wxModal" hidden>
  <button class="wx-backdrop" type="button" id="wxBackdrop" aria-label="关闭"></button>
  <div class="wx-card" role="dialog" aria-modal="true" aria-label="微信二维码">
    <button class="wx-close" type="button" id="wxClose" aria-label="关闭">×</button>
    <img src="/medregdata/wechat-qr.jpg" alt="Marvin 的微信二维码。扫二维码，添加我为朋友。" width="592" height="754">
  </div>
</div>
<button type="button" class="to-top" id="toTop" aria-label="回到顶部" title="回到顶部">
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
</button>
<script>
(function () {
  var btn = document.getElementById("toTop");
  if (!btn) return;
  function sync() { btn.classList.toggle("on", window.scrollY > 480); }
  btn.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", sync, { passive: true });
  sync();
})();
(function () {
  var openBtn = document.getElementById("showAsk");
  var form = document.getElementById("askForm");
  if (openBtn && form) {
    openBtn.addEventListener("click", function () {
      var open = form.hasAttribute("hidden");
      if (open) form.removeAttribute("hidden");
      else form.setAttribute("hidden", "");
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var box = form.querySelector("textarea");
        if (box) box.focus();
      }
    });
  }
  var modal = document.getElementById("wxModal");
  var showWx = document.getElementById("showWx");
  function setWx(open) {
    if (!modal) return;
    if (open) modal.removeAttribute("hidden");
    else modal.setAttribute("hidden", "");
  }
  if (showWx) showWx.addEventListener("click", function () { setWx(true); });
  var backdrop = document.getElementById("wxBackdrop");
  var close = document.getElementById("wxClose");
  if (backdrop) backdrop.addEventListener("click", function () { setWx(false); });
  if (close) close.addEventListener("click", function () { setWx(false); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setWx(false);
  });
})();
</script>
</body>
</html>`;
}
