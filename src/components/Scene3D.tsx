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
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-[0_0_80px_rgba(56,189,248,0.12)]">
      <video
        ref={videoRef}
        src="/hero.mp4"
        className="h-full w-full object-cover"
        playsInline
        muted
        loop
        autoPlay
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,18,0.55)] via-transparent to-transparent" />
    </div>
  );
}
