import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Avatar, Button, Col, Flex, FormItem, Input, Row, Table } from '@/lib/AntRegistry'
import React, { ReactElement, useState, useContext, Fragment } from 'react'
import CrumbIcons from '@/components/CrumbIcons'
import productImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg';
import Link from 'next/link'
import CommonBanner from '@/components/CommonBanner';
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider'
import banner_img from "@/assets/images/plate_dish.jpg"
import { Grid } from 'antd';
import crumbApi, { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis';
import CartCountCompo from '@/components/CartCountCompo';
const AddToCart = () => {
    const { Toast, userInfo, cartData, initCart } = useContext(GlobalContext)
    const router = useRouter()
    const [state, setState] = useState({ data: cartData.data, count: cartData.count })



    const handleIncDec = async (pid: number, type: string, qty: number, index: number) => {
        debugger
        try {
          
          if (!userInfo?.access_token) {
            let cart: any = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            let itemFound = false;
            cart = cart.map((item: any) => {
              if (item.id === pid) {
                itemFound = true;
                return { ...item, quantity: qty };
              }
              return item;
            });
            if (!itemFound) {
              return
              // Toast.warning('Item not found in cart');
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            // if (type == 'INC') {
            //   setQuantity(quantity + 1)
            // } else {
            //   setQuantity(quantity - 1)
            // }
          } else {
            const payload = {
              product_id:pid,
              quantity:qty
            }
            const apiRes = await crumbApi.Cart.update(payload)
            if (type == 'INC') {
                const data = state.data
                data[index].quantity = qty +1
            } else {
                const data = state.data
                data[index].quantity = qty -1
            }
          }
        } catch (error) {
    Toast.error(error)
        }
      }
      const handleRemoveCart = async (id:number,index:number) => {
        debugger
        try {
            let apiRes = await crumbApi.Cart.remove({product_id:id})
            await initCart()
        } catch (error) {
            
        }
    }
    const applyCoupon = async (values:any) => {
        try {
            // let apiRes 
        } catch (error) {
            
        }
    } 
    const dataSource:any = Array.isArray(state.data) && state.data.map((res,index) => {
        return {
            key: index,
            cross: <Button onClick={() => handleRemoveCart(Number(res?.product?.id),index)} shape='circle' className='border-0'>x</Button>,
            product: <Flex align='center' gap={8}><Avatar src={res?.product?.feature_image ? `${BUCKET_ROOT}${res?.product?.feature_image}` :productImage.src} shape='square' size={100} /><span>{res?.product?.name}</span></Flex>,
            price: `${CURRENCY}${res?.product?.customer_buying_price}`,
            quantity: <CartCountCompo handleIncDec={handleIncDec} index={index} quantity={res?.quantity} pid={Number(res?.product?.id)} />,
            subtotal: `${CURRENCY}${res?.quantity * res?.product?.customer_buying_price}`,
        }
    })
console.log(state,'statetettetetet');
console.log(cartData,'cartDatacartData');





    const columns = [
        {
            title: '',
            dataIndex: 'cross',
            key: 'cross',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
    ];
    console.log(cartData, 'cartDatacartData');
const screens = Grid.useBreakpoint()

React.useEffect(() => {
    setState({
        data:cartData.data,
        count:cartData.count
    })
},[cartData])
    return (
        <>
            <section className="add-to-cart-section pt-0 bg-white" >
                <CommonBanner title={"Cart"} image={banner_img.src} />
                <div className="container mt-5">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="cart-content mb-4">
                                <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '100%' }} />
                            </div>

                            <div className="coupon">
                                <AntForm size='large' className='d-flex flex-wrap align-items-center gap-3 ' onFinish={applyCoupon}>
                                    <FormItem className={screens.sm ? 'w-25 m-0' : 'w-100 m-0'}>
                                        <Input placeholder='Coupon Code' />
                                    </FormItem>

                                    <Button type='primary' htmlType='submit' block={screens.sm ? false : true} className='px-5 text-uppercase'>Apply Coupon</Button>
                                    {/* <Button type='primary' block={screens.sm ? false : true} className='px-5 text-uppercase'>Update cart</Button> */}
                                </AntForm>
                            </div>

                            <div className="cart-total mt-5">
                                <h2 className='title'>Cart TOtal</h2>

                                <ul className='list-unstyled mb-5 p-0'>
                                    <li className='cart-list'>
                                        <span>Subtotal</span>
                                        <span>$36</span>
                                    </li>
                                    <li className='cart-list'>
                                        <span>Shipping</span>
                                        <span>Enter your address to view shipping options.
                                            <br />
                                            <Link href={'#'}>Calculate shipping</Link></span>
                                    </li>
                                    <li className='cart-list'>
                                        <span>Total</span>
                                        <span>$36</span>
                                    </li>

                                </ul>

                                <span><Link href={`/checkout/payment`}><Button block={screens.sm ? false : true} type='primary' size='large' className='px-5 text-uppercase'>Proceed to checkout</Button></Link></span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}

AddToCart.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}

export default AddToCart