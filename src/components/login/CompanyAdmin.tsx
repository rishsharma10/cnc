import React, { useContext } from "react";
import {
  Button,
  Space,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";

import CustomGoogleLoginButton from "./GoogleButton"
import CustomOutlookButton from "../common/CustomOutlookButton";

const CompanyAdmin = () => {


  return (
    <div className="auth_page p-3 text-center">
      {/* title */}
      <div className="title mb-4">
        <TypographyTitle level={2}>Welcome to Raize</TypographyTitle>
        <TypographyText type="secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          facilis, quis perspiciatis voluptatem voluptates quasi enim officia
          blanditiis optio veritatis culpa hic molestias inventore iusto.
        </TypographyText>
      </div>
      <Space direction="vertical" className="w-100">
        <div className="login-btn">
          <CustomGoogleLoginButton />
        </div>
        <div className="login-btn">
     
     
          <CustomOutlookButton/>
        </div>
      </Space>
    </div>
  );
};

export default CompanyAdmin;
