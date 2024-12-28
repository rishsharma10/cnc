import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import { GlobalContext } from "@/context/Provider";
import { getMetadata } from "video-metadata-thumbnails";
import gif from "@/assets/gif/loading.gif"
import {
  Button,
  Col,
  Flex,
  Row,
  TypographyText,
  TypographyTitle,
  Upload,
} from "@/lib/AntRegistry";
import {LinkOutlined,DeleteOutlined} from "@ant-design/icons"
import henceforthApi from "@/utils/henceforthApi";
import { Modal, UploadProps, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useState } from "react";

const Record = () => {
  const router = useRouter();
  const {pid} = router.query
  const { Video,Toast,userType } = useContext(GlobalContext);
  const [fileList, setFileList] = useState<any>("");
  const props: UploadProps = {
    name: "file",
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      setFileList(info.file);
      debugger;
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    maxCount:1,
    onRemove:()=>{
      debugger
      return setFileList(null)
    }
  };

  const recordingOptions = [
    {
      icon: <HenceforthIcons.AudioRocord />,
      text: "Audio Record",
      background: "linear-gradient(134.67deg, #EF8E8B 0%, #EFC8A2 100%)",
      href: "audio",
    },
    {
      icon: <HenceforthIcons.VideoRocord />,
      text: "Video Record",
      background: "linear-gradient(134.67deg, #EC8BC9 0%, #F09BAA 100%)",
      href: "video",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [recStop, setRecStop] = useState<any>(true);
  const [reasonModal, setReasonModal] = useState(false);
  const [prompt, setPrompt] = useState("");

  console.log(Video, "videoooooooo");

  const stopRecording = async () => {
    debugger;
    //setLoading(true);
    try {
      await Video.Recorder && Video.Recorder.onstop();
      setRecStop(true);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  console.log(recStop,"recstop");

  const finishProcess = async () => {
    
    // if (!prompt.trim()) return Toast.warning("Enter the Objective of this recording");
    // debugger;
    setLoading(true);
    setReasonModal(true)
    try {
      const videoUrl = await henceforthApi.Common.uploadFile(
        "file",
        Video?.videoUrl
      );
      debugger
      const response = await fetch(`/api/video/${videoUrl?.file_name}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const metadata = await getMetadata(url);
      URL.revokeObjectURL(url); // Clean up the URL object
      const items: any = {
        media_url: videoUrl.file_name,
        type: "VIDEO",
        video_duration: String(metadata.duration),
      };
      router.push(`/${userType}/process/list/all/1?Pagination=1&newadded=true&newPid=${router.query._id}`)
      // Set the source of the video

      const updateContent = await henceforthApi.Process.processUploadVideo(
        String(router.query._id),
        items
      );
      // router.push(`/demo/process/details/view?pid=${pid}`);
      //router.push(`/${userType}/process/list/all/1?Pagination=1&newadded=true&newPid=${router.query._id}`)
      Video.setStreaming(null)
      Video.setVideoUrl(null)
    } catch (error) {
        setReasonModal(false)
        Video.setVideoUrl(null)
      setLoading(false);
      Toast.error(error)
    }
  };

  const getVideoData: any = async (video: any) => {
    debugger
    try {
      const videoUrl = await henceforthApi.Common.uploadFile("file", video);
      debugger;
      const response = await fetch(`/api/${String(videoUrl?.type)}/${videoUrl?.file_name}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const metadata = await getMetadata(url);
      URL.revokeObjectURL(url); // Clean up the URL object
      // const items: any = {
      //   media_url: videoUrl?.file_name,
      //   type: "VIDEO",
      //   video_duration: String(metadata.duration),
      // };
      return {
        media_url: videoUrl?.file_name,
        type: String(videoUrl?.type).toUpperCase(),
        video_duration: String(metadata.duration),
      };
    } catch (error) {
      return error;
    }
  };
  const sendDataToDatabase = async (items:any) => {
    try {
      const updateContent = await henceforthApi.Process.processUploadVideo(
        String(router.query._id),
        items
      );
    } catch (error) {
      return error
    }
  }

  const handleUploadFile = async () => {
    debugger
    if(!fileList?.originFileObj){
      return Toast.warning("Please select audio/video file")
    }
    setLoading(true);
    setReasonModal(true);
    try {
      const { media_url, type, video_duration, error } = await getVideoData(
        fileList?.originFileObj
      );
      router.push(`/${userType}/process/list/all/1?Pagination=1&newadded=true&newPid=${router.query._id}`)
      if (error) {
        setReasonModal(false);
        Video.setVideoUrl(null);
        setLoading(false);
      }
      const items = {
        media_url,
        type,
        video_duration,
      };
      await sendDataToDatabase(items)
     // router.push(`/${userType}/process/${router.query._id}/details`)
    } catch (error) {
      setReasonModal(false);
      setLoading(false);
      Toast.error("something went wrong");
    }
  };
  
  return (
    <React.Fragment>
      <section className="record">
        <div className="container-fluid">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <TypographyTitle level={5}>Create Process</TypographyTitle>
            </Col>
            {/* upload file */}
            <Col span={24}>
              <div className="upload_file_box d-flex flex-wrap flex-sm-nowrap gap-2">
                <div className="w-100 inner_box place-items justify-content-sm-end pe-sm-5">
                  <div>
                  {!fileList ? 
                    <Upload {...props} accept=".mp4,.mp3">
                    <Button
                        type="primary"
                        size="large"
                        className="place-items px-4"
                        icon={<HenceforthIcons.Plus />}
                      >
                        Upload File
                      </Button>
                    </Upload>:
                    <Button
                        type="primary"
                        onClick={() => handleUploadFile()}
                        size="large"
                        className="place-items px-4"
                      >
                        Finish Process
                      </Button>}
                      {fileList && <Button type="text" ><div className="d-flex align-items-center mt-2"><LinkOutlined /><span className="mx-2">{fileList?.name}</span><DeleteOutlined onClick={() => setFileList(null)} /></div></Button>}
                    <TypographyText
                      type="secondary"
                      className="fw-light mt-2 d-block"
                    >
                      Or drop video, audio in box
                    </TypographyText>
                  </div>
                </div>
                <div className="w-100 place-items d-flex justify-content-sm-start align-items-center ps-sm-5">
                  <div>
                    <TypographyText
                      type="secondary"
                      className="fw-light mb-2 d-block"
                    >
                      Supported formats:
                    </TypographyText>
                    <Flex gap={8}>
                      <div className="format">mp4</div>
                      <div className="format">mp3</div>
                    </Flex>
                  </div>
                </div>
              </div>
            </Col>
            {/* recording options  */}

          {(!Video?.streaming?.active && Video?.videoUrl) ? <Col span={24} md={12} lg={8} xl={8} xxl={8}>
              <Button
              block
                onClick={finishProcess}
                className="h-100 animated-btn"
                style={{ background: `linear-gradient(134.67deg, #7579F7 0%, #D5B9F8 100%)` }}
                // style={{
                //   background: `linear-gradient(134.67deg, #7579F7 0%, #D5B9F8 100%)`,
                // }}
              >
                <div >
                  <div className="recording_icon mb-3">
                    <HenceforthIcons.ScreenRocord />
                  </div>
                  <TypographyText className="text-white fs-16 fw-semibold d-block">
                    Finish Process
                  </TypographyText>
                </div>
              </Button>
            </Col> : <>
            {Video?.streaming?.active ?
            <Col span={24} md={12} lg={8} xl={8} xxl={8}>
              <Button
              block
                onClick={stopRecording}
                className="h-100 animated-btn p-0"
                style={{ background: `linear-gradient(134.67deg, #7579F7 0%, #D5B9F8 100%)` }}
                // style={{
                //   background: `linear-gradient(134.67deg, #7579F7 0%, #D5B9F8 100%)`,
                // }}
              >
                <div >
                  <div className="recording_icon mb-3">
                    <HenceforthIcons.ScreenRocord />
                  </div>
                  <TypographyText className="text-white fs-16 fw-semibold d-block">
                    Stop Screen Record
                  </TypographyText>
                </div>
              </Button>
            </Col>:
            <Col span={24} md={12} lg={8} xl={8} xxl={8}>
              <div
                onClick={() => {Video.startScreenRecording();setRecStop(false)}}
                className="recording_option"
                style={{
                  background: `linear-gradient(134.67deg, #7579F7 0%, #D5B9F8 100%)`,
                }}
              >
                {/* <Link href={`/${user_type}/process/recording/${res.href}`} className="recording_option" style={{ background: res.background }}> */}
                <div>
                  <div className="recording_icon mb-3">
                    <HenceforthIcons.ScreenRocord />
                  </div>
                  <TypographyText className="text-white fs-16 fw-semibold d-block">
                    Screen Record
                  </TypographyText>
                </div>
              </div>
            </Col>}
            </>}
            {recordingOptions.map((res, index) => (
              <Col key={index} span={24} md={12} lg={8} xl={8} xxl={8}>
                <div
                  className="recording_option"
                  onClick={()=>{router.push(`/${userType}/process/${router?.query?._id}/recording/${res.href}`)}}
                  style={{ background: res.background }}
                >
                  {/* <Link href={`/${user_type}/process/recording/${res.href}`} className="recording_option" style={{ background: res.background }}> */}
                  <div>
                    <div className="recording_icon mb-3">{res.icon}</div>
                    <TypographyText className="text-white fs-16 fw-semibold d-block">
                      {res.text}
                    </TypographyText>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <video
          className="d-none"
          ref={Video.screenRecording}
          height={300}
          width={600}
          controls
        />
      </section>


      <Modal
      className="p-5 modal-css"
      closeIcon={false}
      centered
      title={ <div className="text-center">
        <img height={150} width={150} src={gif.src}/>
      </div>
        }
        maskClosable={false}
        footer={null}
        open={reasonModal}
        onOk={() => setReasonModal(false)}
        onCancel={() => setReasonModal(false)}
        >
      </Modal>
    </React.Fragment>
  );
};
Record.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Record;