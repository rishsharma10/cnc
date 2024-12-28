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
import henceforthApi from "@/utils/henceforthApi";
const View = () => {
  const router = useRouter();
  const { user_type, pid } = router.query;
  const { raize, Video } = useContext(GlobalContext);
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

  const [frames, setFrames] = useState<any>([]);

  const handleVideoChange = (event: any) => {
    debugger;
    const file = event;
    const video: any = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context: any = canvas.getContext("2d");

    const reader = new FileReader();
    reader.onload = function (e: any) {
      video.src = e.target.result;
    };

    reader.readAsDataURL(file);

    video.onloadedmetadata = function () {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      for (let i = 0; i < video.duration; i++) {
        video.currentTime = i;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        setFrames((prevFrames: any) => [...prevFrames, dataURL]);
      }
    };
  };
  console.log(frames, "freamssss");

  const [state, setState] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const initData = async () => {
    try {
      setLoading(true);
      let apiRes = await henceforthApi.Demo.getContentAll(String(pid));
      console.log(apiRes, "apiess");
      setState(apiRes);
      handleVideoChange(
        `https://darrenwalters-stag.s3.amazonaws.com/uploads/video/${apiRes?.video_url}`
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  console.log(state, "state");


  // async function generateCompletion(prompt: any) {
  //   try {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/completions",
  //       {
  //         model: "davinci-codex-003",
  //         prompt: prompt,
  //         max_tokens: 50, // Adjust this as needed to control the length of the completion
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer sk-proj-7fySFtgxRI4SRi8NStfWT3BlbkFJWunP0joIuMFz406Rene3", // Replace 'YOUR_API_KEY' with your actual API key
  //         },
  //       }
  //     );

  //     return response.data.choices[0].text.trim();
  //   } catch (error: any) {
  //     console.error(
  //       "Error generating completion:",
  //       error.response ? error.response.data : error.message
  //     );
  //     return null;
  //   }
  // }

   

  

  // Example usage:
  // async function example() {
  //   const prompt =
  //     "Create a function that takes two numbers as parameters and returns their sum.";
  //   const completion = await generateCompletion(prompt);
  //   console.log(completion);
  // }


  React.useEffect(() => {
    initData();
  }, [pid]);
  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <section className="process_detail">
          <div className="container">
            <Row gutter={[20, 20]} justify={"space-between"}>
              <Col span={24} lg={16} xl={16} xxl={18}>
                {/* process info */}
                <div className="process_info mb-4 pb-2">
                  <Flex align="center" gap={8} className="mb-2">
                    <TypographyTitle level={4} className="m-0">
                      Process Title
                    </TypographyTitle>
                    {/* <Dropdown menu={{ items }} placement="bottomLeft">
                      <Button
                        type="text"
                        shape="circle"
                        className="place-items btn-xs"
                      >
                        <HenceforthIcons.MoreFillBg />
                      </Button>
                    </Dropdown> */}
                  </Flex>
                  <TypographyText type="secondary">
                    {state?.description}
                  </TypographyText>
                </div>
                {/* video card */}
                <div className="common_card mb-3">
                  <Flex
                    align="center"
                    justify="space-between"
                    gap={10}
                    className="mb-3"
                  >
                    <Flex align="center" gap={10}>
                      <TypographyTitle level={5} className="m-0">
                        Video
                      </TypographyTitle>
                      <Button type="text" className="p-0 h-100" shape="circle">
                        {/* <HenceforthIcons.DownloadFill /> */}
                      </Button>
                    </Flex>
                    <Button type="text" className="p-0 h-100" shape="circle">
                      {/* <HenceforthIcons.EditFill /> */}
                    </Button>
                  </Flex>
                  {/* Video */}
                  <div className="video_container position-relative">
                    <video
                      src={`https://darrenwalters-stag.s3.amazonaws.com/uploads/video/${state?.video_url}`}
                      autoPlay
                      controls
                    ></video>
                    {/* <div className="overlay">
                      <Button type="text" shape="circle" className="p-0 h-auto">
                        <HenceforthIcons.PlayFill />
                      </Button>
                    </div> */}
                    <div className="zoom_btn">
                      <Button type="text" shape="circle">
                        {/* <HenceforthIcons.Expand /> */}
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Spin>

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
