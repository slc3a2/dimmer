chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.info === "changeMode") {
    const root = document.getElementsByTagName("html")[0];
    if (!root.classList.contains("dimmer-dark")) {
      root.classList.add("dimmer-dark");
      sessionStorage.setItem("ohmydimmer-isDark", "true");
    } else {
      root.classList.remove("dimmer-dark");
      sessionStorage.setItem("ohmydimmer-isDark", "false");
    }
  }
  if (request.info === "getMode") {
    const root = document.getElementsByTagName("html")[0];
    if (!root.classList.contains("dimmer-dark")) {
      sendResponse({
        has: false,
      });
    } else {
      sendResponse({
        has: true,
      });
    }
  }
});

function main() {
  if (sessionStorage.getItem("ohmydimmer-flag")) {
    const t = sessionStorage.getItem("ohmydimmer-isDark");
    const root = document.getElementsByTagName("html")[0];
    if (t === "true") {
      root.classList.add("dimmer-dark");
    } else {
      root.classList.remove("dimmer-dark");
    }
  } else {
    // 首次被加载
    sessionStorage.setItem("ohmydimmer-flag", "true");
  }
}

main();
