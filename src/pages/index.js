import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
// Removed Hls import as video was removed
import styles from "./styles.module.css";
import StargatelyProducts from "../components/products/stargately-products";
import CloudServices from "../components/cloud-services/cloud-services";

const features = [
  {
    title: "Blockchain Infrastructure",
    icon: "📄", // Document icon
    description:
      "Enterprise-grade blockchain solutions with BlockEden.xyz, offering secure, scalable infrastructure for Web3 applications and decentralized finance.",
  },
  {
    title: "AI-Powered Analytics",
    icon: "📊", // Chart icon
    description:
      "Advanced machine learning algorithms that transform raw data into actionable insights, helping businesses make data-driven decisions with confidence.",
  },
  {
    title: "Financial Management",
    icon: "💰", // Money bag icon
    description:
      "Comprehensive financial tools through Beancount.io that streamline accounting processes, automate reconciliation, and enhance financial visibility.",
  },
  {
    title: "Secure Cloud Solutions",
    icon: "☁️", // Cloud icon
    description:
      "Enterprise cloud infrastructure with industry-leading security protocols, ensuring 99.9% uptime and seamless scalability for growing businesses.",
  },
  {
    title: "Social Networking",
    icon: "🔄", // Network icon
    description:
      "Next-generation social platforms with Cuckoo.Network that facilitate meaningful connections and engagement through AI-enhanced interaction models.",
  },
  {
    title: "Custom AI Integration",
    icon: "🤖", // Robot icon
    description:
      "Tailored artificial intelligence solutions that seamlessly integrate with existing systems, automating workflows and enhancing productivity.",
  },
];

function Feature({ icon, title, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIconContainer}>
        <span className={styles.featureIcon}>{icon}</span>
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  // No video references or useEffect needed for the new design

  return (
    <Layout
      title={siteConfig.themeConfig.title}
      description={siteConfig.themeConfig.tagline}
    >
      <header className={clsx(styles.heroBanner)}>
        <div className={clsx("container", styles.heroContainer)}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              The <span className={styles.heroTitleEmphasis}>innovation</span>{" "}
              ecosystem for AI solutions
            </h1>
            <p className={styles.heroSubtitle}>
              Stargately cultivates a portfolio of sophisticated software
              platforms that empower people and organizations to achieve
              exceptional growth through technological excellence.
            </p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4.8M+</div>
              <div className={styles.statDescription}>
                Transactions processed monthly across our blockchain
                infrastructure.
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>$65M</div>
              <div className={styles.statDescription}>
                Assets managed through our financial technology platforms.
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>34.5K</div>
              <div className={styles.statDescription}>
                Clients leveraging our suite of software solutions.
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99.9%</div>
              <div className={styles.statDescription}>
                System reliability across all our production environments.
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* Features section */}
        <section className={styles.features}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <h2>AI-Powered Enterprise Solutions</h2>
              <p>
                Transforming industries through innovative blockchain and
                artificial intelligence technologies
              </p>
            </div>
            <div className={styles.featureGrid}>
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        <StargatelyProducts />
      </main>
    </Layout>
  );
}

export default Home;
