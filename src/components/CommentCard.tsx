import { Avatar, Card, Flex, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import profile from '@/assets/images/profile.png';
import henceforthApi from "@/utils/henceforthApi";
import dayjs from "dayjs"

const CommentCard = (props:any) => {
    return (
        <Card bordered={false} className="shadow-none">
            <Flex gap={8}>
                <Avatar src={props?.user_id?.profile_pic ? henceforthApi.FILES.imageSmall(props?.user_id?.profile_pic) : profile.src} size={40} style={{ minWidth: 40 }} />
                <div className="w-100">
                    <Flex justify="space-between" gap={10}>
                        <TypographyTitle level={5} className="fs-16 m-0">{props?.user_id?.name ?? "N/A"}</TypographyTitle>
                        <TypographyText className="fs-12" type="secondary">{dayjs(props?.created_at).fromNow()}</TypographyText>
                    </Flex>
                    <TypographyText type="secondary">{props?.message}</TypographyText>
                </div>
            </Flex>
        </Card>
    )
}
export default CommentCard;