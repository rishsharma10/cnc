import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Flex,
  FormItem,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  SelectOption,
  Space,
  Table,
  Tabs,
  TextArea,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { Form, Grid, Tooltip } from "antd";
import Link from "next/link";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import profile from "@/assets/images/profile.png";
import ProcessStatusUpdate from "@/components/modal/ProcessStatusUpdate";
import { capitalizeFirstLetter } from "@/utils/henceforthValidations";
import CountryCode from "@/utils/CountryCode.json";
import { TabsProps } from "antd/lib";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { COOKIES_USER_RAIZE_ACCESS_TOKEN } from "@/context/actionTypes";
import henceforthApi from "@/utils/henceforthApi";
import TimeSlot from "@/components/TimeSlots";
import { GlobalContext } from "@/context/Provider";
const View = (props: any) => {
  console.log(props, "propsppspspspspsp");
  const { Toast, userType, userInfo } = useContext(GlobalContext);
  henceforthApi.setToken(userInfo?.access_token);
  const [teamMateDetail, setTeamMateDetails] = useState(props as any);
  const router = useRouter();
  const [processList, setProcessList] = useState({
    data: [],
    count: 0,
    user_total_processes: 0,
  });
  const [teamList, setTeamList] = useState({
    data: [],
    count: 0,
  });
  const [processData, setProcessData] = useState({} as any);
  const [search, setSearch] = useState("");
  const [userAssignData, setUserAssignData] = useState({} as any);
  const [editModal, setEditModal] = useState(false);
  const [state, setState] = useState({
    data: [],
    conut: 0,
  });
  const [departmentList, setDepartmentList] = React.useState({
    count: 0,
    data: [],
  });
  const [commentModal, setCommentModal] = useState(false);
  const [reassignModal, setReassignModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const actions = (res: any) => [
    {
      key: "1",
      label: (
        <Link
          href={`/${userType}/process/${res?._id}/details`}
          className="fw-semibold"
        >
          View
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Button
          type="text"
          className="fw-semibold p-0 bg-transparent h-100"
          onClick={() => {
            setProcessData(res);
            setReassignModal(true);
          }}
        >
          Reassign
        </Button>
      ),
    },
  ];
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text: any, res: any, i: any) => {
        return router.query.process_page
          ? (Number(router.query.process_page) - 1) *
          Number(router.query.limit || 10) +
          (i + 1)
          : i + 1;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text: any, res: any, i: any) => {
        return res?.title;
      },
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: any, res: any, i: any) => {
        return dayjs(res?.created_at).format("DD-MM-YY");
      },
    },
    {
      title: "Updated on",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text: any, res: any, i: any) => {
        return dayjs(props?.updated_at).format("DD-MM-YY");
      },
    },
    {
      title: "Last Completed",
      dataIndex: "completed_at",
      key: "completed_at",
      render: (text: any, res: any, i: any) => {
        return res?.completed_at
          ? dayjs(res?.completed_at).format("DD-MM-YY")
          : "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, res: any, i: any) => {
        return res?.status;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, res: any, index: any) => {
        return (
          <Dropdown menu={{ items: actions(res) } as any}>
            <Button
              type="text"
              className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent"
              size="small"
            >
              <HenceforthIcons.MoreFill />
            </Button>
          </Dropdown>
        );
      },
    },
  ];
  const tabitems: TabsProps["items"] = [
    {
      key: "OWN_PROCESS",
      label: "Owned Process",
      children: (
        <div>
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={processList.data}
            columns={columns}
            className="mt-2"
          />
        </div>
      ),
    },
    {
      key: "SHARED_PROCESS",
      label: "Shared Process",
      children: (
        <div>
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={processList.data}
            columns={columns}
            className="mt-2"
          />
        </div>
      ),
    },
    {
      key: "ASSIGNED_PROCESS",
      label: "Assigned Process",
      children: (
        <div>
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={processList.data}
            columns={columns}
            className="mt-2"
          />
        </div>
      ),
    },
  ];

  const handleRoute = (value: any) => {
    let old = router.query;
    console.log("alala", value);
    router.push({
      query: { ...old, type: value },
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const char = String.fromCharCode(event.which);
    const regex = /^[A-Za-z\s]+$/;  
    // Prevent the character from being typed if it's not an alphabet
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  const membersColumns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text: any, res: any, i: any) => {
        return router.query.member_page
          ? (Number(router.query.member_page) - 1) *
          Number(router.query.limit || 10) +
          (i + 1)
          : i + 1;
      },
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text: any, res: any, i: any) => {
        return <>{res?.first_name || "N/A"}</>;
      },
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      render: (text: any, res: any, i: any) => {
        return <>{res?.last_name || "N/A"}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any, res: any, i: any) => {
        return res?.email;
      },
    },
    // {
    //     title: 'Process Created',
    //     dataIndex: 'process_created',
    //     key: 'process_created',
    //     render: (text: any, res: any, i: any) => {
    //         return (
    //             dayjs(res.created_at).format('DD-MM-YY')
    //         )
    //     }
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, res: any, i: any) => {
        return (
          <Link
            href={`/${userType}/teammates/${res._id}/view?type=${router.query.type}`}
            className="fw-semibold"
          >
            <Button
              type="text"
              className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent"
              size="small"
            >
              <EyeOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];
  const deleteDeactivateTeammates = async (type: any) => {
    let payload = {
      ids: [router.query._id],
      type: type,
    };
    try {
      console.log(payload);
      const apiRes = await henceforthApi.Team.deleteDeactivate(payload);
      console.log(apiRes);
      setTeamMateDetails({
        ...teamMateDetail,
        is_active: !teamMateDetail.is_active,
      });
      Toast.success(apiRes.message);
      setCommentModal(false);
      if (type == "DELETE") {
        router.replace(`/${userType}/teammates/page/all/1`);
      }
      // router.back()
    } catch (error) {
      Toast.error(error);
    }
  };

  const deleteWithoutAssign = async (type: any) => {
    let payload = {
      type: type,
    };
    try {
      console.log(payload);
      const apiRes = await henceforthApi.Team.deleteArchive(
        String(router.query._id),
        payload
      );
      router.replace(`/${userType}/teammates/page/all/1`);
      Toast.success(apiRes.message ?? "Updated sucessfully");
    } catch (error) {
      Toast.error(error);
    }
  };
  const handleProcessPagination = (page: number, pageSize: number) => {
    router.replace(
      {
        query: { ...router.query, process_page: page, limit: pageSize },
      },
      undefined,
      { shallow: true }
    );
  };
  const handleMemberPagination = (page: number, pageSize: number) => {
    router.replace(
      {
        query: { ...router.query, member_page: page, limit: pageSize },
      },
      undefined,
      { shallow: true }
    );
  };
  const getProcessData = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("user_id", String(router.query._id));
      urlSearchParam.set("user_process_filter", String(router.query.type));
      urlSearchParam.set(
        "pagination",
        String(Number(router.query.process_page) - 1)
      );
      urlSearchParam.set("limit", String(Number(router.query.limit) || 10));
      let apiRes = await henceforthApi.Process.processList(
        urlSearchParam.toString()
      );
      console.log(apiRes);
      setProcessList(apiRes);
    } catch (error) { }
  };
  const getTesmMembersData = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("user_id", String(router.query._id));
      urlSearchParam.set(
        "pagination",
        String(Number(router.query.member_page) - 1)
      );
      urlSearchParam.set("limit", String(10));
      let apiRes = await henceforthApi.Team.teammatesList(
        urlSearchParam.toString()
      );
      console.log(apiRes);
      setTeamList(apiRes?.data);
    } catch (error) { }
  };
  const getAllUsers = async () => {
    try {
      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("pagination", String(0));
      if (search) {
        urlSearchParam.set("search", String(search));
      }
      urlSearchParam.set("limit", String(10));
      urlSearchParam.set("filter", "ALL");
      let apiRes = await henceforthApi.Team.teammatesList(
        urlSearchParam.toString()
      );
      console.log("api res", apiRes);
      setState(apiRes?.data);
    } catch (error) { }
  };

  const getDepartment = async () => {
    try {
      let apiRes = await henceforthApi.Department.listing();
      setDepartmentList(apiRes);
    } catch (error) { }
  };

  const editTeammate = async (values: any) => {
    console.log(values);
    let payload = {
      name: values?.name,
      department_id: values?.department_id,
      country_code: String(values?.country_code),
      phone_no: String(values?.phone_no),
      user_role: values?.user_role,
    };
    console.log(payload);
    try {
      const apiRes = await henceforthApi.Team.editTeamMember(
        payload,
        router.query._id as string
      );
      console.log(apiRes);
      Toast.success(apiRes?.message);
      setTeamMateDetails(apiRes);
      setEditModal(false);
    } catch (error) {
      Toast.error(error);
    }
  };
  const [loading, setLoading] = useState(false)
const [loadingAccept, setLoadingAccept] = useState(false)

  const handleApproveLeave = async () => {
    let payload = {
        type: "LEAVE",
      };
      setLoadingAccept(true)
      try {
        console.log(payload);
        const apiRes = await henceforthApi.Team.deleteArchive(
          String(router.query._id),
          payload
        );
        await henceforthApi.Alert_Activity.deleteAlert(String(router.query.alert_id),{})
        router.replace(`/${userType}`);
        setLeaveModal(false)
        Toast.success(apiRes.message ?? "Approved sucessfully");
      } catch (error) {
        setLoadingAccept(false)
        Toast.error(error);
      }
    };
    
    const handleStatusUpdate = async (value: any) => {
      debugger;
      console.log(value, "valuesvalues");
      const items = {
        type: "REJECTED",
        reason: value?.department,
      };
      try {
        setLoading(true)
      
        let apiRes = await henceforthApi.User.alertAccept(
          String(router.query.alert_id),
          items
        );
        await henceforthApi.Alert_Activity.deleteAlert(
          String(router.query.alert_id),
          {}
        );
        router.replace(`/${userType}`);
        
        Toast.success("Leave Rejected");
        form.resetFields();
      } catch (error) {
      
        Toast.error(error);
      }finally{
        setOpenModal(false);
        setLoading(false);
      }
    };

  const assignProcess = async () => {
    try {
      let payload = {
        assigned_processes: [
          {
            process_id: processData?._id,
            user_id: userAssignData._id,
            type: router.query.type,
          },
        ],
      };
      const apiRes = await henceforthApi.Process.assignProcess(
        router.query._id,
        payload
      );
      console.log(apiRes);
      Toast.success(apiRes.message);
      setReassignModal(false);
      getProcessData();
    } catch (error) {
      Toast.error(error);
    }
  };
  console.log(teamMateDetail, "teamMateDetailteamMateDetail");

  useEffect(() => {
    getProcessData();
  }, [router.query.type, router.query.process_page]);

  useEffect(() => {
    getTesmMembersData();
  }, [router.query.member_page]);
  useEffect(() => {
    getDepartment();
    console.log(teamMateDetail);
    form.setFieldValue("name", teamMateDetail?.name);
    form.setFieldValue("country_code", teamMateDetail?.country_code);
    form.setFieldValue("user_role", teamMateDetail?.role);
    form.setFieldValue("department_id", teamMateDetail?.department_id?._id);
    form.setFieldValue("phone_no", teamMateDetail?.phone_no);
  }, []);
  useEffect(() => {
    getAllUsers();
  }, [search]);
  const screens = Grid.useBreakpoint();
  const length = screens.xxl ? 25 :screens?.md ? 10 : screens.sm ? 10 : 10
  return (
    <React.Fragment>
      <section className="teammates_detail">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify={"space-between"} align={"middle"}>
            <Col span={24}>
              <TypographyTitle level={4}>Team Admin Details</TypographyTitle>
            </Col>
            <Col span={24} lg={14} xl={12} xxl={12}>
              <Flex gap={20}>
                <Avatar
                  src={henceforthApi.FILES.imageOriginal(
                    teamMateDetail?.profile_pic,
                    profile.src
                  )}
                  size={128}
                />
                <ul className="list-unstyled p-0 m-0">
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16 text-capitalize">
                      Name:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {teamMateDetail?.name?.length>20?teamMateDetail.name.slice(0,20)+"...":teamMateDetail?.name || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Email:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {teamMateDetail?.email || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Phone no:
                    </TypographyText>
                    <TypographyText className="fw-medium fs-16">
                      {teamMateDetail?.country_code}{" "}
                      {teamMateDetail?.phone_no || "N/A"}
                    </TypographyText>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Department:
                    </TypographyText>
                    <Tooltip title={teamMateDetail?.department_id?.title}>
                    <TypographyText className="fw-medium fs-16" >
                      {teamMateDetail?.department_id?.title?.length > length ? `${teamMateDetail?.department_id?.title?.slice(0,length)}...` :teamMateDetail?.department_id?.title}
                    </TypographyText>
                    </Tooltip>
                  </li>
                  <li className="d-flex align-items-center gap-3 mb-2">
                    <TypographyText type="secondary" className="fs-16">
                      Role:
                    </TypographyText>
                    {/* <Dropdown menu={{ items: action }} > */}
                    <TypographyText className="fw-medium fs-16">
                      {capitalizeFirstLetter(teamMateDetail?.role)}
                    </TypographyText>
                    {/* </Dropdown> */}
                  </li>
                </ul>
              </Flex>
            </Col>
            {router.query.leave_type == "leave" ? <Col span={24} lg={10} xl={10} xxl={8}>
                   <TimeSlot/>
                   <Flex gap={10}>
                   <Button className="btn-secondary" onClick={() => {
                                        setLeaveModal(true);
                                    }
                                    } size="large" block>{`Approve Leave`}</Button> <Button
                                    className="btn-secondary"
                                    onClick={() => setOpenModal(true)}
                                    
                                    size="large"
                                    block
                                  >{`Reject Leave`}</Button></Flex></Col>   :
            <Col span={24} lg={10} xl={10} xxl={8}>
              <Space direction="vertical" className="w-100">
                <Button
                  type="primary"
                  onClick={() => {
                    setEditModal(true);
                  }}
                  ghost
                  className="bg-white place-items"
                  size="large"
                  block
                  icon={<HenceforthIcons.Pencil color />}
                >
                  Edit
                </Button>
                <Flex gap={8}>
                  <Button
                    className="btn-secondary"
                    onClick={() => {
                      setCommentModal(true);
                      router.replace(
                        {
                          query: { ...router.query, dl_type: teamMateDetail?.is_active ? "deactivate" : "activate" },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    size="large"
                    block
                  >
                    {teamMateDetail?.is_active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    onClick={() => {
                      setCommentModal(true);
                      router.replace(
                        {
                          query: { ...router.query, dl_type: "delete" },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                    size="large"
                    block
                  >
                    Delete
                  </Button>
                </Flex>
                <Link
                  href={`/${userType}/privilege/page/1?search=${teamMateDetail?.name ?? teamMateDetail?.email}`}
                >
                  <Button
                    type="primary"
                    className="bg-white place-items gap-1"
                    size="large"
                    block
                  >
                    Privileges{" "}
                    <span>
                      <HenceforthIcons.ChevronRight color />
                    </span>
                  </Button>
                </Link>
              </Space>
            </Col>}
          </Row>

          {/* process table */}
          <Row className="mt-4">
            <Col span={24}>
              <Flex align="center" gap={20} justify="space-between">
                <TypographyTitle level={5} className="m-0">
                  Process
                </TypographyTitle>
                {/* {processList?.data?.length > 5 && <Link href={`/teammates/${router.query._id}/1/all`} className="text-primary place-items gap-1">View All <HenceforthIcons.ChevronRightPrimary /></Link>} */}
              </Flex>
            </Col>
            <Col span={24}>
              <Tabs
                onChange={handleRoute}
                defaultActiveKey={String(router.query.type)}
                items={tabitems}
              />
            </Col>
            <Row justify={"center"} className="mt-4 mb-4">
              <Col span={24} className="text-center">
                <Pagination
                  current={Number(router.query.process_page)}
                  pageSize={Number(router.query.limit) || 10}
                  total={processList?.count}
                  hideOnSinglePage={true}
                  onChange={handleProcessPagination}
                />
              </Col>
            </Row>
          </Row>
          {/* Team members table */}
          <Row className="mt-5" gutter={[20, 20]}>
            <Col span={24}>
              <Flex align="center" gap={20} justify="space-between">
                <TypographyTitle level={5} className="m-0">
                  Team Members
                </TypographyTitle>
                {/* {teamList?.data?.length > 5 && <Link href={'#'} className="text-primary place-items gap-1">View All <HenceforthIcons.ChevronRightPrimary /></Link>} */}
              </Flex>
            </Col>
            <Col span={24}>
              <Table
                scroll={{ x: "100%" }}
                pagination={false}
                dataSource={teamList?.data}
                columns={membersColumns}
              />
            </Col>
          </Row>
          <Row justify={"center"} className="mt-4 mb-4">
            <Col span={24} className="text-center">
              <Pagination
                current={Number(router.query.member_page)}
                pageSize={Number(router.query.limit) || 10}
                total={teamList?.count}
                hideOnSinglePage={true}
                onChange={handleMemberPagination}
              />
            </Col>
          </Row>
        </div>
      </section>


{/* Leave Modal */}
<Modal
                title={<TypographyTitle level={5} className="m-0 text-center">Approve Leave</TypographyTitle>}
                centered
                maskClosable={false}
                footer={null}
                open={leaveModal}
                onOk={() => setLeaveModal(false)}
                onCancel={() => setLeaveModal(false)}
            >
                <>
                    {(processList?.user_total_processes != 0) ?
                        <div className="modal_content">
                            <TypographyText type="secondary" className="d-block mb-4 text-center">{props?.name ?? props?.email} {processList?.user_total_processes} process , please assign these task to someone else before approving leave.</TypographyText>
                            <Row gutter={[0,12]}>
                                <Flex justify="between" gap={10} className="w-100">
                                <Button href={`/${userType}/teammates/${router.query._id}/assign/process?type=leave&alert_id=${router.query.alert_id}`} type="primary" size="large" block>Assign Process</Button>
                                {/* <Button type="primary" onClick={() => {
                                    deleteWithoutAssign('DELETE')
                                }} size="large" ghost block>Delete</Button>
                                <Button type="primary" onClick={() => {
                                    deleteWithoutAssign('ARCHIVE')
                                }} size="large" ghost block>Archive</Button> */}
                                <Button type="primary"  onClick={() => setLeaveModal(false)} size="large" ghost block>Close</Button>
                                </Flex>
                            </Row>
                        </div> :
                        <div>
                            <div className="modal_content">
                                <TypographyTitle level={5} type="secondary" className="d-block mb-4 text-center">Are you sure you want to Approve this Leave</TypographyTitle>
                                <Flex gap={10} className="w-100">
                                    <Button type="primary" onClick={() => setLeaveModal(false)} size="large" ghost block>Cancel</Button>
                                    <Button type="primary" onClick={handleApproveLeave} loading={loadingAccept} size="large"  block>Confirm</Button>
                                </Flex>
                            </div>
                        </div>
                    }
                </>
            </Modal>
      {/* comment modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            {processList?.user_total_processes === 0 ? String(router.query.dl_type)?.slice(0, 1).toUpperCase() + String(router.query?.dl_type).slice(1) + " " + " User" : "Assign Process"}
          </TypographyTitle>
        }
        centered
        footer={null}
        open={commentModal}
        onOk={() => setCommentModal(false)}
        onCancel={() => setCommentModal(false)}
      >
        <>
          {processList?.user_total_processes != 0 ? (
            <div className="modal_content">
              <TypographyText
                type="secondary"
                className="d-block mb-4 text-center"
              >
                {props?.name ?? props?.email}{", "}
                {processList?.user_total_processes} process , please assign
                these task to someone else before{" "}
                {router.query.dl_type == "deactivate" ? "deactivate" : "delete"}{" "}
                .
              </TypographyText>
              {/* <Flex gap={3}>
                                <Button href={`/teammates/${router.query._id}/assign/process?type=${router.query.dl_type == 'deactivate' ? 'deactivate' : 'delete'}`} type="primary" size="large" block>Assign Process</Button>
                                <Button type="primary" onClick={() => {
                                    setCommentModal(false)
                                }} size="large" ghost block>Close</Button>
                            </Flex> */}
              <Row gutter={[0, 12]}>
                <Button
                  href={`/${userType}/teammates/${router.query._id
                    }/assign/process?type=${router.query.dl_type == "deactivate"
                      ? "deactivate"
                      : "delete"
                    }`}
                  type="primary"
                  size="large"
                  block
                >
                  Assign Process
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    deleteWithoutAssign("DELETE");
                  }}
                  size="large"
                  ghost
                  block
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    deleteWithoutAssign("ARCHIVE");
                  }}
                  size="large"
                  ghost
                  block
                >
                  Archive
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setCommentModal(false);
                  }}
                  size="large"
                  ghost
                  block
                >
                  Close
                </Button>
              </Row>
            </div>
          ) : (
            <div>
              <div className="modal_content">
                <TypographyTitle
                  level={5}
                  type="secondary"
                  className="d-block mb-4 text-center"
                >
                  Are you sure you want to{" "}
                  {router.query.dl_type !== "delete"
                    ? teamMateDetail?.is_active
                      ? "deactivate"
                      : "activate"
                    : "delete"}{" "}
                  this user
                </TypographyTitle>
                <Flex gap={2} className="w-100">
                  <Button
                    type="primary"
                    onClick={() => setCommentModal(false)}
                    size="large"
                    ghost
                    block
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      deleteDeactivateTeammates(
                        router.query.dl_type == "deactivate"
                          ? "DEACTIVATE" : router.query.dl_type == "activate" ? "DEACTIVATE"
                            : "DELETE"
                      )
                    }
                    size="large"
                    block
                  >
                    Confirm
                  </Button>
                </Flex>
              </div>
            </div>
          )}
        </>
      </Modal>
      {/* Decline Reason modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Select Owner
          </TypographyTitle>
        }
        centered
        footer={null}
        open={reassignModal}
        onOk={() => setReassignModal(false)}
        onCancel={() => setReassignModal(false)}
      >
        <AntForm size="large">
          <TypographyText type="secondary" className="text-center mb-4 d-block">
            Please select the owner of the {props?.name}&apos;s processes.
          </TypographyText>
          <FormItem className="mb-5">
            <Select
              size="large"
              placeholder="Select email"
              onChange={(value: any) => {
                const selectedItem = state?.data?.find(
                  (res: any) => res?.email === value
                );
                setUserAssignData(selectedItem);
                console.log(selectedItem);
              }}
              showSearch={true}
              style={{ width: "100%" }}
              options={state?.data?.map((res: any) => ({
                value: res?.email,
                label: res?.email,
              }))}
            />
          </FormItem>
          <Button
            onClick={() => {
              assignProcess();
            }}
            type="primary"
            block
          >
            Submit
          </Button>
        </AntForm>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Edit Team mate
          </TypographyTitle>
        }
        centered
        footer={null}
        prefixCls="edit-modal"
        open={editModal}
        onOk={() => setEditModal(false)}
        onCancel={() => setEditModal(false)}
      >
        <AntForm
          onFinish={editTeammate}
          requiredMark={false}
          form={form}
          layout="vertical"
          size="large"
        >
          {/* <TypographyText type="secondary" className="text-center mb-4 d-block">Please select the owner of the Johny&apos;s processes.</TypographyText> */}
          <FormItem
            name="name"
            className="m-0"
            rules={[{ required: true, message: "Please enter name" }]}
            label={"Name"}
          >
             <Input placeholder="Name" maxLength={30}  onKeyPress={handleKeyPress} />
          </FormItem>
          <FormItem
            className="m-0"
            label={"Country Code"}
            name={"country_code"}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please select country code",
              },
            ]}
          >
            <Select
              placeholder={"Select country code"}
              allowClear
              className=""
              showSearch
            >
              {CountryCode.map((res: any, index: number) => {
                return (
                  <SelectOption key={index} value={res?.dial_code}>
                    <Flex align="center" gap={6}>
                      {res.flag}
                      <TypographyText className="fw-semibold fs-12">
                        {res?.dial_code}
                      </TypographyText>
                    </Flex>
                  </SelectOption>
                );
              })}
            </Select>
          </FormItem>
          <FormItem
            className="m-0"
            label="Phone Number"
            name={`phone_no`}
            rules={[
              {
                required: true,
                message: "Please enter phone number",
              },
              () => ({
                validator(_, value) {
                  if (value) {
                    if (isNaN(value)) {
                      return Promise.reject("Please enter valid phone number");
                    }
                    if (value.length > 12) {
                      return Promise.reject("Please enter valid phone number");
                    }
                    if (value.length < 9) {
                      return Promise.reject("Please enter valid phone number");
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Input placeholder="Enter phone number" />
          </FormItem>
          <FormItem
            className="m-0"
            label={"Department"}
            name="department_id"
            rules={[
              {
                message: "Please select department",
                whitespace: true,
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select department"
              suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
              options={
                Array.isArray(departmentList.data) &&
                (departmentList.data.map((res: any) => {
                  return {
                    value: res._id,
                    label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                  };
                }) as any)
              }
            />
          </FormItem>
          {/* Role */}
          <FormItem
            className="mb-3"
            label={"Role"}
            name="user_role"
            rules={[
              {
                message: "Please select Role",
                whitespace: true,
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Role"
              suffixIcon={<HenceforthIcons.ChevronDownBlack />}
              options={[
                // { value: "COMPANY_ADMIN", label: "Company Admin" },
                //{ value: "TEAM_ADMIN", label: "Team Admin" },
                { value: "MEMBER", label: "Member" },
              ]}
            />
          </FormItem>
          <Button htmlType="submit" type="primary" block>
            Save Changes
          </Button>
        </AntForm>
      </Modal>
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
View.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    console.log(context, "context");
    let cookies = context.req.cookies;
    console.log(
      cookies["COOKIES_ADMIN_RAIZE_ACCESS_TOKEN"],
      "cookiesCOOKIES_USER_RAIZE_ACCESS_TOKEN"
    );
    // const accessToken = parseCookies(context.req.cookies)[COOKIES_USER_RAIZE_ACCESS_TOKEN]
    if (cookies["COOKIES_ADMIN_RAIZE_ACCESS_TOKEN"]) {
      henceforthApi.setToken(cookies[COOKIES_USER_RAIZE_ACCESS_TOKEN]);
    }
    const apiRes = await henceforthApi.Team.teamMateDetails(
      context.query._id as string
    );
    console.log(apiRes, "apiiiiiiiii");

    return { props: { ...apiRes } };
  } catch (error) {
    return {
      props: {
        storeDetail: null,
        error: "Failed to fetch company detail",
      },
    };
  }
};
export default View;
