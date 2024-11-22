import getMarkdown from "./getMarkdown";

let socket = null;

chrome?.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed");
  connectWebSocket();
});

export function connectWebSocket(type) {
  const url = "ws://192.168.18.129:9999"; // WebSocket server URL

  socket = new WebSocket(url);

  console.log("background", type);

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

    chrome.storage.local.set({ jobData: event.data }, () => {
      console.log("Data saved to chrome storage");
    });

    chrome.storage.local.get("jobData", function (result) {
      console.log("Value:", result);
    });

    // Safeguard for chrome.runtime.sendMessage
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: "WEBSOCKET_MESSAGE",
        message: event.data,
      });
    } else {
      console.warn("chrome.runtime.sendMessage is not available.");
    }

    await getMarkdown(message);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed", event);
  };

  // Function to send heartbeat
  function sendHeartbeat(workerId) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setInterval(() => {
        socket.send(JSON.stringify({ type: "HEARTBEAT", id: workerId }));
        console.log("Heartbeat sent:", workerId);
      }, 3000); // Send heartbeat every 30 seconds
    } else {
      console.error("WebSocket is not open, unable to send heartbeat.");
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEND_MESSAGE_TO_WS") {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message.data));
    }
  }
});
