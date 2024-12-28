import { Button, Col, Flex, Row } from "@/lib/AntRegistry";
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import poster from "@/assets/images/screen-recording.png";
import HenceforthIcons from "@/components/HenceforthIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { query } from "firebase/database";
import MediaComponent from "@/components/MediaComponent";
// import Icons from "./Icons";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import { AudioFilled } from '@ant-design/icons'
import banner from '@/assets/images/placeholder-banner.png'
import AudioLayout from "@/components/common/AudioLayout";
import MainLayout from "@/components/common/MainLayout";
import VideoLayout from "@/components/common/videoLayout";

const ScreenRocord = () => {
  const [control, setControl] = useState(false);
  const [mediaModal, setMediaModal] = useState(true)
  const [mediaType, setMediaType] = useState('VIDEO' as any)
  const { Toast, loading, setLoading, setUserInfo, userInfo ,userType} = useContext(GlobalContext);
  const liveVideoFeed = useRef(null as any);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [video, setVideo] = useState(null as any);
  const [minutes, setMinutes] = useState(0);
  const [intervalId, setIntervalId] = useState(null as any);
  const [seconds, setSeconds] = useState(0);
  const router = useRouter();
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData: any = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
        console.log(streamData)
        return streamData
      } catch (err: any) {
        Toast.error(err.message);
        return undefined
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      return undefined
    }
  };
  const getCameraPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstraints = { audio: true };
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        liveVideoFeed.current.srcObject = videoStream;
        liveVideoFeed.current.parentElement.style.height = "240px"
        return combinedStream
      } catch (err: any) {
        Toast.error(err.message);
        return undefined
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      return undefined

    }
  };
  const startRecording = async () => {
    let stream

    const x = await getCameraPermission()
    if (x !== undefined) {
      stream = x
    }
    else {
      return Toast.error("Device Not Found");
    }
    setRecordingStatus("recording")
    const media = new MediaRecorder(stream);
    mediaRecorder.current = media;
    let localAudioChunks: any = [];
    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    mediaRecorder.current.start();
    startInterval()
    setAudioChunks(localAudioChunks);

  };
  const startInterval = () => {
    const id = setInterval(() => {
      setSeconds((prevSeconds: number) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes: number) => prevMinutes + 1);
          return 0; 
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000); 
  
    setIntervalId(id);
  };
  
  const stopRecording = async () => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'video/mp4' });
        const audioUrl: any = audioBlob;
        setVideo(audioUrl);
        const tracks: any = mediaRecorder?.current?.stream.getTracks();
        tracks.forEach((track: any) => track.stop());
        setRecordingStatus("");
        setSeconds(0),
          setMinutes(0)
        clearInterval(intervalId);
        setIntervalId(null);
      };
    }
  };


  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };


  const toggleRecording = () => {
    debugger
    if (recordingStatus === 'recording') {
      mediaRecorder.current?.pause();
      setControl(true)
      stopInterval();
      setRecordingStatus('paused');
    } else if (recordingStatus === 'paused') {
      mediaRecorder.current?.resume();
      startInterval();
      setControl(false)
      setRecordingStatus('recording');
    } else {
      startRecording();
    }
  };

  // useEffect(() => {
  //   if (control) {
  //     toggleRecording();
  //   } else if (recordingStatus !== 'inactive') {
  //     stopRecording();
  //   }
  // }, [control]);
  console.log(liveVideoFeed,"livevideofeed")


  return (
    <React.Fragment>
     {video===null?  <section className="screen_recording h-100">
        {/* <MediaComponent/> */}
        <div className="container-fluid px-0 h-100">
          <Row className="h-100">
            <Col span={24} className="h-100">
              <div className="recording_background d-flex flex-column justify-content-center h-100 position-relative overflow-hidden">
                {/* *********************** screen-recording *********************/}
                {recordingStatus==="inactive"?
                <video
                  poster={poster.src}
                  className="w-100 h-100 object-fit-cover m-0"
                >
                  <source src="" />
                </video>:''}
                {liveVideoFeed&&  <div className={"rounded overflow-hidden" + (audioChunks?.length ? ' border' : ' border-0 h-100')}>
                    <video  autoPlay ref={liveVideoFeed} className='position-relative h-100 w-100 object-fit-cover'>
                      {/* Optionally provide a fallback message if the browser doesn't support video */}
                      Your browser does not support the video tag.
                    </video>
                  </div>}





                <Flex
                  justify="space-between"
                  align="center"
                  className="position-absolute p-0 top-0 end-0 w-100 mt-4 pt-3 px-5"
                >
                  <span className="recording_time text-white fw-medium mx-auto">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                  <Link href={`/${userType}/process/${router.query._id}/recording`}>
                    <Button type="text" shape="circle" className="h-100 p-0">
                      <HenceforthIcons.Close />
                    </Button>
                  </Link>
                </Flex>
                <Flex
                  justify="center"
                  gap={16}
                  align="center"
                  className="position-absolute p-0 bottom-0 start-0 end-0 m-auto mb-4 pb-3 px-5"
                >
                  {
                    (recordingStatus === "inactive" || recordingStatus === "") ? '' :
                      <Button

                        type="text"
                        shape="circle"
                        onClick={() => { setControl(true); toggleRecording(); }}
                        className="h-100 p-0"
                      >
                        {control ? (
                          <HenceforthIcons.Play />
                        ) : (
                          <HenceforthIcons.Pause />
                        )}
                      </Button>
                  }


                  <Button type="text" onClick={() => {
                    if (recordingStatus === "inactive") {
                      startRecording()
                    }
                    debugger
                    if (recordingStatus === "recording" || recordingStatus === "paused") {
                      stopRecording();stopInterval()
                    }
                  }} shape="circle" className="h-100 p-0">
                    {recordingStatus === "inactive" ? <Button className="btn-secondary">Start</Button> :
                      <HenceforthIcons.Stop />}
                  </Button>

                </Flex>
              </div>
            </Col>
          </Row>
        </div>
      </section> :<MainLayout><VideoLayout type={"member"} setRecordingStatus={setRecordingStatus} video={video} setVideo={setVideo}/></MainLayout>}

    </React.Fragment>
  );
};
// if(audio!=null){ScreenRocord.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };}
export default ScreenRocord;