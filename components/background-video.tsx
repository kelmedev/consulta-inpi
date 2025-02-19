export function BackgroundVideo() {
  return (
    <div className="fixed inset-0 w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ filter: "brightness(0.4)" }}
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250215_0831_Loop%20Video_loop_01jm4p227zfg4rxd0mp45ka409-e4ZCMhYLxBUVC50JGqxainImeySRVf.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-blue-950/70 mix-blend-multiply" />
    </div>
  )
}

