import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import { AntForm, Avatar, Button, Card, Col, Divider, Dropdown, Flex, FormItem, Input, Modal, Row, TextArea, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import { MenuProps } from "antd";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import profile from '@/assets/images/profile.png';
import poster from '@/assets/images/poster.png';
import pdf from '@/assets/images/pdf.png';
import flow from '@/assets/images/flow.png';
import flowChart from '@/assets/images/flow-chart.png';
import ActivityCard from "@/components/ActivityCard";
import CommentCard from "@/components/CommentCard";
import { useRouter } from "next/router";
const View = () => {
    const router = useRouter()
    const {user_type} = router.query
    const [commentModal, setCommentModal] = useState(false);
    const [reasonModal, setReasonModal] = useState(false);
    const [shareBtn, setShareBtn] = useState(false)
    const sharedList = [
        {
            title: 'Shared Internal'
        },
        {
            title: 'Shared External'
        },
        {
            title: 'Shared Outside'
        },
    ]
    const processDetails = [
        {
            label: 'Owned Department:',
            text: 'Information Technology'
        },
        {
            label: 'Trigger:',
            text: 'Existing Processs'
        },
        {
            label: 'Connected Department:',
            text: 'Research & Development, Design'
        },
        {
            label: 'Estimated Time:',
            text: '1 hour 15mins 10 sec'
        },
        {
            label: 'Frequency:',
            text: 'Weekly'
        },
        {
            label: 'System Used:',
            text: 'Salesforce'
        },
        {
            label: 'Experience Level:',
            text: 'Difficult'
        },
        {
            label: 'Financial Data (F):',
            text: 'Difficult'
        },
        {
            label: 'Department Data (D):',
            text: 'Difficult'
        },
        {
            label: 'Employee Data (E):',
            text: 'Difficult'
        },
    ]
    const documentData = [
        {
            title: 'Document',
            image: pdf.src
        },
        {
            title: 'Flow',
            image: flow.src
        },
        {
            title: 'RACI',
            image: flowChart.src
        },
    ]
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href={`/${user_type}/process/1/edit`}>
                    <HenceforthIcons.Pencil />
                    <TypographyText className="ms-2 fw-semibold">Edit</TypographyText>
                </Link>
            ),
        },
        {
            type: 'divider'
        },
        {
            key: '2',
            label: (
                <Link href={`/${user_type}/process/1/edit`}>
                    <HenceforthIcons.Unarchieve />
                    <TypographyText className="ms-2 fw-semibold">Archive</TypographyText>
                </Link>
            ),
        },
        {
            type: 'divider'
        },
        {
            key: '3',
            label: (
                <Link href={`/${user_type}/process/1/edit`}>
                    <HenceforthIcons.Delete />
                    <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
                </Link>
            ),
        },
    ];
    return (
        <React.Fragment>
            <section className="process_detail">
                <div className="container">
                    <Row gutter={[20, 20]} justify={'space-between'}>
                        <Col span={24} lg={16} xl={16} xxl={18}>
                            {/* process info */}
                            <div className="process_info mb-4 pb-2">
                                <Flex align="center" gap={8} className="mb-2">
                                    <TypographyTitle level={4} className="m-0">Process Title</TypographyTitle>
                                    <Dropdown menu={{ items }} placement="bottomLeft">
                                        <Button type="text" shape="circle" className="place-items btn-xs"><HenceforthIcons.MoreFillBg /></Button>
                                    </Dropdown>
                                </Flex>
                                <TypographyText type="secondary">
                                    Cras eu vulputate tortor. Integer feugiat, eros eu aliquam vestibulum, lectus sapien sagittis tellus, at varius enim ipsum eget urna. Maecenas sed feugiat sem, in tristique erat. Proin faucibus dui a eros aliquet dapibus. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras pharetra, ante et ornare placerat, felis quam imperdiet massa, tristique dignissim magna ipsum sit amet arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elit augue, mollis id finibus eu, rutrum et massa.
                                </TypographyText>
                            </div>
                            {/* video card */}
                            <div className="common_card mb-3">
                                <Flex align="center" justify="space-between" gap={10} className="mb-3">
                                    <Flex align="center" gap={10}>
                                        <TypographyTitle level={5} className="m-0">Video</TypographyTitle>
                                        <Button type="text" className="p-0 h-100" shape="circle"><HenceforthIcons.DownloadFill /></Button>
                                    </Flex>
                                    <Button type="text" className="p-0 h-100" shape="circle"><HenceforthIcons.EditFill /></Button>
                                </Flex>
                                {/* Video */}
                                <div className="video_container position-relative">
                                    <video src="" poster={poster.src}></video>
                                    <div className="overlay">
                                        <Button type="text" shape="circle" className="p-0 h-auto"><HenceforthIcons.PlayFill /></Button>
                                    </div>
                                    <div className="zoom_btn">
                                        <Button type="text" shape="circle"><HenceforthIcons.Expand /></Button>
                                    </div>
                                </div>
                            </div>
                            {/* Document, flow, RACI */}
                            <Row gutter={[12, 12]}>
                                {documentData.map((res, index) => <Col key={index} span={24} md={12} lg={8} xl={8} xxl={8}>
                                    <div className="common_card">
                                        <Flex align="center" justify="space-between" gap={10} className="mb-2">
                                            <TypographyTitle level={5} className="m-0 fs-16">{res.title}</TypographyTitle>
                                            <Button type="text" shape="circle" className="p-0"><HenceforthIcons.DownloadFill /></Button>
                                        </Flex>
                                        <div className="inner_card text-center">
                                            <img src={res.image} alt="Not Found" />
                                        </div>
                                    </div>
                                </Col>)}
                            </Row>
                        </Col>
                        <Col span={24} lg={7} xl={7} xxl={5}>
                            {/* user info */}
                            <div className="process_user mb-5">
                                <Flex className="user_details mb-2" align="center" gap={8}>
                                    <div className="user_image">
                                        <Avatar src={profile.src} size={50} />
                                    </div>
                                    <div className="user_info">
                                        <TypographyText className="d-block text-white text-nowrap">Process Owner:</TypographyText>
                                        <TypographyText className="d-block text-white text-nowrap fs-16 fw-semibold">William</TypographyText>
                                    </div>
                                </Flex>
                                <Button type="primary" block ghost icon={<HenceforthIcons.Download />} className="place-items bg-white" size="large">Download</Button>
                            </div>

                            {/* chat bot */}
                            <div className="chat_bot_container h-100 common_card p-0 d-flex flex-column mb-4">
                                {/* chat_boat_header */}
                                <div className="chat_boat_header">
                                    <Flex align="center" gap={8}>
                                        <Avatar src={profile.src} size={36} />
                                        <TypographyText className="fw-semibold fs-16">Raize</TypographyText>
                                    </Flex>
                                </div>
                                {/* chat_boat_body */}
                                <div className="chat_boat_body p-3 d-flex flex-column gap-2 h-100 overflow-auto">
                                    {/* right chat */}
                                    <div className="right_chat">
                                        How can I scale this process?
                                    </div>
                                    {/* left chat */}
                                    <div className="left_chat">
                                        Hi James! Based on how you conduct the
                                        “Lead generation process” I would
                                        recommend the following approach:

                                        Automate Where Possible: Use CRM and
                                        marketing automation tools to automate
                                        repetitive tasks like email outreach, social
                                        media posts, and lead qualification. Tools
                                        like HubSpot, Marketo, and Salesforce
                                        are great for this.

                                        Optimize Your Website for Conversions:
                                        Ensure your website is designed to
                                        convert visitors into leads. This includes
                                        having clear calls-to-action (CTAs), fast
                                        loading times, responsive design, and
                                        high-quality content. see more
                                    </div>
                                </div>
                                {/* chat_boat_footer */}
                                <div className="chat_boat_footer p-3">
                                    <Input placeholder="Type your message here..." className="pe-2" suffix={<Button type="text" className="h-100 p-0" shape="circle"><HenceforthIcons.SendGradient /></Button>} />
                                </div>
                            </div>
                            {/* intrection button */}
                            <div>
                                {/* comments */}
                                <Button type="primary" ghost size="large" block className="place-items bg-white mb-2" icon={<HenceforthIcons.StickyNote />} onClick={() => setCommentModal(true)}>Comments</Button>
                                {/* Share */}
                                {/* Sharing options */}
                                <div className="sharing_options mt-2">
                                    {!shareBtn && <Button type="link" onClick={() => setShareBtn(true)} ghost size="small" block className="place-items sharing_btn_animate text-primary bg-white p-0" icon={<HenceforthIcons.Share />} >Share Interaction</Button>}
                                    {shareBtn && <Flex align="center" justify="center" className="sharing_animate" gap={10} >
                                        <Button type="primary" className="place-items bg-white department_btn" onClick={() => setShareBtn(false)} style={{ height: 36, width: 36, minWidth: 'unset' }} ghost shape="circle" size="large"><HenceforthIcons.Gmail /></Button>
                                        <Button type="primary" className="place-items bg-white department_btn" onClick={() => setShareBtn(false)} style={{ height: 36, width: 36, minWidth: 'unset' }} ghost shape="circle" size="large"><HenceforthIcons.Slack /></Button>
                                        <Button type="primary" className="place-items bg-white department_btn" onClick={() => setShareBtn(false)} style={{ height: 36, width: 36, minWidth: 'unset' }} ghost shape="circle" size="large"><HenceforthIcons.Outlook /></Button>
                                        <Button type="primary" className="place-items bg-white department_btn active" onClick={() => setShareBtn(false)} style={{ height: 36, width: 36, minWidth: 'unset' }} ghost shape="circle" size="large"><HenceforthIcons.CopyFill /></Button>
                                    </Flex>}
                                </div>
                            </div>
                        </Col>
                        {/* process details */}
                        <Col span={24}>
                            <div className="process_details mb-5">
                                <Flex className="mb-4" align="center" gap={10} justify="space-between">
                                    <TypographyTitle level={5} className="m-0" >Process details</TypographyTitle>
                                    <Button type="text" className="p-0 h-100" shape="circle"><HenceforthIcons.EditFill /></Button>
                                </Flex>
                                <Row gutter={[20, 20]}>
                                    {processDetails.map((res, index) => <Col key={index} span={24} md={12} lg={8} xl={6} xxl={6}>
                                        <div>
                                            <TypographyText type="secondary" className="mb-2 d-block">{res.label}</TypographyText>
                                            <TypographyText className="d-block fw-semibold">{res.text}</TypographyText>
                                        </div>
                                    </Col>)}
                                </Row>
                            </div>
                            {/* shared details */}
                            <Row className="shared mb-5" gutter={[4, 4]}>
                                {sharedList.map((res, index) => <Col key={index} span={24} md={12} lg={12} xl={8} xxl={8} className="shared_card_col">
                                    <Card bordered={false} className="common_card p-0 shared_card">
                                        <Flex className="shared_header" align="center" justify="space-between" gap={10}>
                                            <TypographyTitle level={5} className="fs-16 m-0 fw-bold">{res.title}</TypographyTitle>
                                            <Button type="text" className="p-0 h-100" shape="circle"><HenceforthIcons.AddFill /></Button>
                                        </Flex>
                                        <div className="px-4 py-3">
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <Flex align="center" gap={8} >
                                                    <Avatar src={profile.src} />
                                                    <TypographyText>Johny</TypographyText>
                                                </Flex>
                                                <Button type="primary" ghost className="d-flex align-items-center justify-content-between gap-5">View <HenceforthIcons.ChevronDownBlack /></Button>
                                            </Flex>
                                            <Divider className="my-3" />
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <Flex align="center" gap={8} >
                                                    <Avatar src={profile.src} />
                                                    <TypographyText>Johny</TypographyText>
                                                </Flex>
                                                <Button type="primary" ghost className="d-flex align-items-center justify-content-between gap-5">View <HenceforthIcons.ChevronDownBlack /></Button>
                                            </Flex>
                                            <Divider className="my-3" />
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <Flex align="center" gap={8} >
                                                    <Avatar src={profile.src} />
                                                    <TypographyText>Johny</TypographyText>
                                                </Flex>
                                                <Button type="primary" ghost className="d-flex align-items-center justify-content-between gap-5">View <HenceforthIcons.ChevronDownBlack /></Button>
                                            </Flex>
                                        </div>
                                    </Card>
                                </Col>)}
                            </Row>

                            {/* Activity */}
                            <Row gutter={[12, 12]} className="mb-4">
                                <Col span={24}>
                                    <TypographyTitle level={5} className="m-0">Activity</TypographyTitle>
                                </Col>
                                {[...Array(6)].map((index) => <Col key={index} span={24}>
                                    <ActivityCard />
                                </Col>)}
                            </Row>

                            <Flex gap={10}>
                                <Button type="primary" size="large" className="px-5">Accept</Button>
                                <Button size="large" className="px-5" onClick={()=>setReasonModal(true)}>Decline</Button>
                                <Button size="large" type="primary" className="px-5 place-items" icon={<HenceforthIcons.Restore/>}>Restore</Button>
                            </Flex>
                        </Col>
                    </Row>
                </div>
            </section>


            {/* comment modal */}
            <Modal
                title={<TypographyTitle level={5} className="m-0 text-center">Add Comment</TypographyTitle>}
                centered
                footer={null}
                open={commentModal}
                onOk={() => setCommentModal(false)}
                onCancel={() => setCommentModal(false)}
            >
                <Row className="modal_content mt-4">
                    {[...Array(2)].map((index) => <Col key={index} span={24}>
                        <CommentCard />
                        {!index ? <Divider className="my-3" /> : ''}
                    </Col>)}

                    {/* invite card */}
                    <Col span={24}>
                        <Card bordered={false} className="common_card p-3" style={{ background: 'linear-gradient(134.67deg, rgba(236, 139, 201, 0.1) 0%, rgba(240, 155, 170, 0.1) 100%)' }}>
                            <Flex gap={8} className="mb-2">
                                <Avatar src={profile.src} size={36} />
                                <div>
                                    <TypographyTitle className="m-0 fs-16" level={5}>Raize</TypographyTitle>
                                    <TypographyText type="secondary" className="fs-12">You mentioned @james, but they don’t have the access of this process</TypographyText>
                                </div>
                            </Flex>
                            <Flex gap={10}>
                                <Button type="primary" ghost className="px-4 bg-white">Invite Them</Button>
                                <Button type="primary" ghost className="px-4 bg-white">Do Nothing</Button>
                            </Flex>
                        </Card>
                    </Col>

                    {/* enter comment */}
                    <Col span={24}>
                        <div className="comment_input mt-5">
                            <Input className="pe-1 border py-1" placeholder="Enter comment here..." suffix={<Button type="text" size="small" shape="circle" className="h-100 p-0"><HenceforthIcons.SendGradient /></Button>} />
                        </div>
                    </Col>
                </Row>
            </Modal>
            {/* Decline Reason modal */}
            <Modal
                title={<TypographyTitle level={5} className="m-0 text-center">Decline Reason</TypographyTitle>}
                centered
                footer={null}
                open={reasonModal}
                onOk={() => setReasonModal(false)}
                onCancel={() => setReasonModal(false)}
            >
                <AntForm size="large"  className="mt-4">
                    <FormItem>
                        <TextArea placeholder="Enter the reason..." className="rounded-4 border" rows={6}/>
                    </FormItem>
                    <Button type="primary" block >Submit</Button>
                </AntForm>
            </Modal>
        </React.Fragment>
    )
}
View.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default View;