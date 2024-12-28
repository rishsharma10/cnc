import HenceforthIcons from "@/components/HenceforthIcons";
import OrganizationCard from "@/components/OrganizationCard";
import MainLayout from "@/components/common/MainLayout";
import {
  Avatar,
  Col,
  Flex,
  Row,
  Select,
  Spin,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { GetServerSideProps } from "next";
import profile from "@/assets/images/profile.png";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { textSlice } from "@/utils/henceforthValidations";
import { Tooltip } from "antd";

interface Member {
  name: string;
  title: string;
  img: string;
}

interface TeamAssistant {
  name: string;
  title: string;
  img: string;
  profile_pic: string;
  member: Member[];
}

interface CA {
  name: string;
  department_id: any;
  title: string;
  img: string;
  email: string;
  profile_pic: string;
  team_admin: TeamAssistant[];
}
const OrganizationChart = () => {
  const orgChart = {
    super_admin: {
      name: "sa",
      title: "title",
      img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
    },
    ca: [
      {
        name: "ca 1",
        title: "title",
        img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
        ta: [
          {
            name: "ta 1",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 2",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 3",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
        ],
      },
      {
        name: "ca 2",
        title: "title",
        img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
        ta: [
          {
            name: "ta 1",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 2",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 3",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
        ],
      },
      {
        name: "ca 3",
        title: "title",
        img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
        ta: [
          {
            name: "ta 1",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 2",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
          {
            name: "ta 3",
            title: "title",
            img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
            member: [
              {
                name: "member 1",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tmembera 2",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
              {
                name: "tamember 3",
                title: "title",
                img: "https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png",
              },
            ],
          },
        ],
      },
    ],
  };

  const router = useRouter();
  const [state, setState] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const type =
    router.query.type == "all" ? "ALL_ORGANIZATION" : "MY_DEPARTMENT";
  const initData = async () => {
    setLoading(true);
    try {
      let apiRes = await henceforthApi.User.organization(type);
      setState(apiRes?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  console.log(state, "orgChartorgChart");

  const [openMainParent, setOpenMainParent] = useState<boolean>(false);
  const [openSubParents, setOpenSubParents] = useState<{
    [key: number]: boolean;
  }>({});
  const [openSubChildren, setOpenSubChildren] = useState<{
    [key: string]: boolean;
  }>({});
  const [openInnerWraps, setOpenInnerWraps] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMainParent = () => {
    setOpenMainParent((prev) => !prev);
  };

  const toggleSubParent = (index: number) => {
    setOpenSubParents((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubChild = (parentIndex: number, childIndex: number) => {
    setOpenSubChildren((prev) => ({
      ...prev,
      [`${parentIndex}-${childIndex}`]: !prev[`${parentIndex}-${childIndex}`],
    }));
  };

  const toggleInnerWrap = (
    parentIndex: number,
    childIndex: number,
    innerIndex: number
  ) => {
    setOpenInnerWraps((prev) => ({
      ...prev,
      [`${parentIndex}-${childIndex}-${innerIndex}`]:
        !prev[`${parentIndex}-${childIndex}-${innerIndex}`],
    }));
  };

  console.log(openMainParent, "openMainParent");
  console.log(openSubParents, "openSubParentsopenSubParents");
  console.log(openSubChildren, "openSubChildrenopenSubChildrenopenSubChildren");

  React.useEffect(() => {
    initData();
  }, [type]);
  return (
    <React.Fragment>
     <section className="organization-chart h-100">
     <div className="container-fluid h-100">
      <TypographyTitle level={4}>Organizational chart</TypographyTitle>
          <Select
            size="large"
            defaultValue={`All organization`}
            className="w-100"
            onChange={(value: any) =>
              router.replace(
                {
                  query: { ...router.query, type: value },
                },
                undefined,
                { shallow: true }
              )
            }
            placeholder="Organizaional chart"
            suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
            options={[
              { value: "all", label: "All organization" },
              // { value: "department", label: "My department" },
            ]}
          />
      <div className="pt-5 tree-wrap overflow-auto w-100">
        <div className="tf-tree tf-gap-xxl d-flex justify-content-center">
          <ul className="supper_admin">
            <li className="py-5 main-parent" onClick={toggleMainParent}>
              <span className="tf-nc main-parent common-item-style">
                <div className="client-profile position-relative">
                  <div className="client-img">
                    <Avatar
                      size={74}
                      alt="not found"
                      src={
                        state?.profile_pic
                          ? henceforthApi.FILES.imageSmall(state?.profile_pic)
                          : profile.src
                      }
                      className="position-absolute top-0 start-50 translate-middle"
                    />
                  </div>
                  <div className="flex-wrap d-flex align-items-start justify-content-center client-info">
                    <TypographyTitle
                      level={3}
                      className="fs-14 text-white fw-medium w-100 text-center mb-0 mt-3 pt-1"
                    >
                      {state?.name ?? "Super Admin"}
                    </TypographyTitle>
                    <Flex align="center">
                      <TypographyText className="fs-14 fw-medium text-black w-100 text-center pb-0">
                        C-suite
                      </TypographyText>
                      <div className={openMainParent ? "downarrowicon" : ""}>
                        <HenceforthIcons.ChevronDownBlack />
                      </div>
                    </Flex>
                  </div>
                </div>
              </span>
              {openMainParent && (
                <ul className={`${openMainParent ? "active" : ""} sub-parent`}>
                  {Array.isArray(state?.company_admins) &&
                    state?.company_admins.map((ca: CA, index: number) => (
                      <li
                        className={`${!ca?.team_admin?.length ? "sub-active-item" : ""} sub-parent-item`}
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubParent(index);
                        }}
                      >
                        <span className="tf-nc fs-16 fw-semibold common-item-style">
                          <div className="client-profile position-relative">
                            <div className="client-img">
                              <Avatar
                                size={74}
                                style={{ backgroundColor: "#f56a00" }}
                                className="position-absolute top-0 start-50 translate-middle"
                                src={
                                  <TypographyTitle
                                    level={2}
                                    className="m-0 department-name text-capitalize"
                                  >
                                    {String(ca?.department_id?.title).charAt(0)}
                                  </TypographyTitle>
                                }
                              />
                            </div>
                            <div className="flex-wrap d-flex align-items-start justify-content-center client-info mt-3 pt-2">
                              <Tooltip title={ca?.department_id?.title}>
                                <Flex align="center">
                                  <TypographyText className="fs-14 fw-medium text-black w-100 text-center pb-0 text-capitalize">
                                    {textSlice(
                                      ca?.department_id?.title,
                                      screen
                                    )}
                                  </TypographyText>
                                  {ca?.team_admin?.length !==0 && <div
                                    className={
                                      openSubParents[index] ? "downarrowicon" : ""
                                    }
                                  >
                                    <HenceforthIcons.ChevronDownBlack />
                                  </div>}
                                </Flex>
                              </Tooltip>
                            </div>
                          </div>
                        </span>
                        {openSubParents[index] && (
                          <ul className={`${openSubParents[index] ? 'active-subparent':""} main-child`}>
                            {Array.isArray(ca?.team_admin) &&
                              ca.team_admin.map((ta: any, childIndex) => (
                                <li
                                  className={`${!ta?.members?.length ? "sub-active-item" : ""} child-item`}
                                  key={childIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubChild(index, childIndex);
                                  }}
                                >
                                  <span className="tf-nc common-item-style child-item-data">
                                    <div className="client-profile position-relative">
                                      <div className="client-img">
                                        <Avatar
                                          size={74}
                                          alt="not found"
                                          className="position-absolute top-0 start-50 translate-middle"
                                          src={
                                            ta?.profile_pic
                                              ? henceforthApi.FILES.imageSmall(
                                                  ta?.profile_pic
                                                )
                                              : profile.src
                                          }
                                        />
                                      </div>
                                      <div className="flex-wrap d-flex align-items-start justify-content-center client-info">
                                        <Tooltip title={ta?.name ?? ta?.email}>
                                          <TypographyTitle
                                            level={3}
                                            className="fs-14 text-white fw-medium w-100 text-center mb-0 mt-3 text-capitalize"
                                          >
                                            {textSlice(
                                              ta?.name ?? ta?.email,
                                              screen
                                            )}
                                          </TypographyTitle>
                                          
                                        </Tooltip>
                                       
                                        <Flex align="center">
                                        <TypographyText className="fs-14 fw-medium text-black w-100 text-center pb-0 text-capitalize">
                                          Team Admin {childIndex + 1}
                                        </TypographyText>
                                        {ta?.members?.length !==0 &&
                                  <div
                                    className={
                                      openSubChildren[`${index}-${childIndex}`] ? "downarrowicon" : ""
                                    }
                                  >
                                    <HenceforthIcons.ChevronDownBlack />
                                  </div>}
                                </Flex>
                                      </div>
                                    </div>
                                  </span>
                                  {openSubChildren[
                                    `${index}-${childIndex}`
                                  ] && (
                                    <ul className="sub-child">
                                      {Array.isArray(ta?.members) &&
                                        ta.members.map(
                                          (
                                            member: any,
                                            memberIndex: number
                                          ) => (
                                            <li
                                              className="sub-child-item"
                                              key={memberIndex}
                                            >
                                              <span
                                                className="tf-nc common-item-style sub-child-data"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleInnerWrap(
                                                    index,
                                                    childIndex,
                                                    memberIndex
                                                  );
                                                }}
                                              >
                                                <div className="client-profile position-relative">
                                                  <div className="client-img">
                                                    <Avatar
                                                      size={74}
                                                      alt="not found"
                                                      className="position-absolute top-0 start-50 translate-middle"
                                                      src={
                                                        member?.profile_pic
                                                          ? henceforthApi.FILES.imageSmall(
                                                              member?.profile_pic
                                                            )
                                                          : profile.src
                                                      }
                                                    />
                                                  </div>
                                                  <div className="flex-wrap d-flex align-items-start justify-content-center client-info">
                                                    <Tooltip
                                                      title={
                                                        member?.name ??
                                                        member?.email
                                                      }
                                                    >
                                                      <TypographyTitle
                                                        level={3}
                                                        className="fs-14 text-white fw-medium w-100 text-center mb-0 mt-3 text-capitalize"
                                                      >
                                                        {textSlice(
                                                          member?.name ??
                                                            member?.email,
                                                          screen
                                                        )}
                                                      </TypographyTitle>
                                                    </Tooltip>
                                                    <TypographyText className="fs-14 fw-medium text-black w-100 text-center pb-1">
                                                      Accounting Member{" "}
                                                      {memberIndex + 1}
                                                    </TypographyText>
                                                  </div>
                                                </div>
                                              </span>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  )}
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
      </div>
      </section>

    </React.Fragment>
  );
};
OrganizationChart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default OrganizationChart;