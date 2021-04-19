---
id: launch-room
title: Launch Room Feature Flag Service
---

Launch Room is a feature flag service that is lightweight and compatible with LaunchDarkly client.

## NodeJS

```ts
const lr = LaunchDarkly.init(
  "sdk-TODO-your-key",
  {
    baseUri: "https://stargately.com/launch-room",
    eventsUri: "https://stargately.com/launch-room",
    stream: false
  }
);

const spendingReportSubscriptionFeature = await lr.variation(
  "spendingReportSubscription",
  {
    key: user?.id,
    email: user?.email,
    ip: user?.ip,
    country: user?.locale
  },
  false
);
```

## React

In app root

```tsx
export function App(): JSX.Element {
  const [LDProvider, setFlagsLoaded] = useState<null | React.FC>(null);
  const ldClient = useLDClient();
  useEffect(() => {
    (async () => {
      try {
        const Provider = await asyncWithLDProvider({
          clientSideID: "your-client-side-id",
          user: {
            key: "aa0ceb",
            name: "Grace Hopper",
            email: "gracehopper@example.com",
          },
          options: {
            baseUrl: "https://stargately.com",
            eventsUrl: "https://stargately.com",
            streaming: false,
          },
        });

        await ldClient?.identify({ key: "aa0ceb" });

        setFlagsLoaded(() => Provider);
      } catch (e) {
        console.log("failed to load flags", e);
      }
    })();
  }, []);

  if (LDProvider) {
    return (
      <LDProvider>
        <Inner />
      </LDProvider>
    );
  }

  return <Inner />;
}
```

And then

```tsx
import React from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

export const HooksDemo: React.FC = () => {
  const { announcements } = useFlags();

  console.log("announcements", announcements);

  return <div>{announcements ? "Flag on" : "Flag off"}</div>;
};
```

## Your first feature flag

### Overview
This topic explains how to create feature flags in Launch Room. You can use feature flags in any aspect of your application, from the customer-facing UI to the back end.

In the Launch Room UI, you can create a new flag, clone and modify an existing flag to create new ones, and set default variations for flags.

### Creating a feature flag

You can create and modify feature flags from the dashboard.

To create a feature flag:

1. Log into Launch Room. The dashboard appears.
2. Click **"+ Flag"**. The "Create a feature Flag" modal appears.
<figure>
    <img alt="Docusaurus " src={require('@docusaurus/useBaseUrl').default('img/launch-room-dashboard.png')} />
    <figcaption>The dashboard, with the New button called out.</figcaption>
</figure>
3. Enter a unique, human-readable **Name**.
4. Enter a unique flag **Key**. You'll use this key to reference the flag in your code. A suggested key auto-populates from the name you enter, but you can customize it if you wish.
5. (Optional) Enter a **Description** of the flag. A brief, human-readable description helps your team members understand what the flag is for.
6. (Optional) Click into the **Tags** dropdown and choose one or more tags for your flag.
7. (Optional) In the "Client-side SDK flag availability" section, check the **SDKs using Mobile Key** and/or **SDKs using client-side ID** boxes to designate which SDKs the flag should be available to. To learn more, read Making flags available to client-side and mobile SDKs.
8. Choose an option in the **Flag variations** dropdown. To learn more, read Flag variations.
9. (Optional) Specify details for your **Variation**. To learn more, read Managing flag variations.
10. (Optional) Change the **default variations** for the flag's on and off states. To learn more about default variations, read Setting default variations.
11. (Optional) Select the **This is a permanent flag** checkbox.
12. (Optional) Select the **Make this flag available to client-side SDKs** checkbox. If you choose this option, the flag will be pushed out to client-side SDKs.
13. Click **Submit**.
<figure>
    <img alt="Docusaurus " src={require('@docusaurus/useBaseUrl').default('img/launch-room-new-flag.png')} />
    <figcaption>The Create a feature flag screen.</figcaption>
</figure>

That's it! You just created a feature flag. You can see it in the dashboard.

### Setting default variations
When you create a feature flag, some of its variations are designated as default variations. You can accept the defaults or change them. When you do this and click **Save Flag**, the flag is created across all environments in your project with these variations set as its on and off values.

## Finding the Launch Room token in your project

During the exercises in the Your first flag guide, you created a Launch Room project, and configured your app to use the token from that project. This new app will use the same token.

To retrieve the token for your project:

1. Navigate to the Account settings page. It lists all the projects to which your Launch Room user account has access.
2. Find the project which you created for the Your first flag guide.
3. In the Account Settings page, click on the project's token to copy it to your clipboard.

<figure>
    <img alt="Docusaurus " src={require('@docusaurus/useBaseUrl').default('img/launch-room-token.png')} />
    <figcaption>The Account Settings page in Launch Room with environment token called out.</figcaption>
</figure>
