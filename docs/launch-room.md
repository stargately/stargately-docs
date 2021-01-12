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
