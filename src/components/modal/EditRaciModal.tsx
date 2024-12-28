import React, { useContext } from "react";
import {
    AntForm,
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Dropdown,
    Flex,
    FormItem,
    Input,
    Modal,
    Row,
    Select,
    TextArea,
    TypographyText,
    TypographyTitle,
} from "@/lib/AntRegistry";
import HenceforthIcons, { InfoIcon } from "../HenceforthIcons";
import { Tooltip } from "antd";
import henceforthApi from "@/utils/henceforthApi";
import { GlobalContext } from "@/context/Provider";
interface typeProps {
    open: boolean;
    loading: boolean;
    setOpen: any;
    submit: any;
    form?: any;

}
const EditRaciModal = ({ open, setOpen, submit, loading, form }: typeProps) => {
    const { userInfo } = useContext(GlobalContext)

    const [user, setUser] = React.useState({
        count: 0,
        data: [],
    });

    const initDataUser = async () => {
        debugger;
        try {
            let apiRes = await henceforthApi.User.allUserListing()
            setUser(apiRes?.data);
        } catch (error) { }
    };

    React.useEffect(() => {
        initDataUser();
    }, []);

    const options = Array.isArray(user?.data) &&
        (user.data
            .map((res: any) => {
                let isDisabled = false;

                if (userInfo?.role === "COMPANY_ADMIN") {
                    // COMPANY_ADMIN can select TEAM_ADMIN and MEMBER
                    isDisabled = !(res.role === "TEAM_ADMIN" || res.role === "MEMBER");
                } else if (userInfo?.role === "TEAM_ADMIN") {
                    // TEAM_ADMIN can only select MEMBER
                    isDisabled = res.role !== "MEMBER";
                } else if (userInfo?.role === "MEMBER") {
                    // MEMBER can only select MEMBER
                    isDisabled = res.role !== "MEMBER";
                }

                return {
                    value: res._id,
                    label: res?.email
                        ? res?.email
                        : res.first_name
                            ? `${res?.first_name} ${res?.last_name ?? ""}`
                            : res?.email
                                ? res?.email
                                : "N/A",
                    disabled: isDisabled,
                };
            })
            // Separate enabled and disabled options and sort them
            .sort((a: any, b: any) =>  (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1)) as any);

    return (
        <Modal
            title={
                <TypographyTitle level={5} className="m-0 text-center">
                    RACI
                </TypographyTitle>
            }
            prefixCls="edit-modal"
            maskClosable={false}
            centered
            footer={null}
            open={open}
            onOk={() => { setOpen(false); form.resetFields() }}
            onCancel={() => setOpen(false)}
        >
            <AntForm size="large" className="mt-4"
                layout="vertical" onFinish={submit} form={form}>

                <Row gutter={[10, 0]}>
                    <Col span={24} lg={12}>
                        <FormItem
                            name="responsible"
                            className="mb-1"
                            label={<Tooltip color="#9778F7" title='The person or people who are responsible for completing the task or making a decision. They do the work.'><Flex align="center" gap={8}><div>Responsible</div><InfoIcon /></Flex></Tooltip>}
                            rules={[
                                {
                                    message: "Please select responsible",
                                    //whitespace: true,
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Select an employee"
                                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                notFoundContent={null}
                                options={
                                   options
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={24} lg={12}>
                        <FormItem
                            name="accountable"
                            label={<Tooltip color="#9778F7" title={` The person who is ultimately accountable for the task's success. They delegate work and ensure it's completed but aren't necessarily involved in the day-to-day work.`}><Flex align="center" gap={8}><div>Accountable</div><InfoIcon /></Flex></Tooltip>}
                            className="mb-1"
                            rules={[
                                {
                                    message: "Please select accountable",
                                    whitespace: true,
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select an employee"
                                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                options={
                                   options
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={24} lg={12}>
                        <FormItem
                            name="consulted"
                            label={<Tooltip color="#9778F7" title={`People whose opinions are sought before a decision is made or a task is completed. They offer guidance and expertise.`}><Flex align="center" gap={8}><div>Consulted</div><InfoIcon /></Flex></Tooltip>}
                            className="mb-1"
                            rules={[
                                {
                                    message: "Please select consulted",
                                    // whitespace: true,
                                    required: false,
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Select an employee"
                                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                notFoundContent={null}
                                options={
                                 options
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={24} lg={12}>
                        <FormItem
                            name="informed"
                            label={<Tooltip color="#9778F7" title={`Individuals who need to be kept informed of progress or decisions, but they are not directly involved in the task's execution.`}><Flex align="center" gap={8}><div>Informed</div><InfoIcon /></Flex></Tooltip>}
                            className="mb-1"
                            rules={[
                                {
                                    message: "Please select informed",
                                    //whitespace: true,
                                    required: false,
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                mode="multiple"
                                notFoundContent={null}
                                placeholder="Select an employee"
                                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                options={
                                   options
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>

                <Button loading={loading} type="primary" className="mt-3" htmlType="submit" block>
                    Submit
                </Button>
            </AntForm>
        </Modal>
    );
};

export default EditRaciModal;
