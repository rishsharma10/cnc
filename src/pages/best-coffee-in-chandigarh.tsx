import CommonLayout from '@/components/common/CommonLayout'
import React, { Fragment, ReactElement } from 'react'
import { Layout, Typography, Card, Row, Col, Carousel } from "antd";
import Head from 'next/head';
import CommonBanner from '@/components/CommonBanner';
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import titleImage from '@/assets/brand-guide/title-separator.png';
import aboutBanner from '@/assets/brand-guide/title-above.png';
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import blog2 from '@/assets/images/delicious-coffee-cup-table.jpg';
import blog3 from '@/assets/images/front-view-cake-slice-with-cream-fresh-red-strawberries-inside-plate-getting-sugar-powder-dark-background.jpg'
import { TypographyTitle } from '@/lib/AntRegistry';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const BestInChandigarh = () => {

    const reviews = [
        {
            title: "A Heaver For Coffee Lovers",
            content:
                "I have been searching for something different until I got to know about Copper & Crumb, an iconic cafe in Chandigarh. From the ambiance to freshly brewed coffee, everything steals your heart. Top recommendation for coffee lovers."
        },
        {
            title: "Chandigarh’s Hidden Gem",
            content:
                "Perfect ambiance for having a fresh cup of coffee. What I loved most about the cafe was how they are blending Indian flavor with French techniques. Don’t forget to try their yummy pastries."
        },
        {
            title: "My Favorite Weekend Place in Chandigarh",
            content:
                "I got to know about Copper & Crumb through one of my friends. I never knew it was that amazing until I searched for new cafes in Chandigarh and finally visited. The pastries were super delicious. I also enjoyed the homely vibes."
        },
        {
            title: "Authentic Indo-French Delight",
            content:
                "A perfect coffee place where you can explore French flavors while maintaining Indian roots. It’s probably the best cafe in Chandigarh for couples. Each sip of Copper & Crumb’s coffee will give you a delightful experience."
        }
    ];
    const stateData = [
        {
            count: 250,
            title: 'Signature Pastry Program',
            desc: "At Copper & Crumb, we blend Indian inspiration with French tradition to create something beyond magical. Our pastry program has stolen hearts with delicious taste. You can witness the magical creation of the pastry program while having your favorite coffee."
        },
        {
            count: 126,
            title: 'Classic Indo-French Coffee',
            desc: "Copper & Crumb is significantly special for Indo-French delicacy. Find a piece of tranquility with a cup of freshly brewed coffee. We take pride in fusing French and Indian techniques to craft something beyond heavenly."
        },
    ]
    return (
        <Fragment>
            <Head>
                <title>Copper & Crumb: Iconic Backpackers Cafe in Chandigarh</title>
                <meta name='desription' content={`Are you looking for a perfect dating venue to surprise your partner? Being one of the top cafes in Chandigarh, Copper & Crumb can make everything even more special. Experience the classic touch of Indo-French fusion.`} />
            </Head>
            <CommonBanner title={"Best coffee in chandigarh"} />
            {/* <section className="blog-section common-bg-1">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="full-width-image">
                                <img src={blogImage.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>A Cafe With Indo-French Culinary Revolution</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    When classic French techniques meet Indian inspiration, they create something magical. Copper & Crumb is the best one when it comes to the best Indo-French cafe in Panchkula. Our culinary experts are crafting something revolutionary to give you the next-level experience. At Copper & Crumb, you can savor the unique taste of coffee crafted by using antique copper pots and modern-day espresso machines. The enchanting aroma of freshly brewed coffee will make your moments more special.
                                </p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section> */}
            <section>
                <div className="container mt-sm-0 pt-0">
                    <Row gutter={[20, 20]} justify={'center'}>
                        <Col span={24} lg={16} xl={14} xxl={12} className='text-center'>
                            <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
                            <h4 className="title mb-4">
                                Copper & Crumb
                            </h4>
                            <h6 className="fw-semibold fs-4 mb-4">
                            A Classic Indo-French Fusion Cafe
                            </h6>
                            <p className="sub-title">
                            Copper & Crumb is a place of experiment, experience, and perfection. We are working on a revolutionary mission to blend traditional French flavor with Indian inspiration. From copper pots to modern-day coffee machines, you will find uniqueness in every aspect. We are experts at crafting something rich yet unique to give customers a next-level culinary experience. Copper & Crumb is a significant name when it comes to the best cafe in Chandigarh. Witness art come to life as our team transforms simple items to incredible cuisines. Whether you are planning a date or want to have some quality time with friends, Copper & Crumb can be your go-to coffee venue.
                            </p>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="blog-section common-bg-2">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24} md={12} sm={24}>
                            <div className="full-width-image">
                                <img src={blog3.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>The Story Behind Copper & Crumb</h4>
                                <p className="mt-2 mb-3 text-dark">
                                Copper & Crumb tells the story of two inspiring personalities. The journey of this dream Indo-French cafe started when Kannupriya met Utkarsh at a school get-together. They discovered the idea of connecting Indian emotion with French techniques. This gave birth to Copper & Crumb, one of the top cafes in Chandigarh, where customers can savor the unique flavor of the Indo-French fusion.
                                </p>
                            </div>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <div className="full-width-image">
                                <img src={blog2.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>A Mission of Sustainability & Empowerment</h4>
                                <p className="mt-2 mb-3 text-dark">
                                Being a famous cafe in Chandigarh, Copper & Crumb takes the responsibility of promoting sustainability. We are connected to local farmers to provide authentic cuisines to everyone. Our team has a vision of women's empowerment, and we are working with local women to share the dream of culinary arts. Join our journey to make the planet greener while maintaining the authenticity of Indo-French cuisines.
                                </p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            <section className="offer-section common-bg-1">
                <div className="container">
                    <Row justify={"center"} className="mb-5">
                        <Col span={24} md={20} lg={16} xl={14} className="text-center">
                            <h2 className="title">Our Best Creations
                            </h2>
                            <img src={titleSeperator.src} alt="error" className="title-seperator" />

                        </Col>
                    </Row>
                    <Row gutter={[14, 14]} justify={'center'}>
                        {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="offered-items-container text-center h-100 p-4">
                                <h4 className="mt-3 mb-3">{res.title}</h4>
                                <p className="text-dark ">{res.desc}</p>
                            </div>
                        </Col>)}
                    </Row>
                </div>
            </section>
            <section className="about-testimonial fixed-banner-section-1 h-auto">
                <div className="container ">
                    <Row justify={'center'}>
                        <Col span={24} lg={20} xl={18} xxl={16}>
                            <Carousel draggable={false}>
                                {reviews.map((res: any) => <div key={res} className="about-testimonial-card pb-5">
                                    <h4 className="title mb-3">Customer Testimonials</h4>
                                    <div className='mb-4 mb-sm-5'><img src={titleImage.src} alt="error" style={{ filter: 'sepia' }} className='mx-auto' /></div>
                                    <TypographyTitle className='text-white' level={5}>{`‘${res.title}’`}</TypographyTitle>
                                    <p className='fs-6'>{res.content}</p>
                                </div>)}
                            </Carousel>
                        </Col>
                    </Row>
                </div>
            </section>
        </Fragment>
    )
}
BestInChandigarh.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default BestInChandigarh