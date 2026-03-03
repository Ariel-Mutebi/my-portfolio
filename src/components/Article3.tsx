import { useState, useRef, useEffect, type FC } from "react";

interface DeadliftRecord {
  record: string;
  dateString: string;
  videoSrc: string;  
}

const DEADLIFT_RECORDS: DeadliftRecord[] = [
  {
    record: "90kg for 1 rep (four sets)",
    dateString: "4 Aug, 2025",
    videoSrc: "https://videos.armutebi.com/deadlift1.mp4"
  },
  {
    record: "100kg for 1 rep (two sets)",
    dateString: "14 Sept, 2025",
    videoSrc: "https://videos.armutebi.com/deadlift2.mp4"
  },
  {
    record: "100kg for 3 reps",
    dateString: "15 Dec, 2025",
    videoSrc: "https://videos.armutebi.com/deadlift3.mp4"
  },
  {
    record: "100kg for 4 reps",
    dateString: "16 Feb, 2026",
    videoSrc: "https://videos.armutebi.com/deadlift4.mp4"
  }
];

interface DeadliftDisplayProps extends DeadliftRecord {
  isActive: boolean;
  onEnded: () => void;
}

const DeadliftDisplay: FC<DeadliftDisplayProps> = ({
  record,
  dateString,
  videoSrc,
  isActive,
  onEnded
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        onEnded={onEnded}
        controls={isActive}
      />
      <div
        style={{ visibility: isActive ? "hidden" : "visible" }}
        className="
          absolute inset-0 flex flex-col justify-between p-4 roboto-mono
          bg-neutral-950/75 text-neutral-100"
      >
        <h3>{record}</h3>
        <p>{dateString}</p>
      </div>
    </div>
  );
};

export function Article3() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleEnded = (index: number) => {
    setActiveIndex((index + 1) % DEADLIFT_RECORDS.length);
  };

  return (
    <article className="min-h-dvh bg-neutral-50 p-8">
      <h2 className="text-neutral-950 text-8xl roboto-mono mb-8">
        Breaking personal and organizational records
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {DEADLIFT_RECORDS.map((record, index) => (
          <DeadliftDisplay
            {...record}
            key={record.dateString}
            isActive={index === activeIndex}
            onEnded={() => handleEnded(index)}
          />
        ))}
      </div>
    </article>
  );
}