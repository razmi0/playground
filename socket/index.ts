// CLiENT

type ButtonServer = {
    type: HTMLButtonElement["type"];
    textContent: string;
    onclick: string;
    father: string;
};

type SocketAction = "Increment" | "Decrement" | "CreateButton" | "ButtonClicked" | "Unknown";
type SocketMessage = {
    action: SocketAction;
    sender: "server" | "client";
    data: Record<string, unknown>;
};

class ClientSocket {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.socket.onclose = () => {
            console.log("Disconnected from the server");
        };

        this.socket.onopen = (_event) => {
            console.log("Connected to the server");
        };
    }

    send(message: SocketMessage) {
        this.socket.send(JSON.stringify(message));
    }

    private decode = (eventData: unknown) => {
        return JSON.parse(eventData as string) as SocketMessage;
    };

    onmessage(onMessage: (event: WebSocketEventMap["message"], decoded: SocketMessage) => void) {
        this.socket.onmessage = (event: MessageEvent) => {
            const decoded = this.decode(event.data) as SocketMessage;
            console.log("Received message from the server:", decoded);
            onMessage(event, decoded);
        };
    }
}

const socket = new ClientSocket();

socket.onmessage((_event, decoded) => {
    switch (decoded.action) {
        case "CreateButton": {
            const { father, type, textContent, onclick } = decoded.data as ButtonServer;
            createButton({
                father,
                type,
                text: textContent,
                onClick: onclick,
            });
            break;
        }
    }
});
/**
 *
 *
 *
 *
 *
 */
// (this: HTMLButtonElement, ev: MouseEvent) => any
// type Fn<T> = (this: T, ev: MouseEvent) => any;

type CreateButtonProps = {
    father: string;
    type: HTMLButtonElement["type"];
    text: string;
    onClick: string;
};
function createButton({ father, type = "button", text, onClick }: CreateButtonProps) {
    console.log("creating button");
    const button = document.createElement("button");
    const fatherElement = document.querySelector(father);
    button.type = type;

    const cb = createFunction<(e: MouseEvent) => void>(onClick);

    button.addEventListener("click", cb);

    button.textContent = text;
    if (!fatherElement) {
        console.error("Father element not found : ", father);
        return;
    }
    fatherElement.appendChild(button);
}

function createFunction<T>(body: string): T {
    const woSpaces = body.replace(/\s/g, "");
    const args = woSpaces.match(/\(([a-zA-Z]+,?)+\)=>/)?.[0].replace(/[=>()]/g, "");
    const nudeFn = woSpaces.replace(`(${args})=>`, "").trim().replace(/[{}]/g, "");
    return args ? (new Function(args, nudeFn) as T) : (new Function(nudeFn) as T);
}

// createButton({
//     father: "#button-group",
//     type: "button",
//     text: "Click me",
//     onClick: () => {
//         socket.send({
//             action: "ButtonClicked",
//             sender: "client",
//             data: { clicked: true },
//         });
//     },
// });
