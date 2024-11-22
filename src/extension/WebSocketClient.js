const WS_URL = "ws://192.168.18.103:9999";

class WebSocketClient {
  static instance = null;
  socket = null;
  isConnected = false;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  reconnectDelay = 3000; // 3 seconds, initial delay
  eventTarget = new EventTarget(); // Initialize event target

  static getInstance() {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  connect() {
    if (this.isConnected) return;

    try {
      this.socket = new WebSocket(WS_URL);

      this.socket.onopen = () => {
        console.log("Connected to WebSocket server");
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message from server:", message);
        this.eventTarget.dispatchEvent(
          new CustomEvent("message", { detail: message })
        );

        switch (message.type) {
          case "ACK":
            console.log("Server acknowledged:", message.message);
            break;
          case "JOB_RESPONSE":
            console.log("Job completed:", message.jobId);
            break;
          case "SCRAP":
            console.log("Job completed:", message.jobId);
            localStorage.setItem("jobData", JSON.stringify(message));
            break;
          default:
            console.log("Unknown message type:", message.type);
        }
      };

      this.socket.onclose = (event) => {
        this.isConnected = false;
        console.log("WebSocket connection closed:", event.reason);
        this.reconnect();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.isConnected = false; // Ensure to update connection status on error
        this.reconnect();
      };
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      this.isConnected = false;
      this.reconnect();
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff
      console.log(
        `Attempting to reconnect in ${delay / 1000}s... (${
          this.reconnectAttempts
        }/${this.maxReconnectAttempts})`
      );
      setTimeout(() => this.connect(), delay);
    } else {
      console.error("Max reconnection attempts reached.");
    }
  }

  sendMessage(message) {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("Not connected to the server. Message not sent.");
    }
  }

  register(workerId) {
    this.sendMessage({ type: "REGISTER", id: workerId });
  }

  sendHeartbeat(workerId) {
    this.sendMessage({ type: "HEARTBEAT", id: workerId });
  }

  sendJobResponse(workerId, jobId, status, result) {
    this.sendMessage({
      type: "ACK",
      workerMsg_id: workerId,
      job_id: jobId,
      status,
      result,
    });
  }

  addEventListener(type, listener) {
    this.eventTarget.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    this.eventTarget.removeEventListener(type, listener);
  }
}

export { WebSocketClient };
