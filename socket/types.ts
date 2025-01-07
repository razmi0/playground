export type ButtonFactoryProps = {
    father: string;
    type: HTMLButtonElement["type"];
    textContent: string;
    onclick: string;
};

export type ButtonServer = {
    type: HTMLButtonElement["type"];
    textContent: string;
    onclick: string;
    father: string;
};

export type SocketAction = "CreateButton" | "ButtonClicked" | "Component" | "Unknown";
export type SocketMessage = {
    action: SocketAction;
    sender: "server" | "client";
    data: Record<string, unknown>;
};

export type StringifiedJSON<T> = string & { __jsonType?: T };
