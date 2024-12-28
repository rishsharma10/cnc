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
  Radio,
  RadioGroup,
  Row,
  Space,
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
const IgnoreProcessModal = ({ open, setOpen,submit,loading ,form}: typeProps) => {
  return (
    <Modal
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          Ignore Process
        </TypographyTitle>
      }
      maskClosable={false}
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <AntForm size="large" className="mt-4" onFinish={submit} form={form} initialValues={{process:"IGNORE_ONCE"}}>
        <FormItem name="process"
          className="mb-3 p-2"
          rules={[
            { message: "Please enter reason", whitespace: true, required: true },
          ]}>
           <RadioGroup defaultValue={`IGNORE_ONCE`}>
      <Space direction="vertical">
        <Radio value={`IGNORE_ONCE`}>Ignore Once</Radio>
        <Radio value={`IGNORE_COMPLETELY`}>Ignore Completely</Radio>
      </Space>
    </RadioGroup>
        </FormItem>
        
        <Button loading={loading} type="primary" htmlType="submit" block>
          Submit
        </Button>
      </AntForm>
    </Modal>
  );
};

export default IgnoreProcessModal;
