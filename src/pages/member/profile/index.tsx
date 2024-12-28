import MainLayout from "@/components/common/MainLayout";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Space,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { ReactElement, useContext, useState } from "react";
import gradientBg from "@/assets/images/gradient-bg.png";
import HenceforthIcons from "@/components/HenceforthIcons";
import profile from "@/assets/images/profile.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
import RequestLeaveModal from "@/components/modal/RequestLeaveModal";
import { Form } from "antd";
import dayjs from "dayjs";
const ProfileDetails = () => {
  const { userInfo, userType ,Toast} = useContext(GlobalContext);
  const router = useRouter();
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values:any) => {
    const items = {
      start_date:dayjs(values?.leaveDates[0]).valueOf(),
      end_date:dayjs(values?.leaveDates[1]).valueOf()
    }
    setLoading(true)
    try {
      let apiRes = await henceforthApi.Team.leaves(items)
      Toast.success(apiRes?.message)
      setOpen(false)
    } catch (error) {
      
    }finally{
      form.resetFields()

      setLoading(false)
    }
  }

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
                <div className="profile_image mb-2">
                  <img
                    src={
                      userInfo?.profile_pic
                        ? henceforthApi.FILES.imageMedium(
                            userInfo?.profile_pic,
                            profile.src
                          )
                        : profile.src
                    }
                    alt="Not Found"
                    className="img-fluid"
                  />
                </div>
                {/* profile details */}
                <div className="mb-4 text-center">
                  <TypographyTitle level={4} className="mb-0">
                    {userInfo?.name
                      ? userInfo?.name
                      : userInfo?.first_name
                      ? `${userInfo?.first_name} ${userInfo?.last_name}`
                      : "N/A"}
                  </TypographyTitle>
                </div>

                <Space direction="vertical" className="w-100">
                  {userInfo?.phone_no && (
                    <Card className="common_card rounded-pill" bordered={false}>
                      <Flex justify="center" gap={8} align="center">
                        <TypographyText>
                          <HenceforthIcons.Phone />
                        </TypographyText>
                        <TypographyText className="fw-semibold">{`${userInfo?.country_code} ${userInfo?.phone_no}`}</TypographyText>
                      </Flex>
                    </Card>
                  )}
                  <Card className="common_card rounded-pill" bordered={false}>
                    <Flex justify="center" gap={8} align="center">
                      <TypographyText>
                        <HenceforthIcons.Email />
                      </TypographyText>
                      <TypographyText className="fw-semibold">
                        {userInfo?.email}
                      </TypographyText>
                    </Flex>
                  </Card>

                  <Flex justify="between" gap={10}>
                    <Button
                    onClick={() => setOpen(true)}
                      type="primary"
                      className="place-items mt-4 white-icon w-100"
                      size="large"
                      ghost
                    >
                      Request Leave
                    </Button>
                    {/* <Link href={`/${userType}/profile/edit`}> */}
                    <Button
                      onClick={() => router.push(`/${userType}/profile/edit`)}
                      type="primary"
                      className="place-items mt-4 white-icon w-100"
                      block
                      size="large"
                      icon={<HenceforthIcons.Pencil />}
                    >
                      Edit
                    </Button>
                    {/* </Link> */}
                  </Flex>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <RequestLeaveModal open={open} setOpen={setOpen} submit={handleSubmit} loading={loading} form={form}/>
    </React.Fragment>
  );
};
ProfileDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default ProfileDetails;
