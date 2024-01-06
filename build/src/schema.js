"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = exports.header = exports.session = exports.placeOrder = exports.modifyOrder = exports.cancelOrder = exports.margin = exports.limit = void 0;
var joi_1 = __importDefault(require("joi"));
var optionalBO = joi_1["default"].forbidden().when("prod", {
    is: "BO",
    then: joi_1["default"].number().positive().required()
});
var exchange = joi_1["default"].string()
    .required()
    .valid("nse_cm", "bse_cm", "nse_fo", "bse_fo", "cde_fo", "bse_fo", "mcx_fo");
var productCode = joi_1["default"].string()
    .required()
    .valid("NRML", "CNC", "MIS", "INTRADAY", "CO", "BO", "PRIME");
var triggerPrice = joi_1["default"].number()
    .positive()
    .when("pt", {
    "switch": [
        { is: "SL", then: joi_1["default"].number().required().positive() },
        { is: "L", then: joi_1["default"].number().required().valid(0) },
        { is: "MKT", then: joi_1["default"].number().required().valid(0) },
        { is: "SL-M", then: joi_1["default"].number().required().positive() },
    ]
});
exports.limit = joi_1["default"].object({
    seg: joi_1["default"].string().required().valid("CASH", "CUR", "FO", "ALL"),
    exch: joi_1["default"].string().required().valid("NSE", "BSE", "ALL"),
    prod: joi_1["default"].string().required().valid("CNC", "MIS", "NRML", "ALL")
});
exports.margin = joi_1["default"].object({
    brkName: joi_1["default"].string().required(),
    brnchId: joi_1["default"].string().required(),
    exSeg: exchange,
    trnsTp: joi_1["default"].string().required().valid("B", "S"),
    prcTp: joi_1["default"].string().required().valid("L", "MKT", "SL", "SL-M"),
    prod: productCode,
    qty: joi_1["default"].number().required().positive(),
    tok: joi_1["default"].number().required(),
    trgPrc: joi_1["default"].forbidden().when("prod", {
        is: "CO",
        then: joi_1["default"].number().positive().required()
    }),
    slAbsOrTks: optionalBO,
    slVal: optionalBO,
    sqrOffAbsOrTks: optionalBO,
    sqrOffVal: optionalBO,
    trailSL: joi_1["default"].forbidden().when("prod", {
        is: "BO",
        then: joi_1["default"].number().positive().required().valid("Y", "N")
    }),
    tSLTks: joi_1["default"].forbidden().when("prod", {
        is: "BO",
        then: joi_1["default"].number().positive().required().valid("Y", "N")
    }),
    prc: joi_1["default"].number()
        .required()
        .when("prcTp", { is: "MKT", then: joi_1["default"].number().required().valid(0) })
});
exports.cancelOrder = joi_1["default"].object({
    on: joi_1["default"].number().required().positive(),
    am: joi_1["default"].string().valid("NO", "YES"),
    ts: joi_1["default"].string().when("am", { is: "YES", then: joi_1["default"].string().required() })
});
exports.modifyOrder = joi_1["default"].object({
    tk: joi_1["default"].number().required().positive(),
    dq: joi_1["default"].number().required().greater(-1),
    vd: joi_1["default"].string().required().valid("DAY", "IOC"),
    pc: productCode,
    ts: joi_1["default"].string().required(),
    tt: joi_1["default"].string().required().valid("B", "S"),
    pr: joi_1["default"].number().required().positive(),
    tp: triggerPrice,
    qt: joi_1["default"].number().required().positive(),
    no: joi_1["default"].number().required().positive(),
    pt: joi_1["default"].string().required().valid("L", "MKT", "SL", "SL-M"),
    au: joi_1["default"].string(),
    sr: joi_1["default"].string(),
    rq: joi_1["default"].string(),
    fq: joi_1["default"].number().positive(),
    mp: joi_1["default"].string(),
    dd: joi_1["default"].string(),
    ai: joi_1["default"].string()
});
exports.placeOrder = joi_1["default"].object({
    am: joi_1["default"].string().valid("NO", "YES"),
    bc: joi_1["default"].string(),
    cl: joi_1["default"].string()["default"]("3"),
    nc: joi_1["default"].string(),
    dq: joi_1["default"].number().required().greater(-1),
    mp: joi_1["default"].number().required().greater(-1)["default"](0),
    pf: joi_1["default"].string().required().valid("Y", "N"),
    pr: joi_1["default"].number().required().greater(-1),
    tp: triggerPrice,
    pc: productCode,
    qt: joi_1["default"].number().required().positive(),
    tt: joi_1["default"].string().required().valid("B", "S"),
    rt: joi_1["default"].string().required().valid("DAY", "IOC"),
    pt: joi_1["default"].string().required().valid("L", "MKT", "SL", "SL-M"),
    ts: joi_1["default"].string().required(),
    es: joi_1["default"].string()
        .required()
        .valid("nse_cm", "bse_cm", "nse_fo", "bse_fo", "cde_fo", "bse_fo", "mcx_fo")
});
exports.session = joi_1["default"].object({
    otp: joi_1["default"].string().length(4).required(),
    sessionToken: joi_1["default"].string().required()
});
exports.header = joi_1["default"].object({
    Sid: joi_1["default"].string().required(),
    Auth: joi_1["default"].string().required(),
    rid: joi_1["default"].string().required(),
    serverId: joi_1["default"].string()
});
exports.login = joi_1["default"].object({
    mobileNumber: joi_1["default"].string().length(13),
    password: joi_1["default"].string().required()
})
    .without("mobileNumber", "pan")
    .xor("mobileNumber", "pan");
