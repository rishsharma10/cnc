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

const ScreenRocord = () => {
  const [control, setControl] = useState(false);
  const [mediaModal, setMediaModal] = useState(true)
  const [mediaType, setMediaType] = useState('AUDIO' as any)
  const { Toast, loading, setLoading, setUserInfo, userInfo,userType } = useContext(GlobalContext);
  const liveVideoFeed = useRef(null as any);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null as any);
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
  const startRecording = async () => {
    let stream;
    const x = await getMicrophonePermission();
    if (x !== undefined) {
      stream = x;
    } else {
      return Toast.error('Device Not Found');
    }

    setRecordingStatus('recording');
    const media = new MediaRecorder(stream);
    mediaRecorder.current = media;
    let localAudioChunks:any = [];
    mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    mediaRecorder.current.start();
    startInterval();
    setAudioChunks(localAudioChunks);
  };

  const startInterval = () => {
    const id = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1); 
          return 0; 
        } else {
          return prevSeconds + 1; 
        }
      });
    }, 1000);
  
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const stopRecording = async () => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new File(audioChunks, "demo.mp3", {
          type: "audio/wav",
        });
        setAudio(audioBlob);
        const tracks: any = mediaRecorder.current?.stream.getTracks();
        tracks.forEach((track: any) => track.stop());
        setRecordingStatus("inactive");
        setSeconds(0);
        setMinutes(0);
        stopInterval();
      };
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


  const deleteMedia = async (type: any) => {
      const payload = {} as any
      if (type == 'VIDEO') {
          payload.video_url = null
          Toast.success('Video deleted successfully')
      }
      else {
          payload.audio_url = null
          Toast.success('Audio deleted successfully')
      }
      // await updateProfile(payload)
      setAudioChunks([])
  }
  return (
    <React.Fragment>
      {audio==null?  <section className="screen_recording h-100">
      {/* <MediaComponent/> */}
          <div className="container-fluid px-0 h-100">
            <Row className="h-100">
              <Col span={24} className="h-100">
                <div className="recording_background d-flex flex-column justify-content-center h-100 position-relative overflow-hidden">
                  {/* *********************** screen-recording *********************/}
             
                    <div className={recordingStatus==="recording"?"audio_recording w-100":''}>
                      <HenceforthIcons.AudioRecord />
                    </div>
                  {/* ) : (
                    <video
                      poster={poster.src}
                      className="w-100 h-100 object-fit-cover m-0"
                    >
                      <source src="" />
                    </video>
                  )} */}

                  {/* *********************** audio-recording *********************/}

                  <Flex
                    justify="space-between"
                    align="center"
                    className="position-absolute p-0 top-0 end-0 w-100 mt-4 pt-3 px-5"
                  >
                    <span className="recording_time text-primary fw-medium mx-auto">
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
                      (recordingStatus==="inactive"||recordingStatus==="")?'':
                      <Button

                      type="text"
                      shape="circle"
                      onClick={() =>{ setControl(true); toggleRecording();}}
                      className="h-100 p-0"
                    >
                      {control ? (
                        <HenceforthIcons.Play />
                      ) : (
                        <HenceforthIcons.Pause />
                      )}
                    </Button>
                    }
                   
                    
                      <Button type="text" onClick={()=>{if(recordingStatus==="inactive"){
                        startRecording()
                      }
                      debugger
                      if(recordingStatus==="recording"||recordingStatus==="paused"){
                        stopRecording()
                      }
                      }} shape="circle" className="h-100 p-0">
                        {recordingStatus==="inactive"?<Button className="btn-secondary">Start</Button>:
                         <HenceforthIcons.Stop /> }
                      </Button>
                    
                  </Flex>
                </div>
              </Col>
            </Row>
          </div>
        </section>:
<MainLayout><AudioLayout type={"team"} audio={audio} setAudio={setAudio}/></MainLayout>
}

    </React.Fragment>
  );
};
// if(audio!=null){ScreenRocord.getLayout = function getLayout(page: ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };}
export default ScreenRocord;
