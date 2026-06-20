const STORAGE_KEY = "ivy-lee-six:v1";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  artBackdrop: $("#artBackdrop"),
  inkBackdrop: $("#inkBackdrop"),
  installButton: $("#installButton"),
  themeToggleButton: $("#themeToggleButton"),
  ultimateGoalBanner: $("#ultimateGoalBanner"),
  goalForm: $("#goalForm"),
  ultimateGoal: $("#ultimateGoal"),
  monthGoal: $("#monthGoal"),
  weekGoal: $("#weekGoal"),
  planDate: $("#planDate"),
  workDate: $("#workDate"),
  taskForm: $("#taskForm"),
  taskTitle: $("#taskTitle"),
  carryOverButton: $("#carryOverButton"),
  planSlots: $("#planSlots"),
  slotTemplate: $("#slotTemplate"),
  plannedCount: $("#plannedCount"),
  plannedDate: $("#plannedDate"),
  copyPlanButton: $("#copyPlanButton"),
  todayList: $("#todayList"),
  emptyToday: $("#emptyToday"),
  todayProgress: $("#todayProgress"),
  progressBar: $("#progressBar"),
  exportButton: $("#exportButton"),
  importInput: $("#importInput"),
  resetButton: $("#resetButton"),
  historyList: $("#historyList"),
  archiveList: $("#archiveList"),
  toast: $("#toast"),
};

let deferredInstallPrompt = null;
let state = loadState();

const ART_BACKGROUNDS = [
  { name: "蓮と金魚", file: "assets/bg-lotus-goldfish.png", anchor: "center center" },
  { name: "白狐と鳥居", file: "assets/bg-fox-torii.png", anchor: "center center" },
  { name: "月と鶴", file: "assets/bg-moon-cranes.png", anchor: "center center" },
];

const INK_PATTERNS = [
  {
    name: "mountain",
    svg: `
      <svg class="ink-scene ink-mountain" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="softInkA"><feGaussianBlur stdDeviation="7"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .72 0"/></filter>
          <linearGradient id="fadeA" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#f8f3e6" stop-opacity=".28"/><stop offset="1" stop-color="#f8f3e6" stop-opacity="0"/></linearGradient>
        </defs>
        <circle class="ink-moon" cx="1120" cy="185" r="82" fill="url(#fadeA)"/>
        <path class="ink-wash slow" d="M-120 760 C160 560 260 700 440 510 C610 330 745 610 930 430 C1120 245 1285 520 1580 335 L1580 1030 L-120 1030Z" fill="#e6ddc6" opacity=".10" filter="url(#softInkA)"/>
        <path class="ink-wash" d="M-100 720 C135 560 260 670 410 520 C590 340 720 590 900 470 C1090 345 1240 520 1540 410" fill="none" stroke="#f1ead9" stroke-width="56" stroke-linecap="round" opacity=".14" filter="url(#softInkA)"/>
        <path class="ink-stroke" d="M-80 750 C160 600 280 690 445 530 C620 360 745 625 940 450 C1115 290 1260 520 1540 380" fill="none" stroke="#f6f0e4" stroke-width="3" opacity=".45"/>
        <path class="ink-mist" d="M110 600 C360 555 560 620 830 560 C1040 515 1210 550 1390 505" fill="none" stroke="#f6f0e4" stroke-width="18" stroke-linecap="round" opacity=".10"/>
      </svg>`
  },
  {
    name: "bamboo",
    svg: `
      <svg class="ink-scene ink-bamboo" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs><filter id="softInkB"><feGaussianBlur stdDeviation="4"/></filter></defs>
        <g class="ink-wash" opacity=".22" stroke="#f4ead6" stroke-linecap="round" fill="none">
          <path d="M210 1040 C235 760 220 480 275 -60" stroke-width="18" filter="url(#softInkB)"/>
          <path d="M350 1020 C380 730 360 430 430 -80" stroke-width="12" filter="url(#softInkB)"/>
          <path d="M980 1020 C955 740 985 430 940 -70" stroke-width="16" filter="url(#softInkB)"/>
          <path d="M1130 1060 C1120 820 1145 510 1100 -40" stroke-width="10" filter="url(#softInkB)"/>
        </g>
        <g class="ink-stroke" opacity=".52" stroke="#f6f0e4" stroke-linecap="round" fill="none">
          <path d="M214 890 C250 810 270 790 338 770" stroke-width="5"/>
          <path d="M222 650 C270 600 315 575 385 560" stroke-width="4"/>
          <path d="M390 730 C330 670 302 630 280 560" stroke-width="4"/>
          <path d="M944 780 C1010 715 1065 690 1160 682" stroke-width="5"/>
          <path d="M955 535 C1020 485 1075 462 1180 455" stroke-width="4"/>
        </g>
        <g class="ink-leaves" fill="#f2ead9" opacity=".18">
          <ellipse cx="340" cy="765" rx="70" ry="13" transform="rotate(-17 340 765)"/>
          <ellipse cx="386" cy="560" rx="86" ry="12" transform="rotate(-11 386 560)"/>
          <ellipse cx="286" cy="558" rx="76" ry="12" transform="rotate(52 286 558)"/>
          <ellipse cx="1162" cy="680" rx="92" ry="13" transform="rotate(-5 1162 680)"/>
          <ellipse cx="1184" cy="455" rx="95" ry="11" transform="rotate(-6 1184 455)"/>
        </g>
      </svg>`
  },
  {
    name: "river",
    svg: `
      <svg class="ink-scene ink-river" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs><filter id="softInkC"><feGaussianBlur stdDeviation="8"/></filter></defs>
        <circle class="ink-moon" cx="270" cy="185" r="72" fill="#f3ead6" opacity=".14"/>
        <path class="ink-wash slow" d="M-160 710 C210 640 330 790 610 705 C875 625 1035 730 1580 610 L1580 1080 L-160 1080Z" fill="#f3ead6" opacity=".08" filter="url(#softInkC)"/>
        <path class="ink-mist" d="M-60 675 C190 615 330 725 590 655 C865 585 1030 680 1500 565" fill="none" stroke="#f8f0df" stroke-width="20" stroke-linecap="round" opacity=".12"/>
        <path class="ink-stroke" d="M-20 710 C210 666 355 746 620 684 C845 632 1045 704 1450 625" fill="none" stroke="#f8f0df" stroke-width="3" opacity=".42"/>
        <path class="ink-stroke delayed" d="M80 805 C285 760 460 825 720 780 C980 735 1160 785 1390 735" fill="none" stroke="#f8f0df" stroke-width="2" opacity=".28"/>
      </svg>`
  },
  {
    name: "crane",
    svg: `
      <svg class="ink-scene ink-crane" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs><filter id="softInkD"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <circle class="ink-moon" cx="1050" cy="220" r="95" fill="#f3ead6" opacity=".12"/>
        <g class="ink-wash" opacity=".16" fill="none" stroke="#f4ead6" stroke-linecap="round" filter="url(#softInkD)">
          <path d="M620 570 C735 460 850 470 930 570 C820 540 735 540 620 570" stroke-width="34"/>
          <path d="M915 560 C1010 515 1075 505 1150 535" stroke-width="18"/>
          <path d="M605 575 C490 515 410 520 330 575" stroke-width="20"/>
        </g>
        <path class="ink-stroke" d="M610 568 C738 458 850 475 934 568 C812 535 734 538 610 568Z" fill="none" stroke="#f8f0df" stroke-width="3" opacity=".50"/>
        <path class="ink-stroke delayed" d="M925 558 C1018 505 1080 510 1158 536" fill="none" stroke="#f8f0df" stroke-width="3" opacity=".45"/>
        <path class="ink-stroke delayed" d="M606 574 C498 512 417 520 325 578" fill="none" stroke="#f8f0df" stroke-width="3" opacity=".38"/>
        <path class="ink-mist" d="M120 735 C365 690 560 735 790 700 C1000 670 1180 705 1390 665" fill="none" stroke="#f8f0df" stroke-width="16" stroke-linecap="round" opacity=".10"/>
      </svg>`
  }
];

function defaultState() {
  const tomorrow = offsetDateKey(1);
  return {
    version: 4,
    selectedPlanDate: tomorrow,
    selectedWorkDate: todayKey(),
    goals: { ultimate: "", month: "", week: "" },
    settings: { theme: "dark", lastArchiveCheck: null },
    tasks: [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

function normalizeState(value) {
  const base = defaultState();
  const tasks = Array.isArray(value.tasks)
    ? value.tasks.map((task, index) => ({
      id: task.id || uid(),
      title: String(task.title || "").trim(),
      planDate: task.planDate || base.selectedPlanDate,
      rank: Number.isFinite(Number(task.rank)) ? Number(task.rank) : null,
      completedAt: task.completedAt || null,
      archivedAt: task.archivedAt || null,
      createdAt: task.createdAt || new Date(Date.now() + index).toISOString(),
      carriedFrom: task.carriedFrom || null,
    })).filter(task => task.title)
    : [];

  // 旧版で候補に残っていたタスクは、候補機能廃止後のやる事リストへ日付ごとに統合する。
  const byDate = new Map();
  tasks.forEach(task => {
    if (!byDate.has(task.planDate)) byDate.set(task.planDate, []);
    byDate.get(task.planDate).push(task);
  });
  byDate.forEach(list => {
    list.sort((a, b) => {
      const ar = a.rank == null ? 999 : a.rank;
      const br = b.rank == null ? 999 : b.rank;
      return ar - br || a.createdAt.localeCompare(b.createdAt);
    });
    list.forEach((task, index) => { task.rank = index + 1; });
  });

  return {
    ...base,
    ...value,
    version: 4,
    goals: { ...base.goals, ...(value.goals || {}) },
    settings: { ...base.settings, ...(value.settings || {}) },
    tasks,
  };
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid() {
  return crypto?.randomUUID ? crypto.randomUUID() : `task_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function offsetDateKey(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return todayKey(d);
}

function dateLabel(key) {
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric", weekday: "short" }).format(new Date(`${key}T00:00:00`));
}

function plannedTasks(date) {
  return state.tasks
    .filter(task => task.planDate === date && !task.archivedAt)
    .sort((a, b) => a.rank - b.rank || a.createdAt.localeCompare(b.createdAt));
}

function archivedTasks() {
  return state.tasks
    .filter(task => task.archivedAt)
    .sort((a, b) => b.planDate.localeCompare(a.planDate) || a.rank - b.rank || a.createdAt.localeCompare(b.createdAt));
}

function autoArchivePastTasks() {
  const today = todayKey();
  const tomorrow = offsetDateKey(1);
  if (state.selectedWorkDate < today) state.selectedWorkDate = today;
  if (state.selectedPlanDate < today) state.selectedPlanDate = tomorrow;
  if (state.settings.lastArchiveCheck === today) return;
  let archivedCount = 0;
  state.tasks.forEach(task => {
    if (!task.archivedAt && task.planDate < today) {
      task.archivedAt = new Date().toISOString();
      archivedCount += 1;
    }
  });
  state.settings.lastArchiveCheck = today;
  if (archivedCount) save();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function goPage(page) {
  $$(".page").forEach(el => el.classList.toggle("active", el.id === `page-${page}`));
  $$(".tab").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderInkBackdrop() {
  if (!els.inkBackdrop) return;
  const pattern = INK_PATTERNS[Math.floor(Math.random() * INK_PATTERNS.length)];
  els.inkBackdrop.dataset.pattern = pattern.name;
  els.inkBackdrop.innerHTML = pattern.svg;
}

function renderArtBackdrop() {
  if (!els.artBackdrop) return;
  const art = ART_BACKGROUNDS[Math.floor(Math.random() * ART_BACKGROUNDS.length)];
  els.artBackdrop.style.setProperty("--art-image", `url("${art.file}")`);
  els.artBackdrop.style.setProperty("--art-position", art.anchor);
  els.artBackdrop.dataset.art = art.name;
}

function applyTheme(theme = state.settings.theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  state.settings.theme = nextTheme;
  if (els.themeToggleButton) {
    els.themeToggleButton.textContent = nextTheme === "dark" ? "夜" : "昼";
    els.themeToggleButton.setAttribute("aria-label", nextTheme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え");
  }
}

function toggleTheme() {
  applyTheme(state.settings.theme === "dark" ? "light" : "dark");
  save();
}

function saveGoals(event) {
  event.preventDefault();
  state.goals = {
    ultimate: els.ultimateGoal.value.trim(),
    month: els.monthGoal.value.trim(),
    week: els.weekGoal.value.trim(),
  };
  save();
  render();
  showToast("目標を保存しました");
}

function addTask(event) {
  event.preventDefault();
  const title = els.taskTitle.value.trim();
  if (!title) return;

  const plan = plannedTasks(state.selectedPlanDate);
  if (plan.length >= 6) {
    showToast("やる事リストは6つまでです");
    return;
  }

  state.tasks.push({
    id: uid(),
    title,
    planDate: state.selectedPlanDate,
    rank: plan.length + 1,
    completedAt: null,
    archivedAt: null,
    createdAt: new Date().toISOString(),
    carriedFrom: null,
  });
  els.taskForm.reset();
  save();
  render();
  showToast("やる事リストに追加しました");
}

function deleteTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  if (!confirm(`「${task.title}」を削除しますか？`)) return;
  state.tasks = state.tasks.filter(t => t.id !== id);
  resequencePlan(task.planDate);
  save();
  render();
  showToast("削除しました");
}

function movePlan(id, direction) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  const plan = plannedTasks(task.planDate);
  const index = plan.findIndex(t => t.id === id);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= plan.length) return;
  const other = plan[nextIndex];
  const oldRank = task.rank;
  task.rank = other.rank;
  other.rank = oldRank;
  save();
  render();
}

function resequencePlan(date) {
  plannedTasks(date).forEach((task, index) => { task.rank = index + 1; });
}

function carryOverOpenTasks() {
  const target = state.selectedPlanDate;
  const plan = plannedTasks(target);
  const slotsLeft = Math.max(0, 6 - plan.length);
  if (slotsLeft === 0) {
    showToast("やる事リストはすでに6つ埋まっています");
    return;
  }

  const openPast = state.tasks
    .filter(task => task.planDate < target && !task.completedAt)
    .sort((a, b) => b.planDate.localeCompare(a.planDate) || a.rank - b.rank)
    .slice(0, slotsLeft);

  if (!openPast.length) {
    showToast("回せる過去の未完了はありません");
    return;
  }

  openPast.forEach((task, index) => {
    const from = task.planDate;
    task.planDate = target;
    task.rank = plan.length + index + 1;
    task.carriedFrom = from;
    task.archivedAt = null;
  });
  save();
  render();
  showToast(`${openPast.length}件をやる事リストに回しました`);
}

function restoreArchivedTask(id) {
  const target = state.selectedPlanDate;
  const plan = plannedTasks(target);
  if (plan.length >= 6) {
    showToast("やる事リストはすでに6つ埋まっています");
    return;
  }

  const task = state.tasks.find(t => t.id === id);
  if (!task || !task.archivedAt) return;
  if (task.completedAt) {
    showToast("完了済みタスクは戻せません");
    return;
  }

  const from = task.planDate;
  task.planDate = target;
  task.rank = plan.length + 1;
  task.archivedAt = null;
  task.carriedFrom = from;
  save();
  render();
  showToast("アーカイブから戻しました");
}

function toggleComplete(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.completedAt = task.completedAt ? null : new Date().toISOString();
  save();
  render();
  showToast(task.completedAt ? "完了にしました" : "未完了に戻しました");
}

function render() {
  els.planDate.value = state.selectedPlanDate;
  els.workDate.value = state.selectedWorkDate;
  renderGoals();
  renderPlanSlots();
  renderToday();
  renderHistory();
  renderArchive();
}

function renderGoals() {
  els.ultimateGoal.value = state.goals.ultimate || "";
  els.monthGoal.value = state.goals.month || "";
  els.weekGoal.value = state.goals.week || "";
  els.ultimateGoalBanner.textContent = state.goals.ultimate || "最終的に達成したい目標を設定してください";
}

function renderPlanSlots() {
  const plan = plannedTasks(state.selectedPlanDate).slice(0, 6);
  els.plannedCount.textContent = `${plan.length}/6`;
  els.plannedDate.textContent = dateLabel(state.selectedPlanDate);
  els.planSlots.innerHTML = "";

  for (let i = 1; i <= 6; i++) {
    const task = plan.find(t => t.rank === i);
    const node = els.slotTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".slot-number").textContent = i;

    if (task) {
      fillTaskNode(node, task, { editable: true, showNext: false });
      node.querySelector(".move-up").addEventListener("click", () => movePlan(task.id, -1));
      node.querySelector(".move-down").addEventListener("click", () => movePlan(task.id, 1));
      node.querySelector(".remove-slot").addEventListener("click", () => deleteTask(task.id));
    } else {
      node.classList.add("empty");
      node.querySelector(".slot-title").textContent = "空き枠";
      node.querySelector(".slot-meta").textContent = "上の入力欄から追加してください";
      node.querySelector(".slot-check").disabled = true;
      node.querySelector(".slot-actions").innerHTML = "";
    }
    els.planSlots.appendChild(node);
  }
}

function renderToday() {
  const plan = plannedTasks(state.selectedWorkDate).slice(0, 6);
  const done = plan.filter(task => task.completedAt);
  const next = plan.find(task => !task.completedAt);
  els.todayProgress.textContent = `${done.length}/${plan.length || 6}`;
  els.progressBar.style.width = `${plan.length ? Math.round(done.length / plan.length * 100) : 0}%`;
  els.todayList.innerHTML = "";
  els.emptyToday.classList.toggle("hidden", plan.length > 0);

  plan.forEach(task => {
    const node = els.slotTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".slot-number").textContent = task.rank;
    fillTaskNode(node, task, { editable: false, showNext: next?.id === task.id });
    node.querySelector(".slot-actions").innerHTML = "";
    els.todayList.appendChild(node);
  });
}

function fillTaskNode(node, task, options) {
  node.classList.toggle("done", !!task.completedAt);
  node.classList.toggle("next", !!options.showNext);
  const checkbox = node.querySelector(".slot-check");
  checkbox.checked = !!task.completedAt;
  checkbox.addEventListener("change", () => toggleComplete(task.id));
  node.querySelector(".slot-title").textContent = task.title;
  node.querySelector(".slot-meta").textContent = `${task.completedAt ? "完了" : "未完了"}${options.showNext ? " / 次に集中" : ""}${task.carriedFrom ? ` / ${dateLabel(task.carriedFrom)}から繰越` : ""}`;
  if (!options.editable) {
    node.querySelector(".move-up")?.remove();
    node.querySelector(".move-down")?.remove();
    node.querySelector(".remove-slot")?.remove();
  }
}

function renderHistory() {
  const dates = [...new Set(state.tasks.map(task => task.planDate))].sort().reverse().slice(0, 10);
  els.historyList.innerHTML = dates.length
    ? dates.map(date => {
      const plan = state.tasks.filter(task => task.planDate === date).sort((a, b) => a.rank - b.rank).slice(0, 6);
      const done = plan.filter(task => task.completedAt).length;
      const archived = plan.filter(task => task.archivedAt).length;
      return `<article class="history-card"><div><strong>${dateLabel(date)}</strong><br>${plan.length}件${archived ? ` / アーカイブ${archived}件` : ""}</div><span>${done}/${plan.length || 6}完了</span></article>`;
    }).join("")
    : `<p class="empty-text">履歴はまだありません。</p>`;
}

function renderArchive() {
  if (!els.archiveList) return;
  const list = archivedTasks();
  if (!list.length) {
    els.archiveList.innerHTML = `<p class="empty-text">アーカイブはまだありません。</p>`;
    return;
  }

  const groups = new Map();
  list.forEach(task => {
    if (!groups.has(task.planDate)) groups.set(task.planDate, []);
    groups.get(task.planDate).push(task);
  });

  els.archiveList.innerHTML = [...groups.entries()].map(([date, tasks]) => {
    const items = tasks.map(task => {
      const status = task.completedAt ? "完了" : "未完了";
      const restoreButton = task.completedAt
        ? ""
        : `<button class="tiny-button restore-archive" type="button" data-restore="${task.id}">戻す</button>`;
      return `<article class="archive-task ${task.completedAt ? "done" : ""}">
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <span>${status}${task.carriedFrom ? ` / ${dateLabel(task.carriedFrom)}から繰越` : ""}</span>
        </div>
        ${restoreButton}
      </article>`;
    }).join("");

    return `<section class="archive-group">
      <h3>${dateLabel(date)}</h3>
      <div class="archive-items">${items}</div>
    </section>`;
  }).join("");

  $$(".restore-archive").forEach(button => {
    button.addEventListener("click", () => restoreArchivedTask(button.dataset.restore));
  });
}

function copyPlanMarkdown() {
  const date = state.selectedPlanDate;
  const plan = plannedTasks(date).slice(0, 6);
  const lines = [
    `# ${date} 明日やる6つ`,
    "",
    "## 目標",
    `- 最終的に達成したい目標: ${state.goals.ultimate || "未設定"}`,
    `- 1ヶ月後の目標: ${state.goals.month || "未設定"}`,
    `- 今週の目標: ${state.goals.week || "未設定"}`,
    "",
    "## やる事リスト",
    "",
  ];
  for (let i = 1; i <= 6; i++) {
    const task = plan.find(t => t.rank === i);
    const checked = task?.completedAt ? "x" : " ";
    lines.push(task ? `${i}. [${checked}] ${task.title}` : `${i}. [ ] `);
  }
  lines.push("", "## メモ", "- 1番から順に進める", "- 終わらなかったものは次の日に回す");
  navigator.clipboard.writeText(lines.join("\n"))
    .then(() => showToast("Markdownをコピーしました"))
    .catch(() => showToast("コピーできませんでした"));
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ivy-six-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    state = normalizeState(JSON.parse(await file.text()));
    save();
    render();
    showToast("インポートしました");
  } catch {
    showToast("インポートに失敗しました");
  } finally {
    event.target.value = "";
  }
}

function resetAll() {
  if (!confirm("全データを削除しますか？この操作は元に戻せません。")) return;
  state = defaultState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
  showToast("リセットしました");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
}

function bind() {
  $$(".tab").forEach(button => button.addEventListener("click", () => goPage(button.dataset.page)));
  els.themeToggleButton.addEventListener("click", toggleTheme);
  els.goalForm.addEventListener("submit", saveGoals);
  els.planDate.addEventListener("change", () => {
    state.selectedPlanDate = els.planDate.value || offsetDateKey(1);
    save();
    render();
  });
  els.workDate.addEventListener("change", () => {
    state.selectedWorkDate = els.workDate.value || todayKey();
    save();
    render();
  });
  els.taskForm.addEventListener("submit", addTask);
  els.carryOverButton.addEventListener("click", carryOverOpenTasks);
  els.copyPlanButton.addEventListener("click", copyPlanMarkdown);
  els.exportButton.addEventListener("click", exportJson);
  els.importInput.addEventListener("change", importJson);
  els.resetButton.addEventListener("click", resetAll);
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    els.installButton.classList.remove("hidden");
  });
  els.installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    els.installButton.classList.add("hidden");
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
  }
}

renderArtBackdrop();
renderInkBackdrop();
applyTheme(state.settings.theme);
autoArchivePastTasks();
bind();
save();
render();
registerServiceWorker();
