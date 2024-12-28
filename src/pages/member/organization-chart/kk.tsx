import OrganizationCard from "@/components/OrganizationCard";
import MainLayout from "@/components/common/MainLayout";
import { Col, Row } from "@/lib/AntRegistry";
import React, { ReactElement } from "react";

const OrganizationChart = () => {

    const orgChart = {
        super_admin:{
            name:"sa",
            title:"title",
            img:"https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png"
        },
        ca:[
            {
                name:"ca 1",
            title:"title",
            img:"https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png"
            },
            {
                name:"ca 2",
            title:"title",
            img:"https://sharedecommerce.nyc3.digitaloceanspaces.com/sharedecommerce/medium/top_fashion_versace_three_1682918377472.png"
            }
        ]
    }

    return (
        <React.Fragment>
            <section className="organization-chart h-100">
                <div className="container-fluid h-100">
                    <Row className="h-100" justify={"center"} align={"middle"}>
                        <Col>
                            <div className="chart_container">'
                                <div className="tf-tree">
                                    <ul>
                                        {/* Super Admin */}
                                        <li>
                                            <span className="tf-nc"><OrganizationCard /></span>
                                            <ul>
                                                {/* Company Admin */}
                                                <li>
                                                    <span className="tf-nc"><OrganizationCard /></span>l
                                                    <ul>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /> </span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    {/* Company Admin */}
                                                    <span className="tf-nc"><OrganizationCard /></span>
                                                    <ul>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    {/* Company Admin */}
                                                    <span className="tf-nc"><OrganizationCard /></span>
                                                    <ul>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    {/* Company Admin */}
                                                    <span className="tf-nc"><OrganizationCard /></span>
                                                    <ul>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    {/* Company Admin */}
                                                    <span className="tf-nc"><OrganizationCard /></span>
                                                    <ul>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        {/* Team Admin */}
                                                        <li>
                                                            <span className="tf-nc"><OrganizationCard /></span>
                                                            <ul>
                                                                {/* Team Members */}
                                                                <li>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                    <span className="tf-nc mb-4"><OrganizationCard /></span>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
OrganizationChart.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default OrganizationChart;