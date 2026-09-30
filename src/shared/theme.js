const root = document.documentElement;
const button = document.getElementById("themeBtn");

const isDark = () => {
  const theme = root.getAttribute("data-theme");
  return theme
    ? theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
};

const updateLabel = () => {
  button.textContent = isDark()
    ? button.dataset.darkLabel
    : button.dataset.lightLabel;
};

if (button) {
  const key = button.dataset.key;

  try {
    const saved = localStorage.getItem(key);
    if (saved) root.setAttribute("data-theme", saved);
  } catch {}

  updateLabel();

  button.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(key, next);
    } catch {}
    updateLabel();
  });
}
