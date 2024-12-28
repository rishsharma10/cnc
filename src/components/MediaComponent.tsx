import { Avatar, Button, Modal, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
// import Icons from "./Icons";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import { AudioFilled } from '@ant-design/icons'
import { useRouter } from "next/router";
import banner from '@/assets/images/placeholder-banner.png'

const MediaComponent = (props: any) => {
    console.log("props other", props)
    const [mediaModal, setMediaModal] = useState(true)
    const [mediaType, setMediaType] = useState('' as any)
    const { Toast, loading, setLoading, setUserInfo, userInfo } = useContext(GlobalContext);
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
        if (mediaType == 'VIDEO') {
            const x = await getCameraPermission()
            if (x !== undefined) {
                stream = x
            }
            else {
                return Toast.error("Device Not Found");
            }
        }
        else if (mediaType == 'AUDIO') {
            const x = await getMicrophonePermission()
            if (x !== undefined) {
                stream = x
            }
            else {
                return Toast.error("Device Not Found");
            }
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
            setSeconds((prev: any) => (prev + 1) % 60);
            setMinutes(prevMinutes => Math.floor((prevMinutes + (seconds + 1) / 60) % 60));;
        }, 1000);

        setIntervalId(id);
    };
    const stopRecording = async () => {
        setRecordingStatus("inactive");
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: mediaType === 'VIDEO' ? 'video/webm' : 'audio/wav' });
                const audioUrl: any = audioBlob;
                setAudio(audioUrl);
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
        <>
            <li>
                <Button type='link' onClick={() => {
                    setMediaModal(true);
                    setAudio(null)
                    setMediaType('AUDIO')
                }} className='p-0'>Audio
                </Button>
            </li>
            <li> <Button onClick={() => {
                setMediaModal(true)
                setAudio(null)
                setMediaType('VIDEO')
            }} type='link' className='p-0'>Video</Button></li>
            <Modal
                title={<TypographyTitle level={5} className='fs-16 fw-600 text-center mb-4'>{(mediaType == 'AUDIO') ? 'Audio' : 'Video'}</TypographyTitle>}
                centered
                closeIcon={'Cross fill'}
                open={mediaModal}
                footer={null}
                onOk={() => setMediaModal(false)}
                onCancel={() => setMediaModal(false)}
            >
                {
                    <div className="text-center prize-modal pb-2 px-0 px-md-3">
                        {/* <TypographyTitle level={5} className='fs-16 fw-600 text-center mb-4'>Media Modal</TypographyTitle> */}
                        {mediaType == 'AUDIO' ?
                            <div className="audio-controls">
                                
                                    <>
                                        <Button className="d-flex align-items-center justify-content-center rounded-circle m-auto" type="primary" ghost style={{ height: 50, width: 50 }}>
                                            <AudioFilled className="fs-5" />
                                        </Button>
                                        <TypographyText className="d-block text-secondary fw-medium fs-6 my-4 mb-2">
                                            Make your profile heard! Now you can add a short recording to your TWC profile. Share a message, introduce yourself, or get creative - it&apos;s up to you!
                                        </TypographyText>
                                        
                                      <Button size="large" onClick={startRecording} className="d-flex align-items-center mt-4 justify-content-center" type="primary" block>
                                            {/* Start Audio */}
                                            Start Recording Audio
                                        </Button>
                                    </>
                                
                                {recordingStatus == 'recording' && <div className="box mt-5">
                                    <div className="circle_ripple"></div>
                                    <div className="circle_ripple-2"></div>
                                    <div className="circle-2 d-flex align-items-center justify-content-center">
                                        <AudioFilled className="fs-5 text-blue" />
                                    </div>
                                </div>}
                                <div>
                                    {(audio && mediaType == 'AUDIO') &&
                                        <audio controls className='position-relative w-100 mt-3'  >
                                            <source src={URL.createObjectURL(audio)} className='h-100 w-100 rounded-2' />
                                        </audio>}
                                    <div>
                                        {((userInfo?.audio_url || props?.otheruserData?.audio_url)) && <div>
                                            {router.query?._id ?
                                                <audio controls className='position-relative w-100 mt-3'  >
                                                    <source src={henceforthApi.FILES.audio(props?.otheruserData.audio_url)} className='h-100 w-100 rounded-2' />
                                                </audio> :
                                                <audio controls className='position-relative w-100 mt-3'  >
                                                    <source src={henceforthApi.FILES.audio(userInfo?.audio_url)} className='h-100 w-100 rounded-2' />
                                                </audio>
                                            }
                                        </div>}
                                    </div>
                                </div>
                                {((userInfo?._id == router.query._id || !router.query._id) && (userInfo?.audio_url)) &&
                                    <div>
                                        <Button type="primary" danger ghost className="mt-2" onClick={() => { deleteMedia('AUDIO') }}>
                                            Delete Audio
                                        </Button>
                                    </div>
                                }
                            </div> :
                            <div>


                                {(audio && mediaType == 'VIDEO') &&
                                    <video controls className='position-relative w-100 h-100 mt-3'  >
                                        <source src={URL.createObjectURL(audio)} className='h-100 w-100 rounded-2' />
                                    </video>}


                                {(props?.otheruserData?.video_url || userInfo?.video_url) &&
                                    <div style={{ height: '240px' }} className={"rounded overflow-hidden mb-4"}>
                                        {(userInfo?._id == router.query._id || !router.query._id) ?
                                            <video controls className='position-relative mt-3 h-100 w-100' style={{ objectFit: "contain" }} >
                                                <source src={henceforthApi.FILES.video(userInfo?.video_url)} className='h-100 w-100 rounded-2' />
                                            </video> :
                                            <video controls className='position-relative w-100 mt-3 h-100' style={{ objectFit: "contain" }}>
                                                <source src={henceforthApi.FILES.video(props?.otheruserData.video_url)} className='h-100 w-100 rounded-2' />
                                            </video>}
                                    </div>}

                                {/* {!liveVideoFeed && */}
                                {(liveVideoFeed && !userInfo?.video_url && !audio) &&
                                    <div style={{ height: '0px' }} className={"rounded overflow-hidden mb-4" + (audioChunks?.length ? ' border' : ' border-0')}>
                                        <video autoPlay ref={liveVideoFeed} className='position-relative img-fluid'>
                                            {/* Optionally provide a fallback message if the browser doesn't support video */}
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                }

                                {/* } */}
                                <div>
                                    {(userInfo?._id == router.query._id || !router.query._id) &&
                                        <TypographyText className="fw-medium mb-4 fs-6 text-secondary d-block">
                                            Level Up Your Profile in a Minute!
                                            Now you can add a 1-minute video to your TWC profile. Engage with other users and showcase your personality.
                                        </TypographyText>}

                                    {((userInfo?._id == router.query._id || !router.query._id) && (!userInfo?.video_url) && (recordingStatus != 'recording') && (!audio)) &&
                                        <Button onClick={startRecording} type="primary" size="large" block>
                                            Start Video
                                        </Button>
                                    }

                                    {/* {(!userInfo?.video_url && (recordingStatus != 'recording') && (!audio)) &&
                                        <Button onClick={startRecording} type="primary" size="large" block>
                                            Start Video
                                        </Button>
                                    } */}
                                </div>
                                {((userInfo?._id == router.query._id || !router.query._id) && (userInfo?.video_url)) && <div>
                                    <Button onClick={() => { deleteMedia('VIDEO') }} danger type="primary" ghost>
                                        Delete Video
                                    </Button>
                                </div>}
                            </div>}

                        {recordingStatus === "recording" &&
                            <div>
                                <TypographyText className="text-danger"> {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</TypographyText>
                            </div>
                        }
                        {recordingStatus === "recording" ? (
                            <Button onClick={stopRecording} className="mt-2" type="primary" block size="large">
                                Stop {mediaType == 'AUDIO' ? 'Audio' : 'Video'}
                            </Button>

                        ) : null}


                        {audio &&
                            <div>
                                <Button loading={loading} disabled={loading} type="primary" size="large" block className="mt-2" >Upload</Button>
                            </div>}

                    </div>}

            </Modal >
        </>
    )
}
export default MediaComponent