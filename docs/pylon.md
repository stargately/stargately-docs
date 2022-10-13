---
id: pylon
title: Stripe Subscription Manager
---

Pylon is a stripe subscription manager.

<img alt="Docusaurus " src={require('@docusaurus/useBaseUrl').default('img/pylon-architecture.png')} />

## User Guide

### Create products

First, create a subscription production in https://dashboard.stripe.com/products.

### Setup product and webhook in Pylon

For test

1. [Get api keys](https://dashboard.stripe.com/test/apikeys) and add to config/stripe-config.js
2. [Get webhook secret](https://dashboard.stripe.com/webhooks) and add to config/stripe-config.js
3. specify prices in src/shared/home/home.tsx
4. [register webhook](https://dashboard.stripe.com/webhooks/create) to localhost:4108/pylon/api/webhook/:clientId

When registering webhook, add these events to send

- customer.created
- customer.updated
- invoice.upcoming
- invoice.created
- invoice.finalized
- invoice.payment_failed
- invoice.payment_succeeded
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- checkout.session.completed

### Merge your schema from your product

Once the Pylon server is deployed, you could connect to it with merging schema

```typescript jsx
import {ApolloServer, introspectSchema, makeRemoteExecutableSchema, mergeSchemas} from "apollo-server-koa";
import { GraphQLSchema, printSchema } from "graphql";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import {logger} from "onefx/lib/integrated-gateways/logger";
import config from "config";
import { GraphQLRequest } from "apollo-link";
import fs from "fs";

async function safeAppendSchema(schemas: Array<GraphQLSchema>) {
  try {
    const remoteLink = setContext((_: GraphQLRequest, prevContext: any) => {
      const auth = prevContext?.graphqlContext?.headers?.authorization;
      return {
        headers: {
          Authorization: auth,
        },
      };
    }).concat(
      new HttpLink({
        uri: "https://stargately.com/pylon/api-gateway/",
        fetch,
        headers: {
          "x-client-id": config.get("project"),
          "x-tenant-id": "prod",
        },
      })
    );
    const remoteSchema = makeRemoteExecutableSchema({
      schema: await introspectSchema(remoteLink),
      link: remoteLink,
    });
    schemas.push(remoteSchema);
  } catch (e) {
    logger.error(`failed to append schema: ${e}`);
  }
}
```

Update local schema to merge remote one, and emit the new schema file

```ts
  const schemas = [await buildSchema({
    resolvers,
    authChecker: customAuthChecker,
    validate: false,
  })];

  await safeAppendSchema(schemas);

  const schema = mergeSchemas({
    schemas
  });

  fs.writeFileSync(sdlPath, printSchema(schema));
```

### Mount the checkout button in your product

Get your pricing plan Id from https://dashboard.stripe.com/products

and put that into your product. Here is an example with React.

```typescript jsx
<CheckoutButton
  userId={"userId"}
  clientId={"clientId"}
  priceId={"price_example"}
  email={"email@example.com"}
  pubKey={"pk_example"}
>
  Buy
</CheckoutButton>
```

Here is an example of CheckoutButton:

```text
.
├── checkout-button.tsx
├── data
│   ├── __generated__
│   │   └── CreateSubscriptionSession.ts
│   └── mutations.ts
└── hooks
    └── use-create-subscription-session.ts
```

checkout-button.tsx

```typescript jsx
import React from "react";
import Button from "antd/lib/button";
import notification from "antd/lib/notification";
import { useCreateSubscriptionSession } from "./hooks/use-create-subscription-session";

const loadScript = require("load-script");
const window = require("global/window");

function lazyLoadStripe(pubKey: string, cb: (stripe: any) => void): void {
  if (window.stripe) {
    cb(window.stripe);
    return;
  }
  loadScript("https://js.stripe.com/v3/", () => {
    window.stripe = window.Stripe(pubKey);
    cb(window.stripe);
  });
}

type Props = {
  userId: string;
  priceId: string;
  pubKey: string;
  clientId: string;
  email?: string;
  children: JSX.Element | string | React.ReactNode;
};

export function CheckoutButton({
  userId,
  priceId,
  email,
  pubKey,
  clientId,
  children,
}: Props): JSX.Element {
  const { createSubscriptionSession, loading } = useCreateSubscriptionSession();

  const handleClick = async () => {
    lazyLoadStripe(pubKey, async (stripe) => {
      const resp = await createSubscriptionSession({
        variables: {
          userId,
          priceId,
          email,
          clientId,
        },
      });
      const result = await stripe.redirectToCheckout({
        sessionId: resp.data?.createSubscriptionSession.id,
      });

      if (result.error) {
        notification.error({ message: `failed to checkout: ${result.error}` });
      }
    });
  };

  return (
    <Button role="link" onClick={handleClick} loading={loading}>
      {children}
    </Button>
  );
}
```

data/mutations.ts

```typescript jsx
import { gql } from "@apollo/client";

export const createSubscriptionSession = gql`
  mutation CreateSubscriptionSession(
    $clientId: String!
    $userId: String!
    $email: String
    $priceId: String!
    $coupon: String
  ) {
    createSubscriptionSession(
      userId: $userId
      email: $email
      priceId: $priceId
      coupon: $coupon
      clientId: $clientId
    ) {
      id
    }
  }
`;
```

`data/__generated__/CreateSubscriptionSession.ts`

```typescript jsx
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSubscriptionSession
// ====================================================

export interface CreateSubscriptionSession_createSubscriptionSession {
  id: string;
}

export interface CreateSubscriptionSession {
  /**
   * starts a subscription session for userId <> clientId <> priceId
   */
  createSubscriptionSession: CreateSubscriptionSession_createSubscriptionSession;
}

export interface CreateSubscriptionSessionVariables {
  clientId: string;
  userId: string;
  email?: string | null;
  priceId: string;
  coupon?: string | null;
}
```

hooks/use-create-subscription-session.ts

```typescript jsx
import { useMutation } from "@apollo/client";

import { createSubscriptionSession } from "../data/mutations";
import { CreateSubscriptionSession } from "../data/__generated__/CreateSubscriptionSession";

export const useCreateSubscriptionSession = () => {
  const [mutate, { data, loading }] = useMutation<CreateSubscriptionSession>(
    createSubscriptionSession
  );
  return {
    createSubscriptionSession: mutate,
    createdSession: data?.createSubscriptionSession,
    loading,
  };
};
```

## query PaymentSubscription

```gql
query PaymentSubscription($clientId: String!, $userId: String!) {
  paymentSubscription(clientId: $clientId, userId: $userId) {
    _id
    userId
    status
    clientId
    status
    stripe {
      planId
      subscriptionId
      productId
      subscriptionStatus
      customerId
    }
    paymentMethod
    nextBillingDate
    currentPeriodEnd
    currentPeriodStart
    cancelAt
  }
}
```

```json
{
  "userId": "",
  "clientId": ""
}
```

## cancel subscription


```gql
mutation CancelSubscription($clientId: String!, $userId: String!) {
  cancelSubscription(clientId: $clientId, userId: $userId) {
    ok
  }
}
```

```json
{
  "userId": "",
  "clientId": ""
}
```
