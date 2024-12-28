import {
  AntForm,
  Button,
  Col,
  Empty,
  Flex,
  FormItem,
  Input,
  Row,
  Select,
  TimePicker,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
//import systems from "@/utils/SystemUsed.json"
import React, { Fragment, useState } from "react";
import dayjs from "dayjs";
import HenceforthIcons from "./HenceforthIcons";
import henceforthApi from "@/utils/henceforthApi";
import { DatePicker } from "antd";

const EditProcessCompo = ({
  state,
  user,
  onSubmit,
  form,
  loading,
  freqType,
  setFreqType,
  set_Is_Edit_Form,
}: any) => {
  const [department, setDepartment] = useState({
    count: 0,
    data: [],
  });
  const [systems,setSystems]=useState()as any;
  const initData = async () => {
    debugger;
    try {
      let apiRes = await henceforthApi.Department.listing();
      console.log("departmentall", apiRes)
      setDepartment(apiRes);
    } catch (error) { }
  };
  const [triggers, setTriggers] = React.useState<any>({
    count: 0,
    data: [],
  });
  const getTriggerDetails = async () => {
    
    try {
      let urlSearchParam = new URLSearchParams();
      let apiRes = await henceforthApi.Process.getTriggers()
      setTriggers({
        count: apiRes?.count,
        data: [...[{ _id: "NO_TRIGGER", title: "No trigger" }], ...apiRes.data]
      });
    } catch (error) {
    } finally {
      //   setLoading(false);
    }
  };
  console.log(state, "statatatat");
  // React.useEffect(()=>{

  //     form.setFieldValue("frequency_time","")

  // },[freqType])

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
    const exists = await checkIfSystemExists(value); 
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
   getTriggerDetails()
   getSystems(null)
  }, []);
  // console.log(user, "userrrr");
  // console.log(state, "33333333");
  const dataArr = [
    { value: "0 - Open Access", label: "0 - Open Access" },
    { value: "1 - Limited Access", label: "1 - Limited Access" },
    { value: "2 - Confidential", label: "2 - Confidential" },
    { value: "3 - Restricted", label: "3 - Restricted" },
    { value: "4 - Top Secret", label: "4 - Top Secret" },
  ];
  const disabledHours = () => {
    let disabled = [];
    for (let i = 9; i < 24; i++) {
      disabled.push(i); // Disable hours 9 to 23
    }
    return disabled;
  };
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
  const onchangeTimepicker = (value: any) => {
    console.log(value, "valueueuueueu");
    if (value?.$H == 8) {
      if (value?.$m > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }


  }
  return (
    <Fragment>
      <Flex className="mb-4" align="center" gap={10} justify="space-between">
        <TypographyTitle level={5} className="m-0">
          Process details
        </TypographyTitle>
        {/* <ShareWithSlack /> */}
        {/* <Button type="text" className="p-0 h-100" shape="circle"><HenceforthIcons.EditFill /></Button> */}
      </Flex>
      <AntForm
        size="large"
        layout="vertical"
        className="pt-4"
        form={form}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <Row gutter={[20, 20]}>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Owned Department:
              </TypographyText>
              <FormItem
                name="department_id"
                className="mb-1"
                rules={[
                  {
                    message: "Please select Owned department",
                    whitespace: true,
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select owned department"
                  suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                  options={
                    Array.isArray(department.data) &&
                    (department.data.map((res: any) => {
                      return {
                        value: res.title,
                        label: res.title?.length > 25 ? `${res?.title?.slice(0, 25)}...` : res?.title
                      };
                    }) as any)
                  }
                />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Trigger:
              </TypographyText>
              <FormItem
                name="trigger"
                className="mb-1"
                rules={[
                  {
                    message: "Please select trigger",
                    whitespace: true,
                    required: true,
                  },
                ]}
              >
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
            </div>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Connected Department:
              </TypographyText>
              <FormItem
                name="conn_dep_id"
                className="mb-1"
                rules={[
                  {
                    message: "Please select connected department",
                    //whitespace: true,
                    required: false,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  maxCount={1}
                  maxLength={1}
                  placeholder="Select Connected department"
                  showSearch
                  suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                  options={
                    Array.isArray(department?.data) &&
                    (department?.data.map((res: any) => {
                      return {
                        value: res?._id,
                        label: res.title?.length > 25 ? `${res?.title?.slice(0, 25)}...` : res?.title
                      };
                    }) as any)
                  }
                />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Estimated Time:
              </TypographyText>
              <FormItem
                name="estimate_time"
                className="mb-1"
                rules={[
                  {
                    message: "Please select estimated time",
                    //whitespace: true,
                    required: true,
                  },
                  () => ({
                    validator(_, value) {
                      console.log(value, "valueee")
                      if (value?.$H == 0 && value?.$m == 0) {
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
                  showNow={false} hideDisabledOptions
                  disabledHours={disabledHours} onChange={onchangeTimepicker} renderExtraFooter={() => <div className="d-flex"><div className="w-100 text-center border-end">Hrs</div><div className="w-100 text-center">Min</div></div>} suffixIcon={<HenceforthIcons.Clock />} className="w-100" format={`HH:mm`}
                />
              </FormItem>
            </div>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Frequency:
              </TypographyText>
              <FormItem
                name="frequency"
                className="mb-1"
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
                  onChange={(value) => setFreqType(value)}
                  suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                  options={[
                    { value: "Daily", label: "Daily" },
                    { value: "Weekly", label: "Weekly" },
                    { value: "Monthly", label: "Monthly" },
                  ]}
                />
              </FormItem>
            </div>
          </Col>
          {freqType == "Monthly" && <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Frequency Date:
              </TypographyText>
              <FormItem
                name="frequency_time"
                className="mb-1"
                rules={[
                  {
                    message: "Please select frequency date",
                    required: true,
                  },
                ]}
              >
                <DatePicker format={(value) => dayjs(value).format('DD/MM/YYYY')} prefixCls="custom-pickerr" disabledDate={disabledMonth} showTime={false} showToday={false} superNextIcon={false} superPrevIcon={false} className="w-100" />
              </FormItem>
            </div>
          </Col>}
          {freqType == "Weekly" && <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Frequency Date:
              </TypographyText>
              <FormItem
                name="frequency_time"
                className="mb-1"

                rules={[
                  {
                    message: "Please select frequency date",
                    required: true,
                  },
                ]}
              >
                <DatePicker className="w-100" prefixCls="custom-pickerr" placeholder="Select week" disabledDate={disabledDate} format={(value) => dayjs(value).format('dddd')} showTime={false} showToday={false} superNextIcon={false} superPrevIcon={false} />
              </FormItem>
            </div>

          </Col>}
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                System Used:
              </TypographyText>
              <FormItem
                name="system_used"
                className="mb-1"
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
                  mode="tags"
                  maxLength={1}
                  maxCount={1}
                  onSearch={(value)=>debounceOnSearch(value)}
                onSelect={(value)=>checkForSystemInRecord(value)}
                onDeselect={()=>getSystems(null)}
                  placeholder="Select system"
                  suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                  options={systems}
                  notFoundContent={null}
                />
              </FormItem>
            </div>
          </Col>
          {/* <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <div>
              <TypographyText type="secondary" className="mb-2 d-block">
                Experience Level:
              </TypographyText>
              <FormItem
                name="experience_level"
                className="mb-1"
                rules={[
                  {
                    message: "Please select exp level",
                    whitespace: true,
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Level of difficulty"
                  suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                  options={[
                    { value: "easy", label: "Easy" },
                    { value: "normal", label: "Normal" },
                    { value: "hard", label: "Hard" },
                  ]}
                />
              </FormItem>
            </div>
          </Col> */}
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <TypographyText type="secondary" className="mb-2 d-block">
              Financial Data (F):
            </TypographyText>
            <FormItem
              className="mb-1"
              name="financial_data"
              rules={[
                {
                  message: "Please select Financial data",
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
               
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <TypographyText type="secondary" className="mb-2 d-block">
              Department Data (D):
            </TypographyText>
            <FormItem
              className="mb-1"
              name="emp_data"
              rules={[
                {
                  message: "Please select Employee data",
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
               
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
          <Col span={24} md={12} lg={8} xl={6} xxl={6}>
            <TypographyText type="secondary" className="mb-2 d-block">
              Employee Data (E):
            </TypographyText>
            <FormItem
              className="mb-1"
              name="dep_data"
              rules={[
                {
                  message: "Please select Department data",
                  whitespace: true,
                  required: true,
                },
              ]}
            >
              <Select
              
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
        </Row>
        <Flex gap={8} justify="end" className="mt-4">
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            size="large"
            className="d-flex align-items-center"
          >
            Update
          </Button>
          <Button onClick={() => set_Is_Edit_Form(false)}>Cancel</Button>
        </Flex>

        {/* <Button htmlType="submit" type="primary"   className="p-3 h-100" >Update</Button> */}
      </AntForm>
    </Fragment>
  );
};

export default EditProcessCompo;
