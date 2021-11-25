---
id: carrier
title: Email Template
---

Carrier is a micro service to manage Email notification templates. You can easily create or update your email templates on it, and it will convert simple HTML texts into MJML-generated Email. Once you provided your SendGrid, Carrier will issue a `carrierToken` for your service to call and send the generated email with certain data payload.

## How to use it?

Setup and prepare the template

1. Get the SendGrid API key from https://app.sendgrid.com/settings/api_keys
1. Go to https://stargately.com/carrier/templates/settings. Create an account if you do not have one. And place the SendGrid API key into the form and submit.
1. Upload your logo as well
1. Go to https://stargately.com/carrier/templates/email and click "New Template" to create a new template.

Call Carrier to send Email

1. Grab or set the `carrierToken` from https://stargately.com/carrier/templates/settings
1. Create a carrier client in your server's clients / gateways directory

```ts
import Axios, { AxiosInstance } from "axios";
import { logger } from "onefx/lib/integrated-gateways/logger";

const sendOperation = `
mutation Send(
  $templateId: String!
  $email: String!
  $idempotencyKey: String!
  $payload: JSONObject
) {
  send(
    templateId: $templateId
    email: $email
    idempotencyKey: $idempotencyKey
    payload: $payload
  )
}`;

type SendArgs = {
  templateId: string;
  email: string;
  idempotencyKey: string;
  payload: Record<string, unknown>;
};

export type CarrierOpts = {
  timeout: number;
  endpoint: string;
  token: string;
};

export class Carrier {
  private axios: AxiosInstance;

  constructor(opts: CarrierOpts) {
    this.axios = Axios.create({
      baseURL: opts.endpoint,
      timeout: opts.timeout,
      headers: {
        authorization: `Bearer ${opts.token}`,
      },
    });
  }

  async send(sendArgs: SendArgs): Promise<void> {
    try {
      const resp = await this.axios.post("/", {
        query: sendOperation,
        variables: sendArgs,
      });
      if (resp.data.errors && resp.data.errors.length) {
        logger.error(`carrier failed to send notification`, resp.data.errors);
      }
    } catch (err) {
      logger.error(`carrier failed to send notification`, err);
      throw err;
    }
  }
}
```

Then instantiate the client and send email

```ts
const carrier = new Carrier({
  endpoint: "https://stargately.com/carrier/api-gateway/",
  timeout: 5000,
  token: "carrier_TODO",
});

// use login_email_token template with the data payload having loginUrl
await carrier.send({
  templateId: "login_email_token",
  email: "puncsky+test@gmail.com",
  idempotencyKey: "yo",
  payload: {
    loginUrl: "https://example.com/login/?token=abc",
  },
});
```
