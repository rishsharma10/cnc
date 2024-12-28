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
  Tag,
 
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { MenuProps, Spin, TabsProps, Form, Tooltip, } from "antd";

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
import FilterDateModal from "@/components/modal/FilterDatesModal";
const ProcessPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  let query = router.query;
  const { Toast,userType } = useContext(GlobalContext);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [dateForm] = Form.useForm();
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
  const [dateModal,setDateModal]=useState(false)
  const handleDateSubmit = async (values:any) => {
    console.log(values,"valuessjsjsjs");
    
    setLoading(true);
    try {
      // const apiRes = await henceforthApi.Process.archieved( {});
      // await initData()
      // router.replace(`/process/list/all/1`);
      router.replace({
        query:{...router.query,new_filter:"dates",start_date:dayjs(values?.leaveDates[0]).valueOf(),end_date:dayjs(values?.leaveDates[1]).valueOf()}
      })
      dateForm.resetFields()
      setDateModal(false)
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };
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
      router.replace(`/${userType}/process/add?step=1&pid=${apiRes?._id}`);
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


  // const handleSelectAllDelete = async () => {
  //   try {
  //     const updatedData = state.data.map((item:any) => ({
  //       ...item,
  //       is_delete_temp:router.query.type == "deleted" ? true :true // Add the new key here
  //   }));
  //   setState({
  //     ...state,
  //     data:updatedData
  //   });
  //   } catch (error) {
  //   }
  // }
  const handleSelectAllDelete = async () => {
    try {
      const updatedData = state.data.map((item:any) => ({
        ...item,
        is_delete_temp:true // Add the new key here
    }));
    setState({
      ...state,
      data:updatedData
    });
    } catch (error) {
    }
  }
  const handleSelectAllRemoveDelete = async () => {
    try {
      const updatedData = state.data.map((item:any) => ({
        ...item,
        is_delete_temp:false // Add the new key here
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
      router.replace(`/process/add?step=1&pid=${apiRes?._id}`);
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
  const addToArchieve = async (id:string) => {
    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.archieved(String(id), {});
      await initData()
      // router.replace(`/process/list/all/1`);
    } catch (error) {
      setLoading(false);
    } finally {
    }
  };
  const itemsRes = (res: any) => [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between"
          onClick={() =>handleProcessClick(res)}
        >
          <TypographyText className="ms-2 fw-semibold">{res.media_url===null ?"Proceed":"View"}</TypographyText>
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
          className="d-flex align-items-center justify-content-between"
          loading={loading}
          onClick={() => addToArchieve(res._id)}
        >
          {/* <HenceforthIcons.Unarchieve /> */}
          <TypographyText className="ms-2 fw-semibold">
            {res?.is_archive ? "UnArchive" : "Archive"}
          </TypographyText>
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
          type="text"
          className="d-flex align-items-center justify-content-between"
          loading={loading}
          onClick={() => deleteProcess(res._id)}
        >
          {/* <HenceforthIcons.Delete /> */}
          <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
        </Button>
      ),
    },
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
          <Tooltip title={res?.title}><span style={{color:"#9778F7"}} role="button"  onClick={() => handleProcessClick(res)}>
            {res?.title?.length > 20 ? res?.title?.slice(0, 20) : res?.title}
          </span></Tooltip>
        ),
        checkbox: (
          <Checkbox
            checked={res?.is_delete_temp}
            onChange={(e: any) => handleForwardMsg(e.target.checked, i, res)}
          />
        ),
        owned_department: res?.creator_id?.department_id?.title ?? "N/A",
        process_owner: (
          <Flex align="center" gap={8}>
             <Tooltip title={res?.creator_id?.name > 20
                ? res?.creator_id?.name?.slice(0, 20)
                : res?.creator_id?.name}>

            <Avatar
              src={
                res?.creator_id?.profile_pic
                  ? henceforthApi.FILES.imageMedium(
                      res?.creator_id?.profile_pic,
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
            {res?.creator_id?.type
              ? `${getRoleForUrl(res?.creator_id?.type)}`
              : "--"}
          </span>
        ),
        status: (
          <span className="text-capitalize"  >
            {res?.status
              ? <Tag style={{width:'105px', alignItems:"center"}} icon={(i == 0 && router.query.type == "all" && router.query.newadded) && res?.status == "PENDING" ?<SyncOutlined spin /> : !res?.is_process_assigned ?  <ExclamationCircleOutlined /> : res.status == "COMPLETED" ? <CheckCircleOutlined/> : <ExclamationCircleOutlined />} color={router.query.type == "unasigned" ? "red" : res?.status == "COMPLETED" ? "success" : res?.status == "PENDING" ? "warning" : ""}>
            <TypographyText className="text-capitalize">{(i == 0 && router.query.type == "all" && router.query.newadded) && res?.status == "PENDING" ? "Processing" : router.query.type == "unasigned" ? "Draft" : res?.status?.toLocaleLowerCase()}</TypographyText>
            </Tag>
              : "--"}
          </span>
        ),
        created_at: dayjs(res?.created_at).format(`DD/MM/YYYY`),
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
    {
      title: <>
        {state?.data.length > 0 && state?.data.every((item:any) => item.is_delete_temp) ? (
          <Checkbox
            checked={true}
            onChange={handleSelectAllRemoveDelete}
          />
        ) : (
          <Checkbox
            checked={false}
            onChange={handleSelectAllDelete}
          />
        )}
      </>,
      dataIndex: "checkbox",
      key: "checkbox",
   },
    {
      title: "Title",
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
        <Dropdown menu={{ items: items2 }}>
          <Button
            type="text"
            className="text-secondary d-flex align-items-center gap-2 p-0 h-100"
            size="small"
          >
            Designation <HenceforthIcons.ChevronDownBlack color />
          </Button>
        </Dropdown>
      ),
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Department",
      dataIndex: "owned_department",
      key: "owned_department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
            setDateModal(true)
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
      key: "all",
      label: "All",
      children: (
        <div className="tab_content">
          <Flex gap={8} className="mb-4">
            <Input
              onChange={(e: any) => onSearch(e.target.value)}
              placeholder="Search by title or designation..."
              size="large"
              prefix={
                <span className="me-1 lh-1">
                  <HenceforthIcons.Search />
                </span>
              }
            />
            <Dropdown
              menu={{ items: itemsFilter }}
              placement="bottomLeft"
              arrow
            >
              <Button
                type="primary"
                ghost
                size="large"
                className="d-flex align-items-center"
                icon={<HenceforthIcons.Filter />}
              >
                Filter
              </Button>
            </Dropdown>
          </Flex>
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
      key: "assigned",
      label: "Assigned",
      children: (
        <div className="tab_content">
          <Flex gap={8} className="mb-4">
            <Input
              onChange={(e: any) => onSearch(e.target.value)}
              placeholder="Search by title or designation..."
              size="large"
              prefix={
                <span className="me-1 lh-1">
                  <HenceforthIcons.Search />
                </span>
              }
            />
            <Dropdown
              menu={{ items: itemsFilter }}
              placement="bottomLeft"
              arrow
            >
              <Button
                type="primary"
                ghost
                size="large"
                className="d-flex align-items-center"
                icon={<HenceforthIcons.Filter />}
              >
                Filter
              </Button>
            </Dropdown>
          </Flex>
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
      key: "unasigned",
      label: "Unassigned",
      children: (
        <div className="tab_content">
          <Flex gap={8} className="mb-4">
            <Input
              onChange={(e: any) => onSearch(e.target.value)}
              placeholder="Search by title or designation..."
              size="large"
              prefix={
                <span className="me-1 lh-1">
                  <HenceforthIcons.Search />
                </span>
              }
            />
            <Dropdown
              menu={{ items: itemsFilter }}
              placement="bottomLeft"
              arrow
            >
              <Button
                type="primary"
                ghost
                size="large"
                className="d-flex align-items-center"
                icon={<HenceforthIcons.Filter />}
              >
                Filter
              </Button>
            </Dropdown>
          </Flex>
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
      key: "requests",
      label: "Requests",
      children: (
        <div className="tab_content">
          <Flex gap={8} className="mb-4">
            <Input
              onChange={(e: any) => onSearch(e.target.value)}
              placeholder="Search by title or designation..."
              size="large"
              prefix={
                <span className="me-1 lh-1">
                  <HenceforthIcons.Search />
                </span>
              }
            />
            <Dropdown
              menu={{ items: itemsFilter }}
              placement="bottomLeft"
              arrow
            >
              <Button
                type="primary"
                ghost
                size="large"
                className="d-flex align-items-center"
                icon={<HenceforthIcons.Filter />}
              >
                Filter
              </Button>
            </Dropdown>
          </Flex>
          <Table
            scroll={{ x: "100%" }}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      ),
    },
    // {
    //   key: "deleted",
    //   label: "Deleted",
    //   children: (
    //     <div className="tab_content">
    //       <Flex gap={8} className="mb-4">
    //         <Input
    //           onChange={(e: any) => onSearch(e.target.value)}
    //           placeholder="Search by title or designation..."
    //           size="large"
    //           prefix={
    //             <span className="me-1 lh-1">
    //               <HenceforthIcons.Search />
    //             </span>
    //           }
    //         />
    //         <Dropdown
    //           menu={{ items: itemsFilter }}
    //           placement="bottomLeft"
    //           arrow
    //         >
    //           <Button
    //             type="primary"
    //             ghost
    //             size="large"
    //             className="d-flex align-items-center"
    //             icon={<HenceforthIcons.Filter />}
    //           >
    //             Filter
    //           </Button>
    //         </Dropdown>
    //       </Flex>
    //       <Table
    //         scroll={{ x: "100%" }}
    //         pagination={false}
    //         dataSource={dataSource}
    //         columns={columns}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   key: "archive",
    //   label: "Archived",
    //   children: (
    //     <div className="tab_content">
    //       <Flex gap={8} className="mb-4">
    //         <Input
    //           onChange={(e: any) => onSearch(e.target.value)}
    //           placeholder="Search by title or designation..."
    //           size="large"
    //           prefix={
    //             <span className="me-1 lh-1">
    //               <HenceforthIcons.Search />
    //             </span>
    //           }
    //         />
    //         <Dropdown
    //           menu={{ items: itemsFilter }}
    //           placement="bottomLeft"
    //           arrow
    //         >
    //           <Button
    //             type="primary"
    //             ghost
    //             size="large"
    //             className="d-flex align-items-center"
    //             icon={<HenceforthIcons.Filter />}
    //           >
    //             Filter
    //           </Button>
    //         </Dropdown>
    //       </Flex>
    //       <Table
    //         scroll={{ x: "100%" }}
    //         pagination={false}
    //         dataSource={dataSource}
    //         columns={columns}
    //       />
    //     </div>
    //   ),
    // },
  ];

  function handleProcessClick(res:any){
    if(router.query.newadded && !res?.media_url){
      return Toast.warning("Process is in progress");
    }else if(res?.is_process_assing_to_me && !res?.media_url  && !res?.is_completed ){
      return router.replace(`/${userType}/process/add?step=1&pid=${res?._id}`);
    }else if(res?.is_process_assing_to_me && res?.media_url){
      return router.replace(`/${userType}/process/${res?._id}/details`)
    }else if(!res?.media_url){
      return Toast.warning("Process is in progress");
    }else{
      return router.replace(`/${userType}/process/${res?._id}/details`)
    }
  }
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
      if(query.new_filter == "dates"){
        if (query.start_date) {
          urlSearchParam.set("start_date", String(query.start_date));
        }
        if (query.end_date) {
          urlSearchParam.set("end_date", String(query.end_date));
        }
      }
      urlSearchParam.set("limit", String(router.query.limit ?? 10));
      urlSearchParam.set("filter", String(query.type));
      let apiRes = await henceforthApi.Process.processList(
        urlSearchParam.toString()
      );
      if(router.query.newadded){
        if(apiRes?.data?.find((res:any) => res._id == String(router.query.newPid)).status == "COMPLETED"){
          let x = router.query;
          delete x["newadded"];
          delete x["newPid"];
          router.replace({ pathname: router?.pathname, query: { ...x } });
        }
        setState(apiRes);
      }else{
        setState(apiRes);
      }
      console.log(apiRes.data,"member process")
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
        query: { ...oldQuery,pagination:1, type: value },
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
    if(router.query.new_filter !== "dates"){
      delete router.query.start_date
      delete router.query.end_date
    }
  }, [
    query.type,
    query.pagination,
    debounceSearch,
    query.limit,
    query.new_filter,
    query.role,
    query.start_date,
    query.end_date,
    query.newadded
  ]);
  React.useEffect(() => {
    initDataUser();
  }, []);
  React.useEffect(() => {
    // initDataUser();
    removeQueryParam("search")
    router.push({
      query:{...router.query,pagination:1}
    })
  }, [router.query.type]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
  
    if (router?.query?.newadded) {
      intervalId = setInterval(() => {
        initData(); 
      }, 5000);
    }
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [router?.query?.newadded]);
  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <section className="process">
          <div className="container-fluid">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Flex justify="space-between" align="center" gap={10}>
                  <TypographyTitle level={4} className="m-0">
                    Processes
                  </TypographyTitle>

                  <Flex gap={6}>
                    {allIds?.length !== 0 && (
                     
                      <Popconfirm
                      title={`${router.query.type == "deleted" ? "Restore" :"Delete"} Process`}
                      onConfirm={() => handleBulkDelete()}
                      description={`Are you sure you want to ${router.query.type == "deleted" ? "Restore" :"Delete"} the selected processes?`}
                    >
                      {/* <Button className="btn-0 border-0 p-0 text-start"><HenceforthIcons.Delete /></Button> */}
                      <Button
                        size="large"
                        danger
                        className="d-flex align-items-center"
                        icon={router.query.type !== "deleted" &&<HenceforthIcons.Delete />}
                      >
                        {router.query.type == "deleted" ? "Restore" :"Delete"}
                      </Button>
                    </Popconfirm>
                    )}
                    <Button
                      onClick={() => router.push(`/${userType}/process/add`)}
                      type="primary"
                      size="large"
                      className="d-flex align-items-center"
                      icon={<HenceforthIcons.Plus />}
                    >
                      Add New Process
                    </Button>
                  </Flex>
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
                <Tabs
                  onChange={handleRoute}
                  defaultActiveKey={query.type as any}
                  items={items}
                />
              </Col>
            </Row>
            {state?.counts > 10 && <Row justify={"center"} className="mt-4 mb-4">
              <Col span={24} className="text-center">
                <Pagination
                className="text-center"
                  current={Number(router.query.pagination) || 0}
                  pageSize={Number(router.query.limit) || 10}
                  total={state?.counts}
                  hideOnSinglePage={false}
                  disabled={loading}
                  onChange={handlePagination}
                />
              </Col>
            </Row>}
          </div>
        </section>
      </Spin>
      <FilterDateModal open={dateModal} setOpen={setDateModal} loading={loading} submit={handleDateSubmit} form={dateForm}/>
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
