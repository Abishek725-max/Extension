import getMarkdown from "./getMarkdown";

let socket = null;

// const url = "wss://orchestrator.openledger.dev/ws/v1/orch";
const url = "ws://192.168.18.129:9999";

chrome?.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
  connectWebSocket(url);
});

// chrome.storage.local.clear(() => {
//   if (chrome.runtime.lastError) {
//     console.error("Error clearing local storage:", chrome.runtime.lastError);
//   } else {
//     console.log("Local storage cleared.");
//   }
// });

connectWebSocket(url);

export function connectWebSocket(url) {
  // WebSocket server URL

  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket is connected.");
    socket.send(
      JSON.stringify({ action: "connect", data: "Client connected" })
    );

    // Start sending heartbeat after WebSocket is connected
    sendHeartbeat("Bossssss aee pls");
  };

  socket.onmessage = async (event) => {
    console.log("Message received from WebSocket:", event.data);

    const message = JSON.parse(event.data);
    setTimeout(
      () =>
        chrome.runtime.sendMessage(
          { type: "send_jobdata", data: message },
          (response) => {
            console.log("Response from content script:", response);
          }
        ),
      5000
    );

    // setLocalStorage("allJobData", JSON.stringify(message?.data));

    socket?.send(
      JSON?.stringify({
        workerID: "web-extension",
        msgType: "JOB_ASSIGNED",
        message: {
          Status: true,
          Ref: message?.data?.UUID,
        },
      })
    );

    let privateKey = await getLocalStorage("privateKey");
    console.log("🚀 ~ socket.onmessage= ~ privateKey:", privateKey);

    if (privateKey) {
      await getMarkdown(message, privateKey);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed", event);
  };

  function sendHeartbeat(workerId) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setInterval(() => {
        socket.send(JSON.stringify({ type: "HEARTBEAT", id: workerId }));
        console.log("Heartbeat sent:", workerId);
      }, 3000);
    } else {
      console.error("WebSocket is not open, unable to send heartbeat.");
    }
  }
}

if (chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "send_privatekey") {
      console.log("Received value:", request);
      setLocalStorage("privateKey", request?.value);
      // Do something with the value here (e.g., store it, send it to a server)

      // Send a response back to the content script if needed
      sendResponse({ status: "Value received" });
    }
  });
} else {
  console.error("chrome.runtime.onMessage is not available.");
}

const parseValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

function getLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .get([key])
      .then((data) => {
        resolve(parseValue(data[key]));
        console.log("Data get successfully! in chrome storage");
      })
      .catch(reject);
  });
}

function setLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local
      .set({ [key]: JSON.stringify(value) })
      .then(() => {
        resolve();
        chrome.runtime.sendMessage({
          type: "storageUpdated",
          key: key,
          value: value,
        });
        console.log("Data saved successfully! in chrome storage", value);
      })
      .catch(reject);
  });
}
