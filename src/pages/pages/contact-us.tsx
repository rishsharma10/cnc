import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Button, Col, FormItem, Input, Row, TextArea } from '@/lib/AntRegistry'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const Contact = () => {
  return (
    <section className="contact-us pt-0 bg-white">
      <CommonBanner title="Contact us" />

      <div className="container mt-sm-5 pt-5">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-info">
              <h4 className='title mb-3'>Get in Touch</h4>
              <p className='sub-title text-secondary'>We’re always here to assist you with any inquiries, feedback, or support you may need. Whether it’s about your recent purchase, product details, or just a friendly chat about coffee, feel free to get in touch with us. Your satisfaction is our priority, and we’re committed to making your experience with Copper & Crumb seamless and enjoyable.</p>

              <ul className='mt-4 mb-5 ps-3'>
                <li className='mb-2 text-secondary fs-16'>Share your thoughts to help us improve.
</li>
                <li className='mb-2 text-secondary fs-16'>Let’s create something amazing together.</li>
                <li className='mb-2 text-secondary fs-16'>Got questions? We’re here to assist.</li>
                <li className='text-secondary fs-16'>Experience Copper & Crumb in person.</li>
              </ul>

              <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                <li><Link href={'/'}><i className="fa-brands fa-facebook text-secondary fs-6"></i></Link></li>
                <li><Link href={'/'}><i className="fa-brands fa-square-instagram text-secondary fs-6"></i></Link></li>
                <li><Link href={'/'}><i className="fa-brands fa-twitter text-secondary fs-6"></i></Link></li>
                <li><Link href={'/'}><i className="fa-brands fa-linkedin text-secondary fs-6"></i></Link></li>
              </ul>
            </div>
          </Col>

          <Col span={24} lg={12} xl={12} xxl={12}>
            <div className="contact-form">
              <AntForm size='large'>
                <Row gutter={[20, 8]}>
                  <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                    <FormItem>
                      <Input placeholder='YOUR NAME' />
                    </FormItem>
                  </Col>
                  <Col span={24} md={12} lg={12} xl={12} xxl={12}>
                    <FormItem>
                      <Input placeholder='YOUR EMAIL' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      <Input placeholder='SUBJECT' />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      <TextArea placeholder='Message here...' rows={5} />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <Button type='primary' className='px-5'>Send message</Button>
                  </Col>
                </Row>
              </AntForm>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
Contact.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Contact