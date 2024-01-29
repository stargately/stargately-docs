import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Hls from "hls.js";
import styles from "./styles.module.css";
import StargatelyProducts from "../components/products/stargately-products";
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
          10x.pub
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

  const videoRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    const videoSrc =
      "https://videodelivery.net/41aa55358b1be9c50ef56062e1598a23/manifest/video.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef?.current);
    }
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    //
    // Note: it would be more normal to wait on the 'canplay' event below however
    // on Safari (where you are most likely to find built-in HLS support) the
    // video.src URL must be on the user-driven white-list before a 'canplay'
    // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      sourceRef.current.type = "application/x-mpegURL";
      videoRef.current.src = videoSrc;
      videoRef.current.setAttribute("playsinline", true);
    }
  }, []);

  return (
    <Layout
      title={siteConfig.themeConfig.navbar.title}
      description={siteConfig.themeConfig.title}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <video
          className={styles.videoStream}
          autoPlay
          muted
          loop
          preload="true"
          poster="https://videodelivery.net/41aa55358b1be9c50ef56062e1598a23/thumbnails/thumbnail.jpg"
          ref={videoRef}
        >
          <source ref={sourceRef} />
        </video>
        <div className={clsx("container", styles.heroContainer)}>
          <h1 className="hero__title">
            {Math.random() > 0.5 ? siteConfig.title : "Think big and act on it"}
          </h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <StargatelyProducts />
      </main>
    </Layout>
  );
}

export default Home;
