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
I am a fourth-year undergraduate student at <img src="../images/tongji.png" width="16" style="vertical-align: right;"/> Tongji University. During my undergraduate studies, I spent one semester as an exchange student at <img src="../images/ucb.png" width="16" style="vertical-align: right;"/> the University of California, Berkeley, and participated in the AI Summer School at <img src="../images/wlu.png" width="16" style="vertical-align: right;"/> [Westlake University](https://en-soe.westlake.edu.cn/NewsEvents/latestnews/202411/t20241111_45448.shtml).

**Incoming graduate student with Master of Science in Computer Science in UC, San Diego** <img src="../images/ucsd.png" width="16" style="vertical-align: right;"/> **(27Fall)**

My research interests are AI Agent, Agent Safety, Embodied AI, AI for Software Engineering (AI4SE), and Human-Computer Interaction. I was a research assistant at the [SoftACE Lab, Tongji University](https://github.com/SoftACE-Lab), advised by Prof. Yan Liu. Moreover, I am also interested in the intersection of AI and transportation, as I previously studied Civil Engineering for one year at Tongji University.


# 🔥 News
- *2025.08*: &nbsp;🔥🔥 My paper with [Dr. Xuan Jiang](https://xuan-1998.github.io/) under supervision of [Prof. Jinhua Zhao](https://mobility.mit.edu/people/jinhua-zhao/) is on Arxiv, [CloudAnoAgent: Anomaly Detection for Cloud Sites via LLM Agent with Neuro-Symbolic Mechanism](https://arxiv.org/abs/2508.01844) <img src="../images/mit-logo.png" width="60" style="vertical-align: right;"/>
- *2025.07*: &nbsp;🎓🎓 Graduated from Tongji University! Thanks for all!
- *2025.06*: &nbsp;🔥🔥 My first co-authored paper with [Peiran Li](https://scholar.google.com/citations?user=AbleBdQAAAAJ&hl=en) under supervision of [Prof. Zhengzhong Tu](https://vztu.github.io/) is on Arxiv, [SAFEFLOW: A Principled Protocol for Trustworthy and Transactional Autonomous Agent Systems](https://www.arxiv.org/abs/2506.07564)
- *2025.05*: &nbsp;🔥🔥 Successfully defended undergraduate thesis titled "Research and Application of a Multi-Agent-Based Agile Requirements Elicitation Methodology"(基于多智能体的敏捷需求诱导方法研究与应用) with a perfect score (5/5)
- *2025.03*: &nbsp;🔥🔥 My first paper as a first author is on Arxiv, [Goal2Story: A Multi-Agent Fleet based on Privately Enabled sLLMs for Impacting Mapping on Requirements Elicitation](https://arxiv.org/abs/2503.13279). 
- *2024.05*: &nbsp;🎉🎉 Happy to join the Future Lab, Tsinghua University as a research assistant, collaborating with [Jiachen Du](https://www.milab.design/team-2/du-jiachen).
- *2023.12*: &nbsp;🎉🎉 Happy to join the Tongji-MIT City Science Lab as a research assistant and developer, collaborating with [Chance Jiajie Li](https://www.media.mit.edu/people/jiajie/overview/).


# 📝 Publications 
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv</div><img src='images/cloudanoagent.png' alt="sym" width="100%" style="margin-bottom: 10px;"></div></div>
<div class='paper-box-text' markdown="1">

[CloudAnoAgent: Anomaly Detection for Cloud Sites via LLM Agent with Neuro-Symbolic Mechanism](https://arxiv.org/abs/2508.01844)

**Xinkai Zou**, Xuan Jiang, Ruikai Huang, Haoze He, Parv Kapoor, Jiahua Zhao

[**Project Page**](https://jayzou3773.github.io/cloudanobench-agent/)[**Paper**](https://arxiv.org/abs/2508.01844) [**Dataset**](https://huggingface.co/datasets/jayzou3773/CloudAnoBench)
- CloudAnoAgent: first LLM-agent system for anomaly detection on cloud sites
- CloudAnoBench: first multimodal anomaly detection benchmark on cloud sites with timeseries metrics data and log text data
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

# 🧩 Projects

<div class='paper-box'><div class='paper-box-image'><div><img src='images/socity1.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[**SoCity Green Commute**](https://www.media.mit.edu/projects/socity-dao/overview/)

A project aiming at encouraging greener daily commute behaviors. SoCity Green Commute explores personal carbon allowance, tokenomics, and decentralized governance using a mobile DApp.

Collaboration with Chance Jiajie Li, Ruyi Yang, Zhenze Mo, etc.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><img src='images/archinspire.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[**ArchInspire**](https://archvisuallinker.notion.site/) (under revision)

[*Project*](https://archvisuallinker.notion.site/) [*Dataset*](https://github.com/Emmmmmmaa/Architecture-Visual-Linker-Tag-Dataset)

This paper introduces an AI-augmented design copilot that enhances conceptual abstraction by leveraging extensive datasets, advanced annotation using GPT-4V, and custom generative models, all seamlessly integrated to provide three key functions: an architectural search engine, bidirectional object-based architectural analysis, and an architectural design generator, creating a powerful tool for architectural inspiration.

Collaboration with [Ruyi Yang](https://www.ruyiyang.com/).
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><img src='images/bcg.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**BCG Gen-AI Platform**

This project is a platform for BCG employees, consultants and clients to use privately deployed LLMs and tools.

</div>
</div>

# 💻 Work Experience
- *2023.12 - 2024.05*, **Data Engineer Intern** (Under supervision of Tianyu Shi, world's no.1 mentor),<img src="../images/tesla.png" width="20" style="vertical-align: right;"/> Tesla (Shanghai Gigafactory), China.
- *2023.07 - 2023.09*, **Software Development Engineer Intern**, <img src="../images/zjport.jpg" width="16" style="vertical-align: right;"/> Zhejiang Smart Port Technology Co., Ltd., China.



<div style="width: 200px; height: 200px; margin: 0 auto;">
  <script type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=Kb6Ylc9vY16zkvORYNGRbQP4CPpjMmdiA3EW31IlncM"></script>
</div>


