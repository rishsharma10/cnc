
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Checkbox, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs, TextArea } from '@/lib/AntRegistry'
import React, { ReactElement, useState, useContext, Fragment } from 'react'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import banner from '@/assets/images/espresso-pouring-from-coffee-machine-cafe.jpg'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { MenuProps, TabsProps } from 'antd'
import crumbApi, { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'
import { ProductDetails } from '@/interface/product/ProductDetails'
import { stringReplace } from '@/utils/crumbValidation'
import ProductCard from '@/components/ProductCard'
import CartCountCompo from '@/components/CartCountCompo'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider'
import { count } from 'console'

interface typeProps extends ProductDetails {
  is_cart_local: boolean
  is_cart: boolean
  cart_qty: number
}
const ProductDetail = (props: typeProps) => {
  console.log(props, 'propsspsppsp');
  const { Toast, userInfo, cartData,setCartData,initCart, isCart } = useContext(GlobalContext)
  const router = useRouter()
  const [state, setState] = useState(props as typeProps)
  const [loading, setLoading] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState({ data: [], count: 0 })
  const [quantity, setQuantity] = useState(1)


  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p>{state?.desc}</p>,
    },
    {
      key: '2',
      label: 'Additional information',
      children: <ul className='list-unstyled p-0'>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Weight</span>: <span className='text-secondary'>{state?.weight ?? 0} kg</span></li>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Dimensions</span>: <span className='text-secondary'>{`${state?.dimension_d ?? 0} × ${state?.dimension_l ?? 0} × ${state?.dimension_w ?? 0} cm`}</span></li>
      </ul>,
    },
    // {
    //   key: '3',
    //   label: 'Review (1)',
    //   children: <div className='product-review'>
    //     <h4>1 review for {state.name}</h4>
    //     {/* review card */}
    //     <Flex className="review-user-card my-4" gap={12}>
    //       <Avatar src={banner.src} size={60} style={{ minWidth: 60 }} />
    //       <div className="content">
    //         <Rate value={4} className='fs-6' />
    //         <Flex align='center' className='my-1' gap={6}>
    //           <span className='fw-medium'>Janet Hopkins</span>
    //           -
    //           <span>18/04/2018</span>
    //         </Flex>
    //         <p className='m-0'>Nice coffee</p>
    //       </div>
    //     </Flex>

    //     {/* review form */}
    //     <div className="review-form">
    //       <p className='mb-1'>Add a review</p>
    //       <p className='mb-1'>Your email address will not be published. Required fields are marked *</p>
    //       <p className='mb-1'>Your rating *</p>
    //       <Rate value={3} className='fs-6' />

    //       <AntForm layout='vertical' size='large'>
    //         <FormItem label="Your review *">
    //           <TextArea rows={6} />
    //         </FormItem>
    //         <FormItem label="Name *">
    //           <Input />
    //         </FormItem>
    //         <FormItem label="Email *">
    //           <Input />
    //         </FormItem>

    //         <Checkbox>Save my name, email, and website in this browser for the next time I comment.</Checkbox>

    //         <Button type='primary' className='px-5 mt-2'>Submit</Button>
    //       </AntForm>
    //     </div>
    //   </div>,
    // },
  ];
  const handleIncDec = async (pid: number, type: string, cart_qty_new: number, index?: number) => {
    debugger
    try {

      if (!userInfo?.access_token) {
        let cart: any = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        let itemFound = false;
        cart = cart.map((item: any) => {
          if (item.id === pid) {
            itemFound = true;
            return { ...item, quantity: cart_qty_new };
          }
          return item;
        });
        if (!itemFound) {
          return
          // Toast.warning('Item not found in cart');
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (type == 'INC') {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        }
      } else {
        const payload = {
          product_id: state.id,
          quantity:cart_qty_new,
          amount:0,
          coupon_discount:0
        }
        if (type == 'DEC' && cart_qty_new ==0) {
          await removeCart(pid)
        } else {
          const apiRes = await crumbApi.Cart.update(payload)
        }
        if (type == 'INC' && (cart_qty_new == 2 && state.is_cart)) {
          await addToCart()
        } else {
          const apiRes = await crumbApi.Cart.update(payload)
        }
        if (type == 'INC') {
          setState({
            ...state,
            is_cart: true,
            cart_qty:cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart:cart_qty_new == 0 ? false : true,
            cart_qty: cart_qty_new
          })
        }
      }
    } catch (error) {
      Toast.error(error)
    }
  }
  console.log(cartData, 'cartDatacartData');

  const updateCart = (payload: any) => {
    try {
      let cart: any = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const itemExists = cart.some((item: any) => item.id === payload.id);
      if (itemExists) {
        throw new Error('Item already in cart');
      }
      cart.push(payload);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Item added to cart:', payload);
      setState({
        ...state,
        is_cart_local: true
      })
      setCartData({data:cart,count:cart?.length})
    } catch (error: any) {
      Toast.warning(error.message);
    }
  }


  const addToCart = async () => {
    try {
      const payload = {
        id: Number(router.query.id),
        product:{
          customer_buying_price: state.customer_buying_price,
          name: state.name,
          id:Number(router.query.id),
          feature_image:state?.feature_image??null
        },
        quantity: Number(state.cart_qty),
        size: 200,
        grid_size: 'small'
      }
      const cartPayload = {
        product_id: state.id,
        quantity: quantity,
        amount:0,
        coupon_discount:0
      }
      setLoading(true)
      if (!userInfo?.access_token) {
        updateCart(payload)
      } else {
        let apiRes = await crumbApi.Cart.add(cartPayload)
        await initCart()
        setState({
          ...state,
          cart_qty:1,
          is_cart:true
        })
        Toast.success(apiRes.message)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  const removeCart = async (id?: number) => {
    debugger
    setLoading(true)
    try {

      if (!userInfo?.access_token) {
        let cart: any = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        const updatedCart = cart.filter((item: any) => item.id !== Number(id));
        if (cart.length === updatedCart.length) {
          throw new Error('Item not found in cart');
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setState({
          ...state,
          is_cart_local: false
        })
      } else {
        let apiRes = await crumbApi.Cart.remove({ product_id: Number(id) })
        setState({
          ...state,
          is_cart: false,
          cart_qty:1
        })
      }
    } catch (error: any) {
      Toast.warning(error.message);
    } finally {
      setLoading(false)
    }
  }


  const initProductList = async () => {
    debugger
    try {
      let apiRes = await crumbApi.Product.list()
      let data = apiRes.data.filter((res:any) => res.id !== router.query.id)
      setRelatedProduct({data:data,count:data?.length})
    } catch (error) {

    }
  }
  
  const isCartQuantity = (pid: any) => {
    debugger
    const isInCart = Array.isArray(cartData?.data) && cartData?.data.find((item: any) => item.id === pid);
    return isInCart?.quantity
  }
  console.log(state, 'statetttt');

  React.useEffect(() => {
    initProductList()
  }, [router.query.id])
  React.useEffect(() => {
    setState({
      ...state,
      is_cart: isCart(Number(router.query.id)),
      cart_qty: isCartQuantity(Number(router.query.id)) ?? 1
    })
  }, [isCart(Number(router.query.id)), isCartQuantity(Number(router.query.id))])
  React.useEffect(() => {
    setState({
      ...props,
      is_cart: isCart(Number(router.query.id)),
      cart_qty: isCartQuantity(Number(router.query.id)) ?? 1
    })
    // setSelectedImage(data?.images.length ? data?.images[0] : '')
}, [router.query.id])

  return (
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"PRoduct Details"} image={state?.thumb_url} />
      <div className="container mt-sm-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={11} xl={12} xxl={12}>
            <div className="product-images">
              <div className="preview-image mb-4">
                <img onError={(e:any) => e.target.src = productImage.src} src={state?.feature_image ? `${BUCKET_ROOT}${state?.feature_image}` : productImage.src} alt="error" className='h-100 w-100' />
              </div>
              <div className="preview-image-list">
                {[state.image_1, state.image_2].map((res, index) => <div key={index} className="list-image">
                  <img src={res ? `${BUCKET_ROOT}${res}` : productImage.src} alt="error" className='h-100 ' onError={(e:any) => e.target.src = productImage.src}/>
                </div>)}
              </div>
            </div>
          </Col>
          <Col span={24} lg={11} xl={11} xxl={11}>
            <div className="product-details">
              <h4 className="title fs-1">
                {state.name}
              </h4>
              <p className='fs-5'>{CURRENCY}{Number(state.customer_buying_price).toFixed(2)}</p>

              {/* <Flex className='rate mb-4' gap={6}><Rate className='fs-5' value={3} />
                <span className='text-secondary'>(1 customer review)</span>
                </Flex> */}

              <p>{state?.notes}</p>

              <Flex align='center' gap={20} className='my-5'>
                {/* <CartCountCompo is_cart={state.is_cart} handleIncDec={handleIncDec} quantity={state.cart_qty} pid={Number(router.query.id)} /> */}
                {userInfo?.access_token ? <Fragment>{state?.is_cart ? <Link href={`/viewcart`}><Button type='primary' size='large' className='px-5'>Go to Cart</Button></Link> : <Button onClick={addToCart} loading={loading} type='primary' size='large' className='px-5'>add to cart</Button>}
                </Fragment> :
                  <Fragment>{state?.is_cart_local ? <Link href={`/viewcart`}><Button type='primary' size='large' className='px-5'>Go to Cart</Button></Link> : <Button onClick={addToCart} loading={loading} type='primary' size='large' className='px-5'>add to cart</Button>}
                  </Fragment>}

              </Flex> 
                {/* <Link href={'/viewcart'}><Button type='primary' size='large' className='px-5'>add to cart</Button></Link> */}

              <ul className='list-unstyled p-0'>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>SKU</span>: <span className='text-secondary'>{state?.sku}</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Category</span>: <span className='text-secondary'>Fresh Coffee</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Tags</span>: <span className='text-secondary'>{`${state?.tag_1}, ${state?.tag_2}, ${state?.tag_3}`}</span></li>
                {/* <li className='product-desc-list'><span className='fw-semibold text-uppercase'>Share</span>:
                  <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                    <li><Link href={'/'}><i className="fa-brands fa-facebook"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-square-instagram"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-linkedin"></i></Link></li>
                  </ul>
                  </li> */}
              </ul>

              <div className="product-details-tab mt-5">
                <Tabs defaultActiveKey="1" items={items} />
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row gutter={[20, 20]} className='mt-5'>
          <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col>
          {[...Array(4)].map(() => <Col span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="cart-card">
              <div className="cart-image text-center">
                <img src={productImage.src} alt="error" />
                <div className="cart-overlay">
                  <Link href={'/product/name/id'}><Button type="primary" className="px-5 py-3 h-auto">Add To Cart</Button></Link>
                </div>
              </div>
              <div className="cart-content mt-4 text-center">
                <Link href={'#'}><h4>Kenya Coffee</h4></Link>
                <p className="text-secondary fs-6">$18.00</p>
              </div>
            </div>
          </Col>)}
        </Row> */}
        <Row gutter={[20, 20]} className='mt-5'>
          <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col>
          {Array.isArray(relatedProduct?.data) && relatedProduct?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res}  /></Col>)}
        </Row>
      </div>
    </section>
  )
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}

const getDetails = async (_id: string) => {
    let apiRes = await crumbApi.Product.details(_id)
    return Array.isArray(apiRes?.data) ? apiRes.data[0] : apiRes?.data

}
export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const data = await getDetails(context?.query?.id as string)
        return {
            props: { ...data },

        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },

        }
    }
}
export default ProductDetail


