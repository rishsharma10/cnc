import CommonLayout from '@/components/common/CommonLayout';
import CommonBanner from '@/components/CommonBanner';
import { Col, Row } from "@/lib/AntRegistry";
import crumbApi from "@/utils/crumbApis";
import { Card, Form, Input, Button } from "antd";
import React, { ReactElement, useContext, useState } from 'react'
import bannerImg from '@/assets/images/freshly-baked-sweet-buns-puff-pastry.jpg'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider';

const Reset = () => {
    const router = useRouter()
    const [form] = Form.useForm();
    const {userInfo,Toast} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false);
  
    const handleFinish = async (values: any) => {
      const payload = { ...values,email:userInfo?.email };
      try {
        setLoading(true);
        let apiRes = await crumbApi.Auth.resetpassword(payload);
        if(apiRes?.status){
            router.replace(`/account/profile`)
            Toast.success("Password updated successfully")
        }else{
            setLoading(false)
            return Toast.warning(apiRes?.message)
        }
      } catch (error) {
        Toast.error(JSON.stringify(error))
          setLoading(false);
      } finally {
      }
    };
  
    return (
        <>
         <CommonBanner title={"Change password"} image={bannerImg.src} />
        <div className='mt-2 p-3 p-sm-5'>
        <Card
      title={
        <div className="text-center">
          <h4>Change Password</h4>
        </div>
      }
      bordered={false}
      style={{ maxWidth: 800, margin: "auto", padding: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-3"
      >
        <Row gutter={[12,0]}>
        <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                  message:
                    "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol",
                },
              ]}
            >
              <Input placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Confirm password"
              name="password_confirmation"
              rules={[
                {
                  required: true,
                  message: "Please enter confirm password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords you entered do not match")
                    );
                  },
                })
              ]}
            >
              <Input placeholder="Enter confirm password" />
            </Form.Item>
          </Col>
          
          <Col span={12} md={12} sm={12} xs={24}>
            <Form.Item>
              <Button onClick={() => router.push(`/account/profile`)} disabled={loading} type="default" block>
                Back
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
        </div>
        </>
      )
    }
    Reset.getLayout = function getLayout(page: ReactElement) {
      return <CommonLayout>
      {page}
    </CommonLayout>
    };

export default Reset