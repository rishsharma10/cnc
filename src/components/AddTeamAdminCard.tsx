import { Card, Flex, Input, TypographyText } from "@/lib/AntRegistry";
import HenceforthIcons from "./HenceforthIcons";
const AddTeamAdminCard = (props:any) => {
    
    return (
        <Card bordered={false} className="add-team-admin-card h-100">
            <Flex className="w-100" align="center" gap={20}>
                <div className="icon">
                   {props.res.icon}
                </div>
                <div className="w-100">
                    <TypographyText className="fw-semibold d-block mb-2">Team admin of {props.res.title}</TypographyText>
                    <Input placeholder="Enter email" size="large" className="border ps-3"/>
                </div>
            </Flex>
        </Card>
    )
}
export default AddTeamAdminCard;