import {
  AntForm,
  Button,
  Col,
  Flex,
  FormItem,
  Input,
  InputPassword,
  Row,
  TypographyText,
} from "@/lib/AntRegistry";
import { Form } from "antd";
import React, { Fragment, useContext, useState } from "react";
import logo from "@/assets/brand-guide/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
import crumbApi from "@/utils/crumbApis";
import { GlobalContext } from "@/context/Provider";
import { setCookie } from "nookies";
import { COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN } from "@/context/actionTypes";
import Head from "next/head";
type CartItem = {
  id: number;
  quantity: number;
};

type Product = {
  id: number;
  quantity: number;
};
const VerifyOtp = () => {
  const router = useRouter();
  const { Toast, setUserInfo, initCart, cartData, setCartData } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    debugger;
    console.log(values, "valuesssss");
    const payload = {
      email: atob(String(router.query.email)),
      otp: values.otp,
      //   password_confirmation: values.password_confirmation,
    };
    try {
      setLoading(true);
      const apiRes = await crumbApi.Auth.verifyOtp(payload);
      if (apiRes?.status) {
        Toast.success(apiRes?.message);
        router.replace(`/password/set?email=${(String(router.query.email))}`);
      } else {
        Toast.error("Something went wrong");
      }
    } catch (error: any) {
      Toast.error(error.message);
      setLoading(false);
    } finally {
    }
  };
  return (
    <Fragment>
      <Head>
        <title>{`Verify OTP`} at Copper & Crumb</title>
        <meta name="desription" content={`Verify OTP at copper & crumb`} />
      </Head>
      <section className="h-100 py-3">
        <div className="container-fluid h-100">
          <Row
            align={"middle"}
            className="h-100 overflow-auto"
            justify={"center"}
          >
            <Col span={24} md={20} lg={18} xl={16} xxl={16}>
              <div className="d-flex align-items-center w-100 auth-page p-0">
                <div className="auth-banner w-100 d-none d-md-block"></div>
                <div className="p-4 w-100 h-100 bg-white">
                  <div className="logo text-center mb-5">
                    <Link href={"/"}>
                      <img
                        src={logo.src}
                        alt="error"
                        height={120}
                        width={120}
                      />
                    </Link>
                  </div>
                  <Form layout="vertical" size="large" onFinish={handleSubmit}>
                    <FormItem
                      name="otp"
                      label="OTP"
                      rules={[
                        {
                          required: true,
                          message: "Please enter OTP",
                        },
                        {
                          pattern: /^\d{6}$/,
                          message: "OTP must be a 6-digit number",
                        },
                      ]}
                      normalize={(value) => value.replace(/\s/g, "")} // removes whitespaces
                    >
                      <Input placeholder="Enter OTP" maxLength={6} />
                    </FormItem>
                    <div className="submit-btn text-center mt-5">
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className="px-5"
                      >
                        Verify OTP
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Fragment>
  );
};

export default VerifyOtp;
