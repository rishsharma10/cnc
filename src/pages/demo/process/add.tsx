import CommonStep1 from "@/components/Step-1";
import CommonStep2 from "@/components/Step-2";
import CommonStep3 from "@/components/Step-3";
import MainLayout from "@/components/common/MainLayout";
import { GlobalContext } from "@/context/Provider";
import { Button, Col, Row, Steps } from "@/lib/AntRegistry";
import henceforthApi from "@/utils/henceforthApi";
import { message, theme } from "antd";
import React, { ReactElement, useContext, useState } from "react";

const ProcessSteps = () => {
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: '1. Assigned to',
            content: <CommonStep1 />,
        },
        {
            title: '2. Process Details',
            content: <CommonStep2 />,
        },
        {
            title: '3. Access & Security',
            content: <CommonStep3 />,
        },
    ];


    const { token } = theme.useToken();

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const { raize: imgText, Video } = useContext(GlobalContext);
    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    const updateDataAsync = (item:any) => {
        return new Promise((resolve, reject) => {
            // For demonstration, let's assume we're just adding " - updated" to each text
            item.text += " - updated";
            // Simulating asynchronous operation with setTimeout
            setTimeout(() => {
                resolve(item);
            }, 1000); // Simulating 1 second delay
        });
    };

    // const updateContent = async () => {
    //     try {
    //         const updatedData = await Promise.all(Array.isArray(imgText) && imgText.map(updateDataAsync));
    //     return updatedData;
    //         let apiRes = await henceforthApi.Demo.createContent()
    //     } catch (error) {
             
    //     }
    // }

    return (
        <React.Fragment>
            <section className="tep1">
                <div className="container-fluid">
                    <Row>
                        <Col span={24} md={20} lg={16} xl={14} xxl={12}>
                            <Steps current={current} items={items} />
                            <div>{steps[current].content}</div>
                            <div style={{ marginTop: 24 }}>
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => next()}>
                                        Next
                                    </Button>
                                )}
                                
                            </div>
                        </Col>  
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
ProcessSteps.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default ProcessSteps;