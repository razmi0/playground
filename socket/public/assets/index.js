// CLiENT
var ClientSocket = /** @class */ (function () {
    function ClientSocket() {
        this.decode = function (eventData) {
            return JSON.parse(eventData);
        };
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.socket.onclose = function () {
            console.log("Disconnected from the server");
        };
        this.socket.onopen = function (_event) {
            console.log("Connected to the server");
        };
    }
    ClientSocket.prototype.send = function (message) {
        this.socket.send(JSON.stringify(message));
    };
    ClientSocket.prototype.onmessage = function (onMessage) {
        var _this = this;
        this.socket.onmessage = function (event) {
            var decoded = _this.decode(event.data);
            console.log("Received message from the server:", decoded);
            onMessage(event, decoded);
        };
    };
    return ClientSocket;
}());
var socket = new ClientSocket();
socket.onmessage(function (_event, decoded) {
    switch (decoded.action) {
        case "CreateButton": {
            var _a = decoded.data, father = _a.father, type = _a.type, textContent = _a.textContent, onclick_1 = _a.onclick;
            createButton({
                father: father,
                type: type,
                text: textContent,
                onClick: onclick_1,
            });
            break;
        }
    }
});
function createButton(_a) {
    var father = _a.father, _b = _a.type, type = _b === void 0 ? "button" : _b, text = _a.text, onClick = _a.onClick;
    console.log("creating button");
    var button = document.createElement("button");
    var fatherElement = document.querySelector(father);
    button.type = type;
    var cb = createFunction(onClick);
    button.addEventListener("click", cb);
    button.textContent = text;
    if (!fatherElement) {
        console.error("Father element not found : ", father);
        return;
    }
    fatherElement.appendChild(button);
}
function createFunction(body) {
    var _a;
    var woSpaces = body.replace(/\s/g, "");
    var args = (_a = woSpaces.match(/\(([a-zA-Z]+,?)+\)=>/)) === null || _a === void 0 ? void 0 : _a[0].replace(/[=>()]/g, "");
    var nudeFn = woSpaces.replace("(".concat(args, ")=>"), "").trim().replace(/[{}]/g, "");
    return args ? new Function(args, nudeFn) : new Function(nudeFn);
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
