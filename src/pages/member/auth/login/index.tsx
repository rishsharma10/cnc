import CompanyAdmin from "@/components/login/CompanyAdmin";
import SuperAdmin from "@/components/login/SuperAdmin";
import { GlobalContext } from "@/context/Provider";
import { Col, Row } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const Login = () => {
  const {
    initLoginWithGoogle,
  } = useContext(GlobalContext);
  const router = useRouter();
  const { user_type } = router.query;
  const [loading, setLoading] = useState(false)

 
  React.useEffect(() => {
    initLoginWithGoogle("signupGoogleButton");
  }, []);

  return (
    <>
      <section className="auth_section">
        <div className="container">
          <Row justify={"end"}>
            <Col span={24} md={12} lg={12} xl={10} xxl={8}>
            <CompanyAdmin />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
export default Login;
