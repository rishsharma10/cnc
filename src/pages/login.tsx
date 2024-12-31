import { AntForm, Button, Col, FormItem, Input, InputPassword, Row, TypographyText } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React, { useContext, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import crumbApi from '@/utils/crumbApis'
import { GlobalContext } from '@/context/Provider'
const LoginPage = () => {
    const router = useRouter()
    const {Toast} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (values: any) => {
        console.log(values, 'valuesssss');
        const payload = {
            email:values.email,
            password:values.password
        }
        try {
            setLoading(true)
            const apiRes = await crumbApi.Auth.login(payload);
            router.replace(`/`)
        } catch (error:any) {
            Toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }
    return (
        <section className='h-100 py-3'>
            <div className="container-fluid h-100">
                <Row align={'middle'} className='h-100 overflow-auto' justify={'center'}>
                    <Col span={24} md={20} lg={18} xl={16} xxl={16}>
                        <div className="d-flex align-items-center w-100 auth-page p-0">
                            <div className="auth-banner w-100 d-none d-md-block">
                            </div>
                            <div className="p-4 w-100 h-100 bg-white">
                                <div className="logo text-center mb-5">
                                    <Link href={'/'}><img src={logo.src} alt="error" height={120} width={120} /></Link>
                                </div>
                                <Form layout='vertical' size='large'>
                                <FormItem name={`email`} label={'Email'} rules={[
                                        {
                                            required: true,
                                            message: "Please enter your email address",
                                        },
                                        {
                                            type: 'email',
                                            message: 'Please enter valid email address',
                                        },
                                    ]}>
                                        <Input placeholder='Enter Email' />
                                    </FormItem>
                                    <FormItem name={`password`} label={'Password'} rules={[{ required: true, message: "Please enter password" }]}>
                                        <InputPassword placeholder='Enter Password' />
                                    </FormItem>
                                    <Link href={`/signup`}><TypographyText>Create an account ? Sign up</TypographyText></Link>
                                    <div className="submit-btn text-center mt-5">
                                        <Button htmlType='submit' type='primary' className='px-5'>LOGIN</Button>
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

export default LoginPage