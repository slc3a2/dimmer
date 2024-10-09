document.querySelector(".normal").onclick = function (e) {
  if (this.classList.contains("cur")) {
    this.classList.remove("cur");
    document.querySelector("body").classList.remove("dark");
    changeModeHandle();
  } else {
    this.classList.add("cur");
    console.log(document.querySelector("body"));
    document.querySelector("body").classList.add("dark");
    changeModeHandle();
  }
};

function changeModeHandle() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let message = {
        info: "changeMode",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, (res) => {});
    }
  );
}
window.onload = function () {
  const { version } = chrome.runtime.getManifest();
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      let message = {
        info: "getMode",
      };
      chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
        if (res?.has) {
          document.querySelector(".normal").classList.add("cur");
        } else {
          document.querySelector(".normal").classList.remove("cur");
        }
      });
    }
  );

  document.querySelector(".gh").onclick = function (e) {
    window.open("https://github.com/slc3a2/dimmer");
  };

  document.querySelector(".score").onclick = function (e) {
    window.open(
      "https://chrome.google.com/webstore/detail/%E5%85%B3%E7%81%AF/dnidbhhpcjgffjophhebfelbcnonoclh?hl=zh-CN"
    );
  };
};
