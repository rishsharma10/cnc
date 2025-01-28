import { AntForm, Button, Col, FormItem, Input, InputPassword, Row, TypographyText } from '@/lib/AntRegistry'
import { Form } from 'antd'
import React, { useContext, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import crumbApi from '@/utils/crumbApis'
import { GlobalContext } from '@/context/Provider'
import { setCookie } from 'nookies'
import { COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN } from '@/context/actionTypes'
type CartItem = {
    id: number;
    quantity: number;
  };
  
  type Product = {
    id: number;
    quantity: number;
  };
const LoginPage = () => {
    const router = useRouter()
    const {Toast,setUserInfo,initCart,cartData,setCartData} = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)


    const addToCart = async (product_id: number, quantity: number) => {
        try {
          const cartPayload = {
            product_id: product_id,
            quantity: quantity
          }
          let apiRes = await crumbApi.Cart.add(cartPayload)
        
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      };

      const updateCart = async (product_id: number, quantity: number) => {
        const payload = {
          product_id:product_id,
          quantity:quantity
        }
        try {
          const apiRes = await crumbApi.Cart.update(payload)
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      };


    const syncCartData = async (localStorageData: CartItem[], newArray: Product[]) => {
        // Iterate through the new array of products
        for (const product of newArray) {
          const localStorageItem = localStorageData.find(item => item.id === product.id);
      
          if (localStorageItem) {
            // If the product exists in localStorage, update the quantity
            const updatedQuantity = localStorageItem.quantity;
            await updateCart(product.id, updatedQuantity);
          } else {
            // If the product doesn't exist in localStorage, add it to the cart
            await addToCart(product.id, product.quantity);
          }
        }
      };













    const handleSubmit = async (values: any) => {
      debugger
        console.log(values, 'valuesssss');
        const payload = {
            email:values.email,
            password:values.password
        }
        try {
            setLoading(true)
            const apiRes = await crumbApi.Auth.login(payload);
            crumbApi.setToken(apiRes.token)
            const apiResUser = await crumbApi.Auth.profile();
            // let localStorageData:any =  localStorage.getItem("cart") ?? []
            // if(localStorageData){
            //   let cartData = await crumbApi.Cart.list()
            //   await syncCartData(JSON.parse(localStorageData),cartData.cart)
            // }
            await initCart()
            setUserInfo({
                ...apiResUser?.customer,
                access_token:apiRes.token
              });
              setCookie(this, COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN, apiRes?.token, {
                path: "/",
              });
            router.replace(`/`)
        } catch (error:any) {
            Toast.error(error.message)
            setLoading(false)
        }finally{
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
                                <Form layout='vertical' size='large' onFinish={handleSubmit}>
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
                                        <Button loading={loading} htmlType='submit' type='primary' className='px-5'>LOGIN</Button>
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