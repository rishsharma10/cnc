import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Button, Checkbox, Col, Collapse, Flex, FormItem, Input, InputPassword, Row, Space } from '@/lib/AntRegistry'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const Payment = () => {
  const returningCustomers = <div>
    <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>

    <AntForm layout='vertical' size='large'>
      <FormItem label="Username or email *">
        <Input />
      </FormItem>
      <FormItem label="Password *">
        <InputPassword />
      </FormItem>

      <Flex align='center' className='mb-4' gap={12}>
        <Checkbox>Remember me</Checkbox>
        <Button type='primary' className='px-4'>Login</Button>
      </Flex>

      <Link href={'/'} className='text-secondary fw-normal'>Lost your password?</Link>
    </AntForm>
  </div>;
  const couponCode = <div>
    <AntForm layout='vertical' size='large'>
      <FormItem label="If you have a coupon code, please apply it below.">
        <Input placeholder='Coupon code'/>
      </FormItem>
      <Button type='primary' className='px-5'>apply coupon</Button>
    </AntForm>
  </div>;
  return (
    <section className='checkout-section pt-0 bg-white'>
      <CommonBanner title="CHeckout" />
      <div className="container">
        <Row>
          <Col span={24}>
            <Space size={'large'} direction='vertical' className='w-100 mt-5 pt-5'>
              <Collapse
                expandIconPosition='end'
                size="large"
                items={[{
                  key: '1', label: <Flex className='w-100' justify='space-between' gap={12} align='center'><span>Returning customer?</span><span>Click here to login</span></Flex>, showArrow: false,
                  children: <>{returningCustomers}</>
                }]}
              />
              <Collapse
                expandIconPosition='end'
                size="large"
                items={[{ key: '1', showArrow: false, label: <Flex className='w-100' justify='space-between' gap={12} align='center'><span>Have a coupon?</span><span>Click here to enter your code</span></Flex>, children: <>{couponCode}</> }]}
              />
              <Collapse
                expandIconPosition='end'
                collapsible='icon'
                size="large"
                items={[{ key: '1', label: <Flex className='w-100' justify='space-between' gap={12} align='center'><span>Sorry, your session has expired.</span><Link href={`/product/search/1`}>Return to shop</Link></Flex>, showArrow:false, children: <p></p> }]}
              />
            </Space>
          </Col>
        </Row>
      </div>
    </section>
  )
}
Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}

export default Payment