import ActivityCard from "@/components/ActivityCard";
import AlertCard from "@/components/AlertCard";
import MainLayout from "@/components/common/MainLayout";
import { GlobalContext } from "@/context/Provider";
import {
  Card,
  Col,
  Flex,
  Row,
  Space,
  Switch,
  Table,
  Tabs,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { TabsProps } from "antd";
import { useRouter } from "next/router";

import React, { ReactElement, useContext, useState } from "react";

const AlertActivity = () => {
  const router = useRouter()
  console.log(router.query,"notification query")
  const {Toast} =useContext(GlobalContext)
  const [notification, setNotification] = useState<any>({
    email_process_schedule: false,
    push_process_schedule: false,
    email_comment: false,
    push_comment: false,
    email_update: false,
    push_update: false,
    email_sharing: false,
    push_sharing: false,
    email_accept_decline: false,
    push_accept_decline: false,
    email_creation: false,
    push_creation: false,
    email_archive: false,
    push_archive: false,
    email_delete: false,
    push_delete: false,
    email_import_export: false,
    push_import_export: false,
    email_assigning_process: false,
    push_assigning_process: false,
    email_unassign_x_no_of_days: false,
    push_unassign_x_no_of_days: false,
  });
  const [notificationaSpace, setNotificationSpace] = useState<any>({
    email_new_dep_req: false,
    push_new_dep_req: false,
    email_new_dep_created: false,
    push_new_dep_created: false,
    email_dep_deleted: false,
    push_dep_deleted: false,
    email_new_member: false,
    push_new_member: false,
    email_deactivate_member: false,
    push_deactivate_member: false,
    email_delete_member: false,
    push_delete_member: false,
    email_new_team_admin: false,
    push_new_team_admin: false,
    email_new_comp_admin: false,
    push_new_comp_admin: false,
    email_new_system_added: false,
    push_new_system_added: false
  });
  const notificationList = [
    {
      label: "Process scheduled",
      key_email: "email_process_schedule",
      key_push: "push_process_schedule",
    },
    {
      label: "Comments",
      key_email: "email_comment",
      key_push: "push_comment",
    },
    {
      label: "Updates",
      key_email: "email_update",
      key_push: "push_update",
    },
    {
      label: "Sharing",
      key_email: "email_sharing",
      key_push: "push_sharing",
    },
    {
      label: "Accept/Decline",
      key_email: "email_accept_decline",
      key_push: "push_accept_decline",
    },
    {
      label: "Creation",
      key_email: "email_creation",
      key_push: "push_creation",
    },
    {
      label: "Archived",
      key_email: "email_archive",
      key_push: "push_archive",
    },
    {
      label: "Deleted",
      key_email: "email_delete",
      key_push: "push_delete",
    },
    {
      label: "Export/Import",
      key_email: "email_import_export",
      key_push: "push_import_export",
    },
    {
      label: "Assigned Process",
      key_email: "email_assigning_process",
      key_push: "push_assigning_process",
    },
    {
      label: "Unassigned for x no. of Days",
      key_email: "email_unassign_x_no_of_days",
      key_push: "push_unassign_x_no_of_days",
    },
  ];
  const spaceNotificationList = [
    {
      label: "New Department Request",
      key_email: "email_new_dep_req",
      key_push: "push_new_dep_req",
    },
    {
      label: "New Department Created",
      key_email: "email_new_dep_created",
      key_push: "push_new_dep_created",
    },
    {
      label: "Department Deleted",
      key_email: "email_dep_deleted",
      key_push: "push_dep_deleted",
    },
    {
      label: "New Member",
      key_email: "email_new_member",
      key_push: "push_new_member",
    },
    {
      label: "Deactivated Member",
      key_email: "email_deactivate_member",
      key_push: "push_deactivate_member",
    },
    {
      label: "Deleted Member",
      key_email: "email_delete_member",
      key_push: "push_delete_member",
    },
    {
      label: "New Team Admin",
      key_email: "email_new_team_admin",
      key_push: "push_new_team_admin",
    },
    {
      label: "New Company Admin",
      key_email: "email_new_comp_admin",
      key_push: "push_new_comp_admin",
    },
    {
      label: "New System Added",
      key_email: "email_new_system_added",
      key_push: "push_new_system_added",
    },
  ];

  const initData = async () => {
    try {
      let apiRes = await henceforthApi.User.notificationList(String(router.query.type).toUpperCase())
      if(router.query.type == "process"){
        setNotification(apiRes[0])
      }else{
        setNotificationSpace(apiRes[0])
      }
      console.log(apiRes, "apiressss");

    } catch (error) {

    }
  }

  const updateNotificationSetting = async (payload: any) => {
    try {
      let apiRes = await henceforthApi.User.notificationListUpdate(payload)
      if(router.query.type == "process"){
        setNotification(apiRes)
      }else{
        setNotificationSpace(apiRes)
      }
    } catch (error) {
      Toast.error(error)
    }
  }

  const handleChange = async (key: string, value: boolean, type: string) => {
    console.log(key, value, "valueueueu");
    // setNotification({
    //   ...notification,
    //   [key]: value
    // })
    if(router.query.type === "process"){
      await updateNotificationSetting({ ...notification, [key]: value, type: type })
    }else{
      await updateNotificationSetting({ ...notificationaSpace, [key]: value, type: type })
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "process",
      label: "Process Notification",
      children: (
        <div className="mt-4">
          <Row gutter={[20, 20]} justify={"end"} className="mb-2">
            <Col md={7} lg={6} xl={5} xxl={5}>
              <TypographyText type="secondary" className="text-nowrap">
                Email Notification
              </TypographyText>
            </Col>
            <Col md={7} lg={6} xl={5} xxl={5}>
              <TypographyText type="secondary" className="text-nowrap">
                Push Notification
              </TypographyText>
            </Col>
          </Row>
          <Space direction="vertical" className="w-100">
            {notificationList?.map((res, index) => (
              <Card
                key={index}
                className="common_card overflow-auto"
                bordered={false}
              >
                <Row gutter={[34, 20]} justify={"end"} wrap={false}>
                  <Col span={14} md={10} lg={12} xl={14} xxl={14}>
                    <TypographyText className="text-nowrap">
                      {res.label}
                    </TypographyText>
                  </Col>
                  <Col span={5} md={7} lg={6} xl={5} xxl={5}>
                    <Switch
                      size="small"
                      checked={notification[res.key_email]}
                      onChange={(value) =>
                        handleChange(res.key_email, value, "PROCESS")
                      }
                    />
                  </Col>
                  <Col span={5} md={7} lg={6} xl={5} xxl={5}>
                    <Switch
                      size="small"
                      checked={notification[res.key_push]}
                      onChange={(value) =>
                        handleChange(res.key_push, value, "PROCESS")
                      }
                    />
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </div>
      ),
    },
    {
      key: "space",
      label: "Space Notification",
      children: (
        <div className="mt-4">
          <Row gutter={[20, 20]} justify={"end"} className="mb-2">
            <Col md={7} lg={6} xl={5} xxl={5}>
              <TypographyText type="secondary" className="text-nowrap">
                Email Notification
              </TypographyText>
            </Col>
            <Col md={7} lg={6} xl={5} xxl={5}>
              <TypographyText type="secondary" className="text-nowrap">
                Push Notification
              </TypographyText>
            </Col>
          </Row>
          <Space direction="vertical" className="w-100">
            {spaceNotificationList?.map((res, index) => (
              <Card key={index} className="common_card" bordered={false}>
                <Row gutter={[34, 20]} justify={"end"} wrap={false}>
                  <Col span={14} md={10} lg={12} xl={14} xxl={14}>
                    <TypographyText className="text-nowrap">
                      {res.label}
                    </TypographyText>
                  </Col>
                  <Col span={5} md={7} lg={6} xl={5} xxl={5}>
                    <Switch size="small" checked={notificationaSpace[res.key_email]}
                      onChange={(value) =>
                        handleChange(res.key_email, value, "SPACE")
                      } />
                  </Col>
                  <Col span={5} md={7} lg={6} xl={5} xxl={5}>
                    <Switch size="small" checked={notificationaSpace[res.key_push]}
                      onChange={(value) =>
                        handleChange(res.key_push, value, "SPACE")
                      } />
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </div>
      ),
    },
  ];
  React.useEffect(() => {
    initData()
  }, [router.query.type])
  return (
    <React.Fragment>
      <section className="notification-setting">
        <div className="container-fluid">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <TypographyTitle className="m-0" level={4}>
                Notification Settings
              </TypographyTitle>
            </Col>
            <Col span={24}>
              <Tabs defaultActiveKey={String(router.query.type)} items={items} prefixCls="custom" onChange={(value) => router.replace({ pathname: router.pathname, query: { type: value } }, undefined, { shallow: true })} />
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
AlertActivity.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default AlertActivity;
