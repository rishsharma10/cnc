import MainLayout from "@/components/common/MainLayout";
import { AntForm, Col, Row, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import { Button, Flex, Form } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import ContentPages from '@/utils/henceofrthEnums'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import henceforthApi from "@/utils/henceforthApi";
import { GlobalContext } from "@/context/Provider";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
const ContentPage = () => {
  const [form] = Form.useForm();
  const {Toast} =useContext(GlobalContext)
  const [state, setState] = useState<any>('');
  const [isUpdate, setIsUpdate] = useState(false);
  const router = useRouter();
  console.log(router,"typeofcontent")
  // if (Array.isArray(props?.data?.data) && props?.data?.data?.length > 0) {
  //   setState(props?.data?.data[0]?.description);
  // }

  const onFinish = async (values: any) => {

    console.log(String(values?.description).trim());
    try {
      let items = {
        title: "q",
        description: String(values?.description).trim(),
        type: router?.query?.type === 'security-and-privacy' ? ContentPages.ContentPages.SECURITY_AND_PRIVACY : ContentPages.ContentPages.TERMS_AND_CONDITIONS
      }
      if(state){
        let apiRes = await henceforthApi.page.update(state?._id, items);
      }
      else{
        let apiRes = await henceforthApi.page.add(items);
      }
        form.resetFields();
        initData();
      setIsUpdate(false);
    } catch (error) {
      Toast.error(error)
    }
  }

  const initData = async () => {
    try {
      let apiRes = await henceforthApi.page.listing(String(router?.query?.type ==='security-and-privacy' ? ContentPages.ContentPages.SECURITY_AND_PRIVACY : ContentPages.ContentPages.TERMS_AND_CONDITIONS));
      if (Array.isArray(apiRes?.data?.data) && apiRes?.data?.data?.length > 0) {
        setState(apiRes?.data?.data[0]);
        form.setFieldValue('description',apiRes?.data?.data[0]?.description);
      }

    } catch (error) {
      Toast.error(error)
    }
  }

  useEffect(() => {
    initData();
  },[]);

  return (
    <React.Fragment>
      <section className="import_export">
        <div className="container-fluid">
          {
            isUpdate ?
              (
                <div className="quill-doc bg-white mx-5">
                  <AntForm form={form} onFinish={onFinish}>
                    <Form.Item
                      name="description"
                      rules={[
                        { required: true, message: "Please enter Description" },
                      ]}
                      hasFeedback
                    >
                      <ReactQuill
                        theme="snow"
                        placeholder="Write description here..."

                      />
                    </Form.Item>
                    {/* <Flex justify="end"> */}
                    <div className="justify-content-end d-flex p-2 gap-2">
                      <Button
                        onClick={() => { setIsUpdate(false) }}
                        type="default"
                        size="large"
                        className="d-flex align-items-center"
                      >
                        Cancel
                      </Button>
                      <Button
                        // loading={loading}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="d-flex align-items-center"
                      >
                        {state?'Update':'Add'}
                      </Button>
                      {/* <Button
                                  loading={loading}
                                  onClick={() => setShowEditor(false)}
                                  type="default"
                                  className="mt-3 w-25"
                                  block
                                >
                                  Cancel
                                </Button>
                                <Button
                                  loading={loading}
                                  htmlType="submit"
                                  type="primary"
                                  className="mt-3 mb-3 w-25"
                                  block
                                >
                                  Update
                                </Button> */}
                    </div>
                    {/* </Flex> */}
                  </AntForm>
                </div>
              )
              :
              (
                <Row justify={"center"}>
                  <Col span={24}>
                    <Flex justify="space-between" align="middle" className="mb-3">
                      <TypographyTitle level={4} className="mb-0">{String(router?.query?.type)?.startsWith("security") ? 'Security & Privacy' : "Terms & Conditions"}</TypographyTitle>
                      {state?<Button onClick={() => { setIsUpdate(true) }}>Update</Button>:<Button onClick={() => { setIsUpdate(true) }}>Add</Button>}
                    </Flex>
                  </Col>
                  <Col span={24}>
                    {/* <TypographyText type="secondary" dangerouslySetInnerHTML={{__html: state?.long_description?.replace(/\n/g, '<br />')}}>
                                sgsdf
                                </TypographyText> */}
                    <p className='m-0  text-secondary fw-semibold text-dark fw-normal fs-6' dangerouslySetInnerHTML={{ __html: state?.description?.replace(/\n/g, '<br />') }}></p>
                  </Col>
                </Row>)
          }
        </div>
      </section>
    </React.Fragment>
  )
}
ContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   try {
//     let cookies = context.req.cookies
//     // if (cookies[COOKIES_USER_ACCESS_TOKEN]) {
//     //     henceforthApi.setToken(cookies[COOKIES_USER_ACCESS_TOKEN] as string)
//     // }
//     console.log(String(context.query.type),'>>>>>>>>>>>>');
//     let apiRes = await henceforthApi.page.listing(String(context.query.type));
//     return { props: apiRes };
//   }
//   catch (error) {
//     console.log(error);
//     return {
//       redirect: {
//         destination: '/404',
//         permanent: false
//       }
//     }
//   }
// }


export default ContentPage;