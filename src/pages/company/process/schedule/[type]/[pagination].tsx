import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Flex,
  FormItem,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
  Tabs,
  TextArea,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { MenuProps, Spin, TabsProps, Form,Tooltip  } from "antd";

// import dateFormat from "@/utils/dateformatter";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import profile from "@/assets/images/profile.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import { getMetadata } from "video-metadata-thumbnails";
import { getRoleForUrl } from "@/utils/henceforthValidations";
import AssignProcessModal from "@/components/modal/AssignProcessModal";
import { useDebounce } from "@/utils/CommonFunction";
import { Popconfirm } from "antd/lib";

const ProcessPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  let query = router.query;
  const { Toast,userType } = useContext(GlobalContext);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [state, setState] = useState({
    data: [] as any,
    counts: 0,
  });
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  const [processId, setProcessId] = useState("");
  const [loading, setLoading] = useState(false);
  const deleteProcess = async (_id: string) => {
    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.delete(String(_id));
      await initData();
    } catch (error) {
      Toast.error(error);
      setLoading(false);
    } finally {
    }
  };
  const initDataUser = async () => {
    try {
      let apiRes = await henceforthApi.Process.userList("ALL");
      setUser(apiRes?.data);
    } catch (error) {}
  };
  const handleAssignProcessToMe = async (_id: string) => {
    setLoading(true);
    const payload = {
      process_id: _id,
      assign_type: "to_myself",
    };
    try {
      const apiRes = await henceforthApi.Process.assign(payload);
      router.replace(`/process/add?step=1&pid=${apiRes?._id}`);
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };

  let allIds: any =
    Array.isArray(state.data) &&
    state.data
      .filter((res: any) => res.is_delete_temp)
      ?.map((item: any) => item._id);
  const handleBulkDelete = async () => {
    debugger
    const item = {
      type:router.query.type == "deleted" ? "RESTORE" :"DELETE",
      process_ids: allIds,
    };
    try {
      let apiRes = await henceforthApi.Process.deleteMultiple(item);
      Toast.success(`${router.query.type == "deleted" ? "Restore" : "Deleted"} successfully`)
      await initData();
    } catch (error) {
      Toast.error(error)
    }
  };


  const handleSelectAllDelete = async () => {
    try {
      const updatedData = state.data.map((item:any) => ({
        ...item,
        is_delete_temp:router.query.type == "deleted" ? true :true // Add the new key here
    }));
    setState({
      ...state,
      data:updatedData
    });
    } catch (error) {
    }
  }
  const handleAssignProcessToSomeOneElse = async (value: any) => {
    setLoading(true);
    const payload = {
      process_id: processId,
      assign_type: "to_someone",
      assign_to: value?.assign_to,
    };
    try {
      const apiRes = await henceforthApi.Process.assign(payload);
      form.resetFields();
      setShareModalOpen(false);
      router.replace(`/${userType}/process/add?step=1&pid=${apiRes?._id}`);
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };
  const handleForwardMsg = async (
    checked: boolean,
    index: number,
    res: any
  ) => {
    debugger;
    if (checked) {
      const data = state.data;
      data[index].is_delete_temp = true;
      setState({
        ...state,
        data,
      });
    } else {
      const data = state.data;
      data[index].is_delete_temp = false;
      setState({
        ...state,
        data,
      });
    }
    // await initData();
  };
  const itemsRes = (res: any) => [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between"
          onClick={() => router.push(`/${userType}/process/${res._id}/details`)}
        >
          <TypographyText className="ms-2 fw-semibold">View</TypographyText>
        </Button>
      ),
    },
    // {
    //   type: "divider",
    // },
    // {
    //   key: "2",
    //   label: (
    //     <Button type="text" className="d-flex align-items-center justify-content-between" onClick={() => setShowEditor(true)}>
    //       <HenceforthIcons.Unarchieve />
    //       <TypographyText className="ms-2 fw-semibold">Archive</TypographyText>
    //     </Button>
    //   ),
    // },
    // {
    //   type: "divider",
    // },
    // {
    //   key: "3",
    //   label: (
    //     <Button
    //       type="text"
    //       className="d-flex align-items-center justify-content-between"
    //       loading={loading}
    //       onClick={() => deleteProcess(res._id)}
    //     >
    //       {/* <HenceforthIcons.Delete /> */}
    //       <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
    //     </Button>
    //   ),
    // },
  ];
  const itemsResUnassign = (res: any) => [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between"
          onClick={() => handleAssignProcessToMe(res._id)}
        >
          <TypographyText className="ms-2 fw-semibold">
            Assign Process to me
          </TypographyText>
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between"
          onClick={() => {
            setShareModalOpen(true);
            setProcessId(res._id);
          }}
        >
          {/* <HenceforthIcons.Delete /> */}
          <TypographyText className="ms-2 fw-semibold">
            Assign Process to someone else
          </TypographyText>
        </Button>
      ),
    },
  ];

  const dataSource: any =
    Array.isArray(state.data) &&
    state?.data.map((res: any, i: number) => {
      return {
        key: router.query.pagination
          ? (Number(router.query.pagination) - 1) *
              Number(router.query.limit || 10) +
            (i + 1)
          : i + 1,
        name: (
          <span style={{color:"#9778F7"}} role="button" title={res?.process_id?.title} onClick={() => router.push(`/${userType}/process/${res?.process_id._id}/details`)}>
            {res?.process_id?.title?.length > 20 ? res?.process_id?.title?.slice(0, 20) : res?.process_id?.title}
          </span>
        ),
        checkbox: (
          <Checkbox
            checked={res?.is_delete_temp}
            onChange={(e: any) => handleForwardMsg(e.target.checked, i, res)}
          />
        ),
        //owned_department: res?.creator_id?.department_id?.title ?? "N/A",
        process_owner: (
          <Flex align="center" gap={8}>
            <Tooltip title={res?.process_id?.creator_id?.name} className="border-0">
            <Avatar
              src={
                res?.process_id?.creator_id?.profile_pic
                  ? henceforthApi.FILES.imageMedium(
                      res?.process_id?.creator_id?.profile_pic,
                      ""
                    )
                  : profile.src
              }
              size={40}
            />
           </Tooltip>
          </Flex>
        ),
        designation: (
          <span className="text-capitalize">
            {res?.process_id?.creator_id?.type
              ? `${getRoleForUrl(res?.process_id?.creator_id?.type)}`
              : "--"}
          </span>
        ),
        no_of_accept: (
          <span className="text-capitalize">
            {res?.no_of_accept ?? "--"}
          </span>
        ),
        no_of_ignore: (
          <span className="text-capitalize">
             {res?.ignore_type == "ALWAYS" ? "NULL"  :res?.no_of_ignore ?? "--"}
          </span>
        ),
        created_at: dayjs(res?.process_id?.created_at).format(`DD/MM/YYYY`),
        action: (
          <Dropdown
            menu={
              {
                items:
                  router.query.type == "unasigned"
                    ? itemsResUnassign(res)
                    : itemsRes(res),
              } as any
            }
            placement="bottomLeft"
          >
            <Button type="text" shape="circle" className="place-items btn-xs">
              <HenceforthIcons.MoreFill />
            </Button>
          </Dropdown>
        ),
      };
    });
  const items2: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={() => handleRouteRole("")} type="text" className="text-dark p-0 h-100 text-start">
          All
        </Button>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Button onClick={() => handleRouteRole("COMPANY_ADMIN")} type="text" className="text-dark p-0 h-100 text-start">
          Company Admin
        </Button>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Button onClick={() => handleRouteRole("TEAM_ADMIN")} type="text" className="text-dark p-0 h-100 text-start">
          Team Admin
        </Button>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <Button onClick={() => handleRouteRole("MEMBER")} type="text" className="text-dark p-0 h-100 text-start">
          Member
        </Button>
      ),
    },
  ];
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "key",
    //   key: "key",
    // },
    // {
    //   title: <>{allIds?.length !==0 ?<div role="button" onClick={handleSelectAllDelete}>Select All</div> : <div>Select</div>}</>,
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   // render: (text: any, res: any, index: any) => { console.log(res,"ressssssss");
    //   //  return <div>{res?._id}</div> }
    // },
    {
      title: "Ttile",
      dataIndex: "name",
      key: "name",
    //   render: (name:string) => (
    //   <Tooltip title={name}>
    //     {name}
    //   </Tooltip>
    // ),
    
    },
    {
      title: "Owner",
      dataIndex: "process_owner",
      key: "process_owner",
    },
    {
      title: (
        // <Dropdown menu={{ items: items2 }}>
          <Button
            type="text"
            className="text-secondary d-flex align-items-center gap-2 p-0 h-100"
            size="small"
          >
            Designation 
          </Button>
        // </Dropdown>
      ),
      dataIndex: "designation",
      key: "designation",
    },
    // {
    //   title: "Department",
    //   dataIndex: "owned_department",
    //   key: "owned_department",
    // },
    {
      title: "Done",
      dataIndex: "no_of_accept",
      key: "no_of_accept",
    },
    {
      title: "Ignore",
      dataIndex: "no_of_ignore",
      key: "no_of_ignore",
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const itemsFilter: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          onClick={() => {
            router.push({
              query: { ...router.query, new_filter: "dates" },
            });
          }}
          type="text"
        >
          Dates
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
          onClick={() => {
            router.push({
              query: { ...router.query, new_filter: "last_update" },
            });
          }}
          type="text"
        >
          Last Update
        </Button>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Button
          onClick={() => {
            router.push({
              query: { ...router.query, new_filter: "created_by" },
            });
          }}
          type="text"
        >
          Created By
        </Button>
      ),
    },
  ];
  const items: TabsProps["items"] = [
   
    {
      key: "done",
      label: "Done",
      children: (
        <div className="tab_content">
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      ),
    },
    {
      key: "ignore",
      label: "Ignore",
      children: (
        <div className="tab_content">
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      ),
    },
  ];

  const debounceSearch = useDebounce(query.search, 500);
  const initData = async () => {
    debugger;
    try {
      setLoading(true);
      let urlSearchParam = new URLSearchParams();

      if (query.pagination) {
        urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
      }
      if (query.search) {
        urlSearchParam.set("search", String(query.search));
      }
      if (query.role) {
        urlSearchParam.set("role", String(query.role));
      }
      if (query.new_filter) {
        urlSearchParam.set("new_filter", String(query.new_filter));
      }
      urlSearchParam.set("limit", String(router.query.limit ?? 10));
      urlSearchParam.set("filter", String(`scheduled`));
      let apiRes = await henceforthApi.Process.processList(
        urlSearchParam.toString()
      );
      setState(apiRes);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const removeQueryParam = (param: string) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query as any);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
  };
  console.log(state, "statetetet");
  const handleRoute = (value: any) => {
    const oldQuery = router.query;
    router.replace(
      {
        query: { ...oldQuery, type: value },
      },
      undefined,
      { shallow: true }
    );
  };
  const handleRouteRole = (value: any) => {
    const oldQuery = router.query;
    if(!value){
      removeQueryParam("role")
    }else{
      router.replace(
        {
          query: { ...oldQuery, role: value },
        },
        undefined,
        { shallow: true }
      );
    }
    
  };
  const onSearch = (value: any) => {
    if (value == "") return removeQueryParam("search");
    const oldQuery = router.query;
    router.replace(
      {
        query: { ...oldQuery, search: value },
      },
      undefined,
      { shallow: true }
    );
  };
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
  }, [
    query.type,
    query.pagination,
    debounceSearch,
    query.limit,
    query.new_filter,
    query.role
  ]);
  React.useEffect(() => {
    initDataUser();
  }, []);
  React.useEffect(() => {
    // initDataUser();
    removeQueryParam("search")
    router.push({
      query:{...router.query,Pagination:1}
    })
  }, [router.query.type]);
  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <section className="process">
          <div className="container-fluid">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Flex justify="space-between" align="center" gap={10}>
                  <TypographyTitle level={4} className="m-0 text-capitalize">
                 {`Schedule`} Processes 
                  </TypographyTitle>

                  
                </Flex>
              </Col>
              {/* tabs */}
              {/* <Col span={24}>
              <Table
                scroll={{ x: "100%" }}
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </Col> */}
              <Col span={24}>
                {/* <Tabs
                  onChange={handleRoute}
                  defaultActiveKey={query.type as any}
                  items={items}
                /> */}
                <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
              </Col>
            </Row>
            <Row justify={"center"} className="mt-4 mb-4">
              <Col span={24} className="text-center">
                <Pagination
                className="text-center"
                  current={Number(router.query.pagination) || 0}
                  pageSize={Number(router.query.limit) || 10}
                  total={state?.counts}
                  hideOnSinglePage={true}
                  disabled={loading}
                  onChange={handlePagination}
                />
              </Col>
            </Row>
          </div>
        </section>
      </Spin>
      <AssignProcessModal
        form={form}
        handleAssignProcessToSomeOneElse={handleAssignProcessToSomeOneElse}
        user={user}
        shareModalOpen={shareModalOpen}
        setShareModalOpen={setShareModalOpen}
      />
    </React.Fragment>
  );
};
ProcessPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ProcessPage;