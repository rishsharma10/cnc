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
  import React, { Fragment, useContext, useEffect, useState } from "react";
  import logo from "@/assets/brand-guide/logo.png";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import crumbApi from "@/utils/crumbApis";
  import { GlobalContext } from "@/context/Provider";
  import { setCookie } from "nookies";
  import { COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN } from "@/context/actionTypes";
  import Head from "next/head";
  
  const VerifyOtp = () => {
    const router = useRouter();
    const { Toast, setUserInfo, initCart, cartData, setCartData } = useContext(GlobalContext);
  
    const [interval, setIntervalTimer] = useState(30);
    const [resendLoading, setResendLoading] = useState(false);
    const [loading, setLoading] = useState(false);
  
    // Countdown timer effect
    useEffect(() => {
      if (interval > 0) {
        const timer = setTimeout(() => setIntervalTimer(interval - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [interval]);
  
    const handleSubmit = async (values: any) => {
      const payload = {
        email: atob(String(router.query.email)),
        otp: values.otp,
      };
      try {
        setLoading(true);
        const apiRes = await crumbApi.Auth.verifyOtp(payload);
        if (apiRes?.status) {
          Toast.success(apiRes?.message);
          router.replace(`/password/set?email=${String(router.query.email)}`);
        } else {
          Toast.error(apiRes?.message ?? "Something went wrong");
        }
      } catch (error: any) {
        Toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleResend = async () => {
      try {
        setResendLoading(true);
        const email = atob(String(router.query.email));
        const apiRes = await crumbApi.Auth.forgotpassword({ email });
        if (apiRes?.status) {
          Toast.success(apiRes?.message ?? "OTP resent successfully");
          setIntervalTimer(30); // restart the timer
        } else {
            setLoading(false)
          Toast.error(apiRes?.message ?? "Could not resend OTP");
        }
      } catch (error: any) {
        Toast.error(error?.response?.body?.message);
      } finally {
        setResendLoading(false);
      }
    };
  
    return (
      <Fragment>
        <Head>
          <title>Verify OTP at Copper & Crumb</title>
          <meta name="description" content="Verify OTP at Copper & Crumb" />
        </Head>
        <section className="h-100 py-3">
          <div className="container-fluid h-100">
            <Row align="middle" className="h-100 overflow-auto" justify="center">
              <Col span={24} md={20} lg={18} xl={16} xxl={16}>
                <div className="d-flex align-items-center w-100 auth-page p-0">
                  <div className="auth-banner w-100 d-none d-md-block"></div>
                  <div className="p-4 w-100 h-100 bg-white">
                    <div className="logo text-center mb-5">
                      <Link href={"/"}>
                        <img src={logo.src} alt="logo" height={120} width={120} />
                      </Link>
                    </div>
                    <Form layout="vertical" size="large" onFinish={handleSubmit}>
                      <FormItem
                        name="otp"
                        label="OTP"
                        rules={[
                          { required: true, message: "Please enter OTP" },
                          { pattern: /^\d{6}$/, message: "OTP must be a 6-digit number" },
                        ]}
                        normalize={(value) => value.replace(/\s/g, "")}
                      >
                        <Input placeholder="Enter OTP" maxLength={6} />
                      </FormItem>
  
                      <div className="d-flex align-items-center justify-content-between">
                        {interval > 0 ? (
                          <p className="text-muted m-0">Resend code in: {interval}s</p>
                        ) : (
                          <Button
                            type="link"
                            className="px-0 text-primary"
                            loading={resendLoading}
                            onClick={handleResend}
                          >
                            Resend Code
                          </Button>
                        )}
                      </div>
  
                      <div className="submit-btn text-center mt-5">
                        <Button loading={loading} htmlType="submit" type="primary" className="px-5">
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
  