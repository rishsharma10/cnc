import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import { AntForm, Avatar, Button, Card, Col, Dropdown, Flex, FormItem, Input, Row, Select, Space, Switch, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import React, { ReactElement, useContext, useState } from "react";
import profile from '@/assets/images/profile.png';
import { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
const AddTeammates = () => {
    const router = useRouter()
    const [userRole,setUserRole]=useState(null)as any;
    const { userType,Toast,userInfo } = useContext(GlobalContext)
    console.log(userInfo,"userInfo")
    const [loading, setLoading] = React.useState(false)
    const [users, setUsers] = useState({
        data: [
            {
                label: 'Add',
                key: "user_add_access",
            },
            {
                label: 'Delete',
                key: "user_delete_access",
            },
            {
                label:"Deactivate",
                key:"user_deactivate_access"
            }
        ],
        user_add_access: false,
        user_delete_access: false
    })

    const [process, setProcess] = useState({
        data: [
            {
                label: 'Create',
                key: "create_process_access",
            },
            {
                label: 'Share',
                key: "share_process_access",
            },
            {
                label: 'Export',
                key: "export_process_access",
            },
            {
                label: 'Delete',
                key: "delete_process_access",
            },
        ],
        create_process_access: false,
        share_process_access: false,
        export_process_access: false,
        delete_process_access: false,
    })
    const [department, setDepartment] = useState({
        data: [
            {
                label: 'Request',
                key:"dep_req_access"
            },
            {
                label: 'Delete',
                key:"dep_delete_access"
            }
        ],
        dep_req_access: false,
        dep_delete_access: false
    })
    const [state,setState] = React.useState({
        count: 0,
        data: [],
    });
    const initData = async () => {
        debugger;
        try {
            let apiRes = await henceforthApi.Department.listing();
            setState(apiRes);
        } catch (error) { 
            Toast.error(error)
        }
    };

    

    const addTeamMates = async (values: any) => {
        console.log(values, "valuessss");
        const items = {
            email: values?.email,
            department_id: values?.department_id,
            user_role: values?.user_role,
            user_add_access: users?.user_add_access,
            user_delete_access: users?.user_delete_access,
            create_process_access: process?.create_process_access,
            share_process_access: process?.share_process_access,
            export_process_access: process?.export_process_access,
            delete_process_access: process?.delete_process_access,
            dep_req_access: department?.dep_req_access,
            dep_delete_access: department?.dep_delete_access
        }
        try {
            setLoading(true)
            let apiRes = await henceforthApi.Team.addTeamMates(items)
            router.replace(`/${userType}/teammates/page/all/1`)
        } catch (error) {
            Toast.error(error)
            setLoading(false)
        }
    }
    const handleChange = (key: string, value:boolean, type: string) => {
        console.log(key, value, "valueueueu");
        if (type == "USER") {
            setUsers({
                ...users,
                [key]: value
            })
        } else if (type == "PROCESS") {
            setProcess({
                ...process,
                [key]: value
            })
        } else {
            setDepartment({
                ...department,
                [key]:value
            })
        }
    }
    console.log(users, "usersss");

    React.useEffect(() => {
        initData();
    }, []);
    return (
        <React.Fragment>
            <section className="process-1 py-2">
                <div className="container-fluid">
                    <Row>
                        <Col span={24} md={20} lg={18} xl={14} xxl={12}>
                            {/* title */}
                            <TypographyTitle level={4} className="mb-3">Add New Teammate</TypographyTitle>
                            <AntForm size="large" layout="vertical" onFinish={addTeamMates}>
                                {/* Email */}
                                <FormItem name="email" className="mb-1" label={'Email'}>
                                    <Input placeholder="Email" />
                                </FormItem>
                                {/* Department */}
                                <FormItem className="mb-1" label={'Department'} name="department_id" rules={[
                                    { message: "Please select department", whitespace: true, required: true },
                                ]}>
                                    <Select
                                        placeholder="Select department"
                                        suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                        options={Array.isArray(state.data) && state.data.map((res: any) => {
                                            return {
                                                value: res._id,
                                                label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                                            }
                                        }) as any}
                                    />
                                </FormItem>
                                {/* Role */}
                                <FormItem className="mb-2" label={'Role'} name="user_role" rules={[
                                    { message: "Please select Role", whitespace: true, required: true },
                                ]}>
                                    <Select
                                        placeholder="Role"
                                        value={userRole} // Bind the state to the Select value
                                        onSelect={(value) => setUserRole(value)} 
                                        suffixIcon={<HenceforthIcons.ChevronDownBlack />}
                                        options={[
                                            { value: 'COMPANY_ADMIN', label: 'Company Admin' },
                                            { value: 'TEAM_ADMIN', label: 'Team Admin' },
                                            { value: 'MEMBER', label: 'Member' },
                                        ]}
                                    />
                                </FormItem>
                                {/* User */}
                                <FormItem className="mb-2" label={<TypographyText className="fs-16">Users</TypographyText>}>
                                    <Space direction="vertical" className="w-100">
                                        {users.data.map((res, index) => <Card key={index} className="common_card" bordered={false}>
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <TypographyText className="fw-semibold">{res.label}</TypographyText>
                                                <Switch size="small" onChange={(value) => handleChange(res.key, value, "USER")} />
                                            </Flex>
                                        </Card>)}
                                    </Space>
                                </FormItem>

                                {/* Process */}
                                <FormItem className="mb-2" label={<TypographyText className="fs-16">Process</TypographyText>}>
                                    <Space direction="vertical" className="w-100">
                                        {process.data.map((res, index) => <Card key={index} className="common_card" bordered={false}>
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <TypographyText className="fw-semibold">{res.label}</TypographyText>
                                                <Switch size="small" onChange={(value) => handleChange(res.key, value, "PROCESS")} />
                                            </Flex>
                                        </Card>)}
                                    </Space>
                                </FormItem>
                                {/* Department */}
                                {userRole==="COMPANY_ADMIN" && <FormItem className="mb-4" label={<TypographyText className="fs-16">Department</TypographyText>}>
                                    <Space direction="vertical" className="w-100">
                                        {department.data.map((res, index) => <Card key={index} className="common_card" bordered={false}>
                                            <Flex align="center" justify="space-between" gap={10}>
                                                <TypographyText className="fw-semibold">{res.label}</TypographyText>
                                                <Switch size="small" onChange={(value) => handleChange(res.key, value, "")} />
                                            </Flex>
                                        </Card>)}
                                    </Space>
                                </FormItem>}

                                {/* Add button */}
                                <Button htmlType="submit" type="primary" loading={loading} block >Add Teammate</Button>
                            </AntForm>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
AddTeammates.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default AddTeammates;
