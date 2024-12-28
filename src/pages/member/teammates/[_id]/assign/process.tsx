import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  FormItem,
  Input,
  Row,
  Select,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import profile from "@/assets/images/profile.png";
import { GlobalContext } from "@/context/Provider";
import { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import henceforthApi from "@/utils/henceforthApi";
const Process1 = () => {
  const router = useRouter();
  const {userType}=useContext(GlobalContext)
  const { user_type } = router.query;
  const [ownedProcess, setOwnedProcess] = useState([]);
  const [assignedProcess, setAssignedProcess] = useState([]);
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  const [allProcess, setAllProcess] = useState({ data: [] });

  const [loading, setLoading] = useState(false);

  const initOwnedProcess = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("user_process_filter", "OWN_PROCESS");
      urlSearchParam.set("user_id", String(router.query._id));
      let apiRes = await henceforthApi.Process.processList(
        urlSearchParam.toString()
      );
      const newArray = apiRes.data.map((item: any) => ({
        title: item.title,
        type: `OWN_PROCESS`,
        process_id: item._id,
      }));
      setOwnedProcess(newArray);
    } catch (error) {}
  };
  const initAssignedProcess = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("user_process_filter", "ASSIGNED_PROCESS");
      urlSearchParam.set("user_id", String(router.query._id));
      let apiRes = await henceforthApi.Process.processList(
        urlSearchParam.toString()
      );
      const newArray = apiRes.data.map((item: any) => ({
        title: item.title,
        type: `ASSIGNED_PROCESS`,
        process_id: item.process_id,
      }));
      setAssignedProcess(newArray);
    } catch (error) {}
  };

  const initDataUser = async () => {
    debugger;
    try {
      let apiRes = await henceforthApi.Process.userList("ALL");
      setUser(apiRes?.data);
    } catch (error) {}
  };
  console.log(ownedProcess, "ownedProcess");
  console.log(assignedProcess, "assignedProcess");

  console.log(allProcess, "allProcessallProcess");

  const handleFinish = async (value: any, index: number) => {
    const data: any = allProcess.data;
    data[index].user_id = value._id;
    setAllProcess({
      ...allProcess,
      data,
    });
  };
  const handleFilter = async (value: any) => {
    console.log(value, "hhshhshshj");
    const updatedItems = allProcess.data.map((item: any) => ({
      process_id:item?.process_id,
      type:item?.type,
      user_id: value[item.process_id] || null, // Add user_id based on process_id, or null if not found
    }));
    const items = {
      ids: [String(router.query._id)],
      type: String(router.query.type).toUpperCase(),
    };
    const items2:any = {
      assigned_processes:updatedItems
    }
    if(router.query.type == "leave"){
      items2.type = "LEAVE"
    }else{
      items2.type = "NORMAL"
    }
    try {
      setLoading(true);

      await henceforthApi.Process.assignProcess(
        String(router.query._id),
        items2
      );
      await henceforthApi.Team.deleteDeactivate(items);
      router.replace(`/${userType}/teammates/page/all/1`);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    initAssignedProcess();
    initOwnedProcess();
    initDataUser();
  }, []);
  useEffect(() => {
    setAllProcess({ data: [...ownedProcess, ...assignedProcess] });
  }, [ownedProcess, assignedProcess]);

  return (
    <React.Fragment>
      <section className="process-1 py-2">
        <div className="container-fluid">
          <Row>
            <Col span={24} md={20} lg={18} xl={14} xxl={12}>
              <AntForm size="large" layout="vertical" onFinish={handleFilter}>
                {Array.isArray(allProcess?.data) &&
                  allProcess.data.map((res: any, index: number) => (
                    <FormItem
                      className="mb-4 pb-2"
                      name={res.process_id}
                      key={index}
                      label={
                        <TypographyTitle
                          level={5}
                          className="text-capitalize"
                        >
                          {res.title}
                        </TypographyTitle>
                      }
                      rules={[
                        {
                          message: "Please select user",
                          whitespace: true,
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select an employee"
                        suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                        onChange={(res) => handleFinish(res, index)}
                        options={
                          Array.isArray(user.data) &&
                          (user.data
                            .filter((x: any) => x._id !== router.query._id)
                            .map((resp: any) => {
                              return {
                                value: resp._id,
                                label: resp.first_name
                                  ? `${resp?.first_name} ${
                                      resp?.last_name ?? ""
                                    }`
                                  : resp?.email
                                  ? resp?.email
                                  : "N/A",
                              };
                            }) as any)
                        }
                      />
                    </FormItem>
                  ))}
                <Button
                  loading={loading}
                  htmlType="submit"
                  type="primary"
                  block
                >
                  Assign Process
                </Button>
              </AntForm>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
Process1.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Process1;