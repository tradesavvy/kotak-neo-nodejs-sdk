"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var schemas = __importStar(require("./schema"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var errorHandling = __importStar(require("./Error"));
var qs_1 = __importDefault(require("qs"));
var NeoSDK = (function () {
    function NeoSDK() {
        this.loginUrl = "https://gw-napi.kotaksecurities.com/login/1.0/login";
        this.orderUrl = "https://gw-napi.kotaksecurities.com/Orders/2.0/quick";
        this.accessTokenUrl = "https://napi.kotaksecurities.com/oauth2/token";
        this.method = {
            post: "POST",
            get: "GET"
        };
        this.loggedHeaders = {};
    }
    NeoSDK.prototype.request = function (req, method) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(method === "POST")) return [3, 2];
                        return [4, axios_1["default"].post(req.url, req.body, {
                                headers: req.headers
                            })];
                    case 1:
                        response = _a.sent();
                        return [3, 5];
                    case 2:
                        if (!(method === "GET")) return [3, 4];
                        return [4, axios_1["default"].get(req.url, {
                                headers: req.headers
                            })];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4: return [2];
                    case 5:
                        if (response.data.data === undefined)
                            return [2, { data: response.data }];
                        return [2, { data: response.data.data, status: response.status }];
                    case 6:
                        error_1 = _a.sent();
                        errorHandling.create(error_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    NeoSDK.prototype.generateAccessToken = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            url: this.accessTokenUrl,
                            body: {
                                grant_type: "password",
                                username: params.username,
                                password: params.password
                            },
                            headers: {
                                Authorization: "Basic ".concat(Buffer.from("".concat(params.customer_key, ":").concat(params.customer_secret)).toString("base64"))
                            }
                        };
                        return [4, this.request(request, this.method.post)];
                    case 1:
                        response = _a.sent();
                        this.accessToken = "Bearer ".concat(response.data.access_token);
                        return [2, this.accessToken];
                }
            });
        });
    };
    NeoSDK.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    NeoSDK.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    NeoSDK.prototype.getLoggedHeaders = function () {
        return this.loggedHeaders;
    };
    NeoSDK.prototype.setLoggedOrderHeaders = function (headers) {
        this.loggedHeaders = __assign(__assign({}, headers), { "Content-Type": "application/json", "neo-fin-key": "neotradeapi", Authorization: this.accessToken });
    };
    NeoSDK.prototype.setLoggedHeaders = function (headers) {
        var validateValues = schemas.header.validate(headers);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);
        this.loggedHeaders = __assign(__assign({}, headers), { "Content-Type": "application/json", "neo-fin-key": "neotradeapi", Authorization: this.accessToken });
    };
    NeoSDK.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateValues = schemas.login.validate(body);
                        if (validateValues.error)
                            throw new Error(validateValues.error.details[0].message);
                        request = {
                            url: "".concat(this.loginUrl, "/v2/validate"),
                            body: body,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: this.accessToken
                            }
                        };
                        return [4, this.request(request, this.method.post)];
                    case 1:
                        response = _a.sent();
                        return [4, this.generateOtp(response.data.token)];
                    case 2:
                        _a.sent();
                        this.setLoggedHeaders({
                            serverId: response.data.hsServerId,
                            Sid: response.data.sid,
                            Auth: response.data.token,
                            rid: response.data.rid
                        });
                        return [2, response.data];
                }
            });
        });
    };
    NeoSDK.prototype.generateOtp = function (userIdJWT) {
        return __awaiter(this, void 0, void 0, function () {
            var sub, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sub = (0, jwt_decode_1["default"])(userIdJWT);
                        request = {
                            url: "".concat(this.loginUrl, "/otp/generate"),
                            body: {
                                sendEmail: true,
                                isWhitelisted: true,
                                userId: sub.sub
                            },
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: this.accessToken
                            }
                        };
                        return [4, this.request(request, this.method.post)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 201)
                            throw new Error("Failed to send OTP");
                        return [2];
                }
            });
        });
    };
    NeoSDK.prototype.setSession = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues, sub, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Object.keys(this.loggedHeaders).length === 0)
                            throw new Error("Set headers first.");
                        validateValues = schemas.session.validate(req);
                        if (validateValues.error)
                            throw new Error(validateValues.error.details[0].message);
                        sub = (0, jwt_decode_1["default"])(req.sessionToken);
                        request = {
                            url: "".concat(this.loginUrl, "/v2/validate"),
                            body: {
                                userId: sub.sub,
                                otp: req.otp
                            },
                            headers: __assign({}, this.loggedHeaders)
                        };
                        return [4, this.request(request, this.method.post)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 201)
                            throw new Error("Can't set session");
                        this.loggedHeaders.auth = response.data.token;
                        this.loggedHeaders.rid = response.data.rid;
                        return [2, response.data];
                }
            });
        });
    };
    NeoSDK.prototype.refreshToken = function () {
        var request = {
            url: "".concat(this.loginUrl, "/refresh"),
            body: { rid: this.loggedHeaders.rid },
            headers: __assign({}, this.loggedHeaders)
        };
        return this.request(request, this.method.post);
    };
    NeoSDK.prototype.orders = function (url, method, jData) {
        if (jData === void 0) { jData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = {
                    url: url,
                    body: qs_1["default"].stringify({
                        jData: JSON.stringify(jData)
                    }),
                    headers: __assign(__assign({}, this.loggedHeaders), { "Content-Type": "application/x-www-form-urlencoded" })
                };
                return [2, this.request(request, method)];
            });
        });
    };
    NeoSDK.prototype.placeOrder = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues;
            return __generator(this, function (_a) {
                validateValues = schemas.placeOrder.validate(jData);
                if (validateValues.error)
                    throw new Error(validateValues.error.details[0].message);
                return [2, this.orders("".concat(this.orderUrl, "/order/rule/ms/place"), this.method.post, jData)];
            });
        });
    };
    NeoSDK.prototype.modifyOrder = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.orders("".concat(this.orderUrl, "/order/vr/modify"), this.method.post, jData)];
            });
        });
    };
    NeoSDK.prototype.cancelOrder = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues;
            return __generator(this, function (_a) {
                validateValues = schemas.cancelOrder.validate(jData);
                if (validateValues.error)
                    throw new Error(validateValues.error.details[0].message);
                return [2, this.orders("".concat(this.orderUrl, "/order/cancel"), this.method.post, jData)];
            });
        });
    };
    NeoSDK.prototype.getOrderBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.orders("".concat(this.orderUrl, "/user/orders"), this.method.get)];
            });
        });
    };
    NeoSDK.prototype.getTradeBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.orders("".concat(this.orderUrl, "/user/trades"), this.method.get)];
            });
        });
    };
    NeoSDK.prototype.getPositionBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.orders("".concat(this.orderUrl, "/user/positions"), this.method.get)];
            });
        });
    };
    NeoSDK.prototype.getOrderHistory = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.orders("".concat(this.orderUrl, "/order/history"), this.method.post, jData)];
            });
        });
    };
    NeoSDK.prototype.limit = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues;
            return __generator(this, function (_a) {
                validateValues = schemas.limit.validate(jData);
                if (validateValues.error)
                    throw new Error(validateValues.error.details[0].message);
                return [2, this.orders("".concat(this.orderUrl, "/user/limits"), this.method.post, jData)];
            });
        });
    };
    NeoSDK.prototype.margin = function (jData) {
        return __awaiter(this, void 0, void 0, function () {
            var validateValues;
            return __generator(this, function (_a) {
                validateValues = schemas.margin.validate(jData);
                if (validateValues.error)
                    throw new Error(validateValues.error.details[0].message);
                return [2, this.orders("".concat(this.orderUrl, "/user/check-margin"), this.method.post, jData)];
            });
        });
    };
    return NeoSDK;
}());
exports["default"] = NeoSDK;
