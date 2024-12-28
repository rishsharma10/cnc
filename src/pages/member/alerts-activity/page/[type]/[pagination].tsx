import ActivityCard from "@/components/ActivityCard";
import AlertCard from "@/components/AlertCard";
import MainLayout from "@/components/common/MainLayout";
import ProcessStatusUpdate from "@/components/modal/ProcessStatusUpdate";
import {
  Col,
  Empty,
  Pagination,
  Row,
  Spin,
  Tabs,
  TypographyTitle,
} from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { Form, TabsProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/Provider";

const AlertActivity = () => {
  const router = useRouter();
  const { userType } = useContext(GlobalContext);

  // Separate state for Alerts and Activities
  const [alertState, setAlertState] = useState({
    data: [],
    count: 0,
  });
  const [activityState, setActivityState] = useState({
    data: [],
    count: 0,
  });
  
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectId, setRejectedId] = useState("");

  const handleRoute = (value: any) => {
    if (router.query.type === "alert") {
      setAlertState({ data: [], count: 0 });
    } else {
      setActivityState({ data: [], count: 0 });
    }
    let old = router.query;
    router.push({
      query: { ...old, type: value },
    });
  };

  const handlePagination = (page: number, pageSize: number) => {
    if (router.query.type === "alert") {
      setAlertState({ data: [], count: 0 });
    } else {
      setActivityState({ data: [], count: 0 });
    }
    router.replace(
      {
        query: { ...router.query, pagination: page, limit: pageSize },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleStatusUpdate = async (value: any) => {
    const items = {
      type: "REJECTED",
      reason: value?.department,
    };
    try {
      setLoading(true);
      let apiRes = await henceforthApi.User.alertAccept(rejectId, items);
      await initData();
      form.resetFields();
      setOpenModal(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (res: any) => {
    try {
      await henceforthApi.Alert_Activity.markread(res._id, { _id: res._id, type: "one" });
      router.replace(
        res?.notification_type==="DEPARTMENT"
          ? `/${userType}/department/page/1?limit=12?read_all=true`
          :res?.notification_type==="PROCESS"?res?.process_id !== null ? `/${userType}/process/${res?.process_id}/details?read_all=true`
      :`/${userType}/teammates/page/all/1`:`/${userType}`)
    } catch (error) {
      console.error(error);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "alert",
      label: "Alerts",
      children: (
        <Row className="mt-4" gutter={[14, 14]}>
          {alertState.data.map((res: any, index: number) => (
            <Col key={index} span={24}>
              <AlertCard
                {...res}
                setOpenModal={setOpenModal}
                setRejectedId={setRejectedId}
                pos={true}
              />
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "activity",
      label: "Activity",
      children: (
        <Row className="mt-4" gutter={[14, 14]}>
          {activityState.data.map((res: any, index: number) => (
            <Col role="button" key={index} span={24} onClick={() => handleRead(res)}>
              <ActivityCard {...res} pos={true} />
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  // Fetch data based on the current tab (Alerts or Activity)
  const initData = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      if (router.query.type) {
        urlSearchParam.set("type", String(router.query.type).toUpperCase());
      }
      urlSearchParam.set("pagination", String(Number(router.query.pagination) - 1));
      urlSearchParam.set("limit", String(Number(router.query.limit) || 10));

      setLoading(true);
      let apiRes = await henceforthApi.Alert_Activity.listing(urlSearchParam.toString());

      if (router.query.type === "alert") {
        setAlertState(apiRes);
      } else {
        setActivityState(apiRes);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, [router.query.type, router.query.pagination]);

  return (
    <React.Fragment>
      <section className="alerts-activity">
        <Spin spinning={loading}>
          <div className="container-fluid">
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <TypographyTitle className="m-0" level={4}>
                  {router.query.type == "alert" ? "Alerts" : "Activities"}
                </TypographyTitle>
              </Col>
              <Col span={24}>
                <Tabs
                  defaultActiveKey={String(router.query.type)}
                  items={items}
                  prefixCls="custom"
                  onChange={handleRoute}
                />
              </Col>
              <Row justify={"center"} className="mt-4 mb-4 w-100">
                <Col span={24} className="text-center">
                  <Pagination
                    className="text-center"
                    current={Number(router.query.pagination) || 0}
                    pageSize={Number(router.query.limit) || 10}
                    total={router.query.type === "alert" ? alertState?.count : activityState?.count}
                    hideOnSinglePage={true}
                    disabled={loading}
                    onChange={handlePagination}
                  />
                </Col>
              </Row>
            {(!alertState?.data?.length && !activityState?.data?.length )?
            <Col span={24}><Empty description={`No ${router?.query?.type==="alert" ? "alerts":"activities"}`} ></Empty></Col>
            :""}
            </Row>
          </div>
        </Spin>
      </section>
      <ProcessStatusUpdate
        open={openModal}
        loading={loading}
        setOpen={setOpenModal}
        submit={handleStatusUpdate}
        form={form}
      />
    </React.Fragment>
  );
};

AlertActivity.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AlertActivity;
