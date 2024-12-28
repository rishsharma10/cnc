import React from "react";
import {
  AntForm,
  Button,
  FormItem,
  Input,
  InputPassword,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";


const SuperAdmin = (props: any) => {
  return (
    <div className="auth_page p-3 text-center">
      {/* title */}
      <div className="title mb-4">
        <TypographyTitle level={2}>Welcome to Raize</TypographyTitle>
        <TypographyText type="secondary">
          Enter the details to enter in Raize
        </TypographyText>
      </div>
      {/* form */}
      <AntForm
        className="pb-4 px-sm-4 pt-0"
        size="large"
        onFinish={props.handleSubmit}
      >
        <FormItem
          name="email"
          className="mb-3"
          rules={[
            { message: "Please enter email", whitespace: true, required: true },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              message: "Please enter password",
              whitespace: true,
              required: true,
            },
          ]}
        >
          <InputPassword placeholder="Password" />
        </FormItem>
        <div className="login-btn">
          <Button
            loading={props.loading}
            htmlType="submit"
            block
            type="primary"
          >
            Login
          </Button>
        </div>
      </AntForm>
    </div>
  );
};

export default SuperAdmin;

