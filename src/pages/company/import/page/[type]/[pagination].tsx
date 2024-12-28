import MainLayout from "@/components/common/MainLayout";
import { Col, Divider, Row, Tabs, TypographyTitle } from "@/lib/AntRegistry";
import React, { ReactElement, useEffect, useState } from "react";
import { Pagination, TabsProps } from "antd";
import ImportExportCard from "@/components/ImportExportCard";
import { useRouter } from "next/router";
import henceforthApi from "@/utils/henceforthApi";
const ImportExport = () => {
    const router = useRouter();
    const [state, setState] = useState({ data: [], count: 0 })
    const handleRoute = (value: any) => {
        let old = router.query;
        console.log("alala", value);
        router.push({
            query: { ...old, type: value }
        })
    }
    const items: TabsProps['items'] = [
        {
            key: 'import',
            label: 'Import',
            children: <Row className="mt-4" gutter={[20, 0]}>
                {state.data.map((res: any, index: number) => {
                    return (
                        <Col key={index} span={24}>
                            <ImportExportCard {...res} key={index} />
                            <Divider />
                        </Col>
                    )
                })}
            </Row>,
        },
        {
            key: 'export',
            label: 'Export',
            children: <Row className="mt-4" gutter={[20, 0]}>
                {state.data.map((res: any, index: number) => <Col key={index} span={24} >
                    <ImportExportCard {...res} key={index} />
                    <Divider />
                </Col>)}
            </Row>,
        },
    ];
    const InitData = async () => {
        try {
            let urlSearchParam = new URLSearchParams();
            if (router.query.type) {
                urlSearchParam.set("type", String(router.query.type).toUpperCase());
            }
            if (router.query.pagination) {
                urlSearchParam.set("pagination", String(Number(router.query.pagination) - 1));
            }
            // if (router.query.limit) {
            urlSearchParam.set("limit", String(Number(router.query.limit) || 10));
            // }
            let apiRes = await henceforthApi.Process.importexport(urlSearchParam.toString());
            setState(apiRes);
        } catch (error) {

        }
    }

    const handlePagination = (page: number, pageSize: number) => {
        router.replace({
            query: { ...router.query, pagination: page, limit: pageSize }
        }, undefined, { shallow: true })
    }

    useEffect(() => {
        router.replace({
            query: { ...router.query, pagination: 1, limit: 10 }
        }, undefined, { shallow: true })
        InitData();
    }, [router.query.type])

    useEffect(() => {
        InitData();
    }, [router.query.pagination])
    return (
        <React.Fragment>
            <section className="import_export">
                <div className="container-fluid">
                    <Row justify={"center"}>
                        <Col span={24}>
                            <TypographyTitle level={4} className="mb-4">Import & Export</TypographyTitle>
                        </Col>
                        <Col span={24}>
                        <Tabs defaultActiveKey={String(router.query.type)} items={items} prefixCls="custom" onChange={handleRoute}/>
                            {/* <Row className="mt-4" gutter={[20, 0]}>
                                {state?.data?.length ? state.data.map((res: any, index: number) => {
                                    return (
                                        <Col key={index} span={24} md={12} lg={12} xl={24} xxl={24}>
                                            <ImportExportCard {...res} key={index} />
                                            <Divider />
                                        </Col>

                                    )
                                }):<Col className="m-auto"><Empty description="No data" /></Col>}
                            </Row> */}
                        </Col>
                        <Col span={24} className="text-center mt-2">
                            <Pagination current={Number(router.query.pagination) || 0} pageSize={Number(router.query.limit) || 10} total={state?.count} hideOnSinglePage={true} onChange={handlePagination} />

                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
ImportExport.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default ImportExport;