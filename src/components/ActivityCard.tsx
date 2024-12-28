import { Avatar, Card, Flex, TypographyText } from "@/lib/AntRegistry";
import profile from '@/assets/images/profile.png';
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import henceforthApi from "@/utils/henceforthApi";
dayjs.extend(relativeTime)
const ActivityCard = (props:any) => {
    console.log(props,"reererere")
    return (
        <Card className="common_card" bordered={false}>
            <Flex align="center" justify="space-between" gap={10}>
                <Flex align="center" gap={8}>
                    <Avatar src={props?.sent_by?.profile_pic ? henceforthApi.FILES.imageSmall(props?.sent_by?.profile_pic) :  profile.src} size={40} />
                    <div className="d-flex flex-column">
                        {/* <TypographyText className="fw-medium d-block">{props?.res?.message}</TypographyText> */}
                        <TypographyText type="secondary" className="fs-12 fw-bold">{props?.title}</TypographyText>
                        <TypographyText type="secondary" className="fs-12">{props?.message?.split('/')}</TypographyText>
                    </div>
                </Flex>
                <TypographyText type="secondary" className="fs-12">{dayjs(props?.created_at).fromNow()}</TypographyText>
            </Flex>
        </Card>
    )
}
export default ActivityCard;