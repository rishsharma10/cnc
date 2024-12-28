import { Button, Col, Flex, Modal, Row } from "@/lib/AntRegistry";
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
        props.audio
      );
      const items: any = {
        media_url: videoUrl?.file_name,
        type: "AUDIO",
        
      };
      
      router.push(`/${userType}/process/list/all/1?Pagination=1&newadded=true&newPid=${router.query._id}`)
      const updateContent = await henceforthApi.Process.processUploadVideo(
        String(_id),
        items
      );
      //router.replace(`/${userType}/process/${_id}/details`);
      props?.setAudio(null)
      // Video.setVideoUrl(null)
      
    } catch (error) {
      setReasonModal(false)
      props?.setAudio(null)

      // Video.setVideoUrl(null)
      setLoading(false);
      Toast.error("something went wrong")
    }finally{
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section className="screen_recording h-100">
        {/* <MediaComponent/> */}
        <div className="container-fluid px-0 h-100">
          <Row className="h-100">
            <Col span={24} className="h-100">
              <div className="recording_background d-flex flex-column justify-content-center h-100 position-relative overflow-hidden">
                {/* *********************** screen-recording *********************/}

                <div >
                  <HenceforthIcons.AudioRecord />
                </div>
                {/* *********************** audio-recording *********************/}

                <Flex gap={10}>
                  <Button onClick={() => { finishProcess() }} type="primary">Use this audio</Button>
                  <Button onClick={() => { props?.setAudio(null) }} icon={<HenceforthIcons.Restore />} className="d-flex align-items-center btn-secondary px-4">Retake</Button>
                </Flex>
              </div>
            </Col>
          </Row>
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
