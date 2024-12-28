import { AntForm, Button, FormItem, Input, Select, Space, TypographyTitle } from "@/lib/AntRegistry"
import React, { useState, useContext } from "react"
import HenceforthIcons from "./HenceforthIcons"
import henceforthApi from "@/utils/henceforthApi";
import { GlobalContext } from "@/context/Provider";
import { useRouter } from "next/router";
const CommonStep1 = (props: any) => {
    const router=useRouter()
    console.log(props, "propspsppspsp");
    const { userType } = useContext(GlobalContext)

    const [state, setState] = useState({
        count: 0,
        data: [],
    });
    const [user, setUser] = React.useState({
        count: 0,
        data: [],
    });
    const initDataUser = async () => {
        debugger;
        try {
            let apiRes = await henceforthApi.Process.userList("ALL");
            setUser(apiRes?.data);
            props?.setData(apiRes?.data)
            console.log(apiRes?.data,"user data")
        } catch (error) { }
    };
    const initData = async () => {
        debugger;

        try {
            let apiRes = await henceforthApi.Department.listing();
            setState(apiRes);
        } catch (error) { }
    };

    const initProcessDetail=async()=>{
        try {
            const apiRes=await henceforthApi.Process.getById(String(router.query.pid));
            props?.form.setFieldvalue("title",apiRes?.title);
            props?.form.setFieldvalue("department_id",apiRes?.department_id?._id)
        } catch (error) {
            
        }
    }
    React.useEffect(() => {
        initData();
        initDataUser();
        if(router.query.pid){
            initProcessDetail();
        }
    }, []);
    return (
        <React.Fragment>
            <AntForm size="large" layout="vertical" className="pt-4" scrollToFirstError onFinish={props.onSubmit} form={props?.form}>
                <FormItem name="title" label={'Process Title'} rules={[
                    { message: "Please enter title", whitespace: true, required: true },
                ]}>
                    <Input placeholder="Title" maxLength={40}/>
                </FormItem>
                <FormItem name="department_id" label={'Owned Department'} rules={[
                    { message: "Please select department", whitespace: true, required: true },
                ]}>
                    <Select
                        placeholder="Select department"
                        showSearch
                        suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                        options={Array.isArray(state.data) && state.data.map((res: any) => {
                            return {
                                value: res._id,
                                label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                            }
                        }) as any}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </FormItem>

                <Space size={"small"} direction="vertical" className="assign_process w-100 mt-3">
                    <TypographyTitle level={5} className="m-0">Assign Process</TypographyTitle>
                    <Button onClick={() => props?.setAssignType("to_myself")} type="primary" ghost block className={props?.assignType == "to_myself" ? `btn-secondary` : ""}>Assign process to me</Button>
                    {userType !== "member" ? <><Button onClick={() => props?.setAssignType("to_someone")} type="primary" ghost block className={props?.assignType == "to_someone" ? `btn-secondary` : ""}>Assign process to others</Button>
                        <Button onClick={() => props?.setAssignType("unassigned")} type="primary" ghost block className={props?.assignType == "unassigned" ? `btn-secondary` : ""}>Leave unassigned</Button></> : ""}

                    {/* <Button onClick={() => props?.setAssignType("to_myself")} type="primary" ghost block>Assign process to me</Button>
                    <Button onClick={() => props?.setAssignType("to_someone")} block style={{ background: '#000', color: '#121212' }} type="text">Assign process to someone else</Button>
                    <Button onClick={() => props?.setAssignType("unassigned")} block className="btn-secondary">Unassign</Button> */}
                </Space>
                {props?.assignType == "to_someone" &&
                    <FormItem name="assign_to" label={'Select employee'} rules={[
                        { message: "Please select employee", whitespace: true, required: true },
                    ]}>
                        <Select
                        showSearch
                            placeholder="Select an employee"
                            suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                            options={Array.isArray(user.data) && user.data.map((res: any) => {
                                return {
                                    value: res._id,
                                    label: res?.email ? res?.email : res.first_name ? `${res?.first_name} ${res?.last_name ?? ""}` : res?.email ? res?.email : "N/A"
                                }
                            }) as any}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </FormItem>}
                <FormItem>
                    <Button
                        className="w-100 mt-3"
                        loading={props?.loading}
                        disabled={props?.loading}
                        type="primary"
                        htmlType="submit"
                    >
                        {props?.assignType === "" || props?.assignType === "to_myself" ? "Next" : "Submit"}
                    </Button>
                </FormItem>
            </AntForm>
        </React.Fragment>
    )
}
export default CommonStep1