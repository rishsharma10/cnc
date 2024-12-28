import HenceforthIcons from "@/components/HenceforthIcons";
import AddDepartmentModal from "@/components/modal/AddDepartmentModal";
import RequestNewDepartment from "@/components/modal/RequestDepartmentModal";
import { GlobalContext } from "@/context/Provider";
import {
  AntForm,
  Button,
  Col,
  Flex,
  FormItem,
  Input,
  InputPassword,
  Row,
  Select,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const SelectDepartment = () => {
  const router = useRouter();
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false);
  const { user_type } = router.query;
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { Toast ,userType} = useContext(GlobalContext);

  const departmentData = [
    {
      image: <HenceforthIcons.Accounting />,
      text: "Accounting",
    },
    {
      image: <HenceforthIcons.Hr />,
      text: "HR",
    },
    {
      image: <HenceforthIcons.Operation />,
      text: "Operation",
    },
    {
      image: <HenceforthIcons.BusinessDevelopment />,
      text: "Business Development",
    },
    {
      image: <HenceforthIcons.Design />,
      text: "Design",
    },
    {
      image: <HenceforthIcons.Marketing />,
      text: "Marketing",
    },
    {
      image: <HenceforthIcons.Management />,
      text: "Management",
    },
    {
      image: <HenceforthIcons.ResearchDevelopment />,
      text: "Research & Development",
    },
    {
      image: <HenceforthIcons.InformationTech />,
      text: "Information Technology",
    },
    {
      image: <HenceforthIcons.Legal />,
      text: "Legals",
    },
    {
      image: <HenceforthIcons.CustomerSupport />,
      text: "Customer Support",
    },
  ];

  const [state, setState] = useState({
    count: 0,
    data: [],
  });

  const initData = async () => {
    debugger;
    try {
      let apiRes = await henceforthApi.Department.listing();
      setState(apiRes);
    } catch (error) {}
  };
  console.log(state, "stateette");

  const addNewDepartment = async () => {
    setLoading(true);
    try {
      // let apiRes = await henceforthApi.
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitModal = async (values: any) => {
    console.log(values, "valuesss");
    const items = {
      title: values?.department,
      description: "string",
    };
    try {
      setLoading(true);
      let apiRes = await henceforthApi.Department.request(items);
      setOpenModal(false);
      // await initData();
      form.resetFields()
    } catch (error: any) {
      Toast.error(error?.response?.body?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    debugger
    try {
          let apiRes = await henceforthApi.Department.selectCompanyDepartment(String(selectedDepartment),{})
        router.replace(`/company/add-team-admin/${selectedDepartment}`);
    } catch (error) {}
  };
console.log(selectedDepartment,"selelelelell");

  React.useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <section className="auth_section department_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24}>
              <div className="auth_page">
                {/* title */}
                <div className="title mb-4">
                  <TypographyTitle level={2}>
                    Select your Department
                  </TypographyTitle>
                </div>

                <Row gutter={[4, 4]}>
                  {Array.isArray(state.data) &&
                    state.data.map((res: any, index) => (
                      <Col
                      onMouseOver={() => setSelectedDepartment(res._id)}
                        key={res._id}
                        span={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={6}
                        xxl={6}
                        className="dep-icon"
                      >
                        <Button
                          type="primary"
                          block
                          className={
                            selectedDepartment == res._id
                              ? "department_btn active white-icon"
                              : "department_btn"
                          }
                        >
                          {/* {res.image} */}
                          <HenceforthIcons.Hr />
                          {res?.title?.length > 20 ? `${res?.title?.slice(0,20)}...`: res?.title}
                        </Button>
                      </Col>
                    ))}
                  {/* {departmentData.map((res, index) => (
                    <Col
                      key={index}
                      span={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      xxl={6}
                    >
                      <Button
                        type="primary"
                        block
                        className={
                          index === 0
                            ? "department_btn active white-icon"
                            : "department_btn white-icon"
                        }
                      >
                        {res.image}
                        {res.text}
                      </Button>
                    </Col>
                  ))} */}
                 
                 {userType == "admin" ? <Col onClick={() => setSelectedDepartment("")} span={24} sm={12} md={8} lg={6} xl={6} xxl={6} >
                    <Button
                      onClick={() => setOpenModal(true)}
                      type="primary"
                      block
                      className="department_btn"
                    >
                      <HenceforthIcons.AddMore />
                      Add New Department
                    </Button>
                  </Col>:<Col onClick={() => setSelectedDepartment("")} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                    <Button
                      onClick={() => setOpenModal(true)}
                      type="primary"
                      block
                      className="department_btn"
                    >
                      <HenceforthIcons.AddMore />
                      Request Department
                    </Button>
                  </Col>}
                  <Col span={24} className="mt-4">
                    <Button
                    disabled={!selectedDepartment}
                      onClick={handleSubmit}
                      type="primary"
                      size="large"
                      block
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <RequestNewDepartment
          open={openModal}
          setOpen={setOpenModal}
          submit={handleSubmitModal}
          loading={loading}
          form={form}
        />
      </section>
    </>
  );
};
export default SelectDepartment;
