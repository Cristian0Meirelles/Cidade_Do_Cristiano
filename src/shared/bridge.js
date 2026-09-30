if (window.parent !== window) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.parent.postMessage({ cm: "close" }, location.origin);
    }
  });
}
