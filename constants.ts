
import { GroupedOption } from "./types";

export const SCENARIO_OPTIONS: GroupedOption[] = [
  {
    label: "🚀 通用与日常",
    options: [
      "通用/智能助手",
      "生活百科/常识问答",
      "行程规划/旅游攻略",
      "复杂逻辑推理",
      "语言翻译/本地化",
      "食谱/烹饪指南",
      "健康与健身建议"
    ]
  },
  {
    label: "💻 编程与技术",
    options: [
      "Python 脚本/爬虫",
      "前端开发 (React/Vue)",
      "后端架构 (Node/Go/Java)",
      "SQL 数据库查询优化",
      "代码审查 (Code Review)",
      "Bug 调试与修复",
      "算法与数据结构",
      "Linux/运维/DevOps",
      "正则表达式生成",
      "API 文档撰写"
    ]
  },
  {
    label: "✍️ 内容创作 & 新媒体",
    options: [
      "自媒体爆款标题 (Viral Titles)",
      "广告文案策划 (Ad Copywriting)",
      "品牌故事 (Brand Story)",
      "小红书种草文案",
      "抖音/TikTok 短视频脚本",
      "公众号文章/推文",
      "知乎高赞回答风格",
      "SEO 优化文章",
      "博客文章 (Blog Post)",
      "Twitter/微博 140字短评",
      "YouTube 视频大纲",
      "播客 (Podcast) 逐字稿"
    ]
  },
  {
    label: "💼 职场、商业与外贸",
    options: [
      "外贸开发信 (Cold Email)",
      "外贸询盘回复 (Inquiry Reply)",
      "跨境电商 Listing 优化 (Amazon/Shopify)",
      "专业邮件 (Email)",
      "周报/日报撰写",
      "会议纪要/总结",
      "商业计划书 (BP)",
      "SWOT 分析",
      "产品需求文档 (PRD)",
      "市场营销策略",
      "求职简历 (Resume) 优化",
      "模拟面试官",
      "Excel/Google Sheets 公式"
    ]
  },
  {
    label: "🎓 教育、学术与培训",
    options: [
      "早教启蒙方案 (Early Education)",
      "亲子共读/互动游戏 (Parenting)",
      "外语口语陪练 (Language Partner)",
      "语法解析与纠错 (Grammar Helper)",
      "单词记忆/词源讲解",
      "课程大纲设计 (Curriculum Design)",
      "教案与教学设计 (Lesson Planning)",
      "企业员工培训方案 (Corporate Training)",
      "在线课程/微课脚本 (Online Course Script)",
      "试卷与习题生成 (Quiz/Exam Generation)",
      "学生评语与反馈 (Student Feedback)",
      "知识点通俗类比讲解 (ELI5)",
      "苏格拉底式教学引导 (Socratic Method)",
      "学术论文润色 (Paper Polishing)",
      "文献综述 (Literature Review)",
      "雅思/托福/GRE 备考辅导",
      "考公/申论写作",
      "复杂的数学/理科问题求解"
    ]
  },
  {
    label: "🎨 创意写作、设计 & 文生图",
    options: [
      "悬疑/推理小说 (Mystery/Thriller)",
      "言情/网文风格 (Romance/Web Novel)",
      "武侠/仙侠小说 (Wuxia/Xianxia)",
      "恐怖/怪谈故事 (Horror)",
      "剧本杀剧本创作 (LARP Script)",
      "儿童绘本故事 (Children's Book)",
      "同人小说创作 (Fanfiction)",
      "Midjourney/SD 提示词 (通用)",
      "摄影写实风格 (Photorealistic)",
      "Logo 设计 (Logo Design)",
      "二次元/动漫风格 (Anime Style)",
      "建筑与室内设计 (Architecture & Interior)",
      "图标与 UI 素材 (Icons & UI Assets)",
      "科幻/奇幻小说创作",
      "剧本/电影大纲",
      "诗歌/歌词创作",
      "游戏世界观设定",
      "角色扮演 (Roleplay)",
      "脱口秀/相声段子"
    ]
  },
  {
    label: "⚖️ 法律与行政",
    options: [
      "合同条款解读",
      "法律免责声明",
      "公文写作",
      "行政通知/公告",
      "政策解读"
    ]
  },
  {
    label: "🧠 心理与情感",
    options: [
      "情感咨询/倾听",
      "心理安慰/鼓励",
      "冲突调解",
      "情书/道歉信",
      "塔罗/占星解读 (娱乐)"
    ]
  }
];

export const TONE_OPTIONS: GroupedOption[] = [
  {
    label: "😐 不紧不慢 (中性)",
    options: [
      "中性/客观 (Neutral)",
      "清晰/简洁 (Clear)",
      "事实导向 (Factual)",
      "平衡/公正 (Balanced)"
    ]
  },
  {
    label: "👔 专业职场",
    options: [
      "专业/正式 (Professional)",
      "权威/坚定 (Authoritative)",
      "礼貌/委婉 (Polite)",
      "极简主义 (Minimalist)",
      "有说服力 (Persuasive)",
      "高管/领导力风格 (Executive)"
    ]
  },
  {
    label: "🔥 热情与营销",
    options: [
      "热情/激动 (Enthusiastic)",
      "紧迫感 (Urgent)",
      "煽动性/夸张 (Hype)",
      "富有感染力 (Inspiring)",
      "自信/大胆 (Confident)",
      "小红书/种草风 (Influencer)"
    ]
  },
  {
    label: "😊 亲切与情感",
    options: [
      "友好/乐于助人 (Friendly)",
      "幽默/风趣 (Humorous)",
      "富有同理心 (Empathetic)",
      "温柔/治愈 (Gentle)",
      "俏皮/可爱 (Playful)",
      "讽刺/黑色幽默 (Sarcastic)"
    ]
  },
  {
    label: "🎓 学术与深度",
    options: [
      "学术/严谨 (Academic)",
      "分析性/深度 (Analytical)",
      "教学/指导性 (Instructional)",
      "哲学/思辨 (Philosophical)",
      "批判性思维 (Critical)"
    ]
  },
  {
    label: "🎭 创意与风格化",
    options: [
      "诗意/浪漫 (Poetic)",
      "戏剧性 (Dramatic)",
      "赛博朋克风 (Cyberpunk)",
      "古风/文言文 (Classical Chinese)",
      "悬疑/神秘 (Mysterious)",
      "儿童读物风格 (Child-friendly)"
    ]
  }
];
