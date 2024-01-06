export type req = {
    url: string;
    body: {} | undefined;
    headers: {};
};
export type setSession = {
    otp: string;
    sessionToken: string;
};
export type generateAccessToken = {
    username: string;
    password: string;
    customer_key: string;
    customer_secret: string;
};
export type loggerOrderHeaders = {
    Sid: string;
    Auth: string;
}
export type loggedHeaders = {
    serverId: string;
    Sid: string;
    Auth: string;
    rid: string;
};