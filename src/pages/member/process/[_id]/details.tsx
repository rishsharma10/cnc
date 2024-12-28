import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Empty,
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
import { Alert, Form, Grid, Image, MenuProps, Spin } from "antd";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import Link from "next/link";
import React, { Fragment, ReactElement, useContext, useEffect, useState } from "react";
import profile from "@/assets/images/profile.png";
import pdf from "@/assets/images/PDF_icn.svg";
//import flow from "@/assets/images/flow.png";
import flowChart from "@/assets/images/RACI.png";
//import flowChart from "@/assets/images/flow-chart.png";
import ActivityCard from "@/components/ActivityCard";
//import CommentCard from "@/components/CommentCard";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import henceforthApi, { API_ROOT, BUCKET_ROOT } from "@/utils/henceforthApi";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import ChatComponents from "@/components/ChatComponents";
import SharedProcessModal from "@/components/modal/SharedProcessModal";
import SharedCompo from "@/components/SharedCompo";
import SharedBodyCompo from "@/components/SharedBodyCompo";
import { capitalizeFirstLetter } from "@/utils/henceforthValidations";
import CommentModal from "@/components/modal/CommentModal";
import EditProcessCompo from "@/components/EditProcessCompo";
import CustomAudioPlayer from "@/components/AudioPlayer";
import useDownloader from "react-use-downloader";
import EditRaciModal from "@/components/modal/EditRaciModal";
import { COOKIES_USER_RAIZE_ACCESS_TOKEN } from "@/context/actionTypes";
import { parseCookies, setCookie } from "nookies";
import { GetServerSideProps } from "next";
import { parse } from "path";
import RACIModal from "@/components/common/RaciModal";

// import ShareWithSlack from "@/components/ShareWithSlack";
const View = (props: any) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [formComment] = Form.useForm();
  const [editRaciForm] = Form.useForm();
  const [formEditDetails] = Form.useForm();
  const { user_type, _id } = router.query;
  const { raize, Video, userType, Toast, setUserInfo, setUserType } = useContext(GlobalContext);
  const [commentModal, setCommentModal] = useState(false);
  const [flowImageModal, setFlowImageModal] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [raciModal, setRaciModal] = useState(false);
  const [editorShow, setShowEditor] = useState(false);
  const [shareBtn, setShareBtn] = useState(false);
  const [raciEditModal, setRaciEditModal] = useState(false);
  const [state, setState] = useState<any>({
    ...props,
    external_shares: { data: props.external_shares },
    internal_shares: { data: props?.internal_shares },
    outside_shares: { data: props?.outside_shares },
  });
  // const [state, setState] = useState<any>({
  //   external_shares: { data: [] },
  //   internal_shares: { data: [] },
  //   outside_shares: { data: [] },
  // });
  const [selectedItemsInternal, setSelectedItemsInternal] = React.useState({
    data: [],
  });
  const [selectedItemsExternal, setSelectedItemsExternal] = React.useState({
    data: [],
  });
  const [selectedItemsOutside, setSelectedItemsOutside] = React.useState({
    data: [],
  });
  const [selectedUserId, setSelectedUserId] = useState<any>([]);
  const [updatedInput, setUpdatedInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [freqType, setFreqType] = useState(state?.frequency)
  const [processEditor, setProcessEditor] = useState(false)
  //change process title
  const handleProcessTitleChange = async (value: any) => {
    try {
      let apiRes = await henceforthApi.Process.editProcess(
        String(router.query._id),
        { title: value.process_title, description: value.process_desc }
      ) as any;
      Toast.success("Process updated")
      await initData()

      setProcessEditor(false);
    } catch (error) {
      Toast.error(error)
    } finally {
      setProcessEditor(false);
      setLoading(false)
    }
  }

  const handleTitleChangeforDesc=async(value:any)=>{
    console.log(value,"processti")
  
    try {
      let apiRes = await henceforthApi.Process.editProcess(
        String(router.query._id),
        {title: value }
      ) as any;
      //Toast.success(apiRes?.message)
      //await initData()
    } catch (error) {
      Toast.error(error)
    } finally {
  
  
    }
  }
  let timer:any;
  const debounceTitleChange=(value:any)=>{
    if(timer){
      clearTimeout(timer)
    }

    timer=setTimeout(()=>{
       handleTitleChangeforDesc(value)
    },700)
  }


  const [titleEditForm] = Form.useForm();
  const processDetails = [
    {
      label: "Owned Department:",
      text:
        state?.department_id?.title?.length > 25
          ? `${state?.department_id?.title?.slice(0, 25)}...`
          : state?.department_id?.title,
    },
    {
      label: "Trigger:",
      text: state?.trigger ?? "N/A",
    },
    {
      label: "Connected Department:",
      text:
        state?.conn_dep_id?.title?.length > 25
          ? `${state?.conn_dep_id?.title?.slice(0, 25)}...`
          : state?.conn_dep_id?.title?state?.conn_dep_id?.title:"N/A",
    },
    {
      label: "Estimated Time:",
      text: `${dayjs(state?.estimate_time).format(`H`)} hour ${dayjs(
        state?.estimate_time
      ).format(`m`)} mins`,
    },
    {
      label: "Frequency:",
      text: state?.frequency ?? "N/A",
    },
    {
        label: "Frequency Time:",
        text:
          state?.frequency === "Weekly"
            ? dayjs(state?.frequency_time).format("dddd")
            : dayjs(state?.frequency_time).format("DD/MM/YYYY"),
      }
      ,
    {
      label: "System Used:",
      text: state?.system_used ?? "N/A",
    },
    // {
    //   label: "Experience Level:",
    //   text: state?.experience_level ?? "N/A",
    // },
    {
      label: "Financial Data (F):",
      text: state?.financial_data ?? "N/A",
    },
    {
      label: "Department Data (D):",
      text: state?.dep_data ?? "N/A",
    },
    {
      label: "Employee Data (E):",
      text: state?.emp_data ?? "N/A",
    },
  ];
 

  state?.frequency==="Daily"?processDetails.splice(5,1):""


  const [openRejectModal, setOpenRejectModal] = useState(false)

  const submitProcessComplete = async () => {

    try {
      const apiRes = await henceforthApi.User.alertAccept(props?.alert_id, { type: "ACCEPTED" })
      await initData();
      Toast.success(apiRes.message)
    } catch (error) {
      Toast.error(error)
    }
  }
  const submitProcessReject = async (values: any) => {
    const payload = {
      type: "REJECTED",
      reason: values?.reject_reason
    }
    try {
      const apiRes = await henceforthApi.User.alertAccept(props?.alert_id, payload)
      await initData()
      Toast.success(apiRes.message)
      
    } catch (error) {
      Toast.error(error)
    } finally {
      setOpenRejectModal(false)
    }
  }
  const [loadingShared, setLoadingShared] = useState(false);
  const updateProcess = async (payload: any) => {
    setLoadingShared(true);
    try {
      const apiRes = await henceforthApi.Process.updateProcessAfterCreate(
        String(router.query._id),
        payload
      );
      setShareModalOpen(false);
      Toast.success(apiRes?.message);
      return apiRes; // Return API response
    } catch (error: any) {
      Toast.error(error);
      throw error; // Propagate error to handleShareChange
    } finally {
      setLoadingShared(false);
    }
  };

  const deleteProcess = async () => {
    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.delete(String(router.query._id));
      router.replace(`/${userType}/process/list/all/1`, undefined, { shallow: true });
      Toast.success(apiRes?.message)
    } catch (error) {
      Toast.error(error);
      setLoading(false);
    } finally {
    }
  };
  const addToArchieve = async () => {
    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.archieved(String(router.query._id), {});
      router.replace(`/${userType}/process/list/all/1`, undefined, { shallow: true });
    } catch (error: any) {
      Toast.error(error)
      setLoading(false);
    } finally {
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between"
          onClick={() => setProcessEditor(true)}
        >
          <HenceforthIcons.PencilBlack />
          <TypographyText className="ms-2 fw-semibold">Edit Process </TypographyText>
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
          onClick={addToArchieve}
        >
          <HenceforthIcons.Unarchieve />
          <TypographyText className="ms-2 fw-semibold">
            {state?.is_archive ? "UnArchive" : "Archive"}
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
          onClick={deleteProcess}
        >
          <HenceforthIcons.DeleteBlack />
          <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
        </Button>
      ),
    },
  ];

  const [frames, setFrames] = useState<any>([]);

  const handleVideoChange = (event: any) => {
    const file = event;
    const video: any = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context: any = canvas.getContext("2d");

    const reader = new FileReader();
    reader.onload = function (e: any) {
      video.src = e.target.result;
    };

    reader.readAsDataURL(file);

    video.onloadedmetadata = function () {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      for (let i = 0; i < video.duration; i++) {
        video.currentTime = i;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        setFrames((prevFrames: any) => [...prevFrames, dataURL]);
      }
    };
  };


  const [loadingAI, setLoadingAI] = useState(false)
  const generateDescAI = async () => {
    try {
      setLoadingAI(true);
      let apiRes = await henceforthApi.Process.generateAI(
        String(router.query._id),
        {}
      );
      titleEditForm.setFieldValue("process_desc", apiRes.data);
      // props.form.setFields([
      //   {
      //     name: ["description"],
      //     errors: [],
      //   },
      // ]);
    } catch (error) {
    } finally {
      setLoadingAI(false);
    }
  };
  const initData = async () => {
    debugger

    try {
      //setLoading(true);


      let apiRes = await henceforthApi.Process.getById(String(router.query._id));
      // if (!apiRes?.media_url) {
      //   router.replace(`/company/process/add?step=1&pid=${apiRes?._id}`)
      // }
      setState({
        ...apiRes,
        external_shares: { data: apiRes.external_shares },
        internal_shares: { data: apiRes?.internal_shares },
        outside_shares: { data: apiRes?.outside_shares },
      });
      formEditDetails.setFieldsValue(apiRes);
      console.log(apiRes, "apiResapiResapiResapiRes");
      formEditDetails.setFieldValue("frequency", freqType)
      formEditDetails.setFieldValue("frequency_time", dayjs(apiRes?.frequency_time))
      form.setFieldValue("description_doc", apiRes?.description_doc);
      formEditDetails.setFieldValue(
        "department_id",
        apiRes?.department_id?.title
      );
      formEditDetails.setFieldValue("conn_dep_id", apiRes?.conn_dep_id?._id);
      formEditDetails.setFieldValue(
        "estimate_time",
        dayjs(apiRes?.estimate_time)
      );
      formEditDetails.setFieldValue("dep_data",apiRes?.dep_data)
      formEditDetails.setFieldValue("emp_data",apiRes?.emp_data)
      formEditDetails.setFieldValue("financial_data",apiRes?.financial_data)
      if (apiRes?.informed) {
        editRaciForm.setFieldValue("informed", apiRes?.informed?.map((res:any)=>res?._id))
      }
      if (apiRes?.accountable?._id) {
        editRaciForm.setFieldValue("accountable", apiRes?.accountable?._id)
      }
      if (apiRes?.consulted) {
        editRaciForm.setFieldValue("consulted", apiRes?.consulted?.map((res: any) => res?._id))
      }
      if (apiRes?.responsible) {
        editRaciForm.setFieldValue("responsible", apiRes?.responsible?.map((res:any)=>res?._id))
      }
      handleVideoChange(`${BUCKET_ROOT}/video/${apiRes?.media_url}`);
    } catch (error) {
      // router.replace("/company/auth/login",undefined,{shallow:true})
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (values: any) => {
    console.log(values, "valuesss");

    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.updateProcessAfterCreate(
        String(_id),
        { description_doc: values?.description_doc }
      );
      // form.setFieldValue("description",apiRes?.description)
      await initData();
      setShowEditor(false);
    } catch (error) {
      Toast.error(error)
    } finally {
      setLoading(false);
    }
  };
  const updateGenerateFlow = async () => {
    setLoading(true);
    try {
      const apiRes = await henceforthApi.Process.updateProcessAfterCreate(
        String(_id),
        { description_doc: state?.description_doc }
      );
      // form.setFieldValue("description",apiRes?.description)
      await initData();
      setShowEditor(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // // Example usage:
  // async function example() {
  //   const prompt =
  //     "Create a function that takes two numbers as parameters and returns their sum.";
  //   const completion = await generateCompletion(prompt);
  //   console.log(completion);
  // }

  // example();
  // const showToast = (value:string) => {
  //   let str = String(value.charAt(0)).toUpperCase()+ value?.toLocaleLowerCase().slice(1)
  //   debugger
  //   if(value == "REMOVE"){
  //     Toast.success('Success! Access has been removed.')
  //   }else{
  //     Toast.success(`Success! ${str} permission has been granted.`)
  //   }
  // }
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { };

  const handleShareChange = async (
    value: string, 
    index: number, 
    shareType: 'internal' | 'external' | 'outside'
  ) => {
    try {
      // Create copy of state to avoid direct mutation
      const currentData = [...state?.[`${shareType}_shares`]?.data || []];
      
      // Prepare payload based on share type
      const payloadKey = {
        internal: 'share_internaly',
        external: 'share_externaly',
        outside: 'share_outside'
      }[shareType];
  
      const payload = {
        [payloadKey]: currentData.map((res: any) => ({
          user_id: res.user_id?._id,
          access_type: res === currentData[index] ? value : res.access_type
        }))
      };
  
      // Wait for API response before updating state
      await updateProcess(payload);
  
      // Only update state after successful API call
      setState((prevState:any) => {
        const newData = [...prevState[`${shareType}_shares`].data];
        
        if (value === "REMOVE") {
          newData.splice(index, 1);
        } else {
          newData[index] = {
            ...newData[index],
            access_type: value
          };
        }
  
        return {
          ...prevState,
          [`${shareType}_shares`]: {
            ...prevState[`${shareType}_shares`],
            data: newData
          }
        };
      });
  
    } catch (error) {
      console.error(`Error updating ${shareType} share:`, error);
      // State remains unchanged on error
    }
  };
  const handleChangeInternal = (value: string, i: number) => 
    handleShareChange(value, i, 'internal');
  
  const handleChangeExternal = (value: string, i: number) => 
    handleShareChange(value, i, 'external');
  
  const handleChangeOutside = (value: string, i: number) => 
    handleShareChange(value, i, 'outside');
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  const [activity, setActivity] = React.useState({
    count: 0,
    data: [],
  });
  const [comment, setComment] = React.useState({
    count: 0,
    data: [],
    mentions: [],
  });
  const [modalType, setModalType] = useState("");
  const [shareMsg, setShareMsgs] = useState("");
 
  const onchangeItems = async (values: any, type: any) => {
    let filterSelectedItems: any = [];
    filterSelectedItems =
      (await Array.isArray(user.data)) &&
      user.data.filter((res: any) => values?.includes(res._id));
    filterSelectedItems =
      (await Array.isArray(filterSelectedItems)) &&
      filterSelectedItems.map((item: any) => {
        return {
          user_id: item._id,
          name: item?.first_name
            ? `${item?.first_name} ${item?.last_name ?? ""}`
            : item?.email
              ? item?.email
              : "N/A",
          access_type: "VIEW",
          profile_pic: item?.profile_pic,
        };
      });
    if (type == "INTERNAL") {
      setSelectedItemsInternal({ data: filterSelectedItems });
    } else if (type == "EXTERNAL") {
      setSelectedItemsExternal({ data: filterSelectedItems });
    } else {
      setSelectedItemsOutside({ data: filterSelectedItems });
    }
  };
  const [internalUsers, setInternalUsers] = React.useState({
    count: 0,
    data: [],
  });
  const [externalUsers, setExternalUsers] = React.useState({
    count: 0,
    data: [],
  });
  const initDataUser = async () => {

    try {
      let apiRes = await henceforthApi.Process.userList("ALL");
      setUser(apiRes?.data);

      let exApiRes=await henceforthApi.Process.shareExternalUsers();
      setExternalUsers(exApiRes?.data)

      let inApiRes=await henceforthApi.Process.shareInternalUsers();
      setInternalUsers(inApiRes?.data)
    } catch (error) { }
  };
  const initActivity = async () => {
    try {
      let apiRes = await henceforthApi.Process.activity(
        String(router.query._id)
      );
      setActivity(apiRes);
    } catch (error) { }
  };
  const intializeComment = async () => {
    try {
      let apiRes = await henceforthApi.Comment.listing(
        String(router.query._id)
      );
      setComment(apiRes);
    } catch (error) { }
  };
  const addComment = async (values: any) => {
    debugger;
    try {
      setCommentLoading(true);
      const items: any = {
        message: updatedInput,
        type: selectedUserId?.length ? "MENTION" : "NORMAL",
      };
      if (selectedUserId?.length) {
        items["user_ids"] = selectedUserId;
      }
      let apiRes = await henceforthApi.Comment.add(
        String(router.query._id),
        items
      );
      formComment.resetFields();
      setUpdatedInput("");
      setSelectedUserId([]);
      await intializeComment();
    } catch (error) {
    } finally {
      setCommentLoading(false);
    }
  };

  const handleChangeSharedInternal = async (values: any) => {
    const items = {
      share_internaly:
        Array.isArray(selectedItemsInternal?.data) &&
        selectedItemsInternal.data.map((res: any) => {
          return { user_id: res.user_id, access_type: res.access_type };
        }),
    };
    try {
      await updateProcess(items);
      await initData();
      formModal.resetFields();
      setSelectedItemsInternal({ data: [] });
    } catch (error) { }
  };
  const handleChangeSharedExternal = async (values: any) => {
    const items = {
      share_externaly:
        Array.isArray(selectedItemsExternal?.data) &&
        selectedItemsExternal.data.map((res: any) => {
          return { user_id: res.user_id, access_type: res.access_type };
        }),
    };
    try {
      await updateProcess(items);
      await initData();
      formModal.resetFields();
      setSelectedItemsExternal({ data: [] });
    } catch (error) { }
  };
  const handleChangeSharedOutside = async (values: any) => {
    const items = {
      share_outside:
        Array.isArray(selectedItemsOutside?.data) &&
        selectedItemsOutside.data.map((res: any) => {
          return { user_id: res.user_id, access_type: res.access_type };
        }),
    };
    try {
      await updateProcess(items);
      await initData();
      formModal.resetFields();
      setSelectedItemsOutside({ data: [] });
    } catch (error) { }
  };

  const handleDoNothing = async (id: string) => {
    try {
      let apiRes = await henceforthApi.Comment.doNothing(String(id), {});
      await intializeComment();
    } catch (error) { }
  };
  const handleInvite = async (id: string) => {
    const items = {
      share_internaly:
        Array.isArray(comment.mentions) &&
        comment.mentions.map((res: any) => {
          return {
            user_id: res?.user_id?._id,
            access_type: "VIEW",
          };
        }),
      is_chat: 1,
    };
    try {
      await updateProcess(items);
      await intializeComment();
    } catch (error) { }
  };
  const [is_edit_Form, set_Is_Edit_Form] = useState(false);
  const handleClickEditButton = () => {
    set_Is_Edit_Form(true);
  };

  const getIdByName = async (name: string) => {
    try {
      let apiRes;
      apiRes = await henceforthApi.Department.listing();
      apiRes = await apiRes.data.find((res: any) => name == res["title"]);
      return apiRes._id;
    } catch (error) { }
  };
  const [is_Forward, set_Is_Forward] = useState(false);

  const onSubmitEditDetails = async (values: any) => {
    //let conn_dep_id = await getIdByName(values.conn_dep_id);
    debugger
    let department_id = await getIdByName(values.department_id);
    const dateString = values?.estimate_time.$d;
    const date = new Date(dateString);
    const timestamp = date.getTime();
    const hour=Number(dayjs(timestamp).hour())
    const items = {
      ...values,
      department_id,
      estimate_time: timestamp,
      estimate_time_type: `hour`,
      hour:hour
    };
    debugger

    if(Array.isArray(items.conn_dep_id)){
      if(items.conn_dep_id.length){
        items.conn_dep_id=values?.conn_dep_id[0]
      }else{
        items.conn_dep_id=null
      }
    }else{
      items.conn_dep_id=values.conn_dep_id;
    }
    //items.conn_dep_id=Array.isArray(values?.conn_dep_id) && values?.conn_dep_id?.length ?:null;
    items.frequency_time = freqType == "Daily" ? dayjs(new Date()).valueOf() : freqType == "Weekly" ? dayjs(values?.frequency_time).valueOf() : dayjs(values?.frequency_time).valueOf()
    items.system_used = String(values?.system_used);
    console.log(items, "itemsitemsitems", router.query.pid);
    try {
      await updateProcess(items);
      await initData();
      set_Is_Edit_Form(false);
      setLoading(false)
    } catch (error) { 
      Toast.error(error)
    }finally{
      setLoading(false)
    }
  };
  console.log(shareMsg, "shareMsgshareMsgshareMsg");

  const handleMsgShare = async (type: string) => {
    try {
      router.replace(
        `mailto:?subject=Raize &body=${typeof window !== "undefined" && `${shareMsg}`
        }`
      );
      setShareBtn(false);
      set_Is_Forward(false);
      setShareMsgs("");
    } catch (error) { }
  };

  const handleShareAudioVideo = async (
    media_url: string,
    type: string,
    redirect_url: string
  ) => {
    debugger;
    const items = {
      media_url,
      type: media_url.endsWith("3") ? "AUDIO" : "VIDEO",

    };
    try {
      let apiRes = await henceforthApi.Process.download(items);
      await download(redirect_url, media_url);
      // router.push(redirect_url);
    } catch (error) { }
  };


  const handleEditRaci = async (values: any) => {
    console.log(values, "valuesss");
    const payload = {
      ...values
    }
    try {
      setLoading(true)
      let apiRes = await henceforthApi.Process.updateProcessAfterCreate(String(router.query._id),
        payload)
      setRaciEditModal(false)
      setLoading(false)
      await initData()
    } catch (error) {

    }
  }
  React.useEffect(() => {

    titleEditForm.setFieldValue("process_title", props?.title)
    initDataUser();
    initActivity();
    intializeComment();
  }, []);
  useEffect(() => {
    if (is_edit_Form || raciEditModal || editorShow || freqType || processEditor) {
      initData()
    }
  }, [is_edit_Form, editorShow, raciEditModal, freqType, processEditor])

  const pageUrl = `https://staging.techraize.com`;
  console.log(state, "statetetettetetetetetetet");

  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();


  const initApi = async () => {
    try {
      let apiRes = await fetch(`/api/pdf`)
      console.log(apiRes);


    } catch (error) {

    }
  }
  useEffect(() => { initApi() }, [])
  const screens = Grid.useBreakpoint();
  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <section className="process_detail">
          {!editorShow ? (
            <div className="container">
              <Row gutter={[20, 20]} justify={"space-between"}>
                <Col span={24} lg={16} xl={16} xxl={18}>
                  <div className="process_info mb-4 pb-2">
                    <Flex align="center" gap={8} className="mb-2">
                      <TypographyTitle
                        level={4}
                        className="m-0 text-capitalize"
                      >
                        {state?.title ?? "Process Title"}{" "}
                      </TypographyTitle>
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <Button
                          type="text"
                          shape="circle"
                          className="place-items btn-xs"
                        >
                          <HenceforthIcons.MoreFillBg />
                        </Button>
                      </Dropdown>
                      {!state?.pdf_file && (
                        (state?.assign_myself||state?.is_process_assing_to_me)?<Button
                          loading={loading}
                          onClick={updateGenerateFlow}
                          htmlType="submit"
                          type="primary"
                          size="large"
                          className="d-flex align-items-center"
                        >
                          Generate Flow
                        </Button>:""
                      )}
                    </Flex>
                    {!state?.pdf_file ? <Flex>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: state?.description_doc,
                        }}
                      ></div>
                      {!state?.pdf_file && <Button
                        onClick={() => setShowEditor(true)}
                        type="text"
                        shape="circle"
                      >
                        <HenceforthIcons.EditFill />
                      </Button>}
                    </Flex> :
                         <TypographyText>{state?.description}</TypographyText>}
                  </div>

                  {state?.type == "VIDEO" && (
                    <div className="common_card mb-3">
                      <Flex
                        align="center"
                        justify="space-between"
                        gap={10}
                        className="mb-3"
                      >
                        <Flex align="center" gap={10}>
                          <TypographyTitle level={5} className="m-0">
                            Video
                          </TypographyTitle>

                          <Button
                            onClick={() =>
                              handleShareAudioVideo(
                                state?.media_url,
                                "VIDEO",
                                `${BUCKET_ROOT}/video/${state?.media_url}`
                              )
                            }
                            type="text"
                            className="p-0 h-100"
                            shape="circle"
                          >
                            <HenceforthIcons.DownloadFill />
                          </Button>
                        </Flex>
                        <Button
                          type="text"
                          className="p-0 h-100"
                          shape="circle"
                        >
                          {/* <HenceforthIcons.EditFill /> */}
                        </Button>
                      </Flex>
                      {/* Video */}
                      <div className="video_container position-relative">
                        <video
                          src={`${BUCKET_ROOT}/video/${state?.media_url}`}
                          controls
                        ></video>
                        <div className="zoom_btn">
                          <Button type="text" shape="circle">
                            {/* <HenceforthIcons.Expand /> */}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {state?.type == "AUDIO" && (
                    <div className="common_card mb-3">
                      <Flex
                        align="center"
                        justify="space-between"
                        gap={10}
                        className="mb-3"
                      >
                        <Flex align="center" gap={10}>
                          <TypographyTitle level={5} className="m-0">
                            Audio
                          </TypographyTitle>

                          <Button
                            onClick={() =>
                              handleShareAudioVideo(
                                state?.media_url,
                                "AUDIO",
                                `${BUCKET_ROOT}/audio/${state?.media_url}`
                              )
                            }
                            type="text"
                            className="p-0 h-100"
                            shape="circle"
                          >
                            <HenceforthIcons.DownloadFill />
                          </Button>
                        </Flex>
                        <Button
                          type="text"
                          className="p-0 h-100"
                          shape="circle"
                        >
                          {/* <HenceforthIcons.EditFill /> */}
                        </Button>
                      </Flex>
                      {/* Video */}
                      <div className="rounded-4 overflow-hidden position-relative">
                        <CustomAudioPlayer
                          src={`${BUCKET_ROOT}/audio/${state?.media_url}`}
                        />
                      </div>
                    </div>
                  )}
                  {/* {state?.type == "AUDIO" && (
                    <Flex align="center" gap={10}>
                    <TypographyTitle level={5} className="m-0">
                      Video
                    </TypographyTitle>
                    
                      <Button
                      onClick={() => handleShareAudioVideo(state?.media_url,"VIDEO",`${BUCKET_ROOT}/video/${state?.media_url}`)}
                        type="text"
                        className="p-0 h-100"
                        shape="circle"
                      >
                        <HenceforthIcons.DownloadFill />
                      </Button>
                    
                      <CustomAudioPlayer src={`${BUCKET_ROOT}/audio/${state?.media_url}`} />
                  </Flex>
                  )} */}
                  {/* {state?.type == "AUDIO" && (
                    <div className="common_card mb-3">
                      <div className="video_container position-relative d-flex justify-content-center align-items-center">
                        <audio
                          src={`${BUCKET_ROOT}/audio/${state?.media_url}`}
                          controls
                        ></audio>
                        <div className="zoom_btn">
                          <Button type="text" shape="circle">

                          </Button>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {state?.pdf_file && (
                    <Row gutter={[12, 12]}>
                      {state?.pdf_file && (
                        <Col span={24} md={12} lg={8} xl={8} xxl={8}>
                          <div className="common_card h-100">
                            <Flex
                              align="center"
                              justify={"space-between"}
                              className="mb-2"
                              wrap="wrap"
                            >
                              <TypographyTitle
                                level={5}
                                className="m-0 fs-16 text-nowrap"
                              >{`Document`}</TypographyTitle>
                              {/* <Link
                                  href={`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${state?.pdf_file}`}
                                  target="_blank"
                                >
                                  <Button type="text" shape="circle">
                                    <HenceforthIcons.Expand />
                                  </Button>
                                </Link> */}
                              <div className="zoom_btn">
                                <Button
                                  onClick={() => setShowEditor(true)}
                                  type="text"
                                  shape="circle"
                                >
                                  <HenceforthIcons.EditFill />
                                </Button>
                                <Link className="expand-btn"
                                  href={`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${state?.pdf_file}`}
                                  target="_blank"
                                >
                                  <HenceforthIcons.Expand />
                                </Link>
                                <Button
                                  onClick={() =>
                                    handleShareAudioVideo(
                                      state?.pdf_file,
                                      "DOC",
                                      `${henceforthApi.API_FILE_ROOT_DOCUMENTS}${state?.pdf_file}`
                                    )
                                  }
                                  type="text"
                                  shape="circle"
                                  className="p-0"
                                >
                                  <HenceforthIcons.DownloadFill />
                                </Button>
                              </div>
                            </Flex>
                            <div className="inner_card_pdf text-center">
                              {/* <Image
                                src={pdf.src}
                                alt="Not Found"
                                preview={false}
                              /> */}
                              <Image
                                preview={false}
                                className={`inner_card_img`}
                                src={pdf.src}
                                alt="Not Found"
                              // preview={{
                              //   src: `${henceforthApi.FILES.imageOriginal(
                              //     state?.flowchart_image,
                              //     ""
                              //   )}`,
                              // }}
                              />
                              {/* <PDFtoImage pdfUrl={state?.pdf_file}/> */}
                            </div>
                          </div>
                        </Col>
                      )}
                      {state?.flowchart_image && (
                        <Col span={24} md={12} lg={8} xl={8} xxl={8}>
                          <div className="common_card h-100">
                            <Flex
                              wrap="wrap"
                              align="center"
                              justify="space-between"
                              className="mb-2"
                            >
                              <TypographyTitle
                                level={5}
                                className="m-0 fs-16 text-nowrap"
                              >{`Flow`}</TypographyTitle>
                              <div className="zoom_btn">
                                <Button
                                  onClick={() => {
                                    router.push(
                                      `/${userType}/drawio?process_id=${router.query._id}`
                                    );
                                  }}
                                  type="text"
                                  shape="circle"
                                  size="small"
                                >
                                  <HenceforthIcons.EditFill />
                                </Button>
                                <Button
                                  className="expand-btn"
                                  size="small"
                                  onClick={() => setFlowImageModal(true)}
                                  type="text"
                                  shape="circle"
                                >
                                  <HenceforthIcons.Expand />
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() =>
                                    handleShareAudioVideo(
                                      state?.flowchart_image,
                                      "IMAGE",
                                      `${henceforthApi.FILES.imageOriginal(
                                        state?.flowchart_image,
                                        ""
                                      )}`
                                    )
                                  }
                                  type="text"
                                  shape="circle"
                                  className="p-0"
                                >
                                  <HenceforthIcons.DownloadFill />
                                </Button>
                              </div>{" "}
                            </Flex>
                            <div className="inner_card text-center">
                              <Image
                                preview={false}
                                className="inner_card_img"
                                src={`${henceforthApi.FILES.imageOriginal(
                                  state?.flowchart_image,
                                  ""
                                )}`}
                                alt="Not Found"
                              // preview={{
                              //   src: `${henceforthApi.FILES.imageOriginal(
                              //     state?.flowchart_image,
                              //     ""
                              //   )}`,
                              // }}
                              />
                            </div>
                          </div>
                        </Col>
                      )}
                      {state?.raci_image && (
                        <Col span={24} md={12} lg={8} xl={8} xxl={8}>
                          <div className="common_card h-100">
                            <Flex
                              align="center"
                              justify="space-between"
                              wrap="wrap"
                              className="mb-2"
                            >
                              <TypographyTitle
                                level={5}
                                className="m-0 fs-16 text-nowrap"
                              >{`RACI`}</TypographyTitle>

                              <div className="zoom_btn">
                                <Button
                                  onClick={() => setRaciEditModal(true)}
                                  type="text"
                                  shape="circle"
                                  size="small"
                                >
                                  <HenceforthIcons.EditFill />
                                </Button>
                                <Button className="expand-btn"
                                  onClick={() => setRaciModal(true)}
                                  type="text"
                                  shape="circle"
                                  size="small"
                                >
                                  <HenceforthIcons.Expand />
                                </Button>

                                <Button
                                  size="small"
                                  onClick={() =>
                                    handleShareAudioVideo(
                                      state?.raci_image,
                                      "IMAGE",
                                      `${henceforthApi.FILES.imageOriginal(
                                        state?.raci_image,
                                        ""
                                      )}`
                                    )
                                  }
                                  type="text"
                                  shape="circle"
                                  className="p-0"
                                >
                                  <HenceforthIcons.DownloadFill />
                                </Button>
                              </div>
                            </Flex>
                            <div className="inner_card text-center">
                              <Image
                                className="inner_card_image"
                                src={flowChart.src}
                                alt="Not Found"
                                preview={false}
                              />
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  )}
                </Col>
                {state?.pdf_file && (
                  <Col span={24} lg={7} xl={7} xxl={5}>
                    {/* user info */}
                    <div className="process_user mb-5">
                      <Flex
                        className="user_details mb-2"
                        align="center"
                        gap={8}
                      >
                        <div className="user_image">
                          <Avatar
                            src={
                              state?.creator_id?.profile_pic
                                ? henceforthApi.FILES.imageMedium(
                                  state?.creator_id?.profile_pic,
                                  ""
                                )
                                : profile.src
                            }
                            size={50}
                          />
                        </div>
                        <div className="user_info">
                          <TypographyText className="d-block text-white text-nowrap">
                            Process Owner:
                          </TypographyText>
                          <TypographyText className="d-block text-white text-nowrap fs-16 fw-semibold">
                            {state?.creator_id?.name?.length > 15 ? `${state?.creator_id?.name?.slice(0, 15)}...` : state?.creator_id?.name}
                          </TypographyText>
                        </div>
                      </Flex>
                      <Link
                        target="_blank"
                        href={`/${userType}/process/${router.query._id}/pdf`}
                      >
                        <Button
                          type="primary"
                          block
                          // onClick={() => router.push(`/process/${router.query._id}/pdf`)}
                          ghost
                          icon={<HenceforthIcons.Download />}
                          className="place-items bg-white"
                          size="large"
                        >
                          Download
                        </Button>
                      </Link>
                    </div>

                    {/* chat bot */}
                    <ChatComponents
                      setShareMsgs={setShareMsgs}
                      is_Forward={is_Forward}
                      set_Is_Forward={set_Is_Forward}
                    />
                    {/* intrection button */}
                    <div>
                      {/* comments */}
                      <Button
                        type="primary"
                        ghost
                        size="large"
                        block
                        className="place-items bg-white mb-2"
                        icon={<HenceforthIcons.StickyNote />}
                        onClick={() => setCommentModal(true)}
                      >
                        Comments
                      </Button>
                      {/* Share */}
                      {/* Sharing options */}
                      <div className="sharing_options mt-2">
                        {!shareBtn && (
                          <Button
                            type="link"
                            onClick={() => setShareBtn(true)}
                            ghost
                            size="small"
                            block
                            className="place-items sharing_btn_animate text-primary bg-white p-0"
                            icon={<HenceforthIcons.Share />}
                          >
                            Share Interaction
                          </Button>
                        )}
                        {shareBtn && (
                          <Flex
                            align="center"
                            justify="center"
                            className="sharing_animate"
                            gap={10}
                          >
                            <Button
                              type="primary"
                              className="place-items bg-white department_btn"
                              onClick={() => handleMsgShare("GMAIL")}
                              style={{
                                height: 36,
                                width: 36,
                                minWidth: "unset",
                              }}
                              ghost
                              shape="circle"
                              size="large"
                            >
                              <HenceforthIcons.Gmail />
                            </Button>
                            <Button
                              type="primary"
                              className="place-items bg-white department_btn"
                              onClick={() => setShareBtn(false)}
                              style={{
                                height: 36,
                                width: 36,
                                minWidth: "unset",
                              }}
                              ghost
                              shape="circle"
                              size="large"
                            >
                              <HenceforthIcons.Slack />
                            </Button>
                            <Button
                              type="primary"
                              className="place-items bg-white department_btn"
                              onClick={() => setShareBtn(false)}
                              style={{
                                height: 36,
                                width: 36,
                                minWidth: "unset",
                              }}
                              ghost
                              shape="circle"
                              size="large"
                            >
                              <HenceforthIcons.Outlook />
                            </Button>
                            <Button
                              type="primary"
                              className="place-items bg-white department_btn "
                              // onClick={() => setShareBtn(false)}
                              onClick={() => {
                                navigator?.clipboard?.writeText(
                                  `${typeof window !== "undefined" &&
                                  `${shareMsg}`
                                  }`
                                );
                                Toast.success(`Copied successfully`);
                                setShareBtn(false);
                              }}
                              style={{
                                height: 36,
                                width: 36,
                                minWidth: "unset",
                              }}
                              ghost
                              shape="circle"
                              size="large"
                              //onClick={() => { navigator.clipboard.writeText(res.email); Toast.success('Copied successfully') }}
                            >
                              <HenceforthIcons.CopyFill />
                            </Button>
                          </Flex>
                        )}
                      </div>
                    </div>
                  </Col>
                )}
              </Row>

              {state?.pdf_file && (
                <Col span={24}>
                  <div className="process_details mt-3 mb-5">
                    {!is_edit_Form ? (
                      <Fragment>
                        <Flex
                          className="mb-4"
                          align="center"
                          gap={10}
                          justify="space-between"
                        >
                          <TypographyTitle level={5} className="m-0">
                            Process details
                          </TypographyTitle>
                          {/* <ShareWithSlack /> */}
                          <Button
                            onClick={handleClickEditButton}
                            type="text"
                            className="p-0 h-100"
                            shape="circle"
                          >
                            <HenceforthIcons.EditFill />
                          </Button>
                        </Flex>
                        <Row gutter={[20, 20]}>
                          {processDetails.map((res, index) => (
                            <Col
                              key={index}
                              span={24}
                              md={12}
                              lg={8}
                              xl={6}
                              xxl={6}
                            >
                              <div>
                                <TypographyText
                                  type="secondary"
                                  className="mb-2 d-block"
                                >
                                  {res?.label}
                                </TypographyText>
                                <TypographyText className="d-block fw-semibold text-capitalize">
                                  {res?.text}
                                </TypographyText>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Fragment>
                    ) : (
                      <EditProcessCompo
                        state={state}
                        setState={setState}
                        user={user}
                        onSubmit={onSubmitEditDetails}
                        form={formEditDetails}
                        freqType={freqType}
                        setFreqType={setFreqType}
                        set_Is_Edit_Form={set_Is_Edit_Form}
                        loading={loadingShared}
                      />
                    )}
                    <Row className="shared mb-5 mt-3" gutter={[4, 4]}>
                      <SharedBodyCompo
                        Children={
                          <>
                            {Array.isArray(state?.internal_shares?.data) &&
                              state?.internal_shares?.data?.length ? (
                              state?.internal_shares?.data.map(
                                (res: any, i: number) => (
                                  <SharedCompo
                                    res={res}
                                    index={i}
                                    handleChange={handleChangeInternal}
                                    length={
                                      state?.internal_shares?.data?.length
                                    }
                                  />
                                )
                              )
                            ) : (
                              <div className="px-1 py-1">
                                <div style={{ textAlign: "center" }}>
                                  <p>No data Found</p>
                                </div>
                              </div>
                            )}
                          </>
                        }
                        modalType="INTERNAL"
                        setShareModalOpen={setShareModalOpen}
                        setModalType={setModalType}
                      />
                      <SharedBodyCompo
                        Children={
                          <>
                            {Array.isArray(state?.external_shares.data) &&
                              state?.external_shares?.data?.length ? (
                              state?.external_shares?.data.map(
                                (res: any, i: number) => (
                                  <SharedCompo
                                    res={res}
                                    index={i}
                                    handleChange={handleChangeExternal}
                                    length={
                                      state?.external_shares?.data?.length
                                    }
                                  />
                                )
                              )
                            ) : (
                              <div className="px-1 py-1">
                                <div style={{ textAlign: "center" }}>
                                  <p>No data Found</p>
                                </div>
                              </div>
                            )}
                          </>
                        }
                        modalType="EXTERNAL"
                        setShareModalOpen={setShareModalOpen}
                        setModalType={setModalType}
                      />
                      <SharedBodyCompo
                        Children={
                          <>
                            {Array.isArray(state?.outside_shares.data) &&
                              state?.outside_shares?.data?.length ? (
                              state?.outside_shares?.data.map(
                                (res: any, i: number) => (
                                  <SharedCompo
                                    res={res}
                                    index={i}
                                    handleChange={handleChangeOutside}
                                    length={state?.outside_shares?.data?.length}
                                  />
                                )
                              )
                            ) : (
                              <div className="px-1 py-1">
                                <div style={{ textAlign: "center" }}>
                                  <p>No data Found</p>
                                </div>
                              </div>
                            )}
                          </>
                        }
                        modalType="OUTSIDE"
                        setShareModalOpen={setShareModalOpen}
                        setModalType={setModalType}
                      />
                    </Row>

                    {/* Activity */}
                    {activity.count !== 0 && (
                      <Row gutter={[12, 12]} className="mb-4">
                        <Col span={24}>
                          <TypographyTitle level={5} className="m-0">
                            Activity
                          </TypographyTitle>
                        </Col>
                        {Array.isArray(activity.data) &&
                          activity.data
                            ?.slice(0, 6)
                            ?.map((res: any, index: number) => (
                              <Col key={res._id} span={24}>
                                <ActivityCard {...res} />
                              </Col>
                            ))}
                           <Col>{state?.is_req_alert && <Flex gap={8} justify="start" className="mt-4">
                          <Button onClick={() => submitProcessComplete()}>
                            Accept
                          </Button>
                          <Button onClick={() => setOpenRejectModal(true)}>Reject</Button>
                        </Flex>}</Col>
                      </Row>
                    )}
                  </div>
                </Col>
              )}
            </div>
          ) : (
            <div className="quill-doc bg-white mx-5">
              <AntForm form={form} onFinish={updateContent}>
                <Form.Item
                  name="description_doc"
                  rules={[
                    { required: true, whitespace: true, message: "Please enter Description" },
                  ]}
                  hasFeedback
                >
                  <ReactQuill
                    theme="snow"
                    placeholder="Write description here..."
                  />
                </Form.Item>
                {/* <Flex justify="end"> */}
                <div className="justify-content-end d-flex p-2 gap-2">
                  <Button
                    onClick={() => setShowEditor(false)}
                    type="default"
                    size="large"
                    className="d-flex align-items-center"
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="d-flex align-items-center"
                  >
                    {`${!state?.pdf_file ? "Update and Generate Flow" : "Update"}`}
                  </Button>
                  {/* <Button
                    loading={loading}
                    onClick={() => setShowEditor(false)}
                    type="default"
                    className="mt-3 w-25"
                    block
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    className="mt-3 mb-3 w-25"
                    block
                  >
                    Update
                  </Button> */}
                </div>
                {/* </Flex> */}
              </AntForm>
            </div>
          )}
        </section>
      </Spin>

      {/* process title change modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Edit Process
          </TypographyTitle>
        }
        maskClosable={false}
        closeIcon={false}
        centered
        footer={null}
        open={processEditor}
        onOk={() => setProcessEditor(false)}
        onCancel={() => setProcessEditor(false)}
      >
        <AntForm size="large" initialValues={{ process_desc: state?.description }} form={titleEditForm} layout="vertical" className="mt-4" onFinish={handleProcessTitleChange} >
          <Row gutter={[10, 0]}>
            <Col span={24}>
              <FormItem name="process_title"
                label={"Process Title"}
                className="mb-0"
                rules={[
                  { message: "Please enter title", whitespace: true, required: true },
                ]}>
                <Input onChange={(e:any)=>debounceTitleChange(e.target.value)} className="mb-3 border" placeholder="Enter title" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem name="process_desc"
              prefixCls="process"
                label={
                  <Flex
                    className="my-2 "
                    justify="space-between"
                    align="center"
                    gap={160}
                  >
                    <TypographyText>Process Description</TypographyText>
                    <span>
                      <Button
                        type="primary"
                        loading={loadingAI}
                        onClick={generateDescAI}
                        block
                        size="small"
                      >
                        Generate through AI
                      </Button>
                    </span>
                  </Flex>
                }
                className="mb-0"
                rules={[
                  { message: "Please enter Description", whitespace: true, required: true },
                ]}>
                 <TextArea
                //ref={inputRef}
                placeholder="Enter the description here..."
                className="rounded-3 border border-2"
                rows={12}
              />
              </FormItem>
            </Col>
          </Row>



          <Button className="mt-2" loading={loading} type="primary" htmlType="submit" block>
            Submit
          </Button>
        </AntForm>
      </Modal>
      <EditRaciModal setOpen={setRaciEditModal} open={raciEditModal} loading={loading} submit={handleEditRaci} form={editRaciForm} />
      {/* comment modal */}
      <CommentModal
        open={commentModal}
        initData={intializeComment}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        form={formComment}
        setOpen={setCommentModal}
        loading={commentLoading}
        list={comment}
        addComment={addComment}
        updatedInput={updatedInput}
        setUpdatedInput={setUpdatedInput}
        handleDoNothing={handleDoNothing}
        handleInvite={handleInvite}
      />
      {/* Decline Reason modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Decline Reason
          </TypographyTitle>
        }
        centered
        footer={null}
        open={reasonModal}
        onOk={() => setReasonModal(false)}
        onCancel={() => setReasonModal(false)}
      >
        <AntForm size="large" className="mt-4">
          <FormItem>
            <TextArea
              placeholder="Enter the reason..."
              className="rounded-4 border"
              rows={6}
            />
          </FormItem>
          <Button type="primary" block>
            Submit
          </Button>
        </AntForm>
      </Modal>

      {/* Share modal */}

      <SharedProcessModal
        form={formModal}
        type={modalType}
        loading={loadingShared}
        name={`Shared ${capitalizeFirstLetter(modalType)}`}
        shareModalOpen={shareModalOpen}
        setShareModalOpen={setShareModalOpen}
        handleChangeInternal={
          modalType == "INTERNAL"
            ? handleChangeInternal
            : modalType == "EXTERNAL"
              ? handleChangeExternal
              : modalType == "OUTSIDE"
                ? handleChangeOutside
                : ""
        }
        handleChangeShared={
          modalType == "INTERNAL"
            ? handleChangeSharedInternal
            : modalType == "EXTERNAL"
              ? handleChangeSharedExternal
              : modalType == "OUTSIDE"
                ? handleChangeSharedOutside
                : ""
        }
        onchangeItems={onchangeItems}
        user={modalType == "INTERNAL"
          ? internalUsers
          : modalType == "EXTERNAL"
            ?externalUsers
            : modalType == "OUTSIDE"
              ? user
              : ""}
        selectedItemsInternal={
          modalType == "INTERNAL"
            ? selectedItemsInternal
            : modalType == "EXTERNAL"
              ? selectedItemsExternal
              : modalType == "OUTSIDE"
                ? selectedItemsOutside
                : ""
        }
      />
      <Modal
        title={
          <TypographyText className="m-0 d-block text-center">
            Flow Chart Image
          </TypographyText>
        }
        centered
        footer={null}
        open={flowImageModal}
        onOk={() => setFlowImageModal(false)}
        onCancel={() => setFlowImageModal(false)}
      >
        <Image
          preview={false}
          className="inner_card_img ms-5"
          src={`${henceforthApi.FILES.imageOriginal(
            state?.flowchart_image,
            ""
          )}`}
          alt="Not Found"
        />
      </Modal>
      {/* <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            RACI
          </TypographyTitle>
        }
        width={700}
        centered
        footer={null}
        open={raciModal}
        onOk={() => setRaciModal(false)}
        onCancel={() => setRaciModal(false)}
      >
        <div className="raci-component">
          <Flex justify="space-between" gap={40}>
            <div className="raci-users">
              <Avatar
                src={
                  state?.responsible?.profile_pic
                    ? henceforthApi.FILES.imageMedium(
                      state?.responsible?.profile_pic,
                      ""
                    )
                    : profile.src
                }
                size={100}
              />
              <TypographyTitle level={5} className="m-0 text-center mt-2">
                {state?.responsible?.name ??
                  state?.responsible?.first_name ??
                  "N/A"}
              </TypographyTitle>
            </div>
            <div className="raci-users">
              <Avatar
                src={
                  state?.accountable?.profile_pic
                    ? henceforthApi.FILES.imageMedium(
                      state?.accountable?.profile_pic,
                      ""
                    )
                    : profile.src
                }
                size={100}
              />
              <TypographyTitle level={5} className="m-0 text-center mt-2">
                {state?.accountable?.name ??
                  state?.accountable?.first_name ??
                  "N/A"}
              </TypographyTitle>
            </div>
            <div className="raci-users">
              <Avatar
                src={
                  state?.consulted?.profile_pic
                    ? henceforthApi.FILES.imageMedium(
                      state?.consulted?.profile_pic,
                      ""
                    )
                    : profile.src
                }
                size={100}
              />
              <TypographyTitle level={5} className="m-0 text-center mt-2">
                {state?.consulted?.name ??
                  state?.consulted?.first_name ??
                  "N/A"}
              </TypographyTitle>
            </div>
            <div className="raci-users">
              <Avatar
                src={
                  state?.informed?.profile_pic
                    ? henceforthApi.FILES.imageMedium(
                      state?.informed?.profile_pic,
                      ""
                    )
                    : profile.src
                }
                size={100}
              />
              <TypographyTitle level={5} className="m-0 text-center mt-2">
                {state?.informed?.name ?? state?.informed?.first_name ?? "N/A"}
              </TypographyTitle>
            </div>
          </Flex>

          <Flex justify="space-between" gap={40}>
            <div className="raci-R raci-char">R</div>
            <div className="raci-A raci-char">A</div>
            <div className="raci-C raci-char">C</div>
            <div className="raci-I raci-char">I</div>
          </Flex>
        </div>
      </Modal> */}
           <RACIModal  open={raciModal}
        onOk={() => setRaciModal(false)}
        onCancel={() => setRaciModal(false)}
        state={state}
        />
      {/* Process reject modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Reject reason
          </TypographyTitle>
        }
        maskClosable={false}
        centered
        footer={null}
        open={openRejectModal}
        onOk={() => setOpenRejectModal(false)}
        onCancel={() => setOpenRejectModal(false)}
      >
        <AntForm size="large" layout="vertical" className="mt-3" onFinish={submitProcessReject} form={form}>

          <FormItem name="reject_reason"
          label={"Reject reason"}
            className="mb-4"
            rules={[
              { message: "Please enter reason", whitespace: true, required: true },
            ]}>
            <Input className="border" placeholder="Please enter reason" />
          </FormItem>

          <Button loading={loading} type="primary" htmlType="submit" block>
            Submit
          </Button>
        </AntForm>
      </Modal>
    </React.Fragment>
  );
};
View.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    let cookies = context.req.cookies;
    let tokenn = cookies[COOKIES_USER_RAIZE_ACCESS_TOKEN]
    const token = context.query?.authorization ?? tokenn;
        henceforthApi.setToken(String(token));
    if (token) {
      henceforthApi.setToken(String(token));
    }
    const apiRes = await henceforthApi.Process.getById(String(context.query._id));
    if (!apiRes?.media_url) {
      return{
        redirect: {
          destination: `/member/process/add?step=1&pid=${apiRes?._id}&recordable=true`+
          (context.query?.authorization ? `&authorization=${context.query.authorization}` : ''),
          permanent: false,
        },
      }
    }else{
      return { props: { ...apiRes } };
    }
  } catch (error) {
    return {
      redirect: {
        destination: `/member/auth/login`,
        permanent: false,
      },
    };
  }
};
export default View;
