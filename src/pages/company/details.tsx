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
import { Input as AntInput } from "antd"
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
  const locationSearchRef = React.useRef(null as any);
  const router = useRouter();
  const { userType, userInfo, Toast } = useContext(GlobalContext)
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
      label: "Address:",
      data: <span title={state?.address}>{state?.address ? state?.address?.length > 20 ? `${state?.address?.slice(0,20)}...`:state?.address : "N/A"}</span>,
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
      city: values.city,
      address: values.address,
      country: values.country,
      industry: values.industry[0],
      phone_no: Number(values.phone_no),
    };
    console.log(items, "values");
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Company.updateCompany(state?._id, items);
      setState(apiRes?.data)
      setIsEdit(false)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  const initDetails = async () => {
    try {
      setLoading(true)
      const apiRes = await henceforthApi.Company.profile();
      setState(apiRes?.data)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }



  function loadGoogleMapScript(callback: any) {
    if (
      typeof (window as any).google === "object" &&
      typeof (window as any).google.maps === "object"
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
  }
  const runTry = (cb: any) => {
    loadGoogleMapScript(() => {
      cb();
    });
  };
  const initPlaceAPI = () => {
    debugger
    if (locationSearchRef?.current) {
      let autocomplete = new (window as any).google.maps.places.Autocomplete(
        locationSearchRef?.current?.input
      );
      autocomplete.addListener("place_changed", async () => {
        let place = autocomplete.getPlace();
        // console.log(place?.geometry);
        if (!place.geometry) {
          console.log("chla");
          Toast.warning("Please enter a valid location");
          return;
        }
        const address = place?.address_components;
        const coordinate = place?.geometry?.location;

        // console.log(coordinate, "coordinate________");
        // console.log(coordinate?.lng(), "lng___________");
        // console.log(coordinate?.lat(), "lat______________");

        let items: any = {};
        if (Array.isArray(address) && address?.length > 0) {
          let zipIndex = address.findIndex((res) =>
            res.types.includes("postal_code")
          );
          let administrativeAreaIndex = address?.findIndex((res) =>
            res?.types.includes("administrative_area_level_1", "political")
          );
          let localityIndex = address?.findIndex((res) =>
            res?.types?.includes("locality", "political")
          );
          let countryIndex = address?.findIndex((res) =>
            res?.types?.includes("country", "political")
          );

          if (zipIndex > -1) {
            items.postal_code = address[zipIndex]?.long_name;
          }
          if (administrativeAreaIndex > -1) {
            items.state = address[administrativeAreaIndex]?.long_name;
          }
          if (localityIndex > -1) {
            items.city = address[localityIndex]?.long_name;
          }
          if (countryIndex > -1) {
            items.country = address[countryIndex]?.long_name;
          }
          const heheheh = {
            address: place.formatted_address,
            country: items?.country,
            state: items?.state,
            city: items?.city,
            postal_code: items?.postal_code,
          } as any;
          const errors = form.getFieldsError();
          if (errors.length) {
            form?.setFields(
              errors.flatMap((res: any) => {
                if (!(res.name[0] in heheheh)) return [];
                console.log(
                  !!heheheh[res.name[0]],
                  heheheh[res.name[0]],
                  heheheh,
                  res.name
                );
                return {
                  name: res.name,
                  errors: !!heheheh[res.name[0]]
                    ? []
                    : [
                      `Please enter ` +
                      res.name[0].toString().replace("_", " "),
                    ],
                };
              })
            );
          }
          console.log(items);

          form?.setFieldValue("address", place.formatted_address);
          form?.setFieldValue("country", items?.country);
          form?.setFieldValue("city", items?.city);
        }
      });
    }
  };

  React.useEffect(() => {
    runTry(() => {
      setTimeout(() => {
        initPlaceAPI();
      }, 0);
    });
    
  }, []);


  React.useEffect(() => {
    henceforthApi.setToken(userInfo?.access_token)
    initDetails()
  },[userInfo?.access_token])


  React.useEffect(() => {
    form.setFieldsValue(state);
    form.setFieldValue("timezone", state?.time_zone);
  }, [state]);
  console.log(userInfo, "userinfo");

  // React.useEffect(() => {
  //   henceforthApi.setToken(userInfo?.access_token)
  //   initDetails()
  // },[userInfo?.access_token,userType])
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
                {/* {userType == "admin" && <Button onClick={() => router.push(`/add-admin/${state?._id}`)} className="position-absolute end-0 mt-2 me-2" type="primary" >Add Company Admin</Button>} */}
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
                            mode="tags"
                            options={[
                              { value: "Agriculture Forestry Fishing and Hunting", label: "Agriculture Forestry Fishing and Hunting" },
                              { value: "Mining Quarrying and Oil and Gas Extraction", label: "Mining Quarrying and Oil and Gas Extraction" },
                              { value: "Utilities", label: "Utilities" },
                              { value: "Construction", label: "Construction" },
                              { value: "Manufacturing", label: "Manufacturing" },
                              { value: "Wholesale Trade", label: "Wholesale Trade" },
                              { value: "Retail Trade", label: "Retail Trade" },
                              { value: "Transportation and Warehousing", label: "Transportation and Warehousing" },
                              { value: "Information", label: "Information" },
                              { value: "Finance and Insurance", label: "Finance and Insurance" },
                              { value: "Real Estate and Rental and Leasing", label: "Real Estate and Rental and Leasing" },
                              { value: "Professional Scientific and Technical Services", label: "Professional Scientific and Technical Services" },
                              { value: "Management of Companies and Enterprises", label: "Management of Companies and Enterprises" },
                              { value: "Administrative and Support and Waste Management and Remediation Services", label: "Administrative and Support and Waste Management and Remediation Services" },
                              { value: "Educational Services", label: "Educational Services" },
                              { value: "Health Care and Social Assistance", label: "Health Care and Social Assistance" },
                              { value: "Arts Entertainment and Recreation", label: "Arts Entertainment and Recreation" },
                              { value: "Accommodation and Food Services", label: "Accommodation and Food Services" },
                              { value: "Other Services", label: "Other Services" },
                              { value: "Public Administration", label: "Public Administration" }
                            ]}
                            className="text-start"
                            maxCount={1}
                            maxTagCount={1}
                          />
                        </FormItem>
                        <FormItem
                          name="address"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please enter address",
                              required: true,
                            },
                          ]}
                        >
                          <AntInput
                            className="custom-input"
                            name="address"
                            ref={(ref: any) => (locationSearchRef.current = ref)}
                            id="Address"
                            variant="filled"
                            placeholder="Enter your address"
                          />
                        </FormItem>
                        <FormItem
                          name="country"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please enter country",
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            placeholder="Country"
                            variant="filled"
                          />
                        </FormItem>
                        <FormItem
                          name="city"
                          className="mb-3"
                          rules={[
                            {
                              message: "Please enter city",
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            placeholder="City"
                            variant="filled"
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    console.log(context, "context");
    const accessToken = parseCookies(context.req.cookies)[COOKIES_USER_RAIZE_ACCESS_TOKEN]
    if (accessToken) {
      henceforthApi.setToken(accessToken)
    }

    const apiRes = await henceforthApi.Company.profile();
    console.log(apiRes, "apiiiiiiiii");

    return { props: { ...apiRes.data } };
  } catch (error) {
    return {
      props: {
        storeDetail: null,
        error: "Failed to fetch company detail",
      },
    };
  }
};
export default CompanyDetails;
