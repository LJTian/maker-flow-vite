export type Lang = "en" | "zh";

export const LANG_STORAGE_KEY = "maker-flow-lang";

type WorkflowItem = {
  step: string;
  title: string;
  body: string;
};

type Copy = {
  github: string;
  headline: string;
  support: string;
  ctaPrimary: string;
  ctaSecondary: string;
  workflowTitle: string;
  workflowLead: string;
  workflow: WorkflowItem[];
  audienceTitle: string;
  audienceBody: string;
  differenceTitle: string;
  differenceBody: string;
  differenceCta: string;
  repository: string;
  issues: string;
  factoryLabel: string;
  factorySub: string;
  productLabel: string;
  productSub: string;
  langEn: string;
  langZh: string;
  langSwitchAria: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    github: "GitHub",
    headline: "Personal MVP builder's pipeline",
    support:
      "Infrastructure first. Business logic second. Skip repetitive setup so every idea can become a production-ready MVP in minutes.",
    ctaPrimary: "View on GitHub",
    ctaSecondary: "See the six steps",
    workflowTitle: "Six-step pipeline",
    workflowLead:
      "Hard gates at PRO confirmation and MVP acceptance — agents assemble and publish only after you say yes.",
    workflow: [
      {
        step: "01",
        title: "Requirement",
        body: "State the idea in plain language.",
      },
      {
        step: "02",
        title: "Draft PRO",
        body: "Agent turns it into a confirmable product outline.",
      },
      {
        step: "03",
        title: "Confirm PRO",
        body: "You approve scope before any code is assembled.",
      },
      {
        step: "04",
        title: "Assemble",
        body: "Match templates and build a runnable MVP in the product repo.",
      },
      {
        step: "05",
        title: "Accept MVP",
        body: "Verify acceptance criteria locally with containers.",
      },
      {
        step: "06",
        title: "Publish",
        body: "Ship to the target you choose — Pages, Vercel, VPS, or split.",
      },
    ],
    audienceTitle: "Built for solo builders",
    audienceBody:
      "If you repeatedly stand up the same Docker, API, and UI scaffolding before writing product logic, maker-flow keeps the factory shared and the product repo focused on business code only.",
    differenceTitle: "Not another blank scaffold",
    differenceBody:
      "Templates, skills, and release playbooks live in the factory. Each product gets a confirmed PRO, matched apps, and a path to publish — without copying the whole toolchain into every repo.",
    differenceCta: "Open the repository",
    repository: "Repository",
    issues: "Issues",
    factoryLabel: "factory",
    factorySub: "templates · skills · release",
    productLabel: "product",
    productSub: "business code only",
    langEn: "EN",
    langZh: "中文",
    langSwitchAria: "Switch language",
  },
  zh: {
    github: "GitHub",
    headline: "个人 MVP 构建流水线",
    support:
      "基础设施优先，业务逻辑其次。省去重复脚手架，让每个想法都能在数分钟内变成可上线的 MVP。",
    ctaPrimary: "前往 GitHub",
    ctaSecondary: "查看六步流程",
    workflowTitle: "六步流水线",
    workflowLead:
      "在确认 PRO 与验收 MVP 两处设硬门禁——只有你点头后，代理才会组装与发布。",
    workflow: [
      {
        step: "01",
        title: "提出需求",
        body: "用自然语言说清想法。",
      },
      {
        step: "02",
        title: "起草 PRO",
        body: "代理整理成可确认的产品大纲。",
      },
      {
        step: "03",
        title: "确认 PRO",
        body: "你批准范围后，才开始组装代码。",
      },
      {
        step: "04",
        title: "组装 MVP",
        body: "匹配模板，在产品仓库生成可运行 MVP。",
      },
      {
        step: "05",
        title: "验收 MVP",
        body: "在本地用容器核对验收标准。",
      },
      {
        step: "06",
        title: "发布",
        body: "按你选择的目标发布——Pages、Vercel、VPS 或拆分部署。",
      },
    ],
    audienceTitle: "为独立构建者而生",
    audienceBody:
      "如果你总是在写业务逻辑前反复搭建同一套 Docker、API 与 UI 脚手架，maker-flow 把工厂能力共享出来，让产品仓库只留下业务代码。",
    differenceTitle: "不是又一个空白脚手架",
    differenceBody:
      "模板、技能与发布手册留在工厂里。每个产品都有确认过的 PRO、匹配的应用，以及发布路径——无需把整套工具链复制进每个仓库。",
    differenceCta: "打开仓库",
    repository: "仓库",
    issues: "Issues",
    factoryLabel: "工厂",
    factorySub: "模板 · 技能 · 发布",
    productLabel: "产品",
    productSub: "仅业务代码",
    langEn: "EN",
    langZh: "中文",
    langSwitchAria: "切换语言",
  },
};

export function readStoredLang(): Lang {
  try {
    const value = localStorage.getItem(LANG_STORAGE_KEY);
    if (value === "en" || value === "zh") {
      return value;
    }
  } catch {
    // ignore
  }
  return "en";
}
