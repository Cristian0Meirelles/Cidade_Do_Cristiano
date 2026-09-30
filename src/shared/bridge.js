if (window.parent !== window) {
  const notify = (message) =>
    window.parent.postMessage(message, location.origin);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => notify({ cm: "ready" }));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") notify({ cm: "close" });
  });
}
