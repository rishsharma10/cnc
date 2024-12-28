import { Button, Card, Col, Flex, TypographyTitle } from "@/lib/AntRegistry";
import React, { Children } from "react";
import HenceforthIcons from "./HenceforthIcons";
import { capitalizeFirstLetter } from "@/utils/henceforthValidations";

const SharedBodyCompo = ({
  Children,
  modalType,
  setShareModalOpen,
  setModalType,
}: any) => {
  return (
    <Col span={24} md={12} lg={12} xl={8} xxl={8} className="shared_card_col">
      <Card bordered={false} className="common_card p-0 shared_card">
        <Flex
          className="shared_header"
          align="center"
          justify="space-between"
          gap={10}
        >
          <TypographyTitle level={5} className="fs-16 m-0 fw-bold">
            Shared {capitalizeFirstLetter(modalType)}
          </TypographyTitle>
          <Button
            onClick={() => {
              setShareModalOpen(true);
              setModalType(modalType);
            }}
            type="text"
            className="p-0 h-100"
            shape="circle"
          >
            <HenceforthIcons.AddFill />
          </Button>
        </Flex>
        <div className="px-4 py-3">{Children}</div>
      </Card>
    </Col>
  );
};

export default SharedBodyCompo;
