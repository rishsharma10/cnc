import CommonStep1 from "@/components/Step-1";
import CommonStep2 from "@/components/Step-2";
import CommonStep3 from "@/components/Step-3";
import MainLayout from "@/components/common/MainLayout";
import { GlobalContext } from "@/context/Provider";
import { Button, Col, Row, Steps } from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { Form, message, theme } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";

const ProcessSteps = () => {
  const router = useRouter();
  const [firstForm] = Form.useForm()
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(Number(router.query?.step ?? 0));
  const [selectedItemsInternal, setSelectedItemsInternal] = React.useState({
    data: []
  })
  const [selectedItemsExternal, setSelectedItemsExternal] = React.useState({
    data: []
  })
  const [frequency, setFrequency] = useState('');
  const { Toast, userType, userInfo } = useContext(GlobalContext);
  const [processData, setProcessData] = useState()as any;
  const [assignType, setAssignType] = useState("");
  const [checkRedirect,setCheckRedirect]=useState(true)
  const [data, setData] = useState({ count: 0, data: [] } as any)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (values: any) => {
    console.log(router.query.step, "detailsoffirst")
    if (Number(router.query.step) == 1) {
        await stepTwo(values)
    } else if (Number(router.query.step) == 2) {
      await stepThree(values)
    } else {
      await stepOne(values)
    }
  };

  const getUserRole = async (id: any) => {
    try {

      const apiRes = await henceforthApi.User.teammatesDetails(String(id));
     
      return apiRes?.role;
    } catch (error) {
      Toast.error(error)
    }

  }

  // useEffect(()=>{
  //   async function getprocessDetails(){

  //     const apiRes=await henceforthApi.Process.getById(String(router.query?.pid));
  //     setProcessData(apiRes?.data);

  //   }
  //   getprocessDetails()
  // },[router.query?.pid])
  const stepOne = async (value: any) => {

    const items = {
      ...value,
      assign_to: value.assign_to,
      assign_type: assignType,
    }
    console.log(items.assign_to, "assigntouser")
  let userRole=null;
    if (value?.assign_to) {
       userRole= await getUserRole(value?.assign_to);
       console.log(userRole,"userrole")
    }


    if (!assignType?.trim()) {
      return Toast.warning("Please select assign process")
    }
    // console.log(items, "itemsitemsrouter.replace(`/admin/process/add?step=1&pid=${apiRes?._id}`);items");
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Process.create(items);
      if (assignType === "unassigned") {
        return router.push(`/${userType}/process/list/all/1`)
      }
      // next();


      if (assignType === "to_myself") {
        setCurrent((current) => current + 1);
        
     
        return router.replace(`/${userType}/process/add?step=1&pid=${apiRes?._id}`);
      }else if( userRole==="COMPANY_ADMIN"||userRole==="TEAM_ADMIN" ){
        
        return router.replace(`/${userType}/process/list/all/1`);
      }else if( userRole==="MEMBER"){
        setCurrent((current) => current + 2);
    
        return router.replace(`/${userType}/process/add?step=2&pid=${apiRes?._id}&user_type=member`);
      }

    } catch (error) {
      
      Toast.error(error)
    }
  }
  const stepTwo = async (value: any) => {
    debugger
    const dateString = value?.estimate_time?.$d;
    const date = new Date(dateString);
    const timestamp = date.getTime();
  const { department_id, ...rest } = value;
    console.log("steptwo", value)
    const items = {
      ...rest,
      estimate_time: timestamp,
      estimate_time_type: `hour`,
      //frequency_time : dayjs(value?.frequency_time).valueOf()
    }
    items.frequency_time = frequency =="Daily" ? dayjs(new Date()).valueOf() : frequency == "Weekly" ? dayjs(value?.frequency_time).valueOf() : dayjs(value?.frequency_time).valueOf()
    items.accountable=items?.accountable[0];
    items.hour=Number(dayjs(timestamp).hour())
    items.system_used=items?.system_used[0];
    //items.conn_dep_id=Array.isArray(value?.conn_dep_id) && value?.conn_dep_id?.length ?value?.conn_dep_id[0]:null;
    console.log("hello",assignType,"step2assigntype")
    //delete items.department_id
    console.log(items, "itemsitemsitems", router.query.pid);
    if(Array.isArray(items.conn_dep_id)){
      if(items.conn_dep_id.length){
        items.conn_dep_id=value?.conn_dep_id[0]
      }else{
        items.conn_dep_id=null
      }
    }else{
      items.conn_dep_id=value.conn_dep_id;
    }
    // return
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Process.processUpdate(String(router.query.pid), items);
      console.log(apiRes, "step2apiRes")
      if (assignType === "to_myself") {
        setCurrent((current) => current + 1)
        router.replace(`/${userType}/process/add?step=2&pid=${apiRes?._id}&recordable=true`);
      } else{
        setCurrent((current) => current + 1)
        router.replace(`/${userType}/process/add?step=2&pid=${apiRes?._id}&recordable=true`);
      } 
      
    } catch (error) {
      
      Toast.error(error)

    }finally{
      
    }
  }
  console.log(data, "data")

  const stepThree = async (value: any) => {
    debugger
    const items = {
      ...value,
      share_internaly: Array.isArray(selectedItemsInternal.data) && selectedItemsInternal.data.map((res: any) => { return { user_id: res.user_id, access_type: res.access_type } }),
      share_externaly: Array.isArray(selectedItemsExternal.data) && selectedItemsExternal.data.map((res: any) => { return { user_id: res.user_id, access_type: res.access_type } })
    }
    console.log(items, "itemsitemsitems3");
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Process.processComplete(String(router.query.pid), items);

      if (assignType === "to_myself"||router.query?.recordable==="true") {
        return router.replace(`/${userType}/process/${router.query?.pid}/recording`)
      } else {
        return router.push(`/${userType}/process/list/all/1`)

      }
    } catch (error) {
    
      Toast.error(error)

    }finally{
    
    }
  }

    
  const customStepStyle = `
  .ant-steps-item-disabled .ant-steps-item-container {
    cursor: default !important;
  }
  .ant-steps-item-disabled .ant-steps-item-icon {
    cursor: default !important;
  }
`;
  // const addProcess = async () => {
  //   if (!processTitle) return Toast.warning("Please Enter Process Title");
  //   setLoading(true);
  //   try {
  //     let apiRes = await henceforthApi.Demo.createProcess({
  //       name: processTitle,
  //     });
  //     next();
  //     router.replace(`/${userType}/process/add?pid=${apiRes?._id}`);
  //     setLoading(false);
  //   } catch (error) {
  //   }
  // };
    useEffect(() => {
    setLoading(false)
  },[router.query.step])

  const steps = [
    {
      title: "1. Assigned to",
      content: <CommonStep1 onSubmit={onSubmit} setData={setData} loading={loading} setAssignType={setAssignType} assignType={assignType} form={firstForm} />,
    },
    {
      title: "2. Process Details",
      content: <CommonStep2 form={form} onSubmit={onSubmit} loading={loading} setAssignType={setAssignType} assignType={assignType} frequency={frequency} setFrequency={setFrequency}/>,
    },
    {
      title: "3. Access & Security",
      content: <CommonStep3 onSubmit={onSubmit} loading={loading} selectedItemsInternal={selectedItemsInternal} setAssignType={setAssignType} assignType={assignType} setSelectedItemsInternal={setSelectedItemsInternal} selectedItemsExternal={selectedItemsExternal} setSelectedItemsExternal={setSelectedItemsExternal} />,
    },
  ];
  const initDetails = async () => {
    try {
      let apiRes = await henceforthApi.Process.getById(String(router.query.pid))
      if(!apiRes?.assign_myself){
        setCheckRedirect(false)
      }
      form.setFieldValue("title", apiRes?.title)
      form.setFieldValue("department_id", apiRes?.department_id?._id)
      console.log(apiRes, "apiresss");

    } catch (error) {

    }
  }


  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
    {router?.query?.step==="1" ?router.replace(`/${userType}/process/add`,undefined,{shallow:true}):router.replace(`/${userType}/process/add?step=1&pid=${router.query.pid}`)}
  };

  const items = steps.map((item, index) => ({ 
    key: item.title, 
    title: item.title,
    disabled: index > current
  }));

  const navigateToStep = (stepNumber: number) => {
    if((!checkRedirect && stepNumber===0 && !router.query?.user_type) ||(router.query?.user_type==="member"&&stepNumber===1) ){
      return;
    }
  
    if (stepNumber < current) {
      setCurrent(stepNumber);
      router.push(`/${userType}/process/add?step=${stepNumber}&pid=${router.query.pid}`, undefined, { shallow: true });
    }
  };
  React.useEffect(() => {
    if (router.query.pid) {
      initDetails()
    }
  }, [router.query.pid])

  return (
    <React.Fragment>
      <section className="tep1">
        <div className="container-fluid">
          <Row>
            <Col span={24} md={20} lg={16} xl={14} xxl={12}>
              <Steps onChange={(value) => navigateToStep(value)} current={current} items={items} />
              <div>{steps[current]?.content}</div>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
ProcessSteps.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ProcessSteps;
