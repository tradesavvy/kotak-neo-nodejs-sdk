import Joi from "joi";

const optionalBO = Joi.forbidden().when("prod", {
  is: "BO",
  then: Joi.number().positive().required(),
});
const exchange = Joi.string()
  .required()
  .valid("nse_cm", "bse_cm", "nse_fo", "bse_fo", "cde_fo", "bse_fo", "mcx_fo");
const productCode = Joi.string()
  .required()
  .valid("NRML", "CNC", "MIS", "INTRADAY", "CO", "BO", "PRIME");
const triggerPrice = Joi.number()
  .positive()
  .when("pt", {
    switch: [
      { is: "SL", then: Joi.number().required().positive() },
      { is: "L", then: Joi.number().required().valid(0) },
      { is: "MKT", then: Joi.number().required().valid(0) },
      { is: "SL-M", then: Joi.number().required().positive() },
    ],
  });

export const limit = Joi.object({
  seg: Joi.string().required().valid("CASH", "CUR", "FO", "ALL"),
  exch: Joi.string().required().valid("NSE", "BSE", "ALL"),
  prod: Joi.string().required().valid("CNC", "MIS", "NRML", "ALL"),
});

export const margin = Joi.object({
  brkName: Joi.string().required(),
  brnchId: Joi.string().required(),
  exSeg: exchange,
  trnsTp: Joi.string().required().valid("B", "S"),
  prcTp: Joi.string().required().valid("L", "MKT", "SL", "SL-M"),
  prod: productCode,
  qty: Joi.number().required().positive(),
  tok: Joi.number().required(),
  trgPrc: Joi.forbidden().when("prod", {
    is: "CO",
    then: Joi.number().positive().required(),
  }),
  slAbsOrTks: optionalBO,
  slVal: optionalBO,
  sqrOffAbsOrTks: optionalBO,
  sqrOffVal: optionalBO,
  trailSL: Joi.forbidden().when("prod", {
    is: "BO",
    then: Joi.number().positive().required().valid("Y", "N"),
  }),
  tSLTks: Joi.forbidden().when("prod", {
    is: "BO",
    then: Joi.number().positive().required().valid("Y", "N"),
  }),
  prc: Joi.number()
    .required()
    .when("prcTp", { is: "MKT", then: Joi.number().required().valid(0) }),
});

export const cancelOrder = Joi.object({
  on: Joi.number().required().positive(),
  am: Joi.string().valid("NO", "YES"),
  ts: Joi.string().when("am", { is: "YES", then: Joi.string().required() }),
});
export const modifyOrder = Joi.object({
  tk: Joi.number().required().positive(),
  dq: Joi.number().required().greater(-1),
  vd: Joi.string().required().valid("DAY", "IOC"),
  pc: productCode,
  ts: Joi.string().required(),
  tt: Joi.string().required().valid("B", "S"),
  pr: Joi.number().required().positive(),
  tp: triggerPrice,
  qt: Joi.number().required().positive(),
  no: Joi.number().required().positive(),
  pt: Joi.string().required().valid("L", "MKT", "SL", "SL-M"),
  au: Joi.string(),
  sr: Joi.string(),
  rq: Joi.string(),
  fq: Joi.number().positive(),
  mp: Joi.string(),
  dd: Joi.string(),
  ai: Joi.string(),
});
export const placeOrder = Joi.object({
  am: Joi.string().valid("NO", "YES"),
  bc: Joi.string(),
  cl: Joi.string().default("3"),
  nc: Joi.string(),
  dq: Joi.number().required().greater(-1),
  mp: Joi.number().required().greater(-1).default(0),
  pf: Joi.string().required().valid("Y", "N"),
  pr: Joi.number().required().greater(-1),
  tp: triggerPrice,
  pc: productCode,
  qt: Joi.number().required().positive(),
  tt: Joi.string().required().valid("B", "S"),
  rt: Joi.string().required().valid("DAY", "IOC"),
  pt: Joi.string().required().valid("L", "MKT", "SL", "SL-M"),
  ts: Joi.string().required(),
  es: Joi.string()
    .required()
    .valid(
      "nse_cm",
      "bse_cm",
      "nse_fo",
      "bse_fo",
      "cde_fo",
      "bse_fo",
      "mcx_fo"
    ),
});
export const session = Joi.object({
  otp: Joi.string().length(4).required(),
  sessionToken: Joi.string().required(),
});
export const header = Joi.object({
  Sid: Joi.string().required(),
  Auth: Joi.string().required(),
  rid: Joi.string().required(),
  serverId: Joi.string(),
});
export const login = Joi.object({
  mobileNumber: Joi.string().length(13),
  password: Joi.string().required(),
//   pan: Joi.string().length(10),
})
  .without("mobileNumber", "pan")
  .xor("mobileNumber", "pan");
