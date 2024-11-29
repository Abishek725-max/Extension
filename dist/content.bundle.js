/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
const value = "privatekeyVAlueesetup";

console.log("Content script loaded");

chrome.runtime.sendMessage(
  { type: "send_privatekey", value: value },
  function (response) {
    console.log("Response from background:", response);
  }
);

window.addEventListener("message", (event) => {
  console.log("Received data in content script: Extension", event);
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("merssagagae", message);

//   if (message.action === "sendDataToBackground") {
//     // Forward the data to the background script
//     chrome.runtime.sendMessage({
//       action: "receiveData",
//       data: message.data,
//     });
//   }
// });

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map