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
  Select,
  SelectOption,
  Space,
  TypographyText,
  TypographyTitle,
  
} from "@/lib/AntRegistry";
import CountryCode from "@/utils/CountryCode.json";
import React, { ReactElement, useContext, useState } from "react";
import gradientBg from "@/assets/images/gradient-bg.png";
import { Form, UploadProps, message } from "antd";
import profile from "@/assets/images/profile.png";
import HenceforthIcons from "@/components/HenceforthIcons";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import { useRouter } from "next/router";
import { RcFile } from "antd/es/upload";
import { Upload } from "antd/lib";
const EditProfile = () => {
  const [form] = Form.useForm();
  const { userInfo, setUserInfo, userType,Toast } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any>("");
  const router = useRouter();
  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      debugger;
      console.log(info, "infoooooooo");

      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const updateProfile = async (values: any) => {
    debugger;
    console.log(values, "valiuesss");
    const items = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      profile_pic: "string",
      country_code: values?.country_code,
      phone_no: Number(values?.phone_no),
    };
    setLoading(true);
    try {
      if (fileList) {
        let image = await henceforthApi.Common.uploadFile("file", fileList);
        items["profile_pic"] = image?.file_name;
      }else{
        items["profile_pic"] = userInfo?.profile_pic;
      }
      let apiRes = await henceforthApi.Auth.edit(items);
      setUserInfo({
        ...userInfo,
        ...apiRes.data,
      });
      router.push(`/${userType}/profile`);
    } catch (error) {
      setLoading(false);
    }
  };
  const beforeUpload = (file: RcFile) => {
    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'||file.type === 'image/jpg';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    return isJpgOrPng? true : Upload.LIST_IGNORE;
  };
  const handleImageUpload = ({ file }: any) => {
    if (file.type?.startsWith('image')) {
      setFileList(file?.originFileObj);
    } else {
      //return Toast.warning(`Please upload image`);
    }
  };
  console.log(userType, "userteueueu");
  function isNotAllZeros(number:number) {
    const str = number.toString();
    
    // Check if all characters are '0'
    return !/^0+$/.test(str);
  }
  React.useEffect(() => {
    // form.setFieldsValue(userInfo);
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  return (
    <React.Fragment>
      <section className="company_details">
        <div className="container-fluid">
          <Row justify={"center"}>
            <Col span={24}>
              <div className="company_details_banner">
                <img
                  src={gradientBg.src}
                  alt="Not Found"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col
              span={22}
              md={20}
              lg={18}
              xl={12}
              xxl={10}
              style={{ marginTop: "-88px" }}
            >
              <div className="company_details_box common_card bg-white">
                {/* profile-image */}
                <AntForm size="large" onFinish={updateProfile} form={form}>
                  <div className="profile_image mb-2 position-relative">
                    <img
                      src={
                        fileList
                          ? URL.createObjectURL(fileList)
                          : userInfo?.profile_pic
                          ? `${henceforthApi.FILES.imageMedium(
                              userInfo?.profile_pic,
                              profile.src
                            )}`
                          : profile.src
                      }
                      alt="Not Found"
                      className="img-fluid"
                    />
                      <div className="upload_icon" style={{display:"flow"}}>

                  
                        
                      <Upload
                        onChange={handleImageUpload}
                        name="image"
                        accept='.jpg,.jpeg,.png'
                        // listType="picture-circle"
                        customRequest={({ onSuccess }: any) =>
                          onSuccess("ok")
                        }
                        beforeUpload={beforeUpload}
                      >
                        <Button
                          type="link"
                          shape="circle"
                          size="small"
                          className="p-0 h-100 w-100"
                        >
                          <HenceforthIcons.EditFill />
                        </Button>
                      </Upload>
                    </div>
                  </div>
                  {/* Edit details */}
                  <Row gutter={[12, 0]} className="mt-4 pt-1">
                    <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                      <FormItem name={`first_name`}rules={[{required:true,message:"Please enter first name"}]}>
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
                    </Col>
                    <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                      <FormItem name={`last_name`}rules={[{required:true,message:"Please enter last name"}]}>
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
                    </Col>
                    <Col span={24}>
                      <FormItem name={`email`}>
                        <Input disabled placeholder="Email" variant="filled" />
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      <FormItem
                        name={"country_code"}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please select country code",
                          },
                        ]}
                      >
                        <Select
                          variant="filled"
                          placeholder="Country Code"
                          allowClear
                          showSearch
                        >
                          {CountryCode.map((res: any, index: number) => {
                            return (
                              <SelectOption key={index} value={res?.dial_code}>
                                <Flex align="center" gap={6}>
                                  {res.flag}
                                  <TypographyText className="fw-semibold fs-12">
                                    {res?.dial_code}
                                  </TypographyText>
                                </Flex>
                              </SelectOption>
                            );
                          })}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span={24}>
                      <FormItem
                        name={`phone_no`}
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
                      >
                        <Input placeholder="Phone no." variant="filled" />
                      </FormItem>
                    </Col>
                    <Col span={24} className="mt-3">
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        block
                      >
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </AntForm>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
EditProfile.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default EditProfile;
