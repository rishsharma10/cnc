import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Avatar, Button, Col, Flex, FormItem, Input, Row, Table } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'

import CrumbIcons from '@/components/CrumbIcons'
import productImage from '@/assets/brand-guide/product-img-5.png';
import Link from 'next/link'
import CommonBanner from '@/components/CommonBanner';
const AddToCart = () => {
    const dataSource = [
        {
            key: '1',
            cross:<Button shape='circle' className='border-0'>x</Button>,
            product: <Flex align='center' gap={8}><Avatar src={productImage.src} shape='square' size={100}/><span>Kenya Coffee</span></Flex>,
            price:'$18',
            quantity: <Flex className='quantity-counter'><Flex className='p-3 counter-div'>2</Flex><Flex className='flex-column h-100'><Button>+</Button><Button>-</Button></Flex></Flex>,
            subtotal: '$36',
        },
    ];

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
    return (
        <>
            <section className="add-to-cart-section pt-0 bg-white" >
               <CommonBanner title={"Cart"}/>
                <div className="container mt-5">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="cart-content mb-4">
                                <Table dataSource={dataSource} columns={columns} pagination={false}  scroll={{x:'100%'}}/>
                            </div>

                            <div className="coupon">
                                <AntForm size='large' className='d-flex flex-wrap align-items-center gap-3 '>
                                    <FormItem className='w-25 m-0'>
                                        <Input placeholder='Coupon Code'/>
                                    </FormItem>

                                    <Button type='primary' className='px-5 text-uppercase'>Apply Coupon</Button>
                                    <Button  type='primary' className='px-5 text-uppercase'>Update cart</Button>
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

                                <span><Link href={`/checkout/payment`}><Button type='primary' size='large' className='px-5 text-uppercase'>Proceed to checkout</Button></Link></span>
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