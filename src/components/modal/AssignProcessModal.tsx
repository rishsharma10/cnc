import {
  AntForm,
  Avatar,
  Button,
  Col,
  Flex,
  FormItem,
  Modal,
  Select,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React from "react";
import HenceforthIcons from "../HenceforthIcons";
import henceforthApi from "@/utils/henceforthApi";
import profile from "@/assets/images/profile.png";

const AssignProcessModal = ({
  name,
  loading,
  shareModalOpen,
  setShareModalOpen,
  handleChangeShared,
  handleAssignProcessToSomeOneElse,
  user,
  form,
}: any) => {
  return (
    <Modal
      maskClosable={false}
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          {name}
        </TypographyTitle>
      }
       prefixCls="edit-modal"
      centered
      footer={null}
      open={shareModalOpen}
      onCancel={() => setShareModalOpen(false)}
    >
      <AntForm
        size="large"
        className="mt-4"
        layout="vertical"
        form={form}
        onFinish={handleAssignProcessToSomeOneElse}
      >
        <Col span={24}>
          <FormItem
            name="assign_to"
            label={"Select employee"}
            rules={[
              {
                message: "Please select employee",
                whitespace: true,
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select an employee"
              suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
              options={
                Array.isArray(user.data) &&
                (user.data.map((res: any) => {
                  return {
                    value: res._id,
                    label: res?.email ? res?.email : res.first_name ? `${res?.first_name} ${res?.last_name ?? ""}` : res?.email ? res?.email : "N/A"
                  };
                }) as any)
              }
            />
          </FormItem>
        </Col>

        <Button type="primary" loading={loading} block htmlType="submit">
          Submit
        </Button>
      </AntForm>
    </Modal>
  );
};

export default AssignProcessModal;
