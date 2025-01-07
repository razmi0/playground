import { route as Route } from "@razmio/web-server";
import { serveFile } from "jsr:@std/http@^1.0.12";
// import  from "./Hello.tsx";
// import HelloComponent from "./Hello.tsx";
import type { ButtonServer, SocketAction, SocketMessage, StringifiedJSON } from "./types.ts";

// import { jsonResponse, zodSafe } from "./lib/_response.ts";
// import Route from "./lib/_route.ts";
// import {  } from "./lib/_ssr.ts";
// import type { ServerHandler } from "./lib/_types.ts";

class ServerSocket {
    socket: WebSocket;
    onclose = (_event: CloseEvent) => console.log("Client disconnected");

    constructor(req: Request, public response: Response = new Response()) {
        const upgradedReq = Deno.upgradeWebSocket(req);
        this.response = upgradedReq.response;
        this.socket = upgradedReq.socket;
    }

    private encode = (action: SocketAction, data: Record<string, unknown>): StringifiedJSON<SocketMessage> => {
        const message: SocketMessage = { action, sender: "server", data };
        return JSON.stringify(message);
    };

    private decode = (eventData: unknown) => {
        return JSON.parse(eventData as string) as SocketMessage;
    };

    send = (action: SocketAction, data: Record<string, unknown>) => {
        console.log("[Outgoing Message] : ", action);
        const payload = this.encode(action, data);
        this.socket.send(payload);
    };

    onopen = (onOpen: (event: WebSocketEventMap["open"]) => void) => {
        this.socket.onopen = (event: WebSocketEventMap["open"]) => {
            console.log("Client connected");
            onOpen(event);
        };
    };

    onmessage = (onMessage: (event: WebSocketEventMap["message"], decoded: SocketMessage) => void) => {
        this.socket.onmessage = (event: MessageEvent) => {
            const decoded = this.decode(event.data) as SocketMessage;
            console.log("[Incoming Message] : ", decoded.action);
            onMessage(event, decoded);
        };
    };
}

export const runner = (req: Request) => {
    const { execute, get } = new Route.default(req);

    /**
     * static files
     */
    get("/wbs", () => serveFile(req, "public/pages/wbs.html"));

    /**
     * WebSocket server
     */
    get("/ws", () => {
        const { onmessage, response, send, onopen } = new ServerSocket(req);

        const onClick = (e: Event) => {
            send("Component", { component: Hello });
        };

        onopen(() => {
            send("CreateButton", {
                father: "#button-group",
                type: "button",
                textContent: "Click me",
                onclick: onClick.toString(),
            } as ButtonServer);
        });

        onmessage((_event, decoded) => {
            switch (decoded.action) {
                default:
                    console.log("Unknown action");
                    send("Unknown", { message: "Unknown action" });
                    break;
            }
        });

        return response;
    });

    return execute();
};
