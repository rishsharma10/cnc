import CommonLayout from "@/components/common/CommonLayout";
import React from "react";
import { Button, Modal, Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Text, Title } = Typography;
import { Fragment, ReactElement, useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";

const OrderStatus = (props:any) => {
  const {type} = props
  const [isSuccess, setIsSuccess] = useState(true);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (type == "error") {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
    setTimeout(() => {
        setLoading(false)
    }, 500);
  }, [type]);

  return (
    <Fragment>
      {!loading &&<div className="text-center space-y-4 p-5">
        {isSuccess ? (
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ fontSize: 100 }}
          />
        ) : (
          <CloseCircleTwoTone
            twoToneColor="#ff4d4f"
            style={{ fontSize: 100 }}
          />
        )}

        <Title level={1} className="mt-5">
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </Title>

        <Title
          level={3}
          className="my-2"
          type={isSuccess ? "success" : "danger"}
        >
          {isSuccess
            ? "Your payment has been processed successfully."
            : "Something went wrong. Please try again."}
        </Title>
        <br />
        <Link className="my-5" href={`/`}>
          <Button size="large" type="primary">
            Back to Home
          </Button>
        </Link>
      </div>}
    </Fragment>
  );
};
OrderStatus.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const type = context.query.type
    return {
      props: {type },

    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },

    }
  }
}
export default OrderStatus;
