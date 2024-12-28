import {
  AntForm,
  Button,
  Col,
  Flex,
  FormItem,
  Input,
  Row,
  Select,
  Space,
  DatePicker,
  TextArea,
  TimePicker,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { useRef, useState, useContext, Fragment } from "react";
import HenceforthIcons, { InfoIcon } from "./HenceforthIcons";
import henceforthApi from "@/utils/henceforthApi";
import { InputRef, TimePickerProps, DatePickerProps, Tooltip } from "antd";
import systems from "@/utils/SystemUsed.json";
import dayjs from "dayjs"
import 'dayjs/locale/en';
import { GlobalContext } from "@/context/Provider";

import { useRouter } from "next/router";


const CommonStep2 = (props: any) => {
  const [systems,setSystems]=useState()as any;
  const { userType,userInfo } = useContext(GlobalContext);
  console.log(props, "stepprops2")
  const router = useRouter()
  const [state, setState] = React.useState({
    count: 0,
    data: [],
  });

  const getSystems=async(searchValue:any)=>{
    try {
      const apiRes=await henceforthApi.SuperAdmin.getSystems(searchValue?searchValue:null);
     
     setSystems( apiRes?.data?.data?.map((system:any) => ({
        label: system.title,  
        value: system.title,   
      })))
    } catch (error) {
      
    }
  }
  // const [process, setProcess] = React.useState<any>({
  //   count: 0,
  //   data: [],
  // });
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  
  const [triggers,setTriggers]=React.useState<any>({
    count:0,
    data:[]
  })
  const disabledDate = (current: any) => {
    const today = dayjs().startOf('day'); // Get today's date (start of the day)
    const oneWeekLater = dayjs().add(7, 'day').endOf('day'); // One week from today (end of the day)
  
    // Disable dates that are before today or after one week from today
    return current < today || current > oneWeekLater;
  };
  const disabledMonth = (current: any) => {
    const startOfMonth = dayjs().startOf('month'); // First day of the current month
    const endOfMonth = dayjs().endOf('month'); // Last day of the current month
  
    // Disable dates that are outside the current month
    return current < startOfMonth || current > endOfMonth;
  };  
  // const handleDateChange = (date:any) => {
  //   if (date) {
  //     const timestampInMillis = dayjs(date).valueOf();
  //     console.log(timestampInMillis); // The timestamp in milliseconds
  //   }
  // };
  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  const [weekRange, setWeekRange] = useState<string>('');
  const onChange = (date: any | null) => {
    if (date) {
      // Find the previous Sunday
      const startOfWeek = dayjs(date).startOf('week').day(0);
      // Find the next Monday
      const endOfWeek = dayjs(date).startOf('week').day(1).add(6, 'days');
      // Format the week range and set it to state
      const formattedRange = `${startOfWeek.format('dddd, MMMM Do')} - ${endOfWeek.format('dddd, MMMM Do')}`;
      setWeekRange(formattedRange);
    }
  };
  const initData = async () => {
    try {
      let apiRes = await henceforthApi.Department.listing();
      setState(apiRes);
    } catch (error) { }
  };


  let timer: any;
  const changeTitle = async (value: any) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(async () => {
      try {
        let apiRes = await henceforthApi.Process.editProcess(
          String(router.query.pid),
          { title: value }
        );
      }
      catch {
         
      }
    }, 800)
  }

  const changeOwnedDepartment=async(value:any)=>{
    try {
      let apiRes = await henceforthApi.Process.editProcess(
        String(router.query.pid),
        { department_id:value}
      );
    } catch (error) {
      
    }
  }
  const onchangeTimepicker = (value:any) =>{ 
    console.log(value,"valueueuueueu");
    if(value?.$H == 8){
      if(value?.$m > 0){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
    

  }

  const getTriggerListing=async()=>{
    try {
      const apiRes=await henceforthApi.Process.getTriggers();
      setTriggers({
        count: apiRes?.count,
        data: [...[{ _id: "No trigger", title: "No trigger" }], ...apiRes.data],
      });

    } catch (error) {
      
    }
  }

  const initDataUser = async () => {
    debugger;
    try {
      let apiRes = await henceforthApi.User.allUserListing();
      setUser(apiRes?.data);
    } catch (error) { }
  };
  console.log(user, "user");

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  // const initDataProcess = async () => {
  //   debugger;
  //   try {
  //     let urlSearchParam = new URLSearchParams();

  //     //   if (query.pagination) {
  //     //     urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
  //     //   }
  //     //   if (query.search) {
  //     //     urlSearchParam.set("search", String(query.search));
  //     //   }
  //     //   if (query.new_filter) {
  //     //     urlSearchParam.set("new_filter", String(query.new_filter));
  //     //   }
  //     //   urlSearchParam.set("limit", String(router.query.limit ?? 10));
  //     //   urlSearchParam.set("filter", String(query.type));
  //     let apiRes = await henceforthApi.Process.processList(
  //       urlSearchParam.toString()
  //     );
  //     setProcess({
  //       count: apiRes?.count,
  //       data: [...[{ _id: "No trigger", title: "No trigger" }], ...apiRes.data],
  //     });
  //   } catch (error) {
  //   } finally {
  //     //   setLoading(false);
  //   }
  // };
  const [loadingAI, setLoadingAI] = useState(false)
  const inputRef = useRef<InputRef>(null);
  const generateDescAI = async () => {

    try {
      // setLoadingAI(true)
      // let apiRes = await henceforthApi.Process.generateAI(String(router.query.pid),{})
      // props.form.setFieldValue("description",apiRes.data)
      // props.form.setFields([
      //     {
      //       name: ['description'],
      //       errors: []
      //     },
      //   ]);
      setLoadingAI(true);
      let apiRes = await henceforthApi.Process.generateAI(
        String(router.query.pid),
        {}
      );
      props.form.setFieldValue("description", apiRes.data);
      props.form.setFields([
        {
          name: ["description"],
          errors: [],
        },
      ]);

    } catch (error) {

    } finally {
      setLoadingAI(false)
    }
  }
  const disabledHours = () => {
    let disabled = [];
    for (let i = 9; i < 24; i++) {
      disabled.push(i); // Disable hours 9 to 23
    }
    return disabled
  }

  const options = Array.isArray(user?.data) &&
  (user?.data
      .map((res: any) => {
          let isDisabled = false;

          if (userInfo?.role === "COMPANY_ADMIN") {
              // COMPANY_ADMIN can select TEAM_ADMIN and MEMBER
              isDisabled = !(res.role === "TEAM_ADMIN" || res.role === "MEMBER");
          } else if (userInfo?.role === "TEAM_ADMIN") {
              // TEAM_ADMIN can only select MEMBER
              isDisabled = res.role !== "MEMBER";
          } else if (userInfo?.role === "MEMBER") {
              // MEMBER can only select MEMBER
              isDisabled = res.role !== "MEMBER";
          }

          return {
              value: res._id,
              label: res?.email
                  ? res?.email
                  : res.first_name
                      ? `${res?.first_name} ${res?.last_name ?? ""}`
                      : res?.email
                          ? res?.email
                          : "N/A",
              disabled: isDisabled,
          };
      })
      // Separate enabled and disabled options and sort them
      .sort((a: any, b: any) =>  (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1)) as any);



      const checkIfSystemExists = async(newSystem:any) => {
        try {
          const apiRes=await henceforthApi.SuperAdmin.getSystems(String(newSystem));
         
          return apiRes?.data?.data?.length > 0;
          
        } catch (error) {
          return false
        }
        //return systems.some((system:any) => system.label.toLowerCase() === newSystem.toLowerCase());
      };
       let searchTimer:any;
      const debounceOnSearch=async(title:any)=>{
          if(searchTimer){
            clearTimeout(searchTimer)
          }
          searchTimer=setTimeout(()=>{
            getSystems(String(title))
          },200)
      }
      const checkForSystemInRecord=async(value:any)=>{
        const exists = await checkIfSystemExists(value);  // Await here
          if (!exists) {
            try {
              const apiRes = await henceforthApi.SuperAdmin.createSystem({ title: value });
              console.log("System created", apiRes);
              await getSystems(null)
            } catch (error) {
              console.error("Error creating system", error);
            }
        }
    
      }
    
  React.useEffect(() => {
    initData();
    getTriggerListing();
    initDataUser()
    getSystems(null)
  }, []);

  return (
    <Fragment>
      <AntForm
        size="large"
        layout="vertical"
        className="pt-4"
        onFinish={props?.onSubmit}
        scrollToFirstError
        form={props?.form}
      >
        <Row gutter={[10, 0]}>
          <Col span={24} lg={12}>
          <FormItem name="title" className="mb-1" label={"Process Title"} rules={[
              {
                message: "Please enter title",
                // whitespace: true,
                required: true,
              },
            ]}>
              <Input placeholder="Title" onChange={(e: any) => changeTitle(e.target.value)} />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="department_id"
              className="mb-1"
              label={"Owned Department"}
              rules={[
                {
                  message: "Please select department",
                  //whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
               // disabled
                placeholder="Select department"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                onChange={(value:any)=>changeOwnedDepartment(value)}
                options={
                  Array.isArray(state.data) &&
                  (state.data.map((res: any) => {
                    return {
                      value: res._id,
                      label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                    };
                  }) as any)
                }
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              validateTrigger="onChange"
              prefixCls="process"
              name="description"
              label={
                <Flex className="my-2 w-100" justify="space-between" align="center" gap={12}>
                  <TypographyText>Process Description</TypographyText>
                  <span><Button
                    type="primary"
                    loading={loadingAI}
                    onClick={generateDescAI}
                    block
                    size="small"
                  >
                    Generate through AI
                  </Button></span>

                </Flex>

              }
              rules={[
                {
                  message: "Please enter description",
                  whitespace: true,
                  required: true,
                },
              ]}
            >

              <TextArea
                ref={inputRef}
                placeholder="Enter the description here..."
                className="rounded-3"
                rows={6}
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="trigger"
              className="mb-1"
              label={"Trigger"}
              rules={[
                {
                  message: "Please select trigger",
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              {/* <Input placeholder="Enter trigger" /> */}
              <Select
                placeholder="Select Trigger"
                showSearch
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={
                  Array.isArray(triggers?.data) &&
                  (triggers?.data.map((res: any) => {
                    return {
                      value: res.title,
                      label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                    };
                  }) as any)
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="conn_dep_id"
              className="mb-1"
              label={"Connected Department"}
              rules={[
                {
                  message: "Please select connected department",
                 // whitespace: true,
                  required: false,
                },
              ]}
            >
              <Select
                mode="multiple"
                maxLength={1}
                maxCount={1}
                placeholder="Select connected department"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                showSearch
                options={
                  Array.isArray(state.data) &&
                  (state?.data.map((res: any) => {
                    return {
                      value: res?._id,
                      label: res.title?.length > 25 ? `${res?.title?.slice(0,25)}...` : res?.title
                    };
                  }) as any)
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="responsible"
              className="mb-1"
              label={<Tooltip color="#9778F7" title='The person or people who are responsible for completing the task or making a decision. They do the work.'><Flex align="center" gap={8}><div>Responsible</div><InfoIcon /></Flex></Tooltip>}
              rules={[
                {
                  message: "Please select responsible",
         
                  required: true,
                },
              ]}
            >
              <Select
              mode="multiple"
                placeholder="Select an employee"
                showSearch
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={
                 options
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="accountable"
              className="mb-1"
              label={<Tooltip color="#9778F7" title={` The person who is ultimately accountable for the task's success. They delegate work and ensure it's completed but aren't necessarily involved in the day-to-day work.`}><Flex align="center" gap={8}><div>Accountable</div><InfoIcon /></Flex></Tooltip>}
              rules={[
                {
                  message: "Please select accountable",
                  // whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
              mode="multiple"
              maxCount={1}
              maxTagCount={1}
                placeholder="Select an employee"
                showSearch
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={
                 options
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="consulted"
              className="mb-1"
              label={<Tooltip color="#9778F7" title={`People whose opinions are sought before a decision is made or a task is completed. They offer guidance and expertise.`}><Flex align="center" gap={8}><div>Consulted</div><InfoIcon /></Flex></Tooltip>}
              rules={[
                {
                  message: "Please select consulted",
                  // whitespace: true,
                  required: false,
                },
              ]}
            >
              <Select
               mode="multiple"
                placeholder="Select an employee"
                showSearch
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={
                 options
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="informed"
              className="mb-1"
              label={<Tooltip color="#9778F7" title={`Individuals who need to be kept informed of progress or decisions, but they are not directly involved in the task's execution.`}><Flex align="center" gap={8}><div>Informed</div><InfoIcon /></Flex></Tooltip>}
              rules={[
                {
                  message: "Please select informed",
                  //whitespace: true,
                  required: false,
                },
              ]}
            >
              <Select
              mode="multiple"
                placeholder="Select an employee"
                showSearch
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={
                 options
                }
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
          <FormItem
              name="estimate_time"
              className="mb-1"
              label={"Estimated Time"}
                 rules={[
                  {
                    message: "Please select estimated time",
                    //whitespace: true,
                    required: true,
                  },
                () => ({
                  validator(_, value) {
                    console.log(value,"valueee")
                    if (value?.$H==0 && value?.$m==0) {
                        return Promise.reject(
                          `Estimated time should not be 0`
                        );
                    }
                    if (onchangeTimepicker(value)) {
                        return Promise.reject(
                          `Estimated time should not exceed 8 hours.`
                        );
                    }
                      return Promise.resolve();
                  },
                }),
              ]}
            >
              <TimePicker
                showNow={false}
                renderExtraFooter={() => (
                  <div className="d-flex">
                    <div className="w-100 text-center border-end">Hrs</div>
                    <div className="w-100 text-center">Min</div>
                  </div>
                )}
                suffixIcon={<HenceforthIcons.Clock />}
                className="w-100"
                format={`HH:mm`}
                hideDisabledOptions
                disabledHours={disabledHours}
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="system_used"
              className="mb-1"
              label={"System Used"}
              rules={[
                {
                  message: "Please select system used",
                  //whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                onSearch={(value)=>debounceOnSearch(value)}
                onSelect={(value)=>checkForSystemInRecord(value)}
                onDeselect={()=>getSystems(null)}
                mode="tags"
                maxCount={1}
                maxLength={1}
                placeholder="Select system or type your own"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={systems}
                notFoundContent={null}
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem
              name="frequency"
              className="mb-1"
              label={"Frequency"}
              rules={[
                {
                  message: "Please enter frequency",
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select frequency"
                onChange={(value:any) => props?.setFrequency(value)}
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={[
                  { value: "Daily", label: "Daily" },
                  { value: "Weekly", label: "Weekly" },
                  { value: "Monthly", label: "Monthly" },
                ]}
              />
            </FormItem>
          </Col>
          {props?.frequency == "Monthly" && <Col span={24} lg={12}>
            <FormItem
              name="frequency_time"
              className="mb-1"
              label={"Frequency Date"}
              rules={[
                {
                  message: "Please select frequency date",
                  required: true,
                },
              ]}
            >
            <DatePicker format={(value) => dayjs(value).format('DD/MM/YYYY')} prefixCls="custom-pickerr" disabledDate={disabledMonth} showTime={false} showToday={false} superNextIcon={false} superPrevIcon={false} className="w-100" />
            </FormItem>
          </Col>}
          {props?.frequency == "Weekly" && <Col span={24} lg={12}>
            <FormItem
              name="frequency_time"
              className="mb-1"
              label={"Frequency Date"}
              rules={[
                {
                  message: "Please select frequency date",
                  required: true,
                },
              ]}
            >
             <DatePicker className="w-100" prefixCls="custom-pickerr" placeholder="Select week" disabledDate={disabledDate}   format={(value) => dayjs(value).format('dddd')} showTime={false} showToday={false} superNextIcon={false} superPrevIcon={false}  />
            </FormItem>
          </Col>}
          {/* <Col span={24} lg={12}>
                        <FormItem name="experience_level" className="mb-1" label={'Experience Level'}
                            rules={[
                                { message: "Please select exp level", whitespace: true, required: true },
                            ]}>
                            <Select
                                placeholder="Level of difficulty"
                                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                                options={[
                                    { value: 'easy', label: 'Easy' },
                                    { value: 'normal', label: 'Normal' },
                                    { value: 'hard', label: 'Hard' },
                                ]}
                            />
                        </FormItem>
                    </Col> */}
        </Row>

        <Space
          size={"small"}
          direction="vertical"
          className="assign_process w-100 mt-3"
        >
          <Button
            htmlType="submit"
            type="primary"
            loading={props?.loading}
            disabled={props?.loading}
           
            className="mt-3"
            block
          >
            {router.query?.recordable === "true" ? "Record" : "Next"}


          </Button>
        </Space>
      </AntForm>
    </Fragment>
  );
};
export default CommonStep2;
