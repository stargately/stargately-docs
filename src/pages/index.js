import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import StargatelyProducts from "../components/products/stargately-products";
import IconExternalLink from "@theme/IconExternalLink";
import CloudServices from "../components/cloud-services/cloud-services";

const features = [
  {
    title: "Micro Services & Dev Tools",
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        <>
          We prepare out-of-box services and developer tools for your SaaS -
          Easy to use, and less expensive.
        </>
        <br />
        <a href="#CloudServices">Stargately Cloud</a>
      </>
    ),
  },
  {
    title: "FinTech + DAO Products",
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        <>
          We build various SaaS products for communities and individuals to grow
          financially, socially, and intellectually.
        </>
        <br />
        <a href="#showcase">Stargately Products</a>
      </>
    ),
  },
  {
    title: "10x.pub Community",
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        <>
          We are a tech community that embrace incremental innovations and
          accumulate advantages over time.
        </>
        <br />
        <a href={"https://10x.pub"}>
          10x.pub <IconExternalLink />
        </a>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature, "text--center")}>
      {imgUrl && (
        <div>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.themeConfig.navbar.title}
      description={siteConfig.themeConfig.title}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            {Math.random() > 0.5 ? siteConfig.title : "Think big and act on it"}
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <StargatelyProducts />
        <CloudServices />
      </main>
    </Layout>
  );
}

export default Home;
