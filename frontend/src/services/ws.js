// Unified WebSocket Manager

const WS_URL = globalThis.__APP_CONFIG__?.WS_URL || "ws://localhost:8000/ws";

class WebSocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(WS_URL);

    this.socket.onopen = () => {
      console.log("[WS] Connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach((fn) => fn(data));
      } catch (e) {
        console.error("[WS] Invalid JSON:", e);
      }
    };

    this.socket.onclose = () => {
      console.warn("[WS] Connection lost. Reconnecting...");
      setTimeout(() => this.connect(), 2000);
    };

    this.socket.onerror = (err) => {
      console.error("[WS] Error:", err);
      this.socket.close();
    };
  }

  subscribe(callback) {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    this.listeners.set(id, callback);
    return () => this.listeners.delete(id);
  }

  send(data) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }
}

export const ws = new WebSocketManager();