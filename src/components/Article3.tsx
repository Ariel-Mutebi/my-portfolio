import type { FC } from "react";
import deadlift1 from "./images/deadlift1.mp4";
import deadlift2 from "./images/deadlift2.mp4";
import deadlift3 from "./images/deadlift3.mp4";
import deadlift4 from "./images/deadlift4.mp4";

interface DeadliftRecord {
  record: string;
  dateString: string;
  videoSrc: string;  
}

const DEADLIFT_RECORDS: DeadliftRecord[] = [
  {
    record: "90kg at 4 reps",
    dateString: "4 Aug, 2025",
    videoSrc: deadlift1,
  },
  {
    record: "100kg at 2 reps",
    dateString: "14 Sept, 2025",
    videoSrc: deadlift2,
  },
  {
    record: "100kg at 3 reps",
    dateString: "15 Dec, 2025",
    videoSrc: deadlift3,
  },
  {
    record: "100kg at 4 reps",
    dateString: "16 Feb, 2026",
    videoSrc: deadlift4,
  }
];

const DeadliftDisplay: FC<DeadliftRecord> = ({ record, dateString, videoSrc }) => {
  return (
    <div className="relative">
      <video
        src={videoSrc}
        muted
        autoPlay
      />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <h3>{record}</h3>
        <p>{dateString}</p>
      </div>
    </div>
  );
};

export function Article3() {
  return (
    <article className="min-h-dvh bg-gray-50 p-8">
      <h2 className="text-gray-950 text-8xl roboto-mono mb-8">
        Breaking personal and organizational records
      </h2>

      <div className="flex gap-4">
        {DEADLIFT_RECORDS.map(record => <DeadliftDisplay {...record} />)}
      </div>
    </article>
  );
}