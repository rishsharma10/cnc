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
const ProcessStatusUpdate = ({ open, setOpen,submit,loading ,form}: typeProps) => {
  return (
    <Modal
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          Reject reason
        </TypographyTitle>
      }
      maskClosable={false}
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <AntForm size="large" layout="vertical" className="mt-3" onFinish={submit} form={form}>
        
        <FormItem name="department"
          label={"Reject reason"}
          className="mb-4"
          rules={[
            { message: "Please enter reason", whitespace: true, required: true },
          ]}>
          <TextArea
            placeholder="Enter the reason"
            className="rounded-4 border"
          />
        </FormItem>
        
        <Button loading={loading} type="primary" htmlType="submit" block>
          Submit
        </Button>
      </AntForm>
    </Modal>
  );
};

export default ProcessStatusUpdate;
