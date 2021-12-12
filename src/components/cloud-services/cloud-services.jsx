/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import clsx from "clsx";
import styles from "./styles.module.css";

const TITLE = "Stargately Cloud";
const DESCRIPTION = "Micro Services & Dev Tools";

const users = [
  {
    title: "OneFx",
    description:
      "Fullstack framework for building web & mobile apps with speed & quality",
    preview: "/img/onefx.png",
    website: "https://onefx.js.org/",
    source: "https://github.com/stargately/web-onefx-boilerplate",
    doc: "/docs/onefx-web",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Launch Room",
    description:
      "LaunchDarkly client compatible lightweight feature flag manager",
    preview: "https://touchbase.ai/social-media.svg",
    // website: 'https://stargately.com/launch-room/',
    source: "https://github.com/puncsky/launch-room",
    doc: "/docs/launch-room",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Pylon",
    description: "Stripe Subscription Manager",
    preview: "https://stargately.com/img/pylon-architecture.png",
    // website: 'https://touchbase.ai/',
    // source: 'https://github.com/puncsky/touchbase.ai',
    doc: "/docs/pylon",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Carrier",
    description: "Email / SMS / Push Notification manager",
    preview: "https://touchbase.ai/social-media.svg",
    // website: 'https://touchbase.ai/',
    source: "https://github.com/puncsky/carrier#carrier",
    doc: "/docs/carrier",
    fbOpenSource: false,
    pinned: false,
  },
];

function CloudServices() {
  return (
    <>
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>
            <a
              aria-hidden="true"
              tabIndex="-1"
              className="anchor enhancedAnchor_node_modules-@docusaurus-theme-classic-lib-theme-Heading-"
              id="CloudServices"
            ></a>
            {TITLE}
            <a
              aria-hidden="true"
              tabIndex="-1"
              className="hash-link"
              href="#CloudServices"
              title="Direct link to heading"
            ></a>
          </h1>
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
                {(user.website || user.source || user.doc) && (
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
                      {user.doc && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={user.doc}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Doc
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

export default CloudServices;
