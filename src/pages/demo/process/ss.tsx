import HenceforthIcons from "@/components/HenceforthIcons";
import MainLayout from "@/components/common/MainLayout";
import {
  AntForm,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Flex,
  FormItem,
  Input,
  Modal,
  Row,
  TextArea,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import { MenuProps, Spin } from "antd";
import Link from "next/link";
import React, { ReactElement, useContext, useState } from "react";
import profile from "@/assets/images/profile.png";
import poster from "@/assets/images/poster.png";
import pdf from "@/assets/images/pdf.png";
import flow from "@/assets/images/flow.png";
import flowChart from "@/assets/images/flow-chart.png";
import ActivityCard from "@/components/ActivityCard";
import CommentCard from "@/components/CommentCard";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import { Space } from "antd/lib";
import henceforthApi from "@/utils/henceforthApi";
const View = () => {
  const router = useRouter();
  const { user_type, pid,video_url } = router.query;
  const { raize, Video } = useContext(GlobalContext);
  console.log(raize, "raizeee");
  console.log(video_url, "video_url");
  // const imgText = raize.processText.map((element: any, index: any) => {
  //   return {
  //     img: raize.processImg[index],
  //     text: element,
  //   };
  // });
  const [commentModal, setCommentModal] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [shareBtn, setShareBtn] = useState(false);
  const sharedList = [
    {
      title: "Shared Internal",
    },
    {
      title: "Shared External",
    },
    {
      title: "Shared Outside",
    },
  ];
  const processDetails = [
    {
      label: "Owned Department:",
      text: "Information Technology",
    },
    {
      label: "Trigger:",
      text: "Existing Processs",
    },
    {
      label: "Connected Department:",
      text: "Research & Development, Design",
    },
    {
      label: "Estimated Time:",
      text: "1 hour 15mins 10 sec",
    },
    {
      label: "Frequency:",
      text: "Weekly",
    },
    {
      label: "System Used:",
      text: "Salesforce",
    },
    {
      label: "Experience Level:",
      text: "Difficult",
    },
    {
      label: "Financial Data (F):",
      text: "Difficult",
    },
    {
      label: "Department Data (D):",
      text: "Difficult",
    },
    {
      label: "Employee Data (E):",
      text: "Difficult",
    },
  ];
  const documentData = [
    {
      title: "Document",
      image: pdf.src,
    },
    {
      title: "Flow",
      image: flow.src,
    },
    {
      title: "RACI",
      image: flowChart.src,
    },
  ];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/${user_type}/process/1/edit`}>
          <HenceforthIcons.Pencil />
          <TypographyText className="ms-2 fw-semibold">Edit</TypographyText>
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Link href={`/${user_type}/process/1/edit`}>
          <HenceforthIcons.Unarchieve />
          <TypographyText className="ms-2 fw-semibold">Archive</TypographyText>
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Link href={`/${user_type}/process/1/edit`}>
          <HenceforthIcons.Delete />
          <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
        </Link>
      ),
    },
  ];

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const initData = async () => {
    try {
      setLoading(true);
      let apiRes = await henceforthApi.Demo.getContentAll(String(pid));
      setState(apiRes.images);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    initData();
  }, []);
  return (
    <React.Fragment>
      <section className="process_detail">
        <div className="container">
          <Spin spinning={loading}>
            <Row gutter={[20, 20]} justify={"space-between"}>
              <Col span={24} lg={16} xl={16} xxl={18}>
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    {Array.isArray(state) &&
                      state.map((res: any, i: any) => {
                        return (
                          <>
                            <div>
                              <TypographyTitle level={5}>
                                click on {res.text}
                              </TypographyTitle>
                              <div className="company_details_banner">
                                <img
                                  src={
                                    res?.img_url
                                      ? `https://darrenwalters-stag.s3.amazonaws.com/uploads/original/${res?.img_url}`
                                      : ""
                                  }
                                  alt="Not Found"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>

          <Space
            size={"small"}
            direction="vertical"
            className="assign_process w-50 mt-3"
          >
            <Link href={`/demo/process/details/view?pid=${pid}`}>
              <Button type="primary" className="mt-3" block>
                Next
              </Button>
            </Link>
          </Space>
        </div>
      </section>

      {/* comment modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Add Comment
          </TypographyTitle>
        }
        centered
        footer={null}
        open={commentModal}
        onOk={() => setCommentModal(false)}
        onCancel={() => setCommentModal(false)}
      >
        <Row className="modal_content mt-4">
          {[...Array(2)].map((index) => (
            <Col key={index} span={24}>
              <CommentCard />
              {!index ? <Divider className="my-3" /> : ""}
            </Col>
          ))}

          {/* invite card */}
          <Col span={24}>
            <Card
              bordered={false}
              className="common_card p-3"
              style={{
                background:
                  "linear-gradient(134.67deg, rgba(236, 139, 201, 0.1) 0%, rgba(240, 155, 170, 0.1) 100%)",
              }}
            >
              <Flex gap={8} className="mb-2">
                <Avatar src={profile.src} size={36} />
                <div>
                  <TypographyTitle className="m-0 fs-16" level={5}>
                    Raize
                  </TypographyTitle>
                  <TypographyText type="secondary" className="fs-12">
                    You mentioned @james, but they don’t have the access of this
                    process
                  </TypographyText>
                </div>
              </Flex>
              <Flex gap={10}>
                <Button type="primary" ghost className="px-4 bg-white">
                  Invite Them
                </Button>
                <Button type="primary" ghost className="px-4 bg-white">
                  Do Nothing
                </Button>
              </Flex>
            </Card>
          </Col>

          {/* enter comment */}
          <Col span={24}>
            <div className="comment_input mt-5">
              <Input
                className="pe-1 border py-1"
                placeholder="Enter comment here..."
                suffix={
                  <Button
                    type="text"
                    size="small"
                    shape="circle"
                    className="h-100 p-0"
                  >
                    <HenceforthIcons.SendGradient />
                  </Button>
                }
              />
            </div>
          </Col>
        </Row>
      </Modal>
      {/* Decline Reason modal */}
      <Modal
        title={
          <TypographyTitle level={5} className="m-0 text-center">
            Decline Reason
          </TypographyTitle>
        }
        centered
        footer={null}
        open={reasonModal}
        onOk={() => setReasonModal(false)}
        onCancel={() => setReasonModal(false)}
      >
        <AntForm size="large" className="mt-4">
          <FormItem>
            <TextArea
              placeholder="Enter the reason..."
              className="rounded-4 border"
              rows={6}
            />
          </FormItem>
          <Button type="primary" block>
            Submit
          </Button>
        </AntForm>
      </Modal>
    </React.Fragment>
  );
};
View.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default View;
