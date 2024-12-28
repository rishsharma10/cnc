import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import { AntForm, Avatar, Button, Card, Checkbox, Col, Divider, Dropdown, Flex, FormItem, Input, Modal, Row, Space, Table, Tabs, TextArea, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import { MenuProps } from "antd";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import profile from '@/assets/images/profile.png';
// import poster from '@/assets/images/profile.png';
// import pdf from '@/assets/images/pdf.png';
// import flow from '@/assets/images/flow.png';
// import flowChart from '@/assets/images/flow-chart.png';
// import ActivityCard from "@/components/ActivityCard";
// import CommentCard from "@/components/CommentCard";
import { TabsProps } from "antd/lib";
import Accounting from "@/assets/icons/Accounting";
import { useRouter } from "next/router";
import henceforthApi from "@/utils/henceforthApi";
const View = () => {
    const router = useRouter()
    const { user_type } = router.query
    const [commentModal, setCommentModal] = useState(false);

    const [reassignModal, setReassignModal] = useState(false);
    const action: MenuProps['items'] = [
        {
            key: '1',
            label: <Link href={`/${user_type}/teammates/1/view`} className="fw-semibold">View</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Button type="text" className="fw-semibold p-0 bg-transparent h-100" onClick={() => setReassignModal(true)}>Reassign</Button>,
        },

    ];
    const membersDataSource = [
        {
            key: '1',
            first_name: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            last_name: 'Doe',
            email: 'johny123@gmail.com',
            process_created: '02',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
        {
            key: '2',
            first_name: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            last_name: 'Doe',
            email: 'johny123@gmail.com',
            process_created: '02',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
    ];

    const membersColumns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Process Created',
            dataIndex: 'process_created',
            key: 'process_created',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100,
        },
    ];
    const systemsDataSource = [
        {
            key: '1',
            first_name: <TypographyText>Tool 1</TypographyText>,
            system_owner: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            process: '02',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
        {
            key: '2',
            first_name: <TypographyText>Tool 1</TypographyText>,
            system_owner: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            process: '02',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
    ];

    const systemsColumns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'System Owner',
            dataIndex: 'system_owner',
            key: 'system_owner',
        },
        {
            title: 'Process',
            dataIndex: 'process',
            key: 'process',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 100
        },
    ];
 

    return (
        <React.Fragment>
            <section className="teammates_detail">
                <div className="container-fluid">
                    <Row gutter={[20, 20]} justify={'space-between'} align={"middle"}>
                        <Col span={24}>
                            <Flex align="center" gap={8}>
                                <Accounting size />
                                <TypographyTitle level={4} className="m-0">Accouting</TypographyTitle>
                            </Flex>
                        </Col>
                    </Row>

                    {/* Team Admin table */}
                    <Row className="mt-5" gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex align="center" gap={20} justify="space-between">
                                <TypographyTitle level={5} className="m-0">Team Admin</TypographyTitle>
                                <Link href={'#'} className="text-primary place-items gap-1"><HenceforthIcons.AddFill /></Link>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <Table scroll={{ x: '100%' }} pagination={false} dataSource={membersDataSource} columns={membersColumns} />
                        </Col>
                    </Row>

                    {/* Members table */}
                    <Row className="mt-5" gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex align="center" gap={20} justify="space-between">
                                <TypographyTitle level={5} className="m-0">Members</TypographyTitle>
                                <Link href={'#'} className="text-primary place-items gap-1"><HenceforthIcons.AddFill /></Link>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <Table scroll={{ x: '100%' }} pagination={false} dataSource={membersDataSource} columns={membersColumns} />
                        </Col>
                    </Row>
                    {/* Systems table */}
                    <Row className="mt-5" gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex align="center" gap={20} justify="space-between">
                                <TypographyTitle level={5} className="m-0">Systems</TypographyTitle>
                                <Link href={'#'} className="text-primary place-items gap-1"><HenceforthIcons.AddFill /></Link>
                            </Flex>
                        </Col>
                        <Col span={24}>
                            <Table scroll={{ x: '100%' }} pagination={false} dataSource={systemsDataSource} columns={systemsColumns} />
                        </Col>
                    </Row>
                </div>
            </section>


            {/* comment modal */}
            <Modal
                title={<TypographyTitle level={5} className="m-0 text-center">Delete Oivia(Team Admin)</TypographyTitle>}
                centered
                footer={null}
                open={commentModal}
                onOk={() => setCommentModal(false)}
                onCancel={() => setCommentModal(false)}
            >
                <div className="modal_content">
                    <TypographyText type="secondary" className="d-block mb-4 text-center">If you delete this user, then have to assign a new Team Admin to the Accounting department.</TypographyText>

                    <Space direction="vertical" className="w-100">
                        <Link href={`/${user_type}/teammates/assign/process`}><Button type="primary" size="large" block>Assign Department</Button></Link>
                        <Button type="primary" size="large" ghost block>Remain Unassigned</Button>
                    </Space>
                </div>
            </Modal>
            {/* Decline Reason modal */}
            <Modal
                title={<TypographyTitle level={5} className="m-0 text-center">Select Owner</TypographyTitle>}
                centered
                footer={null}
                open={reassignModal}
                onOk={() => setReassignModal(false)}
                onCancel={() => setReassignModal(false)}
            >
                <AntForm size="large">
                    <TypographyText type="secondary" className="text-center mb-4 d-block">Please select the owner of the Johny&apos;s processes.</TypographyText>
                    <FormItem className="mb-5">
                        <Input placeholder="Email" variant="filled" />
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