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
