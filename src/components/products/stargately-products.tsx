/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import clsx from "clsx";
import styles from "./styles.module.css";

const TITLE = "Stargately Products";
const DESCRIPTION = "SaaS, FinTech, DAO";

const users = [
  {
    title: "Cuckoo Network",
    description:
      "Create stunning AI art and fuel Gen AI apps with your GPU or CPU on Cuckoo Chain. Share, generate, and unlock the power of decentralized AI.",
    preview: "https://cuckoo.network/img/cuckoo-social-card.webp",
    website: "https://cuckoo.network/",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "BlockEden.xyz",
    description:
      "RPCs for Sui, Aptos, Solana, and 12 EVM blockchains. BlockEden.xyz is an API marketplace powering DApps of all sizes. Build DApp and scale faster.",
    preview:
      "https://pbs.twimg.com/profile_banners/1576691608061288448/1666069274/1500x500",
    website: "https://blockeden.xyz/",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Beancount.io",
    description:
      "Double-entry bookkeeping for managing your teams and personal finance",
    preview: "https://web-beancount.b-cdn.net/beancount-desktop-mobile.png",
    website: "https://beancount.io/",
    source: "https://github.com/stargately/beancount-mobile",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Blockroma",
    description: "EVM compatible blockchains explorer",
    preview: "https://tp-misc.b-cdn.net/blockroma-v0.1.png",
    website: "https://blockroma.com/",
    source: "https://github.com/stargately/blockroma",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "10x.pub",
    description:
      "a tech community to 10x your growth in innovation, investment, and leadership",
    preview:
      "https://tp-misc.b-cdn.net/blockeden/professional_accountant_for_businesses_cinematic_portrait.png",
    website: "https://10x.pub/",
    fbOpenSource: false,
    pinned: false,
  },
  {
    title: "Payton",
    description: "A multi-chain payment solution",
    preview:
      "https://tp-misc.b-cdn.net/blockeden/bitcoin_cinematic_kodak_portra_800_105_mm_f1_1.png",
    website: "https://payton.so/",
    fbOpenSource: false,
    pinned: false,
  },
];

function StargatelyProducts() {
  return (
    <>
      <main className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>
            <a
              aria-hidden="true"
              tabIndex="-1"
              className="anchor enhancedAnchor_node_modules-@docusaurus-theme-classic-lib-theme-Heading-"
              id="showcase"
            ></a>
            {TITLE}
            <a
              aria-hidden="true"
              tabIndex="-1"
              className="hash-link"
              href="#showcase"
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
                          Github
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

export default StargatelyProducts;
