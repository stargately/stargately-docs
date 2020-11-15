/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";


import clsx from "clsx";
import styles from "./styles.module.css";

const TITLE = "Showcase";
const DESCRIPTION =
  "See the services we build for entrepreneurs and startups";


const users = [
    // Please add in alphabetical order of title.
    {
        title: 'Beancount.io',
        description:
            'Double-entry bookkeeping for managing your teams and personal finance',
        preview: "https://web-beancount.b-cdn.net/beancount-desktop-mobile.png",
        website: 'https://beancount.io/',
        source: 'https://github.com/puncsky/beancount-mobile',
        fbOpenSource: false,
        pinned: false,
    },
    {
        title: 'Touchbase.ai',
        description: 'Easy, open source CRM for everyone to smartly engage more in meaningful relationships',
        preview: "https://camo.githubusercontent.com/f00c5426be1a19c10cf8596495ba80fec5c3a1e18f1d48466b6c80aad0b5035e/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f646f687469646671682f696d6167652f75706c6f61642f76313537303138313032392f7765622d6775696775696f2f6775616e78696c61622d73637265656e73686f742e706e67",
        website: 'https://touchbase.ai/',
        source: 'https://github.com/puncsky/touchbase.ai',
        fbOpenSource: false,
        pinned: false,
    },
    {
        title: 'Pylon',
        description: 'Stripe Subscription Manager',
        preview: "https://stargately.com/img/pylon-architecture.png",
        // website: 'https://touchbase.ai/',
        // source: 'https://github.com/puncsky/touchbase.ai',
        fbOpenSource: false,
        pinned: false,
    },
    {
        title: 'Carrier',
        description: 'Email / SMS / Push Notification manager',
        preview: "https://touchbase.ai/social-media.svg",
        // website: 'https://touchbase.ai/',
        // source: 'https://github.com/puncsky/touchbase.ai',
        fbOpenSource: false,
        pinned: false,
    },
    {
        title: 'Launchroom',
        description: 'LaunchDarkly client compatible lightweight feature flag manager',
        preview: "https://touchbase.ai/social-media.svg",
        // website: 'https://touchbase.ai/',
        // source: 'https://github.com/puncsky/touchbase.ai',
        fbOpenSource: false,
        pinned: false,
    },
];

function Showcase() {
  return (
    <>
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>{TITLE}</h1>
          <p>{DESCRIPTION}</p>
        </div>
        <div className="row">
          {users.map((user) => (
            <div key={user.title} className="col col--4 margin-bottom--lg">
              <div className={clsx("card", styles.showcaseUser)}>
                <div className="card__image">
                  <img src={user.preview} alt={user.title} />
                </div>
                <div className="card__body">
                  <div className="avatar">
                    <div className="avatar__intro margin-left--none">
                      <h4 className="avatar__name">{user.title}</h4>
                      <small className="avatar__subtitle">
                        {user.description}
                      </small>
                    </div>
                  </div>
                </div>
                {(user.website || user.source) && (
                  <div className="card__footer">
                    <div className="button-group button-group--block">
                      {user.website && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={user.website}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Website
                        </a>
                      )}
                      {user.source && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={user.source}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Showcase;
