// WebSocketClient.ts

const WS_URL = "wss://orchestrator.openledger.dev/ws/v1/orch";

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 3000; // 3 seconds, initial delay
  private eventTarget: EventTarget;

  private constructor() {
    this.eventTarget = new EventTarget(); // Initialize event target
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  connect(): void {
    if (this.isConnected) return;

    try {
      this.socket = new WebSocket(WS_URL);

      this.socket.onopen = () => {
        console.log("Connected to WebSocket server");
        this.isConnected = true;
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event: MessageEvent) => {
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
          default:
            console.log("Unknown message type:", message.type);
        }
      };

      this.socket.onclose = (event: CloseEvent) => {
        this.isConnected = false;
        console.log("WebSocket connection closed:", event.reason);
        this.reconnect();
      };

      this.socket.onerror = (error: Event) => {
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

  reconnect(): void {
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

  sendMessage(message: object): void {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("Not connected to the server. Message not sent.");
    }
  }

  register(workerId: string): void {
    this.sendMessage({ type: "REGISTER", id: workerId });
  }

  sendHeartbeat(workerId: string): void {
    this.sendMessage({ type: "HEARTBEAT", id: workerId });
  }

  sendJobResponse(
    workerId: string,
    jobId: string,
    status: string,
    result: any
  ): void {
    this.sendMessage({
      type: "ACK",
      workerMsg_id: workerId,
      job_id: jobId,
      status,
      result,
    });
  }

  public addEventListener(type: string, listener: EventListener): void {
    this.eventTarget.addEventListener(type, listener);
  }

  public removeEventListener(type: string, listener: EventListener): void {
    this.eventTarget.removeEventListener(type, listener);
  }
}

export default WebSocketClient;
