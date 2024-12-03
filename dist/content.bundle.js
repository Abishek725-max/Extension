/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculatePercentage: () => (/* binding */ calculatePercentage),
/* harmony export */   calculateTimeAgo: () => (/* binding */ calculateTimeAgo),
/* harmony export */   epochPointsWithHeight: () => (/* binding */ epochPointsWithHeight),
/* harmony export */   formatNumber: () => (/* binding */ formatNumber),
/* harmony export */   formatWalletAddress: () => (/* binding */ formatWalletAddress),
/* harmony export */   getLocalStorage: () => (/* binding */ getLocalStorage),
/* harmony export */   getPrivateKey: () => (/* binding */ getPrivateKey),
/* harmony export */   latestEntry: () => (/* binding */ latestEntry),
/* harmony export */   maxTotal: () => (/* binding */ maxTotal),
/* harmony export */   setLocalStorage: () => (/* binding */ setLocalStorage),
/* harmony export */   sortJobsByDate: () => (/* binding */ sortJobsByDate),
/* harmony export */   truncateAddress: () => (/* binding */ truncateAddress),
/* harmony export */   validatePrivateKey: () => (/* binding */ validatePrivateKey)
/* harmony export */ });
const formatWalletAddress = walletAddress => {
  if (walletAddress) {
    const firstPart = walletAddress.slice(0, 4); // First 4 characters
    const lastPart = walletAddress.slice(-4); // Last 4 characters

    return `${firstPart}........${lastPart}`;
  }
};
const calculateTimeAgo = lastUpdate => {
  const diffInMs = Date.now() - new Date(lastUpdate).getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hrs ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};
const getPrivateKey = () => {
  let privatekey = localStorage?.getItem("privateKey");
  return privatekey;
};
const validatePrivateKey = key => {
  const regex = /^[a-fA-F0-9]{64}$/;
  if (key.startsWith("0x")) {
    key = key.replace(/0x/, "");
  }
  return regex.test(key);
};
const sortJobsByDate = (jobs = []) => {
  return jobs.sort((a, b) => {
    const dateA = new Date(typeof a.Dataset === "string" ? JSON.parse(a.Dataset).createdAt : a.Dataset?.createdAt);
    const dateB = new Date(typeof b.Dataset === "string" ? JSON.parse(b.Dataset).createdAt : b.Dataset?.createdAt);
    return dateB - dateA;
  });
};

// Wallet address Truncate
const truncateAddress = (address, maxLength) => {
  if (!address) return "";
  if (address.length <= maxLength) {
    return address;
  }
  const startLength = Math.ceil((maxLength - 10) / 2);
  const endLength = Math.floor((maxLength - 9) / 2);
  return address.substr(0, startLength) + " ... " + address.substr(address.length - endLength);
};

// Function to calculate the percentage
const calculatePercentage = (value, total, chartHeight) => value / total * (chartHeight - 1);

// Step 1: Find the maximum total value
const maxTotal = rewardsHistoryData => {
  return Math.max(...rewardsHistoryData.map(point => point.points));
};

// Step 2: Calculate rem values based on the ratio to the maximum total
const epochPointsWithHeight = (rewardsHistoryData, maxTotalPoint) => {
  const newData = rewardsHistoryData.map(point => {
    const chartHeight = point.points / maxTotalPoint * 10;
    return {
      ...point,
      chartHeight // Add the calculated rem value to the object
    };
  });
  return newData;
};

// Step 1: Find the most recent entry by comparing dates
const latestEntry = rewardsHistoryData => {
  if (rewardsHistoryData.length === 0) return null; // Return null if data is empty
  return rewardsHistoryData.reduce((latest, current) => {
    return new Date(current.created) > new Date(latest.created) ? current : latest;
  });
};
const formatNumber = num => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
const parseValue = value => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
function getLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key]).then(data => {
      resolve(parseValue(data[key]));
      console.log("Data get successfully! in chrome storage");
    }).catch(reject);
  });
}
function setLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({
      [key]: JSON.stringify(value)
    }).then(() => {
      resolve();
      chrome.runtime.sendMessage({
        type: "storageUpdated",
        key: key,
        value: value
      });
      console.log("Data saved successfully! in chrome storage", value);
    }).catch(reject);
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
// const value = "privatekeyVAlueesetup";

const {
  getLocalStorage
} = __webpack_require__(/*! ./utils/common */ "./src/utils/common.js");
console.log("Content script loaded");

// chrome.runtime.sendMessage(
//   { type: "send_privatekey", value: value },
//   function (response) {
//     console.log("Response from background:", response);
//   }
// );

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received data in backgroundScript", message);
  if (message?.type === "send_jobdata") {
    // Process the job data
    sendResponse({
      status: "Received job data"
    });
  }
});
window.addEventListener("message", async event => {
  console.log("Received data in content script: Extension", event);
  if (event?.data?.type === "send_privatekey") {
    let {
      value
    } = event?.data;
    chrome.runtime.sendMessage({
      type: "send_privatekey",
      value: value
    }, function (response) {
      console.log("Response from background:", response);
    });
  }
  if (event?.data?.type === "send_jobdata") {
    let jobData = await getLocalStorage("allJobData");
    console.log("valueinStorage", jobData);
    window.postMessage({
      type: "getJobData",
      value: jobData
    }, "*"), console.log("Received data in jobData", event);
  }
});

// setTimeout(
//   () => window.postMessage({ type: "SendDataTOExtension" }, "*"),
//   4000
// );
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
})();

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map