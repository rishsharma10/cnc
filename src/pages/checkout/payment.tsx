import CheckLayout from '@/components/common/CheckoutLayout'
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Button, Checkbox, Col, Collapse, Flex, FormItem, Input, InputPassword, Row, Space } from '@/lib/AntRegistry'
import crumbApi from '@/utils/crumbApis'
import { Grid } from 'antd'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const Payment = () => {
  const screens = Grid.useBreakpoint()
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




const handleSubmit = async (values: any) => {
  const payload = {
      ...values,
      billing_same: true
  }
  try {
      // setLoading(true)
      // let apiRes = await crumbApi.Auth.updateAddress(payload)
      // setUserInfo({
      //     ...userInfo,
      //     b_address_line_1: values.b_address_line_1 ?? 'Goa Panji'
      // })
      // setShow(false)
  } catch (error) {

  } finally {
      // setLoading(false)
  }
}



  return (
    <section className='checkout-section pt-0 bg-white'>
      {/* <CommonBanner title="CHeckout" /> */}
      <Flex>
        <Col span={12} xxl={12} md={24}>
        <div className="container">
          <AntForm className='w-100' layout='vertical' size={!screens.md ? "middle" : 'large'} onFinish={handleSubmit}>
                                                    <Row gutter={[10, 0]}>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={5}>
                                                            <FormItem name='b_first_name' rules={[{ required: true, message: "Please enter first name" }]} label={'First name'}>
                                                                <Input placeholder='Enter first name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={5}>
                                                            <FormItem name='b_last_name' rules={[{ required: true, message: "Please enter last name" }]} label={'Last name'}>
                                                                <Input placeholder='Enter last name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={10}>
                                                            <FormItem name='b_address_line_1' rules={[{ required: true, message: "Please enter address" }]} label={'Address'}>
                                                                <Input placeholder='Enter Address' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_zipcode' rules={[{ required: true, message: "Please enter pincode" }]} label={'Pincode'}>
                                                                <Input placeholder='Enter pincode' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_phone' rules={[{ required: true, message: "Please enter phone number" }]} label={'Phone'}>
                                                                <Input placeholder='Enter phone number' />
                                                            </FormItem>
                                                        </Col>

                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_country' rules={[{ required: true, message: "Please enter country" }]} label={'Country'}>
                                                                <Input placeholder='Enter country' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_state' rules={[{ required: true, message: "Please enter state" }]} label={'State'}>
                                                                <Input placeholder='Enter state' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                            <FormItem name='b_city' rules={[{ required: true, message: "Please enter city" }]} label={'City'}>
                                                                <Input placeholder='Enter city' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                        </Col>
                                                    </Row>
                                                </AntForm>
          <Col span={12}xxl={12} md={24}>
          </Col>
      </div>
        </Col>
        <Col span={24} xxl={12} md={24}>
        <div className="container bg-info">
          <AntForm className='w-100' layout='vertical' size={!screens.md ? "middle" : 'large'} onFinish={handleSubmit}>
                                                    <Row gutter={[10, 0]}>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={5}>
                                                            <FormItem name='b_first_name' rules={[{ required: true, message: "Please enter first name" }]} label={'First name'}>
                                                                <Input placeholder='Enter first name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={5}>
                                                            <FormItem name='b_last_name' rules={[{ required: true, message: "Please enter last name" }]} label={'Last name'}>
                                                                <Input placeholder='Enter last name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={6} md={6} xs={10}>
                                                            <FormItem name='b_address_line_1' rules={[{ required: true, message: "Please enter address" }]} label={'Address'}>
                                                                <Input placeholder='Enter Address' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_zipcode' rules={[{ required: true, message: "Please enter pincode" }]} label={'Pincode'}>
                                                                <Input placeholder='Enter pincode' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_phone' rules={[{ required: true, message: "Please enter phone number" }]} label={'Phone'}>
                                                                <Input placeholder='Enter phone number' />
                                                            </FormItem>
                                                        </Col>

                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_country' rules={[{ required: true, message: "Please enter country" }]} label={'Country'}>
                                                                <Input placeholder='Enter country' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_state' rules={[{ required: true, message: "Please enter state" }]} label={'State'}>
                                                                <Input placeholder='Enter state' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                            <FormItem name='b_city' rules={[{ required: true, message: "Please enter city" }]} label={'City'}>
                                                                <Input placeholder='Enter city' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={24} md={24} xs={22}>
                                                        </Col>
                                                    </Row>
                                                </AntForm>
          <Col span={24}xxl={12} md={24}>
          </Col>
      </div>
        </Col>
      </Flex>
      
    </section>
  )
}
Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <CheckLayout>
      {page}
    </CheckLayout>
  )
}

export default Payment