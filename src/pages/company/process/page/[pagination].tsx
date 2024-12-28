import HenceforthIcons from "@/components/HenceforthIcons"
import MainLayout from "@/components/common/MainLayout"
import { Avatar, Button, Col, Dropdown, Flex, Input, Row, Select, Table, Tabs, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import { MenuProps, TabsProps } from "antd"
import React, { ReactElement, useContext } from "react"
import profile from '@/assets/images/profile.png';
import Link from "next/link"
import { useRouter } from "next/router"
import { GlobalContext } from "@/context/Provider"
const ProcessPage = () => {
    const router = useRouter()
    const {user_type} = router.query
    const items2: MenuProps['items'] = [
        {
            key: '1',
            label: <Button type="text" className="text-dark p-0 h-100 text-start">Team Admin</Button>,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Button type="text" className="text-dark p-0 h-100 text-start">Member</Button>,
        },
    ];
    const action: MenuProps['items'] = [
        {
            key: '1',
            label: <Link href={`/${user_type}/process/1/view`} className="fw-semibold">View</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Link href={`/${user_type}/process/1/view`} className="fw-semibold">Reassign</Link>,
        },
    ];
    const dataSource = [
        {
            key: '1',
            title: 'Title 1',
            process_owner: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            designation: 'Team Admin',
            department: 'Accounting',
            created_on: 'Sep 10, 2023',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
        {
            key: '2',
            title: 'Title 1',
            process_owner: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            designation: 'Team Admin',
            department: 'Accounting',
            created_on: 'Sep 10, 2023',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
        {
            key: '3',
            title: 'Title 1',
            process_owner: <Flex align="center" gap={8}><Avatar src={profile.src} size={40} /><TypographyText>Johny</TypographyText></Flex>,
            designation: 'Team Admin',
            department: 'Accounting',
            created_on: 'Sep 10, 2023',
            action: <Dropdown menu={{ items: action }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100" size="small" ><HenceforthIcons.MoreFill /></Button>
            </Dropdown>,
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Process Owner',
            dataIndex: 'process_owner',
            key: 'process_owner',
        },
        {
            title: <Dropdown menu={{ items: items2 }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100" size="small" >Designation <HenceforthIcons.ChevronDownBlack color /></Button>
            </Dropdown>,
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Created on',
            dataIndex: 'created_on',
            key: 'created_on',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'All',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: '2',
            label: 'Assigned',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: '3',
            label: 'Unassigned',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: '4',
            label: 'Requests',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: '5',
            label: 'Deleted',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: '6',
            label: 'Archived',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by title or designation..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
    ];
    return (
        <React.Fragment>
            <section className="process">
                <div className="container-fluid">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex justify="space-between" align="center" gap={10}>
                                <TypographyTitle level={4} className="m-0">Process</TypographyTitle>
                                <Link href={`/${user_type}/process/add`}><Button type="primary" size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Plus />}>Add New Process</Button></Link>
                            </Flex>
                        </Col>
                        {/* tabs */}
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" items={items} />
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
ProcessPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default ProcessPage