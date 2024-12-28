import MainLayout from "@/components/common/MainLayout";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  Modal,
  Row,
  Spin,
  Space,
  TypographyText,
  TypographyTitle,
  Upload,
} from "@/lib/AntRegistry";
import { ReactElement, useContext, useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import HenceforthIcons from "@/components/HenceforthIcons";
import StatsCard from "@/components/StatesCard";
import ActivityCard from "@/components/ActivityCard";
import ProcessSchedule from "@/components/ProcessSchedule";
import dynamic from "next/dynamic";
const MyBarChart = dynamic(() => import('@/components/common/MyBarChart'), {
  ssr: false,
})
import henceforthApi from "@/utils/henceforthApi";
import { useRouter } from "next/router";
import { Empty } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { GlobalContext } from "@/context/Provider";
import { Form, Select } from "antd";
import ProcessStatusUpdate from "@/components/modal/ProcessStatusUpdate";
import IgnoreProcessModal from "@/components/modal/IgnoreProcessModal";
const Home = () => {
  const { raize: imgText, Video, userType, Toast } = useContext(GlobalContext);
  const router = useRouter();
  const [form] = Form.useForm()
  const [formIgnore] = Form.useForm()
  const [data, setData] = useState({
    total_count: 0,
    data: [],
  });
  const [state, setState] = useState({
    activities: [],
    alert: [],
    completed_processes: 0,
    department_process: 0,
    my_processes: 0,
    total_department: 0,
    total_systems: 0,
    total_members: 0,
    scheduled_process: [],
    total_department_process: 0,
    total_processes: 0,
  });
  const dates = [
    {
      day: "Sun",
      count: dayjs().weekday(0).format("DD"),
    },
    {
      day: "Mon",
      count: dayjs().weekday(1).format("DD"),
    },
    {
      day: "Tue",
      count: dayjs().weekday(2).format("DD"),
    },
    {
      day: "Wed",
      count: dayjs().weekday(3).format("DD"),
    },
    {
      day: "Thu",
      count: dayjs().weekday(4).format("DD"),
    },
    {
      day: "Fri",
      count: dayjs().weekday(5).format("DD"),
    },
    {
      day: "Sat",
      count: dayjs().weekday(6).format("DD"),
    },
  ];
  const [scheduledProcess, setScheduledProcess] = useState([]);
  const [loading, setLoading] = useState(false)
  const workLoad = async (q: any) => {
    try {
      let apiRes = await henceforthApi.User.workload(q);
      console.log(apiRes, "heeeeelo");
      setData(apiRes);
    } catch (error) { Toast.error(error) }
  };
  // const getCurrentDay = () => {
  //   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const today = new Date();
  //   const day = String(daysOfWeek[today.getDay()]).slice(0,3)
  //   const finalValue = dates.findIndex((item) => item?.day === day)
  //   return finalValue
  // };
  const getCurrentDayIndex = () => {
    const today = dayjs();
    return today.day(); // Returns index (0 = Sunday, 6 = Saturday)
  };
  //let findIndexValue = getCurrentDay()
  const [selectedDate, setSelectedDate] = useState(getCurrentDayIndex);
  const statsData = [
    {
      count: state?.my_processes,
      statsName: "My Process",
      href: `/${userType}/process/list/assigned/1?Pagination=1`
    },
    {
      count: state?.total_members,
      statsName: "Total Members",
      href: `/${userType}/teammates/page/all/1`
    },
    {
      count: `${state?.department_process}/${state?.total_department_process}`,
      statsName: "Department Process",
      href: `/${userType}`
    },
    {
      count: state?.total_department,
      statsName: "Total Departments",
      href: `/${userType}/department/page/1?limit=12`
    },
    {
      count: `${state?.my_processes}/${state?.total_processes}`,
      statsName: "All Process",
      href: `/${userType}/process/list/all/1?Pagination=1`
    },
    {
      count: state?.total_systems ? state.total_systems : 100,
      statsName: "Total Systems",
      href: `/${userType}`
    },
  ];

  // const dates = [
  //   {
  //     day: "Sun",
  //     count: dayjs().weekday(0).format('DD'),
  //   },
  //   {
  //     day: "Mon",
  //     count: dayjs().weekday(1).format('DD'),
  //   },
  //   {
  //     day: "Tue",
  //     count: dayjs().weekday(2).format('DD'),
  //   },
  //   {
  //     day: "Wed",
  //     count: dayjs().weekday(3).format('DD'),
  //   },
  //   {
  //     day: "Thu",
  //     count: dayjs().weekday(4).format('DD'),
  //   },
  //   {
  //     day: "Fri",
  //     count: dayjs().weekday(5).format('DD'),
  //   },
  //   {
  //     day: "Sat",
  //     count: dayjs().weekday(6).format('DD'),
  //   },

  // ];
  const initData = async () => {
    setLoading(true)
    try {
      let apiRes = await henceforthApi.User.dashboard();
      setState(apiRes.data);
      console.log(apiRes, "propspropspropsa");
    } catch (error) { Toast.error(error) } finally {
      setLoading(false)
    }
  };
  const fetchProcessSchedule = async (res:any) => {
    debugger
    //let indexVal = check ? index : findIndexValue
    try {
      // const formattedDate = dayjs().weekday(indexVal).format("YYYY-MM-DD");
      // console.log("formatted date", formattedDate)
      // const dat = dayjs(formattedDate).valueOf();
      router.replace({
        query: { ...router.query, date: res?.timestamp },
      })

    } catch (error) {

    }
  }
  const handleRead = async (res: any) => {
    try {
      let apiRes = await henceforthApi.Alert_Activity.markread(res._id, { _id: res._id, type: "one" })
      await initData()
      router.replace(
        res?.notification_type === "DEPARTMENT"
          ? `/${userType}/department/page/1?limit=12?read_all=true`
          : res?.notification_type === "PROCESS" ? res?.process_id ? `/${userType}/process/${res?.process_id}/details?read_all=true` : `/${userType}/teammates/page/all/1` : `/${userType}`
      )

    } catch (error) {

    }
  }

  const today = dayjs(); // Get current date
  const adjustedDates = [];
  // Generate dates array: one day before today and next 5 days
  for (let i = -1; i <= 5; i++) {
    const date = today.add(i, "day"); // Add/subtract days from today
    const dayLabel = date.format("ddd"); // Get day name (Sun, Mon, etc.)
    const dayNumber = date.format("DD"); // Get day number (e.g. 13)
    const timestamp = date.valueOf(); // Get Unix timestamp (seconds)
    adjustedDates.push({
      day: dayLabel,
      count: dayNumber,
      isToday: i === 0, // Check if this is today
      timestamp, // Store the timestamp for the current date
    });
  }
  
  const initProcessSchdule = async () => {
    try {

      let urlSearchParam = new URLSearchParams();
      urlSearchParam.set("date", String(router.query.date ?? dayjs().valueOf()));
      // urlSearchParam.set('', String(router.query.type))
      urlSearchParam.set("pagination", String(0));
      urlSearchParam.set("limit", String(5));
      let apiRes = await henceforthApi.User.dashboard(
        urlSearchParam.toString()
      );
      setScheduledProcess(apiRes?.data?.scheduled_process);
    } catch (error) {
      //Toast.error(error)
    }
  };
  const [openModal, setOpenModal] = useState(false)
  const [openModalIgnore, setOpenModalIgnore] = useState(false)
  const [rejectId, setRejectedId] = useState('')
  const [processIgnoreId, setProcessIgnoreId] = useState('')

  const handleStatusUpdate = async (value: any) => {
    console.log(value, "valuesvalues");
    console.log(rejectId, "rejectIdrejectId");
    const items = {
      type: "REJECTED",
      reason: value?.department
    }
    try {
      setLoading(true)
      let apiRes = await henceforthApi.User.alertAccept(rejectId, items)
      await initData()
      form.resetFields()
    } catch (error) {
      Toast.error(error)
    } finally {
      setLoading(false)
      setOpenModal(false)

    }


  }

  const handleDoneProcess = async (id: string) => {
    debugger;
    const items = {
      type: "ACCEPTED"
    }
    try {
      setLoading(true)
      let apiRes = await henceforthApi.User.scheduleUpdate(id, items)
      await initProcessSchdule()
      setLoading(false)
    } catch (error) {
      Toast.error(error)
    } finally {
      setLoading(false)

    }


  }
  const handleIgnoreProcess = async (value: any) => {

    const items = {
      type: "REJECTED",
      ignore_type: value?.process
    }
    try {
      setLoading(true)
      let apiRes = await henceforthApi.User.scheduleUpdate(String(processIgnoreId), items)
      setOpenModalIgnore(false)
      await initProcessSchdule()
      setLoading(false)
      formIgnore.resetFields()
    } catch (error) {
      Toast.error(error)
    } finally {
      setLoading(false)

    }
  }

  const handleApprove = async (id?: string, total_proccess?: number, alert_id?: string) => {
    const items = {
      ids: [String(id)],
      type: "LEAVE",
    };
    try {
      setLoading(true);
      if (Number(total_proccess) > 0) {
        router.push(`/${userType}/teammates/${id}/assign/process?type=leave`);
      } else {
        await henceforthApi.Team.deleteDeactivate(items);
        Toast.success("Leave Approved successfully")
        form.resetFields()
        await initData()
      }
    } catch (error) {
      Toast.error(error)
      setLoading(false);
    }
  };

  useEffect(() => {
    initData();
    //fetchProcessSchedule(0);
    workLoad(router?.query?.type ? router?.query?.type : "WEEKLY");
  }, []);
  useEffect(() => {
    initProcessSchdule();
  }, [router.query.date])

  // useEffect(() => {
  //   if(!router.query.date){
  //     setSelectedDate(findIndexValue)
  //   }
  // }, [router.query.date]);

  return (
    <>
      <section className="dashboard_section">
      <Spin spinning={loading}>
        <div className="container-fluid">
          <Row gutter={[24, 24]}>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Flex
                    className="title mb-1"
                    justify="space-between"
                    align="center">
                    <TypographyTitle level={5} className="m-0">
                      Alerts
                    </TypographyTitle>
                    {state?.alert?.length > 6 && <Link href={`/${userType}/alerts-activity/page/alert/1`}><Button
                      type="text"
                      className="text-secondary d-flex align-items-center gap-1 fs-12 p-0"
                    >
                      View All <HenceforthIcons.ChevronRight />
                    </Button></Link>}
                  </Flex>
                </Col>
                {/* Alert Cards */}
                {Array.isArray(state?.alert) && state?.alert?.length ? (
                  state?.alert?.slice(0, 6)?.map((res: any, index: any) => (
                    <Col key={index} span={24}>
                      <AlertCard
                        {...res}
                        handleApprove={handleApprove}
                        setOpenModal={setOpenModal}
                        setRejectedId={setRejectedId}
                      />
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div className="text-center">
                      <Empty description="No Alerts" />
                    </div></Col>)
                }

                {/* Workload */}
                <Col span={24} className="mt-4">
                  <Flex align="center" justify="space-between" gap={20}>
                    <TypographyTitle level={5} className="mb-3">
                      Workload
                    </TypographyTitle>
                  </Flex>
                  <Card
                    className="workload common_card p-4 ps-2 pb-2"
                    bordered={false}>
                    <MyBarChart data={data} />
                  </Card>
                </Col>
                {/* Activity */}
                <Col span={24} className="mt-4">
                  <Flex
                    className="title mb-3"
                    justify="space-between"
                    align="center">
                    <TypographyTitle level={5} className="m-0">
                      Activity
                    </TypographyTitle>
                    {state?.activities?.length > 6 && <Link href={`/${userType}/alerts-activity/page/activity/1`}><Button
                      type="text"
                      className="text-secondary d-flex align-items-center gap-1 fs-12 p-0"
                    >
                      View All <HenceforthIcons.ChevronRight />
                    </Button></Link>}
                  </Flex>
                  <Row gutter={[8, 8]}>
                  {Array.isArray(state?.activities) &&
                    state?.activities?.length ? (
                      state?.activities
                        ?.slice(0, 6)
                        ?.map((res: any, index: number) => (
                          <Col key={index} span={24} onClick={()=>handleRead(res)}>
                            <Link
                              href={
                                res?.notification_type==="DEPARTMENT"
                                  ? `/${userType}/department/page/1?limit=12&read_all=true`
                                  : res?.notification_type==="PROCESS"?
                                  res?.process_id? `/${userType}/process/${res?.process_id}/details?read_all=true`:`/${userType}/teammates/page/all/1`
                                  : `/${userType}`
                              }
                            >
                              <ActivityCard {...res} />
                            </Link>
                          </Col>
                        ))
                    ) : (
                      <Col span={24}>
                        <div className="text-center">
                          <Empty description="No Activities" />
                        </div>
                        </Col>)}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <Row gutter={[16, 16]} className="mb-4 pb-2">
                {/* Stats Card */}
                {statsData.map((res: any, index: any) => (
                  <Col key={index} span={24} md={12} lg={12} xl={12} xxl={12}>
                    <Link href={res?.href}>
                      <StatsCard res={res} />
                    </Link>
                  </Col>
                ))}
              </Row>
              {/* Select Date */}
              <Row gutter={[0, 8]} className="mb-4" justify={"space-between"}>
                <Col span={24}>
                  <TypographyTitle level={5} className="mb-2">
                    {dayjs().format('MMMM')}
                    {
                      dayjs().format('YYYY')
                    }
                  </TypographyTitle>
                </Col>
                {/* date button */}
                <Col span={24}>
                  <Flex
                    align="center"
                    gap={12}
                    wrap="nowrap"
                    className="overflow-auto pb-2"
                  >
                       {Array.isArray(adjustedDates) &&
                      adjustedDates.map((res: any, index: any) => (
                      <>
                        {index ? (
                          <Divider
                            type="vertical"
                            className="m-0"
                            style={{
                              height: 50,
                              background: "rgba(219, 219, 219, 1)",
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <Button
                          type="primary"
                          className={`select_date_btn department_btn gap-0 shadow-none ${ router.query.date && dayjs(Number(res.timestamp)).day() === dayjs(Number(router.query.date)).day() ? "active" : !router.query.date && dayjs().date() == dayjs(Number(res?.timestamp)).date() ? "active" :""}`}
                          onClick={() => {
                            setSelectedDate(index)
                            fetchProcessSchedule(res);
                          }}
                        >
                          {res.day}
                          <span>{res.count}</span>
                        </Button>
                      </>
                    ))}
                  </Flex>
                </Col>
              </Row>
              {/* Process Schedule */}
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <TypographyTitle level={5}>Process Schedule</TypographyTitle>
                </Col>
                {/* {scheduledProcess?.map((res:any, index: any) => (
                  <Col key={index} span={24}>
                    <ProcessSchedule {...res} />
                  </Col>
                ))} */}
                {scheduledProcess?.length === 0 ? (
                  <Col span={24}><div className="text-center">
                    <Empty description="No Scheduled Process" />
                  </div></Col>
                ) : (
                  scheduledProcess?.map((res: any, index: any) => (
                    <Col key={index} span={24}>
                      <ProcessSchedule {...res} handleDoneProcess={handleDoneProcess} setProcessIgnoreId={setProcessIgnoreId} setOpen={setOpenModalIgnore} />
                    </Col>
                  ))
                )}
              </Row>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  {Array.isArray(imgText) &&
                    imgText.map((res: any, i: any) => {
                      return (
                        <>
                          <div>
                            <TypographyTitle level={5}>
                              click on {res.text}
                            </TypographyTitle>
                            <div className="company_details_banner">
                              <img
                                src={
                                  res.img ? URL.createObjectURL(res.img) : ""
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
          <ProcessStatusUpdate open={openModal}
            loading={loading}
            setOpen={setOpenModal}
            submit={handleStatusUpdate}
            form={form}
          />
          <IgnoreProcessModal setOpen={setOpenModalIgnore} open={openModalIgnore} submit={handleIgnoreProcess} loading={loading} form={formIgnore} />
        </div>
        </Spin>
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   let cookies = context.req.cookies
//   let userType = cookies[COOKIES_USER_TYPE] ?? "company"
//   if (cookies[COOKIES_USER_RAIZE_ACCESS_TOKEN]) {
//      return {
//       props :{access_token:cookies[COOKIES_USER_RAIZE_ACCESS_TOKEN]}
//      }
//   }
//   else {
//       return {
//           redirect: {
//               destination: `/${userType}/auth/login`,
//               permanent: false,
//           },
//       }
//   }
// }
export default Home;
