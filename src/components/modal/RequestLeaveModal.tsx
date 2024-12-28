import React, { useState } from 'react'
import {
    AntForm,
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Dropdown,
    Flex,
    FormItem,
    Input,
    Modal,
    Row,
    Switch,
    TextArea,
    TypographyText,
    TypographyTitle,
  } from "@/lib/AntRegistry";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';



interface typeProps {
    open: boolean;
    loading: boolean;
    setOpen: any;
    submit?: any;
    form?: any;

}
const { RangePicker } = DatePicker;
const RequestLeaveModal = ({ open, setOpen,submit,loading ,form}: typeProps) => {
    console.log(form.getFieldValue("toggle"));

    const [value, setValue] = useState<any>([]);

    const onCalendarChange = (dates:any) => {
      debugger
      // If the start date is selected, automatically set the end date to the next day
      if (dates && dates[0] && !dates[1]) {
        const startDate = dates[0];
        const endDate = startDate.add(1, 'day'); // Add one day to the start date
        setValue([dayjs(startDate).valueOf(), dayjs(endDate).valueOf()]); // Set both start and end dates
      } else {
        setValue(dates); // Keep the value as selected by the user
      }
    };


    function disabledDate(current:any) {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day');
    }
  return (
    <Modal
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          Select Dates
        </TypographyTitle>
      }
      maskClosable={false}
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <AntForm size="large" className="mt-4" onFinish={submit} form={form}>
        {/* <FormItem name="toggle" >
      <Switch  checkedChildren="One Day" unCheckedChildren="Multiple Day" />
        </FormItem> */}
        <FormItem name="leaveDates"
          className="mb-3"
          rules={[
            { message: "Please select dates", required: true },
          ]}>
          <RangePicker className='w-100 border' format={(value) => dayjs(value).format('DD/MM/YYYY')}  showNow disabledDate={disabledDate}  value={value}
      onCalendarChange={onCalendarChange}/>
        </FormItem>
        <Button loading={loading} type="primary" htmlType="submit" block>
          Submit
        </Button>
      </AntForm>
    </Modal>
  )
}

export default RequestLeaveModal