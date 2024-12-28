import CustomSelect from "@/components/CustomSelect";
import HenceforthIcons from "@/components/HenceforthIcons";
import CountryCode from "@/utils/CountryCode.json";
import { Select } from "antd";
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
import { useContext, useState } from "react";
import henceforthApi from "@/utils/henceforthApi";

export type CountryCodeType = {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
};

const { Option } = Select;

const SetupYourProfile = () => {
  const router = useRouter();
  const [countryCode,setCountryCode]=useState()as any
  const { loading, setLoading, userType,userInfo,setUserInfo } = useContext(GlobalContext);
  const handleSubmit = async (values: any) => {
    const items = {
      ...values,
      phone_no: Number(values?.phone),
      country_code:countryCode??"+91"
    };
    console.log(items, "values");
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Auth.edit(items);
      setUserInfo({
        ...userInfo,
        ...apiRes.data
      })
      router.replace(`/team`);
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
              <div className="auth_page p-sm-3 ">
                {/* title */}
                <div className="title mb-4">
                  <TypographyTitle level={2}>
                    Setup Your profile
                  </TypographyTitle>
                  <TypographyText type="secondary">
                    Enter Your personal details
                  </TypographyText>
                </div>
                {/* form */}
                <AntForm
                  className="pb-4 pt-0"
                  size="large"
                  onFinish={handleSubmit}
                 
                >
                  <FormItem
                    name="first_name"
                    className="mb-3"
                    rules={[{required:true,message:"Please enter first name"}]}>
                        <Input placeholder="First name" variant="filled" maxLength={20} onKeyPress={(e: any) => {
                           const value = e.target.value;
                           const cursorPosition = e.target.selectionStart;
                     
                           // Allow only alphabets and single space between words
                           if (!/^[a-zA-Z\s]$/.test(e.key)) {
                             e.preventDefault();
                           }
                     
                           // Prevent consecutive spaces
                           if (e.key === " " && (value[cursorPosition - 1] === " " || cursorPosition === 0)) {
                             e.preventDefault();
                           }
                         }}
                        />
                  </FormItem>
                  <FormItem
                    name="last_name"
                    className="mb-3"
                    rules={[{required:true,message:"Please enter last name"}]}>
                    <Input placeholder="Last name" variant="filled" maxLength={20} onKeyPress={(e: any) => {
                          const value = e.target.value;
                          const cursorPosition = e.target.selectionStart;
                    
                          // Allow only alphabets and single space between words
                          if (!/^[a-zA-Z\s]$/.test(e.key)) {
                            e.preventDefault();
                          }
                    
                          // Prevent consecutive spaces
                          if (e.key === " " && (value[cursorPosition - 1] === " " || cursorPosition === 0)) {
                            e.preventDefault();
                          }
                        }}
                        />
                  </FormItem>
                  <FormItem
                    name="phone"
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
                    <Flex>
                      <Select
                      showSearch
                        className="text-start country_code "
                        suffixIcon={<HenceforthIcons.ChevronDownBlack />}
                        placeholder="Country Code"
                        style={{ width: '100px' }} 
                      defaultValue={"+91"}
                        onChange={(value) => {
                          setCountryCode(value)
                        }}
                      >
                        {CountryCode.map((res: CountryCodeType) => (
                          <Option value={res.dial_code} key={res.dial_code}>
                            {res.dial_code}
                          </Option>
                        ))}
                      </Select>
                      <Input
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        maxLength={12}
                        name="phone_no"
                        placeholder="Contact no."
                        className="rounded-start-0"
                        // onChange={(e) => {
                        //   // Handle phone number change
                        // }}
                      />
                    </Flex>
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
export default SetupYourProfile;
