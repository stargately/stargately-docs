import { useEffect } from "react";

export function useBlurGradient(config) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/BlurGradientBg.min.js";
    script.async = true;

    script.onload = () => {
      new window.Color4Bg.BlurGradientBg(config);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [config.dom, ...config.colors, config.loop]);
}
