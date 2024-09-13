document.querySelector(".normal").onclick = function (e) {
  if (this.classList.contains("cur")) {
    this.classList.remove("cur");
    changeModeHandle();
    // const { checked } = document.querySelector(".switch");
    // if (checked) {
    //   localStorage.setItem("ohmydimmerGlobal", "0");
    // }
  } else {
    this.classList.add("cur");
    changeModeHandle();
    // const { checked } = document.querySelector(".switch");
    // if (checked) {
    //   localStorage.setItem("ohmydimmerGlobal", "1");
    // }
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
  // const t = localStorage.getItem("ohmydimmerGlobal");
  // if (t === "1") {
  //   document.querySelector(".normal").classList.add("cur");
  //   changeModeHandle();
  // } else {
  //   document.querySelector(".normal").classList.remove("cur");
  //   changeModeHandle();
  // }

  document.querySelector(".gh").onclick = function (e) {
    window.open("https://github.com/slc3a2/dimmer");
  };

  document.querySelector(".score").onclick = function (e) {
    window.open(
      "https://chrome.google.com/webstore/detail/%E5%85%B3%E7%81%AF/dnidbhhpcjgffjophhebfelbcnonoclh?hl=zh-CN"
    );
  };

  // document.querySelector(".switch").onclick = function (e) {
  //   const { checked } = document.querySelector(".switch");
  //   console.log(checked);
  // };
};
