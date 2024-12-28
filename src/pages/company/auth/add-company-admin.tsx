import HenceforthIcons from "@/components/HenceforthIcons";
import { GlobalContext } from "@/context/Provider";

import {
  AntForm,
  Button,
  Col,
  Flex,
  FormItem,
  FormList,
  Input,
  InputPassword,
  Row,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
const AddCompanyAdmin = () => {
  const router = useRouter();
  const buttonRef: any = useRef(null as any);
  const { loading, setLoading } = useContext(GlobalContext);

  const handleSubmit = async (values: any) => {
    console.log(values, "values");
    setLoading(true);
    try {
      // let apiRes = await henceforthApi.Auth.login(values)
      router.replace(`/company/auth/department`);
      setLoading(false);
    } catch (error) {}
  };
  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
              <div className="auth_page p-3 text-center">
                {/* title */}
                <div className="title mb-4">
                  <TypographyTitle level={2}>Add company admin</TypographyTitle>
                </div>
                {/* form */}
                <AntForm
                  size="large"
                  onFinish={handleSubmit}
                  initialValues={{ company_admin: [{}] }}
                >
                  <Form.List name="company_admin">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <FormItem required={false} key={field.key}>
                            <FormItem
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Please enter company admin email",
                                },
                              ]}
                              className="w-100"
                              noStyle
                            >
                              <Flex gap={4}>
                                <Input placeholder="Company name" />
                                {index == 0 ? (
                                  <Button
                                    className="d-flex align-items-center justify-content-center"
                                    type="primary"
                                    onClick={() => add()}
                                    shape="circle"
                                  >
                                    <HenceforthIcons.Plus />
                                  </Button>
                                ) : (
                                  <Button
                                    className="d-flex align-items-center justify-content-center"
                                    type="primary"
                                    onClick={() => remove(field.name)}
                                    shape="circle"
                                  >
                                    <HenceforthIcons.Delete />
                                  </Button>
                                )}
                              </Flex>
                            </FormItem>
                          </FormItem>
                        ))}
                      </>
                    )}
                  </Form.List>
                  <Button htmlType="submit" type="primary" block>
                    Add Company Admin
                  </Button>
                </AntForm>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default AddCompanyAdmin;
