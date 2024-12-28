import { Avatar, Button, Card, Flex, TypographyText } from "@/lib/AntRegistry";
import profileImage from "@/assets/images/profile.png";
import { Popconfirm } from "antd/lib";
import dayjs from "dayjs";
import henceforthApi from "@/utils/henceforthApi";


const ProcessSchedule = (props: any) => {
  const getHours = (time: number) => {
    const date = new Date(time);
    const hours = date.getHours();
    return hours;
  };
  return (
    <Card className="alert_card" bordered={false}>
      <Flex justify="space-between" align="center" gap={8} className="mb-3">
        <Flex align="center" gap={8}>
          <Avatar
            src={
              props?.sent_by?.profile_pic
                ? henceforthApi.FILES.imageSmall(props?.sent_by?.profile_pic)
                : profileImage.src
            }
            size={50}
          />
          <div>
            <TypographyText className="fw-semibold fs-14 d-block text-capitalize">
              {props?.process_id?.title}
            </TypographyText>
            <TypographyText type="secondary" className="fs-12">
              {props?.process_id?.description?.slice(0, 30) + "..."}
            </TypographyText>
          </div>
        </Flex>
        {/* <TypographyText type="secondary" className="fs-12 fw-medium">{dayjs(props?.process_id?.created_at).format(`HH:mm`)}</TypographyText> */}
        <TypographyText type="secondary" className="fs-12 fw-medium">
          {dayjs(props?.process_id?.created_at).format(`HH:mm`)}-
          {dayjs(props?.process_id?.created_at).add(getHours(props?.process_id?.estimate_time), 'hour').format(`HH:mm`)}
        </TypographyText>
      </Flex>
      <Flex gap={8} align="center">
        <Popconfirm
          title={`Done this process ?`}
          onConfirm={() => props?.handleDoneProcess(props?._id)}
          description={`Are you sure you want to done this process?`}
        >
          <Button type="primary" size="small" block>
            Done
          </Button>
        </Popconfirm>
        <Button
          onClick={() => {
            props?.setProcessIgnoreId(props?._id);
            props?.setOpen(true);
          }}
          className="btn-secondary"
          block
          size="small"
        >
          Ignore
        </Button>
      </Flex>
    </Card>
  );
};
export default ProcessSchedule;
