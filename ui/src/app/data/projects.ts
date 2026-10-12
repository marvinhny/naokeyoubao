export type Status = "进行中" | "想法" | "已实现" | "已失败";

export interface Project {
  slug: string;
  name: string;
  sub?: string;
  status: Status;
  date: string;
  summary: string;
  notes: string[];
}

export const projects: Project[] = [
  {
    slug: "yunqi-2026",
    name: "云栖大会2026",
    status: "进行中",
    date: "2026.10",
    summary: "在云栖大会上看到的、想到的、准备动手的。",
    notes: ["现场笔记待整理", "值得跟进的 AI 产品", "会后行动清单"],
  },
  {
    slug: "medkoala",
    name: "医械小考拉",
    sub: "MedKoala",
    status: "想法",
    date: "2026.09",
    summary: "一只帮医疗器械从业者备考、查法规的小考拉。",
    notes: ["目标用户：医械注册 / 质量岗位", "核心功能：题库 + 法规速查", "下一步：做一个最小可用原型"],
  },
];

export const statusDot: Record<Status, string> = {
  进行中: "bg-[#0062ad]",
  想法: "bg-[#f2b134]",
  已实现: "bg-[#3a9d5d]",
  已失败: "bg-[#9a9a9a]",
};
