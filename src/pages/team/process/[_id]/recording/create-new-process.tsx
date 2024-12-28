import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import { Button, Col, Flex, Row } from "@/lib/AntRegistry";
import React, { ReactElement,useContext } from "react";
import poster from '@/assets/images/screen-recording.png';
import Link from "next/link";
import {GlobalContext} from "@/context/Provider";
import { useRouter } from "next/router";
const NewProcess = () => {
    const router = useRouter()
    const {userType}=useContext(GlobalContext)
    const {user_type} = router.query
    return (
        <React.Fragment>
            <section className="new_process">
                <div className="container-fluid">
                    <Row gutter={[20,20]}>
                        <Col span={24}>
                            {/* Video */}
                            <div className="video_container position-relative" style={{height:600}}>
                                <video src="" poster={poster.src}></video>
                                <div className="overlay">
                                    <Button type="text" shape="circle" className="p-0 h-auto"><HenceforthIcons.PlayFill /></Button>
                                </div>
                                <div className="zoom_btn">
                                    <Button type="text" shape="circle"><HenceforthIcons.Expand /></Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={24} className="mt-3">
                            <Flex align="center" gap={10}>
                                <Button type="primary" className="px-4">Use this Video</Button>
                               <Link href={`/${userType}/process/recording/screen-record`}><Button className="btn-secondary px-4 place-items" icon={<HenceforthIcons.Restore/>}>Retake</Button></Link>
                            </Flex>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
NewProcess.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default NewProcess;