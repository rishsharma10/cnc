import { Avatar, Card, Flex, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import Link from "next/link";

const SettingCard = (props: any) => {
    return (
        <Link href={props.res.link}>
            <Card className="common_card" bordered={false}>
                <Flex align="center" gap={12}>
                    <div>
                        {props.res.icon}
                    </div>
                    <div>
                        <TypographyTitle className="fs-16 d-block m-0">{props.res.title}</TypographyTitle>
                        <TypographyText type="secondary">{props.res.text}</TypographyText>
                    </div>
                </Flex>
            </Card>
        </Link>
    )
}
export default SettingCard;