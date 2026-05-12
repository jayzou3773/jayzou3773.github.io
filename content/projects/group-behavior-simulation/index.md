---
title: "Organized Group Behavior Simulation"
summary: "Simulating how organized groups make decisions — a new task, benchmark (GROVE), and structured analytical framework."
---

## Simulating Organized Group Behavior: New Framework, Benchmark, and Analysis

**Xinkai Zou\***, Yiming Huang\*, Zhuohang Wu, Jian Sha, Nan Huang, Longfei Yun, Jingbo Shang, Letian Peng

\[[Paper](https://arxiv.org/abs/2604.09874)\] \[[Code](https://github.com/jayzou3773/Organized-Group-Behavior-Simulation)\] \[[Dataset](https://huggingface.co/datasets/jayzou3773/GROVE)\]

---

### Abstract

Simulating how organized groups (e.g., corporations) make decisions (e.g., responding to a competitor's move) is essential for understanding real-world dynamics and could benefit relevant applications (e.g., market prediction). In this paper, we formalize this problem as a concrete research platform for group behavior understanding, providing: (1) a task definition with benchmark and evaluation criteria, (2) a structured analytical framework with a corresponding algorithm, and (3) detailed temporal and cross-group analysis.

We introduce **Organized Group Behavior Simulation**, which models organized groups as collective entities. Given a group facing a particular situation, the task predicts the decision it would make. We present **GROVE**, a benchmark containing 44 entities with 8,052 real-world context-decision pairs from Wikipedia and TechCrunch across 9 domains, including evaluation protocols assessing consistency, initiative, scope, magnitude, and horizon.

Beyond basic prompting approaches, we propose a framework converting collective decision-making events into interpretable, adaptive, and traceable behavioral models, outperforming summarization and retrieval-based baselines. The approach includes an adapter mechanism for time-aware evolution and group-aware transfer, plus traceable evidence nodes grounding each decision rule in originating historical events. Analysis reveals temporal behavioral drift within individual groups, which the time-aware adapter effectively captures, and structured cross-group similarity enabling knowledge transfer for data-scarce organizations.

---

### Links

| | |
|---|---|
| **Paper** | [arXiv:2604.09874](https://arxiv.org/abs/2604.09874) |
| **Code** | [github.com/jayzou3773/Organized-Group-Behavior-Simulation](https://github.com/jayzou3773/Organized-Group-Behavior-Simulation) |
| **Dataset** | [GROVE on HuggingFace](https://huggingface.co/datasets/jayzou3773/GROVE) |
