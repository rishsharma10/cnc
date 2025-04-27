"use client";

import React, { ReactElement, useContext, useState } from "react";
import {
  Typography,
  Card,
  Button,
  List,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Descriptions,
  Grid,
  Empty,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonLayout from "@/components/common/CommonLayout";
import CommonBanner from "@/components/CommonBanner";
import { GlobalContext } from "@/context/Provider";
import crumbApi from "@/utils/crumbApis";
import bannerImg from '@/assets/images/raspberry-desert-mint-sweet-cracker-jam-side-view.jpg'

const { Title } = Typography;
const { Option } = Select;

interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    street: "123 Main St",
    city: "Boston",
    state: "MA",
    zip: "02108",
    country: "USA",
    isDefault: true,
  },
];

export default function AddressContent() {
  const { userInfo,setUserInfo } = useContext(GlobalContext);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const [loading, setLoading] = useState(false)

  const handleAddEdit = async () => {
    debugger
    form.validateFields().then(async (values) => {
      console.log(values,"valuessss")
      setLoading(true)
      try {
        let apiRes = await crumbApi.Auth.updateAddress(values)
        setUserInfo({
            ...userInfo,
            ...values
        })
      } catch (error) {
        
      }finally{
        setLoading(false)
      }
      handleCancel();
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    form.setFieldsValue(address);
    setIsModalVisible(true);
  };

  const handleDelete = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAddress(null);
    form.resetFields();
  };

  const setAsDefault = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  return (
    <>
      <CommonBanner title={"My Address"} image={bannerImg.src}/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: 30,
        }}
      >
        {userInfo?.address_line_1 ? (
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <Card
              title={
                <div className="text-center">
                  <h4>My Address</h4>
                </div>
              }
              bordered={false}
              style={{
                maxWidth: 800,
                margin: "auto",
                padding: screens.sm ? 30 : "20px 10px",
              }}
            >
              <Descriptions
                column={1}
                bordered
                className="rounded-3"
                size="default"
              >
                {userInfo?.address_line_1 && <Descriptions.Item label="Address">{userInfo?.address_line_1}</Descriptions.Item>}
                <Descriptions.Item label="Apartment">{userInfo?.address_line_2}</Descriptions.Item>
                <Descriptions.Item label="City">{userInfo?.city}</Descriptions.Item>
                <Descriptions.Item label="State">{userInfo?.state}</Descriptions.Item>
                <Descriptions.Item label="Country">{userInfo?.country}</Descriptions.Item>
                <Descriptions.Item label="Zip code">
                  {userInfo?.zipcode}
                </Descriptions.Item>
              </Descriptions>
              <Button
        type="primary"
        style={{ marginTop: '20px', display: 'block', marginInline: 'auto' }}
        onClick={() => handleEdit(userInfo)}
        block
      >
        Edit Address
      </Button>
            </Card>
          </div>
        ) : (
          <Card
            title={
              <div className="text-center">
                <h4>My Address</h4>
              </div>
            }
            bordered={false}
            style={{
              maxWidth: 800,
              margin: "auto",
              padding: screens.sm ? 30 : "20px 10px",
            }}
          >
            <Empty description="No address found" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="mt-3"
              >
                Add New Address
              </Button>
            </div>
          </Card>
        )}

        <Modal
          title={<div className="text-center fw-bold fs-5">{editingAddress ? "Edit Address" : "Add New Address"}</div>}
          open={isModalVisible}
          onOk={handleAddEdit}
          onCancel={handleCancel}
          loading={loading}
          width={600}
          okText="Update"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ country: "INDIA" }}
          >
            <Form.Item
              name="address_line_1"
              label="Address"
              rules={[
                { required: true, message: "Please enter address" },
              ]}
            >
             <Input  placeholder="Enter address"/>
            </Form.Item>

            <Form.Item
              name="address_line_2"
              label="Apartment suites"
              rules={[
                { required: true, message: "Please enter apartment" },
              ]}
            >
              <Input placeholder="Enter Apartment"/>
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="Enter city"/>
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input placeholder="Enter state"/>
            </Form.Item>

            <Form.Item
              name="zipcode"
              label="ZIP Code"
              rules={[{ required: true, message: "Please enter ZIP code" }]}
            >
              <Input placeholder="Enter zipcode"/>
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: false, message: "Please select country" }]}
            >
              <Select>
                <Option value="India">India</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
AddressContent.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
