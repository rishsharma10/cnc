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
              <p className='sub-title text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>

              <ul className='mt-4 mb-5 ps-3'>
                <li className='mb-2 text-secondary fs-16'>Duis aute irure dolor</li>
                <li className='mb-2 text-secondary fs-16'>In reprehenderit in</li>
                <li className='mb-2 text-secondary fs-16'>Voluptate velit esse</li>
                <li className='text-secondary fs-16'>Illum dolore eu fugiat nulla pariatur.</li>
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