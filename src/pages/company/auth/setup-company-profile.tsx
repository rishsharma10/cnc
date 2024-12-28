import CustomSelect from "@/components/CustomSelect";
import HenceforthIcons from "@/components/HenceforthIcons";
import CountryCode from "@/utils/CountryCode.json";
import { Select } from "antd";
import Indistries from "@/utils/Industry.json"
import { GlobalContext } from "@/context/Provider";
import {
  AntForm,
  Button,
  Col,
  Flex,
  FormItem,
  Input,
  Row,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import { useContext } from "react";
import henceforthApi from "@/utils/henceforthApi";

export type CountryCodeType = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

const { Option } = Select;

const SetupCompanyProfile = () => {
  const router = useRouter();
  const { loading, setLoading, Toast } = useContext(GlobalContext);
  const handleSubmit = async (values: any) => {
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
      let apiRes = await henceforthApi.SuperAdmin.setupCompProfile(items)
      router.replace(`/company/auth/add-company-admin`);
    } catch (error) {
      setLoading(false);

    }
  };
  function isNotAllZeros(number:number) {
    const str = number.toString();
    
    // Check if all characters are '0'
    return !/^0+$/.test(str);
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
              <div className="auth_page p-sm-3 text-center">
                {/* title */}
                <div className="title mb-4">
                  <TypographyTitle level={2}>
                    Setup company profile
                  </TypographyTitle>
                  <TypographyText type="secondary">
                    Enter the company details
                  </TypographyText>
                </div>
                {/* form */}
                <AntForm
                  className="pb-4 px-sm-4 pt-0"
                  size="large"
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
                    <Input placeholder="Company name" />
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
                    <Input placeholder="Company domain" />
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
                      placeholder="Industry"
                      style={{ height: 40 }}

                      mode="tags"
                      options={Indistries}
                      className="text-start"
                      maxCount={1}
                      maxTagCount={1}
                      
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
                        className="text-start country_code"
                        suffixIcon={<HenceforthIcons.ChevronDownBlack />}
                      >
                        {CountryCode.map((res: CountryCodeType) => (
                          <Option value={res.dial_code} key={res.dial_code}>
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
                              if (!isNotAllZeros(value)) {
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
                      className="text-start "
                      suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
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
                      Next
                    </Button>
                  </div>
                </AntForm>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default SetupCompanyProfile;
