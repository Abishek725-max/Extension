// document.getElementById("registerButton").addEventListener("click", () => {
//   chrome.runtime.sendMessage({ action: "REGISTER" });
// });

// // Listen for WebSocket messages from the background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "WEBSOCKET_MESSAGE") {
//     console.log("Received WebSocket message:", message.data);
//     displayMessage(message.data);
//   }
// });

// // Function to display the message in the popup
// function displayMessage(data) {
//   const messagesContainer = document.getElementById("messages");

//   // Create a new div element to hold the message
//   const messageDiv = document.createElement("div");
//   messageDiv.classList.add("message");
//   messageDiv.textContent = data; // Set the text to the received data

//   // Append the message to the messages container
//   messagesContainer.appendChild(messageDiv);
// }
