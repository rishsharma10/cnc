import MainLayout from "@/components/common/MainLayout";
import { Button, Card, Col, Flex, Row, Space, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import React, { ReactElement } from "react";
import gradientBg from '@/assets/images/gradient-bg.png';
import HenceforthIcons from "@/components/HenceforthIcons";
const CompanyDetails = () => {
    const details = [
        {
            label: 'Company Name:',
            data: 'Raize'
        },
        {
            label: 'Company Domain:',
            data: 'www.raize.com'
        },
        {
            label: 'Industry:',
            data: 'IT'
        },
        {
            label: 'Country:',
            data: 'Dubai'
        },
        {
            label: 'City:',
            data: 'Abu Dhabi'
        },
        {
            label: 'Phone:',
            data: '+971 9632587412'
        },
        {
            label: 'Timezone:',
            data: 'Gulf Standard Time'
        },
    ]
    return (
        <React.Fragment>
            <section className="company_details">
                <div className="container-fluid">
                    <Row justify={"center"}>
                        <Col span={24}>
                            <div className="company_details_banner">
                                <img src={gradientBg.src} alt="Not Found" className="img-fluid" />
                            </div>
                        </Col>
                        <Col span={22} md={20} lg={18} xl={12} xxl={10} style={{ marginTop: '-128px' }}>
                            <div className="company_details_box common_card bg-white">
                                <TypographyTitle level={4} className="text-center mb-4">Company Details</TypographyTitle>

                                <Space direction="vertical" className="w-100">
                                    {details.map((res, index) => <Card key={index} className="common_card rounded-pill" bordered={false}>
                                        <Flex justify="space-between" gap={12} align="center">
                                            <TypographyText type="secondary">{res.label}</TypographyText>
                                            <TypographyText className="fw-semibold">{res.data}</TypographyText>
                                        </Flex>
                                    </Card>)}

                                    <Button type="primary" className="place-items mt-4 white-icon" block size="large" icon={<HenceforthIcons.Pencil/>}>Edit</Button>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
CompanyDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default CompanyDetails;