import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Col, Flex, Row } from "@/lib/AntRegistry";
import HenceforthIcons from "./HenceforthIcons";

interface CustomAudioPlayerProps {
  src: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }

    drawWaveform();

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadedmetadata", () => {});
        audioRef.current.removeEventListener("timeupdate", () => {});
      }
    };
  }, [src]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const drawWaveform = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#d843f3";
        ctx.lineWidth = 3;

        // Simulate a waveform drawing for demonstration purposes
        const width = canvas.width;
        const height = canvas.height;
        const waveHeight = height / 2;

        ctx.beginPath();
        for (let i = 0; i < width; i++) {
          const amplitude = Math.sin((i / width) * 4 * Math.PI) * waveHeight;
          ctx.lineTo(i, waveHeight + amplitude);
        }
        ctx.stroke();
      }
    }
  };

  return (
    <>
        <audio ref={audioRef} src={src}></audio>
        <Row className="h-100">
          <Col span={24} className="h-100">
            <div className="recording_background d-flex flex-column justify-content-center position-relative overflow-hidden" style={{height:400}}>
              <div className={
                      isPlaying
                        ? "audio_recording"
                        : ""
                    } >
                <HenceforthIcons.AudioRecord />
              </div>
              <div className="text-center mt-auto">
                <Button className="h-100 mb-2"
                  type="text"
                  icon={
                    isPlaying ? (
                      <HenceforthIcons.Pause />
                    ) : (
                      <HenceforthIcons.Play />
                    )
                  }
                  onClick={togglePlayPause}
                />
              </div>
            </div>
          </Col>
        </Row>
    </>
  );
};

export default CustomAudioPlayer;
