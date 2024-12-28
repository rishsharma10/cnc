import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Button,
  Card,
  Col,
  Flex,
  FormItem,
  Input,
  Row,
  Space,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { Fragment, ReactElement, useContext, useState } from "react";
import gradientBg from "@/assets/images/gradient-bg.png";
import HenceforthIcons from "@/components/HenceforthIcons";
import CountryCode from "@/utils/CountryCode.json";
import { GetServerSideProps } from "next";
import henceforthApi from "@/utils/henceforthApi";
import { Form, Select, Spin } from "antd";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import { parseCookies } from "nookies";
import { COOKIES_USER_RAIZE_ACCESS_TOKEN } from "@/context/actionTypes";

export type CountryCodeType = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};
const CompanyDetails = (props: any) => {
  console.log(props, "propsspspspspsp");
  const router = useRouter();
  const {userType,userInfo} = useContext(GlobalContext)
  const [form] = Form.useForm();
  const [state, setState] = useState(props);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const details = [
    {
      label: "Company Name:",
      data: state?.name,
    },
    {
      label: "Company Domain:",
      data: state?.company_domain,
    },
    {
      label: "Industry:",
      data: state?.industry,
    },
    {
      label: "Country:",
      data: state?.country,
    },
    {
      label: "City:",
      data: state?.city,
    },
    {
      label: "Phone:",
      data: `${state?.country_code} ${state?.phone_no}`,
    },
    {
      label: "Timezone:",
      data: state?.time_zone,
    },
  ];

  const handleSubmit = async (values: any) => {
    debugger
    const items = {
      ...values,
      city: values.city[0],
      country: values.country[0],
      industry: values.industry[0],
      phone_no: Number(values.phone_no),
    };
    console.log(items, "values");
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Company.updateCompany(state?._id,items);
      setState(apiRes?.data)
      setIsEdit(false)
    setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  const initDetails = async () => {
    try {
      setLoading(true);
      const apiRes = await henceforthApi.Company.profile();
      setState(apiRes?.data)
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }
  React.useEffect(() => {
    form.setFieldsValue(state);
    form.setFieldValue("timezone",state?.time_zone);
  }, [state]);
  
  React.useEffect(() => {
    henceforthApi.setToken(userInfo?.access_token)
    initDetails()
  },[userInfo?.access_token])
  return (
    <React.Fragment>
      <section className="company_details">
        <div className="container-fluid">
          <Row justify={"center"}>
            <Col span={24}>
              <div className="company_details_banner position-relative">
                <img
                  src={gradientBg.src}
                  alt="Not Found"
                  className="img-fluid"
                />
               {userType == "admin" &&<Button onClick={() => router.push(`/${userType}/add-admin/${state?._id}`)} className="position-absolute end-0 mt-2 me-2" type="primary" >Add Company Admin</Button>}
              </div>
            </Col>
            <Col
              span={22}
              md={20}
              lg={18}
              xl={12}
              xxl={10}
              style={{ marginTop: "-128px" }}
            >
              <Spin spinning={loading}>
              <div className="company_details_box common_card bg-white">
                <TypographyTitle level={4} className="text-center mb-4">
                  {isEdit ? "Edit" : ""} Company Details
                </TypographyTitle>

                <Space direction="vertical" className="w-100">
                  {!isEdit ? (
                    <Fragment>
                      {details.map((res, index) => (
                        <Card
                          key={index}
                          className="common_card rounded-pill"
                          bordered={false}
                        >
                          <Flex justify="space-between" gap={12} align="center">
                            <TypographyText type="secondary">
                              {res.label}
                            </TypographyText>
                            <TypographyText className="fw-semibold">
                              {res.data}
                            </TypographyText>
                          </Flex>
                        </Card>
                      ))}
                    </Fragment>
                  ) : (
                      <AntForm
                        className="pb-4 px-sm-4 pt-0"
                        size="large"
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={{ country_code: "+91" }}
                      >
                        <FormItem
                          name="name"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please enter company name",
                              whitespace: true,
                              required: true,
                            },
                          ]}
                        >
                          <Input placeholder="Company name" variant="filled" />
                        </FormItem>
                        <FormItem
                          name="company_domain"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please enter company domain",
                              whitespace: true,
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            placeholder="Company domain"
                            variant="filled"
                          />
                        </FormItem>
                        <FormItem
                          name="industry"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please select industry",
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            variant="filled"
                            placeholder="Industry"
                            options={[
                              { value: "jack", label: "Jack" },
                              { value: "lucy", label: "Lucy" },
                              { value: "Yiminghe", label: "yiminghe" },
                            ]}
                            className="text-start"
                            maxCount={1}
                            maxTagCount={1}
                            mode="tags"
                          />
                        </FormItem>
                        <FormItem
                          name="country"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please select country",
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            variant="filled"
                            placeholder="Country"
                            options={[
                              { value: "jack", label: "Jack" },
                              { value: "lucy", label: "Lucy" },
                              { value: "Yiminghe", label: "yiminghe" },
                            ]}
                            className="text-start"
                            maxCount={1}
                            maxTagCount={1}
                            mode="multiple"
                          />
                        </FormItem>
                        <FormItem
                          name="city"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please select city",
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            variant="filled"
                            placeholder="City"
                            options={[
                              { value: "jack", label: "Jack" },
                              { value: "lucy", label: "Lucy" },
                              { value: "Yiminghe", label: "yiminghe" },
                            ]}
                            className="text-start"
                            maxCount={1}
                            maxTagCount={1}
                            mode="multiple"
                          />
                        </FormItem>
                        <Flex>
                          <FormItem name="country_code" className="mb-3">
                            <Select
                              variant="filled"
                              className="text-start country_code"
                              suffixIcon={<HenceforthIcons.ChevronDownBlack />}
                            >
                              {CountryCode.map((res: CountryCodeType) => (
                                <Option
                                  value={res.dial_code}
                                  key={res.dial_code}
                                >
                                  {res.dial_code}
                                </Option>
                              ))}
                            </Select>
                          </FormItem>
                          <FormItem
                            name="phone_no"
                            rules={[
                              {
                                required: true,
                                message: `Please enter your phone number`,
                              },
                              () => ({
                                validator(_, value) {
                                  if (value) {
                                    if (isNaN(value)) {
                                      return Promise.reject(
                                        `Enter a valid phone number`
                                      );
                                    }
                                    if (value.length > 12) {
                                      return Promise.reject(
                                        `Enter a valid phone number`
                                      );
                                    }
                                    if (value.length < 9) {
                                      return Promise.reject(
                                        `Enter a valid phone number`
                                      );
                                    }
                                    return Promise.resolve();
                                  } else {
                                    return Promise.resolve();
                                  }
                                },
                              }),
                            ]}
                            className="mb-3 w-100"
                          >
                            <Input
                              onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              variant="filled"
                              maxLength={12}
                              placeholder="Contact no."
                              className="rounded-start-0"
                            />
                          </FormItem>
                        </Flex>
                        <FormItem
                          name="timezone"
                          className="mb-4"
                          rules={[
                            {
                              message: "Please select Timezone",
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            variant="filled"
                            className="text-start "
                            suffixIcon={
                              <HenceforthIcons.ChevronDownBlack color />
                            }
                            placeholder="Timezone"
                            options={[
                              {
                                value: "Eastern Standard Time",
                                label: "Eastern Standard Time",
                              },
                              {
                                value: "Central Standard Time",
                                label: "Central Standard Time",
                              },
                            ]}
                          />
                        </FormItem>
                        <div className="login-btn">
                    <Button
                      loading={loading}
                      htmlType="submit"
                      block
                      type="primary"
                    >
                      Update
                    </Button>
                  </div>
                      </AntForm>
                  )}

                {(userType == "admin" && !isEdit) &&  <Button
                    onClick={() => setIsEdit(true)}
                    type="primary"
                    className="place-items mt-4 white-icon"
                    block
                    size="large"
                    icon={<HenceforthIcons.Pencil />}
                  >
                    Edit
                  </Button> }
                </Space>
              </div>
              </Spin>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
CompanyDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};


export default CompanyDetails;
