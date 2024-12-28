"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const screenRecording = useRef<any>(null);

  const [Recorder, setRecorder] = useState<any>(null);
  const [time, setTime] = useState<any>(false);
  var t0 = useRef<number>(-1);
  var t1 = useRef<number>(-1);
  const startScreenRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    t0.current = performance.now();
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);
    const screenRecordingChunks: any = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        screenRecordingChunks.push(e.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(screenRecordingChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      screenRecording.current.src = url;
      stream.getVideoTracks()[0].stop();
      t1.current = performance.now();
      setTime(true);
    };

    recorder.start();
  };

  return (
    <>
      <div className="ml-2">
        <div className="mt-2 d-flex gap-4 ">
          <button
            className="bg-primary text-light p-2 rounded-3"
            onClick={() => startScreenRecording()}
          >
            Start Recording
          </button>
          <button
            className="bg-primary text-light p-2"
            onClick={() => {
              Recorder && Recorder.stop();
            }}
          >
            Stop Recording
          </button>
        </div>
        <br />
        <br />
        <br />
        <video ref={screenRecording} height={300} width={600} controls />
        <br />
        <br />
        <br />

        <div>
          {time ? Math.floor(Math.floor(t1.current - t0.current) / 1000) : null}
        </div>
      </div>
    </>
  );
}
