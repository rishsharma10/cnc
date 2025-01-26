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
import EmptyCart from '@/components/common/EmptyCart';
const AddToCart = () => {
    const { Toast, userInfo, cartData, initCart, setUserInfo } = useContext(GlobalContext)
    const router = useRouter()
    const [state, setState] = useState({ data: cartData.data, count: cartData.count, sub_total: 0 })
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)



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
                    product_id: pid,
                    quantity: qty
                }
                const apiRes = await crumbApi.Cart.update(payload)
                if (type == 'INC') {
                    const data = state.data
                    data[index].quantity = qty
                    const total = cartData?.data?.reduce((acc: any, item: any) => {
                        const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                        const quantity = item?.quantity; // Get quantity
                        return acc + (price * quantity); // Add to the accumulator
                    }, 0);
                    setState({
                        ...state,
                        sub_total: total,
                        data
                    })
                } else {
                    const data = state.data
                    data[index].quantity = qty
                    const total = cartData?.data?.reduce((acc: any, item: any) => {
                        const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
                        const quantity = item?.quantity; // Get quantity
                        return acc + (price * quantity); // Add to the accumulator
                    }, 0);
                    setState({
                        ...state,
                        sub_total: total,
                        data
                    })
                }
            }
        } catch (error) {
            Toast.error(error)
        }
    }
    const handleRemoveCart = async (id: number, index: number) => {
        debugger
        try {
            setLoading(true)
            let apiRes = await crumbApi.Cart.remove({ product_id: id })
            await initCart()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const [couponLoading, setCouponLoading] = useState(false)
    const applyCoupon = async ({ code }: any) => {
        const productIds = Array.isArray(state.data)
            ? state.data.map((res: any) => res.product_id)
            : [];
        const payload = {
            code,
            product_ids: productIds
        }
        try {
            setCouponLoading(true)
            let apiRes = crumbApi.Auth.validateCoupon(payload)
            Toast.success("Coupon applied successfully")
        } catch (error) {
            Toast.error(error)
        } finally {
            setCouponLoading(false)
        }
    }
    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            billing_same: true
        }
        try {
            setLoading(true)
            let apiRes = await crumbApi.Auth.updateAddress(payload)
            setUserInfo({
                ...userInfo,
                b_address_line_1: values.b_address_line_1 ?? 'Goa Panji'
            })
            setShow(false)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const dataSource: any = Array.isArray(state.data) && state.data.map((res, index) => {
        return {
            key: index,
            cross: <Button loading={loading} onClick={() => handleRemoveCart(Number(res?.product?.id), index)} shape='circle' className='border-0'>x</Button>,
            product: <Flex align='center' gap={8}><Avatar src={res?.product?.feature_image ? `${BUCKET_ROOT}${res?.product?.feature_image}` : productImage.src} shape='square' size={100} /><span>{res?.product?.name}</span></Flex>,
            price: `${CURRENCY}${res?.product?.customer_buying_price}`,
            quantity: <CartCountCompo is_cart={res?.quantity > 1 ? true : false} handleIncDec={handleIncDec} index={index} quantity={res?.quantity} pid={Number(res?.product?.id)} />,
            subtotal: `${CURRENCY}${res?.quantity * res?.product?.customer_buying_price}`,
        }
    })

    console.log(state, 'statetettetetet');
    console.log(cartData, 'cartDatacartData');





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
        const total = cartData?.data?.reduce((acc: any, item: any) => {
            const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
            const quantity = item?.quantity; // Get quantity
            return acc + (price * quantity); // Add to the accumulator
        }, 0);
        setState({
            data: cartData.data,
            count: cartData.count,
            sub_total: total
        })
    }, [cartData])
    // React.useEffect(() => {
    //     const total = cartData?.data?.reduce((acc:any, item:any) => {
    //         const price = parseFloat(item?.product?.customer_buying_price); // Convert price to number
    //         const quantity = item?.quantity; // Get quantity
    //         return acc + (price * quantity); // Add to the accumulator
    //       }, 0);
    //     setState({
    //         ...state,
    //         sub_total:total
    //     })
    // }, [cartData])
    return (
        <>
            <section className="add-to-cart-section pt-0 bg-white" >
                <CommonBanner title={"Cart"} image={banner_img.src} />
                <div className="container mt-5">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="cart-content mb-4">
                                {state.count !==0 ? <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '100%' }} /> : <EmptyCart/>}
                                
                            </div>
                            {state.count !== 0 &&
                                <Fragment>
                                    <div className="coupon">
                                        <AntForm size='large' className='d-flex flex-wrap align-items-center gap-3 ' onFinish={applyCoupon}>
                                            <FormItem name={`code`} rules={[{ required: true, message: 'Please enter coupon code' }]} className={screens.sm ? 'w-25 m-0' : 'w-100 m-0'}>
                                                <Input placeholder='Coupon Code' />
                                            </FormItem>

                                            <Button loading={couponLoading} type='primary' htmlType='submit' block={screens.sm ? false : true} className='px-5 text-uppercase'>Apply Coupon</Button>
                                            {/* <Button type='primary' block={screens.sm ? false : true} className='px-5 text-uppercase'>Update cart</Button> */}
                                        </AntForm>
                                    </div>

                                    <div className="cart-total mt-5">
                                        <h2 className='title'>Cart TOtal</h2>

                                        <ul className='list-unstyled mb-5 p-0'>
                                            <li className='cart-list'>
                                                <span>Subtotal</span>
                                                <span>{CURRENCY}{state.sub_total}</span>
                                            </li>
                                            <li className='cart-list'>
                                                <span>Shipping</span>
                                                {/* <Flex> */}
                                                {!show ? <><span role='button'>{userInfo?.b_address_line_1 ?? 'Enter your address to view shipping options.'}
                                                </span><Button onClick={() => setShow(true)} type='text'>Change</Button></> : <AntForm className='w-100' layout='vertical' size='large' onFinish={handleSubmit}>
                                                    <Row gutter={[10, 5]}>
                                                        <Col span={12} xxl={12} xl={12} lg={12} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_first_name' rules={[{ required: true, message: "Please enter first name" }]} label={'First name'}>
                                                                <Input placeholder='Enter first name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12} xxl={12} xl={12} lg={12} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_last_name' rules={[{ required: true, message: "Please enter last name" }]} label={'Last name'}>
                                                                <Input placeholder='Enter last name' />
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={18} xxl={18} xl={18} lg={18} sm={24} md={24} xs={22}>
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
                                                        <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                                            <FormItem name='b_city' rules={[{ required: true, message: "Please enter city" }]} label={'City'}>
                                                                <Input placeholder='Enter city' />
                                                            </FormItem>
                                                        </Col>

                                                        <Flex gap={10} justify='start'>
                                                            <div className="submit-btn text-center">
                                                                <Button type='default' onClick={() => setShow(false)} className='px-5'>CANCEL</Button>
                                                            </div>
                                                            <div className="submit-btn text-center">
                                                                <Button loading={loading} htmlType='submit' type='primary' className='px-5'>UPDATE</Button>
                                                            </div>
                                                        </Flex>
                                                    </Row>
                                                </AntForm>}
                                                {/* <Button>Edit</Button> */}
                                                {/* </Flex> */}
                                            </li>
                                            <li className='cart-list'>
                                                <span>Total</span>
                                                <span>{CURRENCY}{state.sub_total}</span>
                                            </li>

                                        </ul>

                                        <span><Link href={`/checkout/payment`}><Button block={screens.sm ? false : true} type='primary' size='large' className='px-5 text-uppercase'>Proceed to checkout</Button></Link></span>
                                    </div>
                                </Fragment>
                            }
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