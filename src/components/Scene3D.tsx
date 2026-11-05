import { useEffect, useRef } from "react";

export default function Scene3D() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.play().catch(() => undefined);
  }, []);

  return (
    <div className="hero-reference__video relative h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        src="/TMS CUBE VIDEO.mp4"
        className="h-full w-full object-contain"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
      />
    </div>
  );
}
