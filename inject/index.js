chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.info === "changeMode") {
    const [root] = document.getElementsByTagName("html");
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

const checkIsFullScreen = () => {
  document.addEventListener("fullscreenchange", () => {
    const hasVideo = window.document.fullscreenElement.querySelector("video");
    if (hasVideo) {
      const root = document.querySelector("html");
      console.log(root);
      root.classList.remove("dimmer-dark");
      sessionStorage.setItem("ohmydimmer-isDark", "false");
    }
  });
};

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
    sessionStorage.setItem("ohmydimmer-flag", "true");
  }
  checkIsFullScreen();
}

main();
