/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import clsx from "clsx";
import styles from "./styles.module.css";

const TITLE = "Our Innovation Portfolio";
const DESCRIPTION =
  "Discover our suite of enterprise-grade AI and blockchain solutions";

const CATEGORIES = [
  { id: "all", name: "All Solutions" },
  { id: "blockchain", name: "Blockchain" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "fintech", name: "FinTech" },
];

interface Product {
  title: string;
  description: string;
  preview: string;
  website: string;
  source?: string;
  doc?: string;
  categories: string[];
  featured: boolean;
}

const products: Product[] = [
  {
    title: "Cuckoo Network",
    description:
      "Enterprise-grade decentralized AI platform enabling organizations to create, share, and monetize AI models with unprecedented security and scalability.",
    preview: "https://cuckoo.network/img/cuckoo-social-card.webp",
    website: "https://cuckoo.network/",
    doc: "https://cuckoo.network/docs/",
    categories: ["ai", "blockchain"],
    featured: true,
  },
  {
    title: "BlockEden.xyz",
    description:
      "High-performance blockchain infrastructure providing enterprise-ready RPCs for Sui, Aptos, Solana, and 12+ EVM chains, powering the next generation of Web3 applications.",
    preview:
      "https://pbs.twimg.com/profile_banners/1576691608061288448/1666069274/1500x500",
    website: "https://blockeden.xyz/",
    categories: ["blockchain"],
    featured: true,
  },
  {
    title: "Beancount.io",
    description:
      "Advanced financial management platform with AI-powered analytics, offering double-entry bookkeeping for enterprise teams and sophisticated personal finance tracking.",
    preview: "https://web-beancount.b-cdn.net/beancount-desktop-mobile.png",
    website: "https://beancount.io/",
    source: "https://github.com/stargately/beancount-mobile",
    categories: ["fintech", "ai"],
    featured: true,
  },
  {
    title: "Blockroma",
    description:
      "Comprehensive blockchain explorer for EVM-compatible networks, providing real-time analytics, transaction monitoring, and smart contract verification for enterprise users.",
    preview: "https://tp-misc.b-cdn.net/blockroma-v0.1.png",
    website: "https://blockroma.com/",
    source: "https://github.com/stargately/blockroma",
    categories: ["blockchain"],
    featured: false,
  },
  {
    title: "10x.pub",
    description:
      "Exclusive professional network leveraging AI to connect innovators, investors, and leaders, facilitating knowledge exchange and strategic partnerships in emerging technologies.",
    preview:
      "https://tp-misc.b-cdn.net/blockeden/professional_accountant_for_businesses_cinematic_portrait.png",
    website: "https://10x.pub/",
    categories: ["ai"],
    featured: false,
  },
  {
    title: "Payton",
    description:
      "Enterprise-grade multi-chain payment infrastructure enabling secure, compliant, and efficient cross-border transactions for businesses operating in regulated environments.",
    preview:
      "https://tp-misc.b-cdn.net/blockeden/bitcoin_cinematic_kodak_portra_800_105_mm_f1_1.png",
    website: "https://payton.so/",
    categories: ["blockchain", "fintech"],
    featured: false,
  },
];

function StargatelyProducts() {
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredProducts = React.useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter((product) =>
      product.categories.includes(activeCategory),
    );
  }, [activeCategory]);

  return (
    <section className={styles.productsSection}>
      <div className="container margin-vert--xl">
        <div className="text--center margin-bottom--lg">
          <h2 className={styles.sectionTitle}>{TITLE}</h2>
          <p className={styles.sectionDescription}>{DESCRIPTION}</p>
        </div>

        <div className={styles.categoryFilters}>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={clsx(
                styles.categoryButton,
                activeCategory === category.id && styles.categoryButtonActive,
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.title} className="col col--4 margin-bottom--lg">
              <div
                className={clsx(
                  "card",
                  styles.productCard,
                  product.featured && styles.featuredProduct,
                )}
              >
                {product.featured && (
                  <div className={styles.featuredBadge}>Featured</div>
                )}
                <div className="card__image">
                  <img
                    src={product.preview}
                    alt={product.title}
                    className={styles.productImage}
                  />
                </div>
                <div className="card__body">
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <div className={styles.productCategories}>
                    {product.categories.map((cat) => (
                      <span key={cat} className={styles.categoryTag}>
                        {CATEGORIES.find((c) => c.id === cat)?.name}
                      </span>
                    ))}
                  </div>
                </div>
                {(product.website || product.source || product.doc) && (
                  <div className="card__footer">
                    <div className={styles.productActions}>
                      {product.website && (
                        <a
                          className="button button--primary"
                          href={product.website}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Explore Solution
                        </a>
                      )}
                      {product.source && (
                        <a
                          className="button button--outline button--secondary"
                          href={product.source}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          View Source
                        </a>
                      )}
                      {product.doc && (
                        <a
                          className="button button--outline button--secondary"
                          href={product.doc}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Documentation
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StargatelyProducts;
