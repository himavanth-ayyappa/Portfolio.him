export const profile = {
  name: "Himavanth Ayyappa",
  fullName: "Koppuravuri Himavanth Ayyappa",
  location: "Hyderabad, IN",
  coords: "17.38\u00b0N 78.48\u00b0E",
  status: "Open to work",
  tagline:
    " \u2014 Optimizes CUDA kernels at a defence lab, ships RAG pipelines on weekends. B.Tech CSD @ KMIT \u00b7 Diploma @ IIT Madras.",
  email: "himavanthayyappakoppuravuri@gmail.com",
  phone: "9110721175",
  github: "https://github.com/himavanth-ayyappa",
  githubUser: "himavanth-ayyappa",
  linkedin:
    "https://www.linkedin.com/in/himavanth-ayyappa-koppuravuri-733025333/",
  resumeFile: "/resume.pdf",
};

export const metrics = [
  { value: "12", unit: "x", label: "GPU speedup, DRDL workloads" },
  { value: "<2", unit: "s", label: "offline LLM inference on mobile" },
  { value: "94", unit: "%", label: "LSTM forecast accuracy, SIH 2024" },
];

export const experience = [
  {
    org: "DRDL \u2014 Defence Research & Development Laboratory",
    role: "Research HPC intern",
    period: "2025\u201426",
    summary:
      "12x CUDA speedup \u00b7 NVIDIA MPS \u00b7 50+ profiling sessions \u00b7 multi-node MPI scaling",
    bullets: [
      "Accelerated CPU workloads using CUDA C, achieving up to 91.7% runtime reduction (12x) through efficient GPU parallelization.",
      "Implemented and evaluated NVIDIA MPS to enable concurrent multi-process GPU execution, improving SM utilization and throughput.",
      "Conducted 50+ performance profiling, debugging, and kernel optimization sessions using tools like gprof, ensuring 100% execution stability for Reynold's Equations.",
      "Performed HPC scaling analysis across multi-node, multi-GPU configurations, identifying node topology and MPI communication overhead as key scalability factors; automated benchmarking and visualization with Python.",
    ],
  },
];

export const recognition = [
  "SIH 2024 national finalist",
  "Green Tech Hackathon 2025 finalist (80+ teams)",
  "Member of Recurse -Techniacl club"
];
