import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import dayjs from "dayjs";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Flex,
  Input,
  Row,
  Select,
  Table,
  Tabs,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { Form, MenuProps, Pagination, TabsProps } from "antd";
import React, { ReactElement, useContext, useState } from "react";
import profile from "@/assets/images/profile.png";
import Link from "next/link";
import AddDepartmentModal from "@/components/modal/AddDepartmentModal";
import henceforthApi from "@/utils/henceforthApi";
import { GlobalContext } from "@/context/Provider";
import RequestDepartmentModal from "@/components/modal/RequestDepartmentModal";
import { useRouter } from "next/router";
import henceforthValidations from "@/utils/henceforthValidations";
import { useForm } from "antd/es/form/Form";
import EditDepartmentModal from "@/components/modal/EditDepartmentModal";
import { Popconfirm } from "antd/lib";
const TeammatePage = () => {
  const { Toast, userType,userInfo } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [modalEdit, setModalEdit] = useState<any>({});
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const router = useRouter();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form3] = Form.useForm();
  const departmentData = [
    {
      image: <HenceforthIcons.Accounting />,
      text: "Accounting",
      link: "/department/1/view",
    },
    {
      image: <HenceforthIcons.Hr />,
      text: "HR",
    },
    {
      image: <HenceforthIcons.Operation />,
      text: "Operation",
    },
    {
      image: <HenceforthIcons.BusinessDevelopment />,
      text: "Business Development",
    },
    {
      image: <HenceforthIcons.Design />,
      text: "Design",
    },
    {
      image: <HenceforthIcons.Marketing />,
      text: "Marketing",
    },
    {
      image: <HenceforthIcons.Management />,
      text: "Management",
    },
    {
      image: <HenceforthIcons.ResearchDevelopment />,
      text: "Research & Development",
    },
    {
      image: <HenceforthIcons.InformationTech />,
      text: "Information Technology",
    },
    {
      image: <HenceforthIcons.Legal />,
      text: "Legals",
    },
    {
      image: <HenceforthIcons.CustomerSupport />,
      text: "Customer Support",
    },
  ];
  const initData = async () => {
    try {
      setLoading(true)
      let urlSearchParam = new URLSearchParams();

      urlSearchParam.set("type", "ADDED");

      if (router.query.pagination) {
        urlSearchParam.set(
          "pagination",
          (Number(router.query.pagination) - 1).toString()
        );
      } else {
        urlSearchParam.set("pagination", "1");
      }
      // if (router.query.limit) {
      urlSearchParam.set("limit", String(Number(router.query.limit) || 12));
      // }
      let apiRes = await henceforthApi.Department.listing(
        urlSearchParam.toString()
      );
      setState(apiRes);
    } catch (error) {

    } finally {
      setLoading(false)
    }
  };
  const [state, setState] = useState({
    count: 0,
    data: [],
  });

  const handleSubmitModal = async (values: any) => {
    console.log(values, "valuesss");
    const items = {
      title: values?.department,
      image: "string",
    };
    try {
      setLoading(true);

      let apiRes = await henceforthApi.Department.request(items);
      form.resetFields();
      setOpenRequestModal(false);
      Toast.success(apiRes?.success)
      await initData();
    } catch (error: any) {
      Toast.error(error);
    } finally {
      form3.resetFields()
      setLoading(false);
    }
  };
  const handleSubmitModalEdit = async (values: any) => {
    console.log(values, "valuesss");
    const items = {
      title: values?.department,
      image: "string",
    };
    try {
      setLoading(true);
      let apiRes = await henceforthApi.Department.edit(items, modalEdit._id);
      form1.resetFields();
      setOpenModalEdit(false);
      Toast.success("Department edit successfully")
      await initData();
    } catch (error: any) {
      Toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      let apiRes = await henceforthApi.Department.delete(id);
      await initData();
      Toast.success("Deleted successfully");
    } catch (error) {
      Toast.error(error);
    }
  };

  const handleRoute = (value: string) => {
    router.replace(
      {
        query: { ...router.query, type: value },
      },
      undefined,
      { shallow: true }
    );
  };

  const items2: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="text-dark p-0 h-100 text-start bg-transparent"
        >
          Team Admin
        </Button>
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
          className="text-dark p-0 h-100 text-start bg-transparent"
        >
          Company Admin
        </Button>
      ),
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Requested by",
      dataIndex: "requestedBy",
      key: "requestedBy",
    },
    {
      title: (
        <Dropdown menu={{ items: items2 }}>
          <Button
            type="text"
            className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent"
            size="small"
          >
            Role <HenceforthIcons.ChevronDownBlack color />
          </Button>
        </Dropdown>
      ),
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Requested on",
      dataIndex: "requestedOn",
      key: "requestedOn",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const handler = async (id: string, str: string) => {
    try {
      let apires = await henceforthApi.Department.requestpatch(id, {
        type: str,
      });
      await initData();
    } catch (error) {
      Toast.error(error)
    }
  };
  const actionItem = (id: string): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="p-0 h-100"
          onClick={() => handler(id, "ACCEPT")}
        >
          Accept
        </Button>
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
          className="p-0 h-100 text-danger"
          onClick={() => handler(id, "REJECT")}
        >
          Reject
        </Button>
      ),
    },
  ];
  const dataSource = state.data.map((res: any, index: number) => {
    return {
      key: index + 1 + (Number(router.query.pagination) - 1) * 10,
      departmentName: henceforthValidations.capitalizeFirstLetter(res.title),
      requestedBy: res.creator_id.name,
      role: String(
        henceforthValidations.capitalizeFirstLetter(res.creator_id.role)
      ),
      requestedOn: dayjs(res.created_at).format("MMM DD, YYYY"),
      action: (
        <Dropdown menu={{ items: actionItem(res._id) }} placement="bottomLeft">
          <Button type="text" className="p-0 h-100">
            <HenceforthIcons.MoreFill />
          </Button>
        </Dropdown>
      ),
    };
  });

  const items: TabsProps["items"] = [
    {
      key: "added",
      label: "Added Departments",
      children: (
        <div className="tab_content">
          <Row gutter={[4, 4]}>
            {Array.isArray(state?.data) &&
              state?.data?.map((res: any, index) => (
                <Col
                  onMouseOver={() => setSelectedDepartment(res?._id)}
                  key={res._id}
                  span={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                  xxl={6}
                >
                  <Button
                    //   type="default"
                    block
                    className={
                      res._id === selectedDepartment
                        ? "add_department_btn department_btn active"
                        : "department_btn add_department_btn"
                    }
                  >
                    <Flex className={res._id == selectedDepartment ? "" : "d-none"} >
                      <Button
                        onClick={() => {
                          setOpenModalEdit(true);
                          setModalEdit(res);
                          form1.setFieldValue("department", res?.title);
                        }}
                        type="text"
                        shape="circle"
                      >
                        <HenceforthIcons.EditFill />
                      </Button>

                      <Popconfirm
                        title="Delete Department"
                        onConfirm={() => handleDelete(res._id)}
                        description="Are you sure you want to delete this Department?"
                      >
                        {/* <Button className="btn-0 border-0 p-0 text-start"><HenceforthIcons.Delete /></Button> */}
                        <Button type="text" shape="circle">
                          {<HenceforthIcons.Delete />}
                        </Button>
                      </Popconfirm>
                    </Flex>
                    <HenceforthIcons.CustomerSupport />
                    {res.title}
                  </Button>
                </Col>
              ))}
          </Row>
        </div>
      ),
    },
    {
      key: "requested",
      label: "Requested Departments",
      children: (
        <div className="tab_content">
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      ),
    },
  ];
  console.log(modalEdit, "modaledititi");

  const handlePagination = (page: number, pageSize: number) => {
    router.replace(
      {
        query: { ...router.query, pagination: page, limit: pageSize },
      },
      undefined,
      { shallow: true }
    );
  };

  React.useEffect(() => {
    initData();
    // router.replace(
    //   {
    //     query: { ...router.query, pagination: 1, limit: 12 },
    //   },
    //   undefined,
    //   { shallow: true }
    // );
  }, [router.query.type, router.query.pagination]);

  // React.useEffect(() => {
  //   initData();
  // }, [router.query.pagination]);
  return (
    <React.Fragment>
      <section className="department">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24}>
              <div className="auth_page">
                {/* title */}
                <Flex
                  align="center"
                  justify="space-between"
                  gap={10}
                  className="title mb-4 pb-2"
                >
                  <TypographyTitle level={4}>Departments</TypographyTitle>
                  {/* {userType == "admin" ? (
                    router.query.type === "added" ? (
                      <Button
                        onClick={() => setOpenModal(true)}
                        type="primary"
                        className="place-items"
                        icon={<HenceforthIcons.Plus />}
                      >
                        Add New Department
                      </Button>
                    ) : null
                  ) : ( */}
                    {/* {userInfo?.dep_req_access && <Button
                      onClick={() => setOpenRequestModal(true)}
                      type="primary"
                      className="place-items"
                      icon={<HenceforthIcons.Plus />}
                    >
                      Request New Department
                    </Button>}   */}
                  {/* // )} */}

                </Flex>

                <Col span={24}>
                  <div className="tab_content">
                    <Row gutter={[12, 12]}>
                      {Array.isArray(state?.data) &&
                        state?.data?.map((res: any, index) => (
                          <Col
                            onMouseOver={() => setSelectedDepartment(res?._id)}
                            key={res._id}
                            span={24}
                            sm={12}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={6}
                          >
                            <Button
                              //   type="default"
                              block
                              className={
                                res._id === selectedDepartment
                                  ? "add_department_btn department_btn active position-relative shadow-sm"
                                  : "department_btn add_department_btn position-relative shadow-sm"
                              }
                            >
                              <Flex className={"position-absolute top-0 end-0 mt-2 me-3"} align="center" >
                                {/* <Button
                                  onClick={() => {
                                    setOpenModalEdit(true);
                                    setModalEdit(res);
                                    form1.setFieldValue("department", res?.title);
                                  }}
                                  type="text"
                                  shape="circle"
                                >
                                  <HenceforthIcons.EditFill />
                                </Button> */}

                                <Popconfirm
                                  title="Delete Department"
                                  onConfirm={() => handleDelete(res._id)}
                                  description="Are you sure you want to delete this Department?"
                                >
                                  {/* <Button className="btn-0 border-0 p-0 text-start"><HenceforthIcons.Delete /></Button> */}
                                 {userInfo?.dep_delete_access && <Button type="primary" className="d-flex p-0 align-items-center justify-content-center" style={{height:24, width:24, borderRadius:'50%'}}>
                                    <HenceforthIcons.Delete />
                                  </Button>}
                                </Popconfirm>
                              </Flex>
                              <TypographyTitle level={2} className="m-0 department-name" >{String(res?.title).charAt(0)}</TypographyTitle>
                              {res.title?.length>30?res.title.slice(0,30)+"...":res.title}
                            </Button>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </Col>
                <Col span={24} className="text-center mt-2">
                  <Pagination
                    current={Number(router.query.pagination) || 0}
                    pageSize={Number(router.query.limit) || 12}
                    total={state?.count}
                    hideOnSinglePage={true}
                    disabled={loading}
                    onChange={handlePagination}
                  />
                </Col>
              </div>
            </Col>
          </Row>
        </div>

        <AddDepartmentModal
          open={openModal}
          setOpen={setOpenModal}
          submit={handleSubmitModal}
          loading={loading}
          form={form}
        />
        <EditDepartmentModal
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          submit={handleSubmitModalEdit}
          loading={loading}
          form={form1}
        />
        <RequestDepartmentModal
          open={openRequestModal}
          setOpen={setOpenRequestModal}
          submit={handleSubmitModal}
          loading={loading}
          form={form3}
        />
      </section>
    </React.Fragment>
  );
};
TeammatePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TeammatePage;
