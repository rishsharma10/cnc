import { Button, Col, Flex, Modal, Row, TypographyTitle } from "@/lib/AntRegistry";
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import poster from "@/assets/images/screen-recording.png";
import HenceforthIcons from "@/components/HenceforthIcons";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { query } from "firebase/database";
import MediaComponent from "@/components/MediaComponent";
// import Icons from "./Icons";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import { AudioFilled } from '@ant-design/icons'
import banner from '@/assets/images/placeholder-banner.png'
import MainLayout from "./MainLayout";
import gif from "@/assets/gif/loading.gif"
// // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// const ffmpeg = createFFmpeg({ log: true });

const ScreenRocord = (props: any) => {
  const [loading, setLoading] = useState(false)
  const { Toast,userType } = useContext(GlobalContext)
  const router = useRouter();
  const [reasonModal, setReasonModal] = useState(false)
  const { _id } = router.query
  console.log(props?.audio, "bolb")

  // const convertToMp3 = async (blob:any) => {
  //   if (!ffmpeg.isLoaded()) {
  //     await ffmpeg.load();
  //   }

  //   const data = await fetchFile(blob);
  //   ffmpeg.FS('writeFile', 'input.wav', data);
  //   await ffmpeg.run('-i', 'input.wav', 'output.mp3');
  //   const mp3Data = ffmpeg.FS('readFile', 'output.mp3');

  //   return new Blob([mp3Data.buffer], { type: 'audio/mp3' });
  // };

  const finishProcess = async () => {

    // debugger;
    setLoading(true);
    setReasonModal(true)
    try {
      const videoUrl = await henceforthApi.Common.uploadFile(
        "file",
        props.video
      );
      const items: any = {
        media_url: videoUrl?.file_name,
        type: "VIDEO",
        
      };
      
      router.push(`/${userType}/process/list/all/1?Pagination=1&newadded=true&newPid=${router.query._id}`)
      const updateContent = await henceforthApi.Process.processUploadVideo(
        String(_id),
        items
      );
      //router.replace(`/${props.type}/process/${_id}/details`);
      props?.setVideo(null)
      // Video.setVideoUrl(null)
    } catch (error) {
      setReasonModal(false)
      props?.setVideo(null)

      // Video.setVideoUrl(null)
      setLoading(false);
      Toast.error("something went wrong")
    }
  };

  return (
    <React.Fragment>
        <section className="screen_recording h-100">
        <h2 className="fw-bold">Create New Process</h2>
        <div className="common_card mb-3">
          <Flex
            align="center"
            justify="space-between"
            gap={10}
            className="mb-3"
          >
            <Flex align="center" gap={10}>
              <TypographyTitle level={5} className="m-0">
                Video
              </TypographyTitle>
              <Link
                target="_blank"
                href={URL.createObjectURL(props.video)}
              ></Link>
            </Flex>
            <Button type="text" className="p-0 h-100" shape="circle">
              {/* <HenceforthIcons.EditFill /> */}
            </Button>
          </Flex>
          {/* Video */}
          <div
            className="video_container position-relative"
            style={{ height: 500 }}
          >
            <video src={URL.createObjectURL(props.video)} controls></video>
            {/* <div className="zoom_btn">
                        <Button type="text" shape="circle">
                          <HenceforthIcons.Expand />
                        </Button>
                      </div> */}
          </div>
          <Flex gap={10} className="mb-1 mt-3">
            <Button
              onClick={() => {
                finishProcess();
              }}
              type="primary"
            >
              Use this Video
            </Button>
            <Button
              onClick={() => {
                props?.setVideo(null);
                props.setRecordingStatus("inactive");
              }}
              icon={<HenceforthIcons.Restore />}
              className="d-flex align-items-center btn-secondary px-4"
            >
              Retake
            </Button>
          </Flex>
        </div>
      </section>

      <Modal
        className="p-5 modal-css"
        closeIcon={false}
        centered
        title={<div className="text-center">
          <img height={150} width={150} src={gif.src} />
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
ScreenRocord.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
export default ScreenRocord;
