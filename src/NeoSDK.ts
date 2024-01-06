import axios, { AxiosResponse } from "axios";
import * as schemas from "./schema";
import jwt_decode from "jwt-decode";
import * as errorHandling from "./Error";
import * as type from "./types";
import qs from "qs";

export default class NeoSDK {
    accessToken: string | undefined;
    loginUrl: string = "https://gw-napi.kotaksecurities.com/login/1.0/login";
    orderUrl: string = "https://gw-napi.kotaksecurities.com/Orders/2.0/quick";
    accessTokenUrl: string = "https://napi.kotaksecurities.com/oauth2/token";
    method = {
        post: "POST",
        get: "GET",
    };

    /* This will send url request to Neo Kotak Api
    ======================================
    */
    async request(req: type.req, method: string) {
        try {
            if (method === "POST") {
                var response: AxiosResponse = await axios.post(req.url, req.body, {
                    headers: req.headers,
                });
            } else if (method === "GET") {
                var response: AxiosResponse = await axios.get(req.url, {
                    headers: req.headers,
                });
            } else return;
            if (response.data.data === undefined) return { data: response.data };
            return { data: response.data.data, status: response.status };
        } catch (error: any) {
            errorHandling.create(error);
        }
    }
    async generateAccessToken(params: type.generateAccessToken) {
        let request = {
            url: this.accessTokenUrl,
            body: {},
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${params.customer_key}:${params.customer_secret}`
                ).toString("base64")}`,
            },
        };
        const response: any = await this.request(request, this.method.post);
        this.accessToken = `Bearer ${response.data.access_token}`;
        return this.accessToken;
    }
    setAccessToken(token: string) {
        this.accessToken = token;
    }
    getAccessToken() {
        return this.accessToken;
    }
    /*Setting headers after login
    ==================================*/

    loggedHeaders: any = {};
    getLoggedHeaders() {
        return this.loggedHeaders;
    }
    setLoggedHeaders(headers: type.loggedHeaders) {
        const validateValues = schemas.header.validate(headers);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);
        this.loggedHeaders = {
            ...headers,
            "Content-Type": "application/json",
            "neo-fin-key": "neotradeapi",
            Authorization: this.accessToken,
        };
    }

    /*Login methods, there are 3 total methods
    ===========================================  */

    async login(body: Object) {
        const validateValues = schemas.login.validate(body);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);
        let request = {
            url: `${this.loginUrl}/v2/validate`,
            body: body,
            headers: {
                "Content-Type": "application/json",
                Authorization: this.accessToken,
            },
        };

        let response: any = await this.request(request, this.method.post);
        await this.generateOtp(response.data.token);
        this.setLoggedHeaders({
            serverId: response.data.hsServerId,
            Sid: response.data.sid,
            Auth: response.data.token, // session token
            rid: response.data.rid,
        });
        return response.data;
    }

    async generateOtp(userIdJWT: string) {
        // decoding jwt to get userId
        const sub: any = jwt_decode(userIdJWT);

        const request = {
            url: `${this.loginUrl}/otp/generate`,
            body: {
                sendEmail: true,
                isWhitelisted: true,
                userId: sub.sub,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: this.accessToken,
            },
        };
        let response: any = await this.request(request, this.method.post);
        if (response.status !== 201) throw new Error("Failed to send OTP");
        return;
    }

    async setSession(req: type.setSession) {
        if (Object.keys(this.loggedHeaders).length === 0)
            throw new Error("Set headers first.");
        const validateValues = schemas.session.validate(req);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);

        // decoding jwt to get userId

        const sub: any = jwt_decode(req.sessionToken);

        const request = {
            url: `${this.loginUrl}/v2/validate`,
            body: {
                userId: sub.sub,
                otp: req.otp,
            },
            headers: { ...this.loggedHeaders },
        };

        let response: any = await this.request(request, this.method.post);
        if (response.status !== 201) throw new Error("Can't set session");
        this.loggedHeaders.auth = response.data.token;
        this.loggedHeaders.rid = response.data.rid;
        return response.data.token;
    }

    refreshToken() {
        const request = {
            url: `${this.loginUrl}/refresh`,
            body: { rid: this.loggedHeaders.rid },
            headers: { ...this.loggedHeaders },
        };
        return this.request(request, this.method.post);
    }

    /*For managing orders
    ==================================*/

    async orders(url: string, method: string, jData: {} = {}) {
        const request = {
            url: url,
            body: qs.stringify({
                jData: JSON.stringify(jData),
            }),
            headers: {
                ...this.loggedHeaders,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        return this.request(request, method);
    }

    async placeOrder(jData: any) {
        const validateValues = schemas.placeOrder.validate(jData);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);
        return this.orders(
            `${this.orderUrl}/order/rule/ms/place`,
            this.method.post,
            jData
        );
    }
    async modifyOrder(jData: {}) {
        return this.orders(
            `${this.orderUrl}/order/vr/modify`,
            this.method.post,
            jData
        );
    }
    async cancelOrder(jData: {}) {
        const validateValues = schemas.cancelOrder.validate(jData);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);

        return this.orders(
            `${this.orderUrl}/order/cancel`,
            this.method.post,
            jData
        );
    }
    async getOrderBook() {
        return this.orders(`${this.orderUrl}/user/orders`, this.method.get);
    }

    async getTradeBook() {
        return this.orders(`${this.orderUrl}/user/trades`, this.method.get);
    }
    async getPositionBook() {
        return this.orders(`${this.orderUrl}/user/positions`, this.method.get);
    }

    async getOrderHistory(jData: {}) {
        return this.orders(
            `${this.orderUrl}/order/history`,
            this.method.post,
            jData
        );
    }
    async limit(jData: {}) {
        const validateValues = schemas.limit.validate(jData);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);

        return this.orders(`${this.orderUrl}/user/limits`, this.method.post, jData);
    }
    async margin(jData: {}) {
        const validateValues = schemas.margin.validate(jData);
        if (validateValues.error)
            throw new Error(validateValues.error.details[0].message);

        return this.orders(
            `${this.orderUrl}/user/check-margin`,
            this.method.post,
            jData
        );
    }
}