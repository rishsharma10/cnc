import React from "react";
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
  TextArea,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";

interface typeProps {
    open: boolean;
    loading: boolean;
    setOpen: any;
    submit: any;
    form?: any;

}
const RequestNewDepartment = ({ open, setOpen,submit,loading ,form}: typeProps) => {
  return (
    <Modal
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          Request New Department
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
        
        <FormItem name="department"
          className="mb-3"
          rules={[
            { message: "Please enter department", whitespace: true, required: true },
          ]}>
          <Input
            placeholder="Enter the department name"
            maxLength={40}
            className="rounded-4 border"
          />
        </FormItem>
        <Button loading={loading} type="primary" htmlType="submit" block>
          Request Department
        </Button>
      </AntForm>
    </Modal>
  );
};

export default RequestNewDepartment;
