import { LANGS, H, BL } from "./i18n.js";

const root = document.documentElement;

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const B = [
  {
    k: "sobre",
    nm: "Casa",
    sign: "SOBRE MIM",
    c: "#5b8def",
    r: "#c9463d",
    roof: "tri",
    h: 112,
    d: "#7a4a2a",
    txt: "Quem eu sou, como eu trabalho e do que eu gosto. Com uma carta de Super Trunfo.",
    deco: "",
  },
  {
    k: "trabalhos",
    nm: "Escritório",
    sign: "TRABALHOS",
    c: "#7fb2e0",
    r: "#2c4a6e",
    roof: "flat",
    h: 150,
    d: "#2c4a6e",
    txt: "Cada trabalho em detalhe: contexto, o que eu fiz, ferramentas e resultados.",
    deco: "",
  },
  {
    k: "projetos",
    nm: "Oficina",
    sign: "PROJETOS",
    c: "#3fb7a8",
    r: "#1b1d33",
    roof: "saw",
    h: 108,
    d: "#1c5a52",
    txt: "Cada projeto como planta técnica: o problema, o que eu construí e os detalhes.",
    deco: "",
  },
  {
    k: "historia",
    nm: "Biblioteca",
    sign: "HISTÓRIA",
    c: "#e3d3b0",
    r: "#b89a66",
    roof: "tri",
    h: 110,
    d: "#6b4a2b",
    txt: "A minha história em oito capítulos, de 2000 até agora.",
    deco: '<span class="pillars"></span>',
  },
  {
    k: "trilha",
    nm: "Rodoviária",
    sign: "POR ONDE PASSEI",
    c: "#f2f2f2",
    r: "#e2342f",
    roof: "wide",
    h: 92,
    d: "#444",
    txt: "A linha de todos os lugares por onde eu passei, com os anos.",
    deco: '<span class="bus"></span>',
  },
  {
    k: "escola",
    nm: "Escola",
    sign: "FORMAÇÃO",
    c: "#e8a33a",
    r: "#8a3b2b",
    roof: "tri",
    h: 112,
    d: "#5a3a1a",
    txt: "Formação, idiomas e habilidades, com onde eu usei cada uma.",
    deco: '<span class="bell"></span>',
  },
  {
    k: "atelie",
    nm: "Ateliê",
    sign: "CADERNO",
    c: "#f3eadb",
    r: "#e2476b",
    roof: "tri",
    h: 104,
    d: "#6b4a2b",
    txt: "O caderno do Cristiano: meus desenhos, os rabiscos que viraram projeto e uma página pra você desenhar.",
    deco: '<span class="pencil"></span>',
  },
  {
    k: "futuro",
    nm: "Observatório",
    sign: "FUTURO",
    c: "#8f7ae8",
    r: "#5b48b8",
    roof: "dome",
    h: 100,
    d: "#2b2560",
    txt: "Pra onde eu estou indo: IA em produção, liderança e o que eu procuro.",
    deco: '<span class="scope"></span>',
  },
  {
    k: "jogo",
    nm: "Fliperama",
    sign: "JOGO",
    c: "#2d2a5a",
    r: "#1b1d33",
    roof: "flat",
    h: 118,
    d: "#ff6fa5",
    txt: "O jogo de plataforma com as fases da minha vida. Dá pra jogar ou só assistir.",
    deco: '<span class="neon">ARCADE</span>',
  },
  {
    k: "terminal",
    nm: "Lan house",
    sign: "TERMINAL",
    c: "#e4a53c",
    r: "#8a5a1a",
    roof: "flat",
    h: 106,
    d: "#3b2a10",
    txt: "A aventura em texto: uma cidade inteira pra explorar digitando.",
    deco: '<span class="antenna"></span>',
  },
];
let LANG = (() => {
  const ok = LANGS.map((x) => x[0]);
  try {
    const s = localStorage.getItem("cm-lang");
    if (ok.includes(s)) return s;
  } catch (e) {}
  const nav = navigator.languages || [navigator.language || "en"];
  for (let i = 0; i < nav.length; i++) {
    const c = String(nav[i]).slice(0, 2).toLowerCase();
    if (ok.includes(c)) return c;
  }
  return "en";
})();
function L() {
  return H[LANG];
}
function bt(b) {
  const x = BL[b.k][LANG];
  let t = x[2];
  if (b.k === "terminal" && LANG !== "pt")
    t += H[LANG].ptOnly + (LANG === "ja" ? "" : ".");
  return { nm: x[0], sign: x[1], txt: t };
}
const grid = document.getElementById("grid");
const walker = document.getElementById("walker");
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
grid.innerHTML = B.map(
  (b, i) =>
    `<div class="lot"><button class="bld" data-i="${i}" style="--c:${b.c};--r:${b.r};--h:${b.h}px;--d:${b.d}" aria-label="${esc(bt(b).nm)}. ${esc(bt(b).txt)}"><span class="pointer"></span><span class="roof ${b.roof}"></span><span class="body">${b.deco}<span class="sign">${esc(bt(b).sign)}</span><span class="door"></span><span class="flag"></span></span></button></div>`,
).join("");
document.getElementById("places").innerHTML = B.map(
  (b, i) =>
    `<li><button data-i="${i}"><i style="background:${b.c}"></i><span><b>${esc(bt(b).nm)}</b><span>${esc(bt(b).txt)}</span></span></button></li>`,
).join("");
const blds = [].slice.call(document.querySelectorAll(".bld"));

/* céu */
const sky = document.getElementById("sky");
for (let s = 0; s < 40; s++) {
  const st = document.createElement("i");
  st.style.left = `${Math.random() * 100}%`;
  st.style.top = `${Math.random() * 60}px`;
  st.style.animationDelay = `${Math.random() * 3}s`;
  sky.appendChild(st);
}
[
  [14, 70, 90],
  [40, 110, 130],
  [28, 60, 160],
].forEach((c, i) => {
  const cl = document.createElement("b");
  cl.style.top = `${c[0]}px`;
  cl.style.width = `${c[1]}px`;
  cl.style.animationDuration = `${c[2]}s`;
  cl.style.animationDelay = `${-i * 50}s`;
  sky.appendChild(cl);
});

/* personagem */
const ART = {
  f1: [
    "...tttttt...",
    "..thhhhhht..",
    ".thhhhhhhht.",
    ".thhsssshht.",
    "tthsksskshtt",
    "tthsssssshtt",
    "...ssrrss...",
    "....ssss....",
    "..bbbbbbbb..",
    ".bbbbggbbbb.",
    ".sbbbbbbbbs.",
    "..bbbbbbbb..",
    "..kkk..kkk..",
    "..kkk..kkk..",
  ],
  f2: [
    "...tttttt...",
    "..thhhhhht..",
    ".thhhhhhhht.",
    ".thhsssshht.",
    "tthsksskshtt",
    "tthsssssshtt",
    "...ssrrss...",
    "....ssss....",
    "..bbbbbbbb..",
    ".bbbbggbbbb.",
    ".sbbbbbbbbs.",
    "..bbbbbbbb..",
    "..kkkkkkk...",
    ".kk.....kk..",
  ],
};
const CP = {
  k: "#1b1d33",
  s: "#f1b98b",
  h: "#3b2418",
  b: "#3d6fd1",
  t: "#4fd1c1",
  g: "#ffc94a",
  r: "#e2476b",
};
function svg(rows, cls) {
  let o = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      if (c !== ".")
        o += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${CP[c]}"/>`;
    }
  });
  return `<svg class="${cls}" viewBox="0 0 12 14" shape-rendering="crispEdges">${o}</svg>`;
}
walker.innerHTML = svg(ART.f1, "f1") + svg(ART.f2, "f2");
let sel = 0;
let pos = null;
let walkT = null;
function doorPoint(i) {
  const t = document.getElementById("town").getBoundingClientRect();
  const b = blds[i].querySelector(".door").getBoundingClientRect();
  return {
    x: b.left + b.width / 2 - t.left + (i % 2 ? -26 : 26),
    y: b.bottom - t.top + 18,
  };
}
function place(i, animate, cb) {
  const p = doorPoint(i);
  if (!pos || !animate || reduce) {
    walker.style.setProperty("--t", "0s");
    walker.style.left = `${p.x}px`;
    walker.style.top = `${p.y}px`;
    pos = p;
    if (cb) cb();
    return;
  }
  const d = Math.hypot(p.x - pos.x, p.y - pos.y);
  const dur = Math.min(1.1, Math.max(0.25, d / 700));
  walker.classList.toggle("flip", p.x < pos.x);
  walker.classList.add("walk");
  walker.style.setProperty("--t", `${dur}s`);
  clearInterval(walkT);
  walkT = setInterval(() => {
    walker.classList.toggle("alt");
  }, 140);
  walker.style.left = `${p.x}px`;
  walker.style.top = `${p.y}px`;
  pos = p;
  setTimeout(
    () => {
      clearInterval(walkT);
      walker.classList.remove("walk", "alt", "flip");
      if (cb) cb();
    },
    dur * 1000 + 40,
  );
}
function select(i, animate, cb) {
  sel = (i + B.length) % B.length;
  blds.forEach((b, j) => {
    b.classList.toggle("sel", j === sel);
  });
  document.getElementById("tipName").textContent = bt(B[sel]).nm;
  document.getElementById("tipText").textContent = bt(B[sel]).txt;
  place(sel, animate, cb);
}

/* visitas */
let seen = {};
try {
  seen = JSON.parse(localStorage.getItem("cm-cidade") || "{}");
} catch (e) {}
function mark(k) {
  seen[k] = 1;
  try {
    localStorage.setItem("cm-cidade", JSON.stringify(seen));
  } catch (e) {}
  blds.forEach((b, i) => {
    b.classList.toggle("seen", !!seen[B[i].k]);
  });
  const n = Object.keys(seen).filter((x) => B.some((b) => b.k === x)).length;
  document.getElementById("count").textContent = L().count(n, B.length);
}
mark("__");

/* abrir lugar */
const placeEl = document.getElementById("place");

const frames = document.getElementById("frames");
const cache = {};
let cur = -1;
let lastFocus = null;
function placeUrl(k, lang) {
  return `/${k === "terminal" ? "pt" : lang}/${k}/`;
}

const warmed = new Set();

function warmUp(lang) {
  for (const { k } of B) {
    const url = placeUrl(k, lang);
    if (warmed.has(url)) continue;
    warmed.add(url);
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const fonts = html.matchAll(
          /<link[^>]+href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"/g,
        );
        for (const [, href] of fonts) {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "style";
          link.href = href.replace(/&amp;/g, "&");
          document.head.appendChild(link);
        }
      })
      .catch(() => {});
  }
}

function frameFor(k) {
  const ck = `${LANG}:${k}`;
  if (cache[ck]) return cache[ck];
  const f = document.createElement("iframe");
  f.title = bt(B.filter((b) => b.k === k)[0]).nm;
  f.className = "pending";
  f.reveal = () => {
    f.classList.remove("pending");
    if (!f.hidden) document.getElementById("loading").hidden = true;
  };
  f.addEventListener("load", f.reveal);
  setTimeout(f.reveal, 5000);
  f.src = placeUrl(k, LANG);
  frames.appendChild(f);
  cache[ck] = f;
  return f;
}
function openPlace(i) {
  const b = B[i];
  mark(b.k);
  cur = i;
  lastFocus = document.activeElement;
  document.getElementById("pName").innerHTML =
    `${esc(bt(b).nm)}<small>${esc(bt(b).txt)}</small>`;
  Object.keys(cache).forEach((k) => {
    cache[k].hidden = true;
  });
  const f = frameFor(b.k);
  f.hidden = false;
  document.getElementById("loading").hidden = !f.classList.contains("pending");
  placeEl.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    try {
      f.contentWindow.focus();
    } catch (e) {}
  }, 300);
}
function closePlace() {
  placeEl.hidden = true;
  document.body.style.overflow = "";
  select(cur, false);
  if (lastFocus) lastFocus.focus();
}
function step(d) {
  const n = (cur + d + B.length) % B.length;
  select(n, false);
  openPlace(n);
}
document.getElementById("back").onclick = closePlace;
document.getElementById("prev").onclick = () => {
  step(-1);
};
document.getElementById("next").onclick = () => {
  step(1);
};
document.getElementById("mailBtn").onclick = () => {
  document.getElementById("mail").showModal();
};
document.getElementById("mailClose").onclick = () => {
  document.getElementById("mail").close();
};
function go(i) {
  clearInterval(walkT);
  walker.classList.remove("walk", "alt", "flip");
  select(i, false);
  openPlace(i);
}
blds.forEach((b, i) => {
  b.addEventListener("click", () => {
    go(i);
  });
  b.addEventListener("mouseenter", () => {
    if (sel !== i) select(i, true);
  });
  b.addEventListener("focus", () => {
    if (sel !== i) select(i, true);
  });
  b.addEventListener("keydown", (e) => {
    const cols = innerWidth <= 760 ? 2 : innerWidth <= 1000 ? 3 : 5;

    const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[
      e.key
    ];

    if (d === undefined) return;
    e.preventDefault();
    const n = i + d;
    if (n < 0 || n >= B.length) return;
    blds[n].focus();
  });
});
[].forEach.call(document.querySelectorAll("#places button"), (b) => {
  b.onclick = () => {
    const i = +b.dataset.i;
    select(i, false);
    openPlace(i);
  };
});
document.getElementById("enter").onclick = () => {
  go(sel);
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !placeEl.hidden) closePlace();
});
addEventListener("message", (e) => {
  const m = e.data;
  if (e.origin !== location.origin || !m || !m.cm) return;
  if (m.cm === "ready") {
    Object.values(cache)
      .find((f) => f.contentWindow === e.source)
      ?.reveal();
  }
  if (m.cm === "close" && !placeEl.hidden) closePlace();
  if (m.cm === "open") {
    const i = B.map((b) => b.k).indexOf(m.place);
    if (i > -1) {
      select(i, false);
      openPlace(i);
    }
  }
});
function applyLang() {
  const h = L();
  root.lang = LANG === "pt" ? "pt-BR" : LANG;
  document.title = h.docTitle;
  [].forEach.call(document.querySelectorAll("[data-t]"), (el) => {
    const v = h[el.getAttribute("data-t")];
    if (typeof v === "string") el.innerHTML = v;
  });
  [].forEach.call(document.querySelectorAll("[data-ta]"), (el) => {
    el.setAttribute("alt", h[el.getAttribute("data-ta")]);
  });
  blds.forEach((el, i) => {
    const t = bt(B[i]);
    el.querySelector(".sign").textContent = t.sign;
    el.setAttribute("aria-label", `${t.nm}. ${t.txt}`);
  });
  [].forEach.call(document.querySelectorAll("#places button"), (el) => {
    const t = bt(B[+el.dataset.i]);
    el.querySelector("b").textContent = t.nm;
    el.querySelector("span span").textContent = t.txt;
  });
  document.getElementById("tipName").textContent = bt(B[sel]).nm;
  document.getElementById("tipText").textContent = bt(B[sel]).txt;
  mark("__");
  lbl();
  const ls = document.getElementById("langSel");
  ls.value = LANG;
  ls.setAttribute("aria-label", h.lang);
  setTimeout(() => {
    place(sel, false);
  }, 50);
}
const lsel = document.getElementById("langSel");
lsel.innerHTML = LANGS.map(
  (x) => `<option value="${x[0]}">${x[1]}</option>`,
).join("");
lsel.onchange = () => {
  LANG = lsel.value;
  try {
    localStorage.setItem("cm-lang", LANG);
  } catch (e) {}
  if (!placeEl.hidden) closePlace();
  applyLang();
  warmUp(LANG);
};

const whenIdle =
  window.requestIdleCallback || ((callback) => setTimeout(callback, 1200));
addEventListener("load", () => whenIdle(() => warmUp(LANG)));
addEventListener("resize", () => {
  place(sel, false);
});
select(0, false);
if (document.fonts && document.fonts.ready)
  document.fonts.ready.then(() => {
    place(sel, false);
  });

const th = document.getElementById("theme");
function dark() {
  const t = root.getAttribute("data-theme");
  return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}
function lbl() {
  th.textContent = dark() ? L().day : L().night;
}
try {
  const sv = localStorage.getItem("cm-cidade-theme");
  if (sv) root.setAttribute("data-theme", sv);
} catch (e) {}
lbl();
th.onclick = () => {
  const n = dark() ? "light" : "dark";
  root.setAttribute("data-theme", n);
  try {
    localStorage.setItem("cm-cidade-theme", n);
  } catch (e) {}
  lbl();
};
applyLang();
