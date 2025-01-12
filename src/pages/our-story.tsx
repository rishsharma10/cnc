import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { Col, Row } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import banner from '@/assets/brand-guide/bg-image.png';
const OurStory = () => {
  return (
    <section className="contact-us pt-0 bg-white">
      <CommonBanner title="Our story" />
      <div className="container mt-sm-5 pt-5">
        <Row gutter={[20, 20]} justify={'center'}>
          <Col span={24} lg={16} xl={14} xxl={12} className='text-center mb-4'>
            <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
            <h4 className="title mb-4">
              Our story
            </h4>
            <p className="sub-title">
              From quiet kitchen experiments during motherhood to the bustling heart of Panchkula's culinary
              scene, Copper & Crumb represents the vision of two women who dared to dream differently.
              Here, antique copper pots share space with modern espresso machines, while Kerala vanilla
              beans infuse the air alongside French butter
            </p>
          </Col>
          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="about-banner mb-3">
              <img src={banner.src} alt="error" className='img-fluid' />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius, voluptate porro doloribus modi, necessitatibus incidunt beatae natus minima vitae facilis, illum labore. Consectetur numquam quia nostrum cum eveniet quod.</p>
          </Col>
          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="about-banner mb-3">
              <img src={banner.src} alt="error" className='img-fluid' />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias velit facilis nobis dolor magni inventore, laborum aliquid similique voluptate cum harum modi sunt recusandae perspiciatis? Vel debitis voluptates velit aut.</p>
          </Col>
        </Row>
      </div>
    </section>
  )
}
OurStory.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default OurStory