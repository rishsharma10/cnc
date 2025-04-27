import { Col, Row } from "@/lib/AntRegistry";
import crumbApi from "@/utils/crumbApis";
import { Card, Form, Input, Button } from "antd";
import { useState } from "react";

interface Props {
  user: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  onSave: (user: Props["user"]) => void;
  setEditing:any
}

const EditUserProfile: React.FC<Props> = ({ user, onSave, setEditing }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    const payload = { ...values };
    try {
      setLoading(true);
      let apiRes = await crumbApi.Auth.updateAddress(payload);
      onSave(apiRes?.customer);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    onSave(values);
  };

  return (
    <Card
      title={
        <div className="text-center">
          <h4>Edit Profile</h4>
        </div>
      }
      bordered={false}
      style={{ maxWidth: 800, margin: "auto", padding: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={handleFinish}
        className="mt-3"
      >
        <Row gutter={[12,0]}>
        <Col span={12} md={12} sm={12} xs={24}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={12} md={12} sm={12} xs={24}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Enter email" disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input placeholder="Enter phone number" maxLength={12} />
            </Form.Item>
          </Col>
          <Col span={12} md={12} sm={12} xs={24}>
            <Form.Item>
              <Button onClick={() => setEditing(false)} disabled={loading} type="default" htmlType="submit" block>
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col span={12} md={12} sm={12} xs={24}>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EditUserProfile;
