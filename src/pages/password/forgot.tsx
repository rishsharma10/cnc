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
const ForgotPassword = () => {
  const router = useRouter();
  const { Toast, setUserInfo, initCart, cartData, setCartData } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    debugger;
    console.log(values, "valuesssss");
    const payload = {
      email: values.email,
      //   password: values.password,
      //   password_confirmation: values.password_confirmation,
    };
    try {
      setLoading(true);
      const apiRes = await crumbApi.Auth.forgotpassword(payload);
      if (apiRes?.status) {
        Toast.success(apiRes?.message);
        router.replace(`/password/verify-otp?email=${btoa(payload.email)}`);
      } else {
        setLoading(false);
        Toast.warning(apiRes?.message ?? "Something went wrong");
      }
    } catch (error: any) {
      Toast.error(error.response.body?.message);
      setLoading(false);
    } finally {
    }
  };
  return (
    <Fragment>
      <Head>
        <title>{`Forgot password`} at Copper & Crumb</title>
        <meta name="desription" content={`Forgot password at copper & crumb`} />
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
                  <h2 className="text-center mb-1">Forgot Your Password?</h2>
                  <p className="text-center text-bold fs-6 mb-4">
                    No worries! We &apos;ll send you a code to reset your password and
                    get you brewing again.
                  </p>
                  <Form layout="vertical" size="large" onFinish={handleSubmit}>
                    <FormItem
                      name={`email`}
                      label={"Email"}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email address",
                        },
                        {
                          type: "email",
                          message: "Please enter valid email address",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </FormItem>
                    <Flex justify="space-between" wrap>
                      <div className="d-flex align-items-center m-0 p-0">
                        <Link href={`/login`}>
                          <p className="text-primary">Back to login</p>
                        </Link>
                      </div>
                    </Flex>
                    <div className="submit-btn text-center mt-5">
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className="px-5"
                      >
                        Send OTP
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

export default ForgotPassword;
