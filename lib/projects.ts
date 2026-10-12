export type Status = "进行中" | "想法" | "已完成" | "已实现" | "已失败";

export interface Project {
  slug: string;
  name: string;
  sub?: string;
  status: Status;
  date: string;
  summary: string;
  notes: string[];
  /** 填写后，首页点击直接打开该地址。 */
  href?: string;
  /** 还没长出来：点击只提示，不跳转。 */
  unripe?: boolean;
}

/** 新增一个包：在这里加一条，首页的包和入口卡片会一起出现。 */
export const projects: Project[] = [
  {
    slug: "yunqi-2026",
    name: "云栖大会2026",
    status: "已完成",
    date: "2026.10",
    href: "/yunqi-2026",
    summary: "在云栖大会上看到的、想到的、准备动手的。",
    notes: ["现场笔记待整理", "值得跟进的 AI 产品", "会后行动清单"],
  },
  {
    slug: "medregdata",
    name: "全球医械数据库",
    sub: "medregdata.com",
    status: "进行中",
    date: "2026.10",
    href: "https://medregdata.com",
    summary: "全球医疗器械注册数据。",
    notes: [],
  },
  {
    slug: "medkoala",
    name: "医械小考拉",
    sub: "MedKoala",
    status: "想法",
    date: "2026.09",
    unripe: true,
    summary: "一只帮医疗器械从业者备考、查法规的小考拉。",
    notes: ["目标用户：医械注册 / 质量岗位", "核心功能：题库 + 法规速查", "下一步：做一个最小可用原型"],
  },
];

export const statusDot: Record<Status, string> = {
  进行中: "bg-[var(--theme)]",
  想法: "bg-[#f2b134]",
  已完成: "bg-[#3a9d5d]",
  已实现: "bg-[#3a9d5d]",
  已失败: "bg-[#9a9a9a]",
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectHref(project: Project) {
  return project.href ?? `/projects/${project.slug}`;
}
