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
const SetNewPassword = () => {
  const router = useRouter();
  const { Toast, setUserInfo, initCart, cartData, setCartData } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    if(values.password !== values.password_confirmation){
        return Toast.warning('Password should be same')
    }
    debugger;
    const payload = {
      email: atob(String(router.query.email)),
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    try {
      setLoading(true);
      const apiRes = await crumbApi.Auth.createPassword(payload);
      if (apiRes?.status) {
        Toast.success("Password updated successfully!");
        router.replace(`/login`);
      } else {
        setLoading(false)
        Toast.error(apiRes?.message ?? "Something went wrong");
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
        <title>{`Set password`} at Copper & Crumb</title>
        <meta name="desription" content={`Set password at copper & crumb`} />
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
                      name={`password`}
                      label={"Create new password"}
                      rules={[
                        { required: true, message: "Please enter password" },
                      ]}
                    >
                      <InputPassword placeholder="Enter new Password" />
                    </FormItem>
                    <FormItem
                      name={`password_confirmation`}
                      label={"Confirm password"}
                      rules={[
                        {
                          required: true,
                          message: "Please enter confirm password",
                        },
                      ]}
                    >
                      <InputPassword placeholder="Enter confirm Password" />
                    </FormItem>
                    <div className="submit-btn text-center mt-5">
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className="px-5"
                      >
                        Create new password
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

export default SetNewPassword;
