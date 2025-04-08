import React from "react";
import { Modal, Typography } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const { Text, Title } = Typography;

type StatusType = "success" | "error" | null;

interface StatusModalProps {
  open: boolean;
  status: StatusType;
  message?: string;
  onClose: () => void;
  setOpen: any
}

const StatusModal: React.FC<StatusModalProps> = ({
  open,
  status,
  message,
  onClose,
  setOpen
}) => {
  const router = useRouter()
  const isSuccess = status === "success";

  React.useEffect(() => {
    if (status) {
      setTimeout(() => {
        setOpen(false)
        router.replace(`/`)
      }, 3000);
    }
  }, [status])

  return (
    <Modal
      open={open}
      // onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <div className="text-center space-y-4 p-4">
        {isSuccess ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 60 }} />
        ) : (
          <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 60 }} />
        )}

        <Title level={3} className="mt-3" >
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </Title>

        <Text type={isSuccess ? "success" : "danger"}>
          {isSuccess
            ? "Your payment has been processed successfully."
            : message || "Something went wrong. Please try again."}
        </Text>
      </div>
    </Modal>
  );
};

export default StatusModal;
