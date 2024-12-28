import ActivityCard from "@/components/ActivityCard";
import AlertCard from "@/components/AlertCard";
import MainLayout from "@/components/common/MainLayout";
import { Col, Row, Tabs, TypographyTitle } from "@/lib/AntRegistry";
import { TabsProps } from "antd";
import React, { ReactElement } from "react";

const AlertActivity = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Alerts',
            children: <Row className="mt-4" gutter={[24, 24]}>
                {[...Array(8)].map((index)=><Col key={index} span={24} md={12} lg={12} xl={12} xxl={12}>
                    <AlertCard />
                </Col>)}
            </Row>,
        },
        {
            key: '2',
            label: 'Activity',
            children: <Row className="mt-4" gutter={[14, 14]}>
            {[...Array(8)].map((index)=><Col key={index} span={24} md={12} lg={12} xl={12} xxl={12}>
                <ActivityCard />
            </Col>)}
        </Row>,
        },

    ];
    return (
        <React.Fragment>
            <section className="alerts-activity">
                <div className="container-fluid">
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <TypographyTitle className="m-0" level={4}>Alerts & Activities</TypographyTitle>
                        </Col>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" items={items} prefixCls="custom" />
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
AlertActivity.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default AlertActivity;