export type Lang = "en" | "zh";

export const LANG_STORAGE_KEY = "maker-flow-lang";

export type WorkflowItem = {
  step: string;
  title: string;
  body: string;
  input: string;
  output: string;
  isGate?: boolean;
};

export type FeatureItem = {
  title: string;
  desc: string;
  badge: string;
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
  badgeText: string;
  quickStartCmd: string;
  copied: string;
  copyCmd: string;
  gateNotice: string;
  inputLabel: string;
  outputLabel: string;
  architectureTitle: string;
  architectureLead: string;
  factoryBoxTitle: string;
  factoryBoxDesc: string;
  productBoxTitle: string;
  productBoxDesc: string;
  featuresTitle: string;
  featuresLead: string;
  features: FeatureItem[];
  terminalHeader: string;
  terminalTabWorkflow: string;
  terminalTabSetup: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    github: "GitHub",
    headline: "Personal MVP builder's pipeline",
    support:
      "Infrastructure first. Business logic second. Skip repetitive setup so every idea can become a production-ready MVP in minutes.",
    ctaPrimary: "View on GitHub",
    ctaSecondary: "Explore 6-Step Workflow",
    workflowTitle: "Six-step pipeline",
    workflowLead:
      "Hard gates at PRO confirmation and MVP acceptance — agents assemble and publish only after you say yes.",
    workflow: [
      {
        step: "01",
        title: "Requirement",
        body: "State your idea in natural language. Outline target features and goals.",
        input: "User prompt / Ideas",
        output: "Raw requirement notes",
        isGate: false,
      },
      {
        step: "02",
        title: "Draft PRO",
        body: "Agent analyzes requirements and generates a complete, confirmable product requirement outline.",
        input: "Requirement notes",
        output: "Draft pro.md outline",
        isGate: false,
      },
      {
        step: "03",
        title: "Confirm PRO",
        body: "You review and approve the PRO document. Scope and tech stack are locked before writing code.",
        input: "Draft pro.md",
        output: "Confirmed pro.md",
        isGate: true,
      },
      {
        step: "04",
        title: "Assemble",
        body: "Match templates from the factory and assemble a fully runnable MVP application in your product repo.",
        input: "Confirmed pro.md",
        output: "Source code & docker config",
        isGate: false,
      },
      {
        step: "05",
        title: "Accept MVP",
        body: "Verify acceptance criteria locally with containerized builds and health checks.",
        input: "Runnable containers",
        output: "Acceptance pass",
        isGate: true,
      },
      {
        step: "06",
        title: "Publish",
        body: "Deploy seamlessly to your chosen target — Cloudflare Pages, Vercel, VPS container, or split targets.",
        input: "Accepted MVP",
        output: "Live public URL",
        isGate: false,
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
    badgeText: "Open Source Developer Pipeline • v1.0",
    quickStartCmd: "Quick Start",
    copied: "Copied!",
    copyCmd: "Copy Command",
    gateNotice: "Hard Gate: Human Approval Required",
    inputLabel: "Input",
    outputLabel: "Output",
    architectureTitle: "Shared Factory Architecture",
    architectureLead:
      "Keep factory templates and skills centralized while your product repositories remain clean and business-focused.",
    factoryBoxTitle: "$MAKER_FLOW_ROOT (Shared Factory)",
    factoryBoxDesc: "Hosts reusable skills/, templates/, and release/ deployment playbooks across all your apps.",
    productBoxTitle: "./ (Product Repository)",
    productBoxDesc: "Contains confirmed pro.md and application business code exclusively.",
    featuresTitle: "Why Maker Flow?",
    featuresLead: "Designed from the ground up to maximize developer velocity and architectural elegance.",
    features: [
      {
        title: "Hard Approval Gates",
        desc: "Agents never write code or publish without explicit human approval at steps 3 & 5.",
        badge: "Safety First",
      },
      {
        title: "Zero Repository Bloat",
        desc: "Shared skills & build templates remain in the factory — never duplicated into product repos.",
        badge: "Clean Code",
      },
      {
        title: "Production Ready Out-of-the-box",
        desc: "Docker Compose, Nginx health checks, and CI/CD target setups pre-configured automatically.",
        badge: "Containerized",
      },
      {
        title: "Multi-Target Deployment",
        desc: "Ship seamlessly to Pages, Vercel, VPS Docker, or split frontend/backend hosting.",
        badge: "Flexible",
      },
    ],
    terminalHeader: "maker-flow CLI — AI Driven Workflow",
    terminalTabWorkflow: "Pipeline Workflow",
    terminalTabSetup: "Quick Installation",
  },
  zh: {
    github: "GitHub",
    headline: "个人 MVP 构建流水线",
    support:
      "基础设施优先，业务逻辑其次。省去重复脚手架，让每个想法都能在数分钟内变成可上线的 MVP。",
    ctaPrimary: "前往 GitHub",
    ctaSecondary: "查看 6 步流程",
    workflowTitle: "六步流水线",
    workflowLead:
      "在确认 PRO 与验收 MVP 两处设硬门禁——只有你点头后，代理才会组装与发布。",
    workflow: [
      {
        step: "01",
        title: "提出需求",
        body: "用自然语言说清想法，规划核心功能与目标。",
        input: "自然语言 Prompt / 想法",
        output: "需求草案笔记",
        isGate: false,
      },
      {
        step: "02",
        title: "起草 PRO",
        body: "代理整理成完整、可确认的产品需求大纲 (PRO)。",
        input: "需求笔记",
        output: "pro.md 草案",
        isGate: false,
      },
      {
        step: "03",
        title: "确认 PRO",
        body: "你批准范围与技术选型后，才开始编写组装代码。",
        input: "pro.md 草案",
        output: "确立的 pro.md",
        isGate: true,
      },
      {
        step: "04",
        title: "组装 MVP",
        body: "匹配工厂模板，在产品仓库生成完整可运行的 MVP。",
        input: "确立的 pro.md",
        output: "业务代码与 Docker 配置",
        isGate: false,
      },
      {
        step: "05",
        title: "验收 MVP",
        body: "在本地用容器核对验收标准与健康检查接口。",
        input: "可运行容器",
        output: "通过验收测试",
        isGate: true,
      },
      {
        step: "06",
        title: "发布",
        body: "按你选择的目标发布——Pages、Vercel、VPS 或拆分部署。",
        input: "通过验收的 MVP",
        output: "线上公网 URL",
        isGate: false,
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
    badgeText: "开源开发者 MVP 构建流水线 • v1.0",
    quickStartCmd: "快速开始",
    copied: "已复制！",
    copyCmd: "复制命令",
    gateNotice: "硬门禁：需要人工确认",
    inputLabel: "输入",
    outputLabel: "输出",
    architectureTitle: "共享工厂架构模式",
    architectureLead:
      "将通用的脚手架、AI 技能与发布脚本留在工厂，保持每个产品仓库极致干净并聚焦业务逻辑。",
    factoryBoxTitle: "$MAKER_FLOW_ROOT (共享工厂)",
    factoryBoxDesc: "存放跨项目通用的 skills/ 技能、templates/ 模板与 release/ 发布手册。",
    productBoxTitle: "./ (产品业务仓库)",
    productBoxDesc: "仅包含确立的 pro.md 文件与本产品的核心业务代码。",
    featuresTitle: "为什么选择 Maker Flow？",
    featuresLead: "专为提高独立开发者极速变现与代码规范设计。",
    features: [
      {
        title: "双重硬门禁控制",
        desc: "代理在步骤 3 (确认 PRO) 与步骤 5 (验收 MVP) 必须获得人工确认后才可继续。",
        badge: "安全合规",
      },
      {
        title: "零仓库污染",
        desc: "通用构建模板与 AI 脚本保留在共享工厂，不重复拷贝至业务仓库。",
        badge: "代码优雅",
      },
      {
        title: "开箱即用容器化",
        desc: "预制 Docker Compose 环境与 /health 健康检查，无缝本地构建体验。",
        badge: "开箱即用",
      },
      {
        title: "多目标无缝部署",
        desc: "灵活支持发布至 Cloudflare Pages、Vercel、独立 VPS 或前后端拆分部署。",
        badge: "灵活无界",
      },
    ],
    terminalHeader: "maker-flow 命令行 — AI 驱动流水线",
    terminalTabWorkflow: "流水线作业",
    terminalTabSetup: "快速安装指南",
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

