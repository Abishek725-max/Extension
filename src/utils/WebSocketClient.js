// WebSocketClient.js

class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket connection established");

        // Optionally, send a message once connected
        this.sendMessage({ event: "init", data: "Connection established" });

        // Add event listener inside onopen to ensure the socket is connected
        this.socket.onmessage = (message) => {
          const parsedMessage = JSON.parse(message.data);
          this.handleMessage(parsedMessage);
        };
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  handleMessage(message) {
    const { event, data } = message;
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }
}

// Export the WebSocketService class
export default WebSocketService;
