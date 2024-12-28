import { Avatar, Button, Card, Flex, TypographyText } from "@/lib/AntRegistry";
import profileImage from '@/assets/images/profile.png';

const StatsCard = ({res}:any) => {
    return (
        <Card className="stats_card common_card" bordered={false}>
            <div className="stats_count mb-3">
               {res.count}
            </div>
            <TypographyText className="fw-medium opacity-75">{res.statsName}</TypographyText>
        </Card>
    )
}
export default StatsCard;