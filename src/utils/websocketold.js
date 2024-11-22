const WS_URL = "wss://orchestrator.openledger.dev/ws/v1/orch";

// const WS_URL = "wss://192.168.12.200:9999";
//
class WebSocketClient {
  static instance = null;
  socket = null;
  isConnected = false;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  reconnectDelay = 3000; // 3 seconds

  constructor() {}

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
        switch (message.type) {
          case "ACK":
            console.log("Server acknowledged:", message.message);
            break;
          case "JOB_RESPONSE":
            console.log("Job completed:", message.jobId);
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
      };
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      this.isConnected = false; // Ensure to update connection status on error
      this.reconnect();
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );
      setTimeout(() => this.connect(), this.reconnectDelay);
    } else {
      console.error("Max reconnection attempts reached.");
    }
  }

  sendMessage(message) {
    console.log("message", message);
    console.log("isConnected", this.isConnected);
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
}

export default WebSocketClient;
