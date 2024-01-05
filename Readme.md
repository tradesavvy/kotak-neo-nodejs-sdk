# Neo Kotak Nodejs SDK

## Installation
```
npm i @laabhum/kotak-neo-nodejs-sdk
```

## Getting started

```js
const { NeoSDK } = require("@laabhum/kotak-neo-nodejs-sdk");

let neo = new NeoSDK();

(async () => {
    // save accessToken to database
    let accessToken = await neo.generateAccessToken({
        username: "neo_username",
        password: "neo_password",
        customer_secret: "customer_secret generated from developer portal",
        customer_key: "customer_key generated from developer portal",
    })

    try {
        let response = await neo.login({
            pan: "client_pan",
            mobileNumber : "+917777777777" // Either mobile number or pan is allowed
            password: "client_password",
        });

        let sessionToken = await neo.setSession({
            otp: otp, // enter otp that has been sent to the registered mobile number
            sessionToken: response.token, // sessionToken
        });
        await neo.getOrderBook()
    }
})();
```

If you have already generated access token and already logged in client

````js
    neo.setAccessToken(
        "access_token",
    );
    neo.setLoggedHeaders({
        serverId: "server_id",
        rid: "refresh_token",
        Sid: "user_id",
        Auth: "session_token",
    });
    await neo.getOrderBook();
````

## Available Methods


## License

[Laabhum Private Limited](https://laabhum.com/) (c) 2022. Licensed under the ISC License.