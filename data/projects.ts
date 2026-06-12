export type CaseSection = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  badge?: string;
  period: string;
  oneLiner: string;
  tools: string[];
  links?: { label: string; href: string }[];
  caseStudy?: {
    problem: string;
    sections: CaseSection[];
    results: string[];
  };
};

export const projects: Project[] = [
  
  {
    slug: "ai-document-assistant",
    title: "AI Document Assistant",
    period: "Mar\u2014Apr 2026",
    oneLiner:
      "Full-stack RAG application: natural-language Q&A over uploaded documents with agentic multi-step workflows.",
    tools: ["Python", "FastAPI", "LangChain", "ChromaDB", "React", "Hugging Face"],
    caseStudy: {
      problem:
        "Reading long documents to answer specific questions is slow. The goal: upload any document and ask questions in natural language, with answers grounded in the actual text instead of model hallucination.",
      sections: [
        {
          heading: "RAG pipeline",
          body: "Implemented a Retrieval-Augmented Generation pipeline with LangChain: documents are chunked, embedded, and stored in a vector database (ChromaDB/FAISS). At query time, semantic search retrieves the most relevant context, which is injected into the prompt for grounded generation.",
        },
        {
          heading: "Agentic workflows",
          body: "Designed LangChain agents for multi-step task automation \u2014 document parsing, retrieval, and summarization chained as discrete tool calls rather than a single monolithic prompt, which keeps each step inspectable and debuggable.",
        },
        {
          heading: "Stack",
          body: "FastAPI backend serving the pipeline, React frontend for upload and chat. Open-source LLMs integrated via Hugging Face, so the system runs without proprietary API dependencies.",
        },
      ],
      results: [
        "End-to-end grounded Q&A over arbitrary user documents",
        "Swappable open-source LLM backend via Hugging Face",
        "Agentic parsing \u2192 retrieval \u2192 summarization workflows",
      ],
    },
  },
  {
    slug: "pocket-llm",
    title: "Pocket LLM",
    period: "Feb\u2014May 2025",
    oneLiner:
      "Fully offline mobile AI assistant \u2014 on-device LLM inference under 2 seconds, no network required.",
    tools: ["Kotlin", "JNI", "llama.cpp", "Orca-Mini-3B", "GGUF"],
    caseStudy: {
      problem:
        "Cloud assistants leak every query off-device and die without connectivity. The goal: a phone assistant with calls, SMS, alarms, and reminders where the LLM runs entirely on the handset.",
      sections: [
        {
          heading: "On-device inference",
          body: "Integrated llama.cpp through JNI to run quantized GGUF models (Orca-Mini-3B) natively on Android, achieving sub-2s response times with 100% offline inference \u2014 nothing leaves the device, which makes privacy compliance trivial.",
        },
        {
          heading: "Assistant features",
          body: "Built 5+ core assistant capabilities \u2014 calls, SMS, alarms, reminders \u2014 wired to the local model's intent parsing, so natural-language commands map to system actions without a cloud NLU service.",
        },
        {
          heading: "Validation",
          body: "Tested across 10+ real user query patterns, maintaining consistent conversational accuracy within the constraints of a 3B-parameter quantized model.",
        },
      ],
      results: [
        "Sub-2s on-device inference, fully offline",
        "5+ assistant features driven by local intent parsing",
        "Zero data egress \u2014 privacy by architecture",
      ],
    },
  },
  {
    slug: "water-demand-forecasting",
    title: "Forecasting Future Water Requirements",
    badge: "SIH 2024 finalist",
    period: "Dec 2024",
    oneLiner:
      "LSTM/BiLSTM models forecasting district-level water demand at 94% accuracy \u2014 national finalist, Smart India Hackathon 2024.",
    tools: ["MERN", "BiLSTM", "Prophet", "Tableau", "MongoDB"],
    caseStudy: {
      problem:
        "District planners had no forward view of water demand against reservoir storage. The goal: forecast demand and availability years ahead using rainfall trends, population growth, and groundwater usage projections, so regions can plan against deficits before they happen.",
      sections: [
        {
          heading: "Approach",
          body: "Built predictive LSTM and BiLSTM models reaching 94% accuracy on district-level water demand and reservoir storage. Inputs combined rainfall trends, population growth curves, and groundwater usage projections. Prophet handled seasonal decomposition for the longer-horizon trends.",
        },
        {
          heading: "Pipeline design",
          body: "Designed a multi-model pipeline that computes future water availability against demand balance, enabling scenario-based planning for a selected region and target year. A MongoDB schema handled 10,000+ data points, exposed through RESTful APIs for real-time retrieval into the dashboard.",
        },
        {
          heading: "Visualization",
          body: "Tableau dashboards surfaced demand-supply balance per district and scenario, giving non-technical evaluators an immediate read on which regions go water-negative and when.",
        },
      ],
      results: [
        "94% forecast accuracy across LSTM/BiLSTM models",
        "National finalist \u2014 Smart India Hackathon 2024",
        "Scenario-based planning over 10,000+ data points via REST APIs",
      ],
    },
  },
  {
    slug: "dyslexic-kids",
    title: "Dyslexic Kids",
    period: "Sep\u2014Dec 2024",
    oneLiner:
      "Real-time facial expression tracking that personalizes therapy sessions for dyslexic children.",
    tools: ["MERN", "ViT (Hugging Face)", "Node.js", "Express"],
    links: [{ label: "GitHub", href: "https://github.com/himavanth-ayyappa" }],
    caseStudy: {
      problem:
        "Therapists can't continuously read a child's emotional state during sessions. The goal: track facial expressions in real time and feed emotion signals back into the session so it adapts to the child.",
      sections: [
        {
          heading: "Expression model",
          body: "Integrated a Vision Transformer from Hugging Face for facial expression analysis at 92% accuracy, classifying emotional states from live video to personalize therapy pacing and content.",
        },
        {
          heading: "Backend architecture",
          body: "Designed microservices-inspired backend services with a low-latency Node.js/Express pipeline that processes video frames and streams emotion updates over REST APIs to the therapist dashboard.",
        },
        {
          heading: "Reliability",
          body: "Built secure authentication and authorization with idempotency and rate limiting, keeping dashboard operations reliable under repeated or concurrent requests.",
        },
      ],
      results: [
        "92% expression-classification accuracy with ViT",
        "Low-latency frame \u2192 emotion \u2192 dashboard streaming",
        "Hardened auth with idempotency and rate limiting",
      ],
    },
  },
];
