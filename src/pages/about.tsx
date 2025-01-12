import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Button, Col, Row } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import banner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg';
import titleImage from '@/assets/brand-guide/title-separator.png';
import { Carousel } from 'antd';
import Link from 'next/link';
const About = () => {
  const stateData = [
    {
      count: 250,
      title: 'Varieties of Coffee',
    },
    {
      count: 126,
      title: 'Hours of Testing',
    },
    {
      count: 320,
      title: 'Coffee Markets',
    },
    {
      count: 220,
      title: 'Coffee Brands',
    },
  ]
  return (
    <>
      <section className="about-us pt-0 bg-white">
        <CommonBanner title="About us" />
        <div className="container mt-sm-5 pt-5">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} lg={16} xl={14} xxl={12} className='text-center'>
              <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
              <h4 className="title mb-4">
                About Robusta
              </h4>
              <p className="sub-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </Col>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <div className="about-banner mb-3">
                <img src={banner.src} alt="error" className='img-fluid' />
              </div>
              <p className='m-0 text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius, voluptate porro doloribus modi, necessitatibus incidunt beatae natus minima vitae facilis, illum labore. Consectetur numquam quia nostrum cum eveniet quod.</p>
            </Col>
            <Col span={24} lg={12} xl={12} xxl={12}>
              <div className="about-banner mb-3">
                <img src={banner.src} alt="error" className='img-fluid' />
              </div>
              <p className='m-0 text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit facilis nobis dolor magni inventore, laborum aliquid similique voluptate cum harum modi sunt recusandae perspiciatis? Vel debitis voluptates velit aut.</p>
            </Col>
          </Row>
        </div>
      </section>

      <section className="about-testimonial fixed-banner-section h-auto">
        <div className="container ">
          <Row justify={'center'}>
            <Col span={24} lg={20} xl={18} xxl={16}>
              <Carousel draggable={true}>
                {[...Array(4)].map((res) => <div key={res} className="about-testimonial-card pb-5">
                  <h4 className="title mb-3">Testimonials</h4>
                  <div className='mb-4 mb-sm-5'><img src={titleImage.src} alt="error" style={{ filter: 'sepia' }} className='mx-auto' /></div>
                  <p className='fs-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quaerat mollitia odit aut provident. Libero vitae provident cumque rerum sequi error aut nihil deleniti saepe. Reiciendis fuga sapiente voluptatum veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, molestias!</p>

                  <p className='m-0 mt-4 mt-sm-5 pb-3 text-uppercase fs-6 name'>Jean thompsan, <span className='text-lowercase'>barista</span></p>
                </div>)}
              </Carousel>
            </Col>
          </Row>
        </div>
      </section>

      {/* ---------------------- Stats Section --------------------------- */}
      <section className="stats-section">
        <div className="container">
          <Row gutter={[22, 20]}>
            {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="stats-card text-center">
                <h1>{res.count}</h1>
                <h4 className="mt-4 mb-2">{res.title}</h4>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean</p>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>
      {/* ---------------------------- contact-section ---------------- */}
      <section className="contact-section common-bg">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="contact-text d-flex gap-4 align-items-center justify-content-center justify-content-sm-between text-center text-sm-start flex-wrap">
                <h4 className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h4>
                <Link href={`/contact`}><Button type="primary" className="shadow-none h-auto">Contact us</Button></Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}
About.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default About