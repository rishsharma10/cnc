import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Col, Row } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import banner from '@/assets/brand-guide/bg-image.png';
const About = () => {
  return (
    <section className="contact-us pt-0 bg-white">
      <CommonBanner title="About us" />
      <div className="container mt-5 pt-5">
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
          <div className="about-banner">
            <img src={banner.src} alt="error" className='img-fluid' />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius, voluptate porro doloribus modi, necessitatibus incidunt beatae natus minima vitae facilis, illum labore. Consectetur numquam quia nostrum cum eveniet quod.</p>
          </Col>
          <Col span={24} lg={12} xl={12} xxl={12}>
          <div className="about-banner mt-4">
            <img src={banner.src} alt="error" className='img-fluid' />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit facilis nobis dolor magni inventore, laborum aliquid similique voluptate cum harum modi sunt recusandae perspiciatis? Vel debitis voluptates velit aut.</p>
          </Col>
        </Row>
      </div>
    </section>
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