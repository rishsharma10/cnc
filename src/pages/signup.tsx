import { AntForm, Button, Col, FormItem, Input, InputPassword, Row } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React from 'react'
import logo from '@/assets/brand-guide/logo.png'
import Link from 'next/link'
import banner from '@/assets/brand-guide/hero-image.png'
const SignupPage = () => {
    return (
        <section>
            <div className="container">
                <Row align={'middle'} justify={'center'}>
                    <Col span={24} md={20} lg={18} xl={18} xxl={18}>
                        <div className="d-flex align-items-center w-100 auth-page p-0">
                            <div className="auth-banner w-100 d-none d-md-block">
                            </div>
                            <div className="p-4 w-100 h-100 bg-white">
                                <div className="logo text-center mb-5">
                                    <Link href={'/'}><img src={logo.src} alt="error" height={120} width={120} /></Link>
                                </div>
                                <Form layout='vertical' size='large'>
                                    <FormItem label={'Username'}>
                                        <Input placeholder='Enter Username' />
                                    </FormItem>
                                    <FormItem label={'Email'}>
                                        <Input placeholder='Enter Email' />
                                    </FormItem>
                                    <FormItem label={'Password'}>
                                        <InputPassword placeholder='Enter Password' />
                                    </FormItem>
                                    <FormItem label={'Confirm Password'}>
                                        <InputPassword placeholder='Enter Confirm Password' />
                                    </FormItem>
                                    <div className="submit-btn text-center mt-5">
                                        <Button htmlType='submit' type='primary' className='px-5'>Sign Up</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default SignupPage