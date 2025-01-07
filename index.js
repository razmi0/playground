"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    HttpService.get = function (url_1, _a) {
        return __awaiter(this, arguments, void 0, function (url, _b) {
            var response, json, result, _c, errorResult, _d, err_1, errorResult, _e;
            var onError = _b.onError, onSuccess = _b.onSuccess, beforeLoad = _b.beforeLoad, afterLoad = _b.afterLoad;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.loading) {
                            return [2 /*return*/, { data: undefined, error: undefined }];
                        }
                        this.loading = true;
                        if (!beforeLoad) return [3 /*break*/, 2];
                        return [4 /*yield*/, beforeLoad()];
                    case 1:
                        _f.sent();
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 13, 17, 20]);
                        return [4 /*yield*/, fetch(url)];
                    case 3:
                        response = _f.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        json = (_f.sent());
                        if (!response.ok) return [3 /*break*/, 8];
                        if (!onSuccess) return [3 /*break*/, 6];
                        return [4 /*yield*/, onSuccess(json)];
                    case 5:
                        _c = _f.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _c = json;
                        _f.label = 7;
                    case 7:
                        result = _c;
                        return [2 /*return*/, { data: result, error: undefined }];
                    case 8:
                        if (!onError) return [3 /*break*/, 10];
                        return [4 /*yield*/, onError()];
                    case 9:
                        _d = _f.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _d = undefined;
                        _f.label = 11;
                    case 11:
                        errorResult = _d;
                        return [2 /*return*/, { data: undefined, error: errorResult }];
                    case 12: return [3 /*break*/, 20];
                    case 13:
                        err_1 = _f.sent();
                        if (!onError) return [3 /*break*/, 15];
                        return [4 /*yield*/, onError()];
                    case 14:
                        _e = _f.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        _e = undefined;
                        _f.label = 16;
                    case 16:
                        errorResult = _e;
                        return [2 /*return*/, { data: undefined, error: errorResult }];
                    case 17:
                        this.loading = false;
                        if (!afterLoad) return [3 /*break*/, 19];
                        return [4 /*yield*/, afterLoad()];
                    case 18:
                        _f.sent();
                        _f.label = 19;
                    case 19: return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    HttpService.loading = false;
    return HttpService;
}());
var asciispinner = ["▖", "▘", "▝", "▗"];
var interval;
// Example Usage
var _a = await HttpService.get("https://dummyjson.com/todos/1?delay=3000", {
    onError: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Error occurred");
            return [2 /*return*/, "An error occurred"];
        });
    }); },
    onSuccess: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Data fetched successfully");
            return [2 /*return*/, data];
        });
    }); },
    beforeLoad: function () { return __awaiter(void 0, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            i = 0;
            process.stdout.write("  Loading");
            process.stdout.cursorTo(0);
            interval = setInterval(function () {
                process.stdout.write(chalk_1.default.blue(asciispinner[i++ % asciispinner.length]));
                process.stdout.cursorTo(0);
            }, 100);
            return [2 /*return*/];
        });
    }); },
    afterLoad: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            clearInterval(interval);
            return [2 /*return*/];
        });
    }); },
}), data = _a.data, error = _a.error;
console.log(data, error);
