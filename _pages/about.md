---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

# 🎓 About Me
I am a first-year master student with Master of Science in Computer Science in UC, San Diego <img src="../images/ucsd.png" width="16" style="vertical-align: right;"/>. Previously, I graduated with B.Eng in Software Engieering at <img src="../images/tongji.png" width="16" style="vertical-align: right;"/> Tongji University. During my undergraduate studies, I spent one semester as an exchange student at <img src="../images/ucb.png" width="16" style="vertical-align: right;"/> the University of California, Berkeley, and participated in the AI Summer School at <img src="../images/wlu.png" width="16" style="vertical-align: right;"/> Westlake University.

My research interests are LLM Post-training, MoE, LLM System, and HCI. 


# 🔥 News
- *2025.10*: &nbsp;🔥🔥 Had a wonderful time participating in the **MIT–UF–NU 2025 Joint Summer Research Camp**, working with [Dr. Xuan Jiang](https://xuan-1998.github.io/) and [Prof. Jinhua Zhao](https://mobility.mit.edu/people/jinhua-zhao/) on the paper [*Towards Generalizable Context-aware Anomaly Detection: A Large-scale Benchmark in Cloud Environments*](https://arxiv.org/abs/2508.01844v2), and had the chance to meet and learn from many inspiring researchers.
- *2025.09*: &nbsp;🎉🎉 Excited to start my master study at UCSD.
- *2025.07*: &nbsp;🎓🎓 Graduated from Tongji University! Thanks for all!
- *2025.06*: &nbsp;🔥🔥 My first co-authored paper with [Peiran Li](https://scholar.google.com/citations?user=AbleBdQAAAAJ&hl=en) under supervision of [Prof. Zhengzhong Tu](https://vztu.github.io/) is on Arxiv, [SAFEFLOW: A Principled Protocol for Trustworthy and Transactional Autonomous Agent Systems](https://www.arxiv.org/abs/2506.07564)
- *2025.05*: &nbsp;🔥🔥 Successfully defended undergraduate thesis titled "Research and Application of a Multi-Agent-Based Agile Requirements Elicitation Methodology"(基于多智能体的敏捷需求诱导方法研究与应用) with a perfect score (5/5)
- *2025.03*: &nbsp;🔥🔥 My first paper as a first author is on Arxiv, [Goal2Story: A Multi-Agent Fleet based on Privately Enabled sLLMs for Impacting Mapping on Requirements Elicitation](https://arxiv.org/abs/2503.13279). 
- *2024.05*: &nbsp;🎉🎉 Happy to join the Future Lab, Tsinghua University as a research assistant, collaborating with [Jiachen Du](https://www.milab.design/team-2/du-jiachen).
- *2023.12*: &nbsp;🎉🎉 Happy to join the Tongji-MIT City Science Lab as a research assistant and developer, collaborating with [Chance Jiajie Li](https://www.media.mit.edu/people/jiajie/overview/).


# 📝 Publications 
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CHI 2026 Poster</div><img src='images/chi2026poster.png' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

Kairotask: Probing the Bridge Between Vague Intents and Spatiotemporal Contexts

Jiachen Du, Yuanhao Zhang, Hengyu Jin, **Xinkai Zou**, Junwei Zhu, Xinyi Fu

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv</div><img src='images/website_poster.jpg' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

[Towards Generalizable Context-aware Anomaly Detection: A Large-scale Benchmark in Cloud Environments](https://arxiv.org/abs/2508.01844v2)

**Xinkai Zou**, Xuan Jiang, Ruikai Huang, Haoze He, Parv Kapoor, Hongrui Wu, Yibo Wang, Jian Sha, Xiongbo Shi, Zixun Huang, Jinhua Zhao

[**Project Page**](https://jayzou3773.github.io/cloudanobench-agent/) [**Paper**](https://arxiv.org/abs/2508.01844v2) [**Dataset**](https://huggingface.co/datasets/jayzou3773/CloudAnoBench)
- CloudAnoBench: A large-scale benchmark that provides labeled context anomalies in cloud environments by integrating metrics and logs.
- CloudAnoAgent: An LLM-based agent system with symbolic verification that jointly analyzes metrics and logs for robust context-aware anomaly detection.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv</div><img src='images/safeflow.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[SAFEFLOW: A Principled Protocol for Trustworthy and Transactional Autonomous Agent Systems](https://www.arxiv.org/abs/2506.07564)

Peiran Li<sup>*</sup>, **Xinkai Zou**<sup>*</sup>, Zhuohang Wu, Ruifeng Li, Shuo Xing, Hanwen Zheng, Zhikai Hu, Yuping Wang, Haoxi Li, Qin Yuan, Yingmo Zhang, Zhengzhong Tu

*<sup>*</sup>Equal contribution*

[**Paper**](https://www.arxiv.org/abs/2506.07564) [**Code**] [**Dataset**](https://huggingface.co/datasets/jayzou3773/SafeFlowBench) 
- SafeFLow: principled protocol-level framework explicitly designed to build secure, reliable, and trustworthy LLM/VLM-based autonomous agents
- SafeFlowBench:  the first-of-its-kind benchmark specifically designed to evaluate VLM-based agent safety in GUI-based environments
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Ubicomp'25 Poster</div><img src='images/Emotional Support Originating from Dialogue.png' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

[Emotional Support Originating from Dialogue: Empowering Older Adults’ Self-Tracking of Sleep-Related Daytime Factors](https://dl.acm.org/doi/10.1145/3714394.3754418)

Jiachen Du, **Xinkai Zou**, Liwen He, Shuzi Yin, Bingjie Gao, Wenjing Deng, Xinyi Fu, Haipeng Mi

- Circadia: A conversational personal informatics system that helps older adults track sleep-related daytime factors through emotionally supportive dialogue.
- Finding: Dialogue-based emotional support improves motivation, self-awareness, and reflection in self-tracking.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Ubicomp'25 Poster</div><img src='images/Task Wise.png' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

[TaskWise: Enhancing Cognitive Performance in Task Management through Interactive Detail Enrichment](https://dl.acm.org/doi/10.1145/3714394.3754433)

Jiachen Du, Bingjie Gao, Shuzi Yin, **Xinkai Zou**, Wenjing Deng, Xinyi Fu

- TaskWise: An AI-driven to-do list system that enhances cognitive performance through interactive detail enrichment, using LLMs to generate contextual prompts that help users recall missing details and plan effectively.
- Finding: AI-generated cues act as cognitive scaffolds that improve task understanding, preparedness, and control, while users maintain agency by selectively adopting relevant suggestions
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CSCW'25 Poster</div><img src='images/The Social Dynamics of Voice Cloning.png' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

[The Social Dynamics of Voice Cloning: Trust, Privacy, and Ethical Tensions When Sharing Your AI Voice Replica](https://dl.acm.org/doi/10.1145/3715070.3749244)

[**Paper**](https://dl.acm.org/doi/10.1145/3715070.3749244)

Jiachen Du, Hanyu Huang, **Xinkai Zou**, Shuzi Yin, Bingjie Gao, Xinyi Fu

- Voice Cloning Study: A mixed-methods investigation of Human Voice Cloning Agents (HVCAs) that reveals how sharing AI voice replicas reshapes trust, privacy, and ethics in social interaction.
- Finding: HVCA sharing fosters intimacy and trust through voice familiarity but also triggers boundary blurring, identity risks, and control dilemmas, underscoring the need for responsible design and regulation
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv</div><img src='images/goal2story.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Goal2Story: A Multi-Agent Fleet based on Privately Enabled sLLMs for Impacting Mapping on Requirements Elicitation](https://arxiv.org/abs/2503.13279)

**Xinkai Zou**, Yan Liu, Xiongbo Shi, Chen Yang

[**Paper**](https://arxiv.org/abs/2503.13279) [**Code**](https://github.com/SoftACE-Lab/goal2story) [**Dataset**](https://huggingface.co/datasets/SoftACE/StorySeek) 
- Goal2Story: first work to realize goal-driven requirements elicitation via LLM-based agents
- StorySeek: first dataset constructed specifically for goal-driven requirements elicitation with other potential information
</div>
</div>

# 🎖 Honors and Awards
- *2023* Tongji University International and Hong Kong-Macao-Taiwan Exchange Scholarship
- *2021* Tongji University Undergraduate Outstanding Student Scholarship
- *2021* Tongji University Student of the Year

# 📖 Educations
- *2021.09 - 2025.07*, B.Eng. in Software Engineering, Tongji University
- *2023.08 - 2023.12*, Exchange Student, University of California, Berkeley

# 💻 Experience
- *2025.05 – 2025.10*, **Research Intern**, MIT JTL–Transit Lab, Boston, MA, United States
- *2025.01 – 2025.07*, **Research Intern**, Texas A&M University TACO Lab, Texas, United States 
- *2024.05 – 2025.06*, **Research Intern**, Tsinghua University Future Lab, Beijing, China 
- *2023.12 - 2024.05*, **Data Scientist Intern** (Under supervision of Tianyu Shi, world's no.1 mentor),<img src="../images/tesla.png" width="20" style="vertical-align: right;"/> Tesla (Shanghai Gigafactory), China.
- *2023.07 - 2023.09*, **Software Development Engineer Intern**, <img src="../images/zjport.jpg" width="16" style="vertical-align: right;"/> Zhejiang Smart Port Technology Co., Ltd., China.



<div style="width: 200px; height: 200px; margin: 0 auto;">
  <script type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=Kb6Ylc9vY16zkvORYNGRbQP4CPpjMmdiA3EW31IlncM"></script>
</div>


