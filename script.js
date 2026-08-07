const messages = [
  "你好呀，欢迎来看我的作品 👋",
  "点开项目卡片，可以直接在线预览",
  "我喜欢把复杂问题变成清晰产品 ✨",
  "再点我一下，我会继续打招呼～"
];
const projects = {
  suning: { title: "苏宁采购管理系统", eyebrow: "B2B · PROCUREMENT DIGITALIZATION", file: "suning-procurement-portfolio.pdf" },
  tanda: { title: "Tanda 排班与工时管理", eyebrow: "SAAS · WORKFORCE MANAGEMENT", file: "tanda-product-portfolio.pdf" }
};
const experiences = [
  { company:"Tanda", role:"产品经理 · B 端人力 SaaS", period:"2026.06 - 2026.07", summary:"面向澳洲企业人力管理场景，围绕智能排班、移动考勤与薪资核算，参与从发现问题到上线验证的完整产品迭代。", details:["访谈 9 位企业 HR 与一线管理者，梳理排班、考勤异常和薪资核算痛点","对标 Employment Hero、RosterElf，并结合 Fair Work 合规要求定义核心需求","协助输出 PRD、7 页高保真原型与操作手册，参与评审、测试及用户验收","功能上线完成全流程验证，产品转化率提升 6%"], color:"purple" },
  { company:"苏宁易购（总部）", role:"产品实习生 · 采购数字化", period:"2025.09 - 2025.12", summary:"面向企业采购数字化场景，深入采购、财务等 5 个部门，重构供应商准入、采购计划与绩效评价等核心流程。", details:["调研 5 个业务部门，拆解重复准入、资质过期与人工审核等关键问题","用 Axure 绘制全链路业务流程，统一采购计划从新增到台账管理的协作逻辑","独立完成 4 个核心模块与 15+ 页高保真原型，推动跨部门评审落地","上线后供应商准入周期缩短 40%，采购数据实现全链路可追溯"], color:"mint" },
  { company:"水木莘森景观设计", role:"设计实习生 · 空间与体验", period:"2024.01 - 2024.03", summary:"从场地、用户需求与可持续原则出发，把抽象规划构想转化为可实施的空间体验，并衔接施工落地。", details:["基于场地条件与客户需求完成空间布局和景观元素设计","独立绘制平面图、剖面图、立面图与效果图","对接施工环节，保证设计理念从概念到执行准确传达","形成兼顾系统规划、视觉表达与落地执行的设计方法"], color:"pink" }
];
let messageIndex = 0;
const visual = document.querySelector(".hero-visual");
const speech = document.querySelector(".speech span");
const changeMessage = () => { messageIndex = (messageIndex + 1) % messages.length; speech.textContent = messages[messageIndex]; };
document.querySelectorAll(".ip-character,.speech,.contact-ip").forEach(el => el.addEventListener("click", changeMessage));
visual.addEventListener("pointermove", event => {
  const bounds = visual.getBoundingClientRect();
  visual.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`);
  visual.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height - .5) * 12}px`);
});
visual.addEventListener("pointerleave", () => { visual.style.setProperty("--mx", "0px"); visual.style.setProperty("--my", "0px"); });

const profile = document.querySelector(".profile");
profile.addEventListener("pointermove", event => {
  const bounds = profile.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  profile.style.setProperty("--near-x", `${x * 18}px`);
  profile.style.setProperty("--near-y", `${y * 14}px`);
  profile.style.setProperty("--far-x", `${x * -10}px`);
  profile.style.setProperty("--far-y", `${y * -8}px`);
});
profile.addEventListener("pointerleave", () => ["--near-x","--near-y","--far-x","--far-y"].forEach(property => profile.style.setProperty(property,"0px")));

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("pointermove", event => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--ry", `${((event.clientX - bounds.left) / bounds.width - .5) * 4}deg`);
    card.style.setProperty("--rx", `${((event.clientY - bounds.top) / bounds.height - .5) * -3}deg`);
  });
  card.addEventListener("pointerleave", () => { card.style.setProperty("--ry","0deg"); card.style.setProperty("--rx","0deg"); });
});

const experiencePanel = document.querySelector(".experience-detail");
document.querySelectorAll(".experience-tabs button").forEach(button => button.addEventListener("click", () => {
  const item = experiences[Number(button.dataset.experience)];
  document.querySelectorAll(".experience-tabs button").forEach(tab => { tab.classList.toggle("active",tab === button); tab.setAttribute("aria-selected",String(tab === button)); });
  experiencePanel.className = `experience-detail ${item.color}`;
  experiencePanel.querySelector(".experience-period").textContent = item.period;
  experiencePanel.querySelector("h3").textContent = item.company;
  experiencePanel.querySelector("strong").textContent = item.role;
  experiencePanel.querySelector("p").textContent = item.summary;
  const list = experiencePanel.querySelector("ul");
  list.replaceChildren(...item.details.map(detail => { const li = document.createElement("li"); li.textContent = detail; return li; }));
}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold:.14 });
document.querySelectorAll("[data-reveal]").forEach(element => revealObserver.observe(element));

const share = async event => {
  await navigator.clipboard.writeText(location.href.split("#")[0]);
  const original = event.currentTarget.textContent;
  event.currentTarget.textContent = "链接已复制 ✓";
  setTimeout(() => event.currentTarget.textContent = original, 1800);
};
document.querySelectorAll(".share").forEach(el => el.addEventListener("click", share));
addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - innerHeight;
  document.querySelector(".progress i").style.width = `${height > 0 ? scrollY / height * 100 : 0}%`;
}, { passive: true });

const backdrop = document.querySelector(".viewer-backdrop");
const closeViewer = () => { backdrop.hidden = true; document.body.style.overflow = ""; backdrop.querySelector("iframe").src = ""; };
document.querySelectorAll(".preview").forEach(button => button.addEventListener("click", () => {
  const project = projects[button.dataset.project];
  backdrop.querySelector("#viewer-title").textContent = project.title;
  backdrop.querySelector(".viewer-eyebrow").textContent = project.eyebrow;
  backdrop.querySelector("iframe").src = `pdf-viewer.html?file=${encodeURIComponent(`${project.file}?v=corrected-20260807`)}`;
  backdrop.querySelector(".open-new").href = project.file;
  backdrop.querySelector(".download").href = project.file;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
}));
backdrop.addEventListener("click", event => { if (event.target === backdrop) closeViewer(); });
document.querySelector(".close").addEventListener("click", closeViewer);
addEventListener("keydown", event => { if (event.key === "Escape") closeViewer(); });
