
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Checkbox, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs, TextArea, TypographyText } from '@/lib/AntRegistry'
import React, { ReactElement, useState, useContext, Fragment, useEffect, useMemo } from 'react'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { Carousel, Grid, MenuProps, TabsProps, Tag } from 'antd'
import crumbApi, { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'
import { ProductDetails } from '@/interface/product/ProductDetails'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider'
import Head from 'next/head'
import ShareProduct from '@/components/common/ShareModal'

interface typeProps extends ProductDetails {
  is_cart_local: boolean
  is_cart: boolean
  cart_qty: number
  variants: any
}
const ProductDetail = (props: typeProps) => {


  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]

  const dataRes = {
    "id": 2,
    "quantity": 120,
    "product_id": 2,
    "warehouse_id": 1,
    "attribute_id": 4,
    "attribute_item_id": 1,
    "price": 400,
    "customer_buying_price": 500,
    "created_at": "2025-03-14T22:26:22.000000Z",
    "updated_at": "2025-03-14T22:31:11.000000Z",
    "price_for_sale": 500,
    "product": {
      "id": 2,
      "name": "Coral cake",
      "sku": "CC00000002COF",
      "barcode": "1741990778",
      "barcode_image": "CC00000002COF_1741990778.png",
      "quantity": null,
      "price": "400",
      "customer_buying_price": "500",
      "weight": null,
      "dimension_l": null,
      "dimension_w": null,
      "dimension_d": null,
      "thumb": "17419914408538.jpg",
      "sgst_tax": 5,
      "igst_tax": 5,
      "feature_image": null,
      "image_1": null,
      "image_2": null,
      "tag_3": "dark",
      "tag_2": "vannila",
      "tag_1": "cake",
      "notes": "cake item",
      "desc": "With a soft gianduja (hazelnut chocolate) fondue in the centre of this gorgeous entremet, the stage is set for the perfect marriage between a crisp fruit and luscious chocolate.\r\n\r\nBring back memories of strawberries dipped in Nutella with our indulgent gianduja praline & fresh strawberry entremet sans the plam oil.",
      "is_variant": 0,
      "status": "active",
      "available_for": "all",
      "category_id": 3,
      "brand_id": 1,
      "manufacturer_id": null,
      "weight_unit_id": null,
      "measurement_unit_id": null,
      "created_by": 1,
      "updated_by": 1,
      "created_at": "2025-03-14T22:24:03.000000Z",
      "updated_at": "2025-03-14T22:31:11.000000Z",
      "tax_status": "included",
      "custom_tax": 10,
      "stock": 220,
      "split_sale": null,
      "stock_alert_quantity": 70,
      "thumb_url": "http://127.0.0.1:9000/storage/products/17419914408538.jpg"
    },
    "attribute": {
      "id": 4,
      "name": "750",
      "status": "active",
      "created_by": 1,
      "updated_by": null,
      "created_at": "2025-03-14T22:18:05.000000Z",
      "updated_at": "2025-03-14T22:18:05.000000Z"
    },
    "attribute_item": {
      "id": 1,
      "attribute_id": 4,
      "name": "cake 1",
      "color": "#000000",
      "image": null,
      "created_by": null,
      "updated_by": null,
      "created_at": "2025-03-14T22:18:05.000000Z",
      "updated_at": "2025-03-14T22:18:05.000000Z",
      "file_url": "http://127.0.0.1:9000/images/default.png"
    }
  }
  console.log(props, 'propsspsppsp');
  const { Toast, userInfo, cartData, setCartData, initCart, isCart } = useContext(GlobalContext)
  const router = useRouter()
  const [state, setState] = useState(props as typeProps)
  const [loading, setLoading] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState({ data: [], count: 0 })
  const [quantity, setQuantity] = useState(1)
  const screens = Grid.useBreakpoint()
  let screenSize = screens.xxl ? 5 : screens.xl ? 4 : screens.lg ? 3 : screens.md ? 2 : screens.sm ? 1 : 1

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p className='text-justify'>{state?.desc ?? "No description"}</p>,
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
            cart_qty: cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart: true,
            cart_qty: cart_qty_new
          })
        }
      } else {
        const payload = {
          product_id: state.id,
          quantity: cart_qty_new,
          amount: 0,
          coupon_discount: 0
        }
        if (type == 'DEC' && cart_qty_new == 0) {
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
            cart_qty: cart_qty_new
          })
        } else {
          setState({
            ...state,
            is_cart: cart_qty_new == 0 ? false : true,
            cart_qty: cart_qty_new
          })
        }
      }
    } catch (error) {
      Toast.error(error)
    }
  }

  const updateCart = (payload: any) => {
    debugger
    try {
      let cart: any = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      const { product, quantity, variant } = payload;

      let existingItemIndex = -1;

      if (state?.is_variant) {
        existingItemIndex = cart.findIndex((item: any) =>
          item.product?.id === product?.id &&
          item.variant?.attribute_id === variant.attribute_id &&
          item.variant?.attribute_item_id === variant.attribute_item_id
        );
      } else {
        existingItemIndex = cart.findIndex((item: any) => item.product?.id === product?.id);
      }

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
        Toast.success('Quantity updated');
      } else {
        cart.push(payload);
        Toast.success('Item added to cart');
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      setState({
        ...state,
        is_cart_local: true
      });

      setCartData({ data: cart, count: cart.length });


    } catch (error: any) {
      Toast.warning(error.message);
    }
  }

  const sizeName = (id: number) => {
    debugger
    let data: any = sizeData.find((res: any) => res.id == id)
    return data?.name
  }
  const grindName = (id: number) => {
    debugger
    let data: any = variants.find((res: any) => res.id == id)
    return data?.name
  }
  const generateUniqueId = (existingIds: number[]): number => {
    let newId: number;
    do {
      newId = Math.floor(100 + Math.random() * 900);
    } while (existingIds.includes(newId));
    return newId;
  };
  const addToCart = async () => {


    debugger

    if(!state?.stock){
      return Toast.warning(`Produt is not in stock`)
    }
    try {
      let cart: any = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const existingIds: any = Array.isArray(cart) && cart.map((res: any) => res.id);
      const newId = generateUniqueId(existingIds);
      const payload = {
        id: newId,
        price: state.customer_buying_price,
        // product_name: state.name,
        // product_id: Number(router.query.id),
        // image: state?.feature_image ?? null,
        product:state,
        quantity: Number(buyQuantity),
      } as any
      if (state?.is_variant) {
        payload.is_varient = true
        payload.variant = {
          attribute_id: size,
          variant_name: sizeName(Number(size)),
          attribute_item_id: grindSize,
          attribute_name: grindName(Number(grindSize))
        }
      }else{
        payload.is_varient = false
      }
      const cartPayload = {
        product_id: state.id,
        quantity: buyQuantity,
        amount: Number(state.customer_buying_price),
        coupon_discount: 0,
        is_varient:state?.is_variant
      } as any
      if(state?.is_variant){
        if (size) {
          cartPayload.attribute_id = size
          cartPayload.is_varient = true
        }
        if (grindSize) {
          cartPayload.attribute_item_id = grindSize
          cartPayload.is_varient = true
        }
      }else{
        cartPayload.attribute_id = null,
        cartPayload.attribute_item_id = null
      }
      // if (state?.is_variant) {
      //   cartPayload.is_variant = true
      //   cartPayload.variant = {
      //     attribute_id: size,
      //     attribute_item_id: grindSize,
      //   }
      // }
      console.log(payload, "payloaddddd")
      // return
      setLoading(true)
      if (!userInfo?.access_token) {
        updateCart(payload)
      } else {
        let apiRes = await crumbApi.Cart.add(cartPayload)
        await initCart()
        setState({
          ...state,
          cart_qty: 1,
          is_cart: true
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
          cart_qty: 1
        })
      }
    } catch (error: any) {
      Toast.warning(error.message);
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = async () => {
    try {
      if(state?.is_cart || state?.is_cart_local){
        router.push(`/checkout/payment`)
      }else{
        await addToCart()
        router.push(`/checkout/payment`)
      }
    } catch (error) {
      
    }
  }

  const initProductList = async () => {
    debugger
    try {
      let apiRes = await crumbApi.Product.list()
      let data = apiRes.data.filter((res: any) => Number(res.id) !== Number(router.query.id))
      setRelatedProduct({ data: data, count: data?.length })
    } catch (error) {

    }
  }

  const isCartQuantity = (pid: any) => {
    debugger
    const isInCart = Array.isArray(cartData?.data) && cartData?.data.find((item: any) => item.id === pid);
    return isInCart?.quantity
  }


  const setAttributePrice = async (attribute_id: number, pid: number) => {
    debugger
    let urlSearchParams = new URLSearchParams()
    try {
      if (attribute_id) {
        urlSearchParams.set("attribute_item_id", String(attribute_id))
        urlSearchParams.set("product_id", String(router.query.id))
        let apiRes = await crumbApi.Product.productStockttributes(urlSearchParams.toString())
        setState({
          ...state,
          customer_buying_price: apiRes?.data[0]["customer_buying_price"]
        })
      } else {
        setState({
          ...state,
          customer_buying_price: props["customer_buying_price"]
        })
      }
    } catch (error) {

    }
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

  const arrGrindSize = [
    {
      value: 'WHOLE_BEANS',
      label: 'Whole Beans'
    },
    {
      value: 'COARSE_GRIND',
      label: 'Coarse Grind'
    },
    {
      value: 'MEDIUM_GRIND',
      label: 'Medium Grind'
    },
    {
      value: 'FINE_GRIND',
      label: 'Fine Grind'
    },
  ]
  const quantityArr = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];


  const [variants, setVariants] = useState([])
  const [sizeData, setSizeData] = useState([])
  const [grindSize, setGrindSize] = useState(null)
  const [size, setSize] = useState(null)
  const [buyQuantity, setBuyQuantity] = useState(1)

  const fetchData = async (id: string) => {
    debugger
    try {
      setLoading(true);
      const apiRes1 = await crumbApi.Product.details(String(router.query.id))
    } catch (err: any) {
      setSizeData([]);
      // alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchVariants = async (id: string) => {
    debugger
    try {
      if(id){
        const apiRes = await crumbApi.Product.variantAttributes(String(id))
        setSizeData(apiRes?.data);
        setSize(Array.isArray(apiRes?.data) && apiRes?.data?.length ? apiRes?.data[0]?.id : [])
      }
    } catch (err: any) {
      setSizeData([]);
      // alert(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchData(String(router.query.id));
    }
    setVariants(props?.variants)
    fetchVariants(Array.isArray(props?.variants) && props?.variants?.length ? props?.variants[0]?.id : null)
    setGrindSize(Array.isArray(props?.variants) && props?.variants?.length ? props?.variants[0]?.id : [])
  }, [router.query.id]);

  console.log(size, 'sizeonchange')
  console.log(grindSize, "grindsizee");


  // return useMemo(() => ({ sizeData, loading }), [sizeData, loading]);
  // };



  // React.useEffect(() => {
  //   if(!userInfo?.access_token){
  //     let is_cart_local = cartData?.data?.some((res:any) => Number(res?.id) === Number(router.query.id));
  //     setState({
  //       ...state,
  //       is_cart_local:is_cart_local
  //     })
  //   }

  // },[userInfo?.access_token,router.query.id])





  return (
    <Fragment>
      <Head>
        <title>{props?.name} at Copper & Crumb</title>
        <meta name='desription' content={props?.desc} />
        <meta property='og:image' content={`${BUCKET_ROOT}${state?.feature_image}`} />
      </Head>
      <section className='product-list-section pt-0 bg-white'>
        <CommonBanner title={"PRoduct Details"} image={state?.thumb_url} />
        <div className="container mt-sm-5 pt-5">
          <Row gutter={[24, 24]} justify={'space-between'}>
            <Col span={24} lg={11} xl={12} xxl={12}>
              <div className="product-images">
                <div className="preview-image mb-4">
                  <img onError={(e: any) => e.target.src = productImage.src} src={state?.feature_image ? `${BUCKET_ROOT}${state?.feature_image}` : productImage.src} alt="error" className='h-100 w-100 rounded-3' />
                </div>
                <div className="preview-image-list">
                  {[state.image_1, state.image_2].map((res, index) => <div key={index} className="list-image">
                    <img src={res ? `${BUCKET_ROOT}${res}` : productImage.src} alt="error" className='h-100 rounded-3' onError={(e: any) => e.target.src = productImage.src} />
                  </div>)}
                </div>
              </div>
            </Col>
            <Col span={24} lg={11} xl={11} xxl={11}>
              <div className="product-details">
                <Flex align='top' justify='space-between'>
                  <h4 className="title fs-1">
                    {state.name}
                  </h4>
                  <ShareProduct title={`Share Product`} price={state?.customer_buying_price} name={state.name} img={state?.feature_image ? `${BUCKET_ROOT}${state?.feature_image}` : null} />
                </Flex>


                {/* <Flex className='rate mb-4' gap={6}><Rate className='fs-5' value={3} />
                <span className='text-secondary'>(1 customer review)</span>
                </Flex> */}

                <p className='fw-semibold fs-16' style={{ color: "#f50" }}>{state?.notes}</p>
                <p className='mt-2 fs-14 text-justify mb-4'>{state.desc}</p>

                <Row gutter={[12, 0]}>
                  {(props?.is_variant && variants?.length) ? <Col span={24} xxl={24} xl={24}>
                    <FormItem label='GRIND SIZE' layout='vertical'>
                      <Select
                        // allowClear
                        options={Array.isArray(variants) && variants?.map((res: any, i: number) => {
                          return {
                            value: res?.id,
                            label: res?.name
                          }
                        }) as any}
                        placeholder="Select Grind size"
                        value={grindSize}
                        onChange={(val: any) => { setGrindSize(val); setAttributePrice(val, props.id); fetchVariants(val) }}
                      />
                    </FormItem>
                  </Col> : ""}
                  {(props?.is_variant) ? <Col span={24} xxl={12} xl={12} md={12} sm={12} xs={12}>
                    <FormItem label='SIZE' layout='vertical'>
                      <Select
                        value={size}
                        // allowClear
                        onChange={(val: any) => { setSize(val); setAttributePrice(val, props.id) }}
                        options={Array.isArray(sizeData) && sizeData?.map((res: any) => {
                          return {
                            value: res?.id, label: res?.name
                          }
                        }) as any}
                        placeholder="Select size"
                      />
                    </FormItem>
                  </Col> : ""}
                  <Col span={24} xxl={12} xl={12} md={12} sm={12} xs={12}>
                    <FormItem label='QUANTITY' layout='vertical'>
                      <Select
                        value={buyQuantity}
                        onChange={(val: any) => setBuyQuantity(val)}
                        // style={{ width: 160 }}
                        options={quantityArr?.map((res: any, i: number) => {
                          return {
                            value: res.value,
                            label: res.label
                          }
                        })}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Flex align='baseline' gap={20}>
                  <p className='fs-3 fw-bold mt-2'>{CURRENCY}{Number(state.customer_buying_price).toFixed(2)}</p>
                  <del className='fs-6 text-grey mt-2'>{CURRENCY}{Number(state.price).toFixed(2)}</del>
                </Flex>
                <Flex align='center' gap={20} className='my-3'>
                  {/* <CartCountCompo is_cart={state.is_cart} handleIncDec={handleIncDec} quantity={state.cart_qty} pid={Number(router.query.id)} /> */}
                  {userInfo?.access_token ? <Fragment><Button onClick={addToCart} loading={loading} type='primary' size='large' className='px-5'>add to cart</Button>
                  </Fragment> :
                    <Fragment><Button onClick={addToCart} loading={loading} type='primary' size='large' className={!screens.md ? "px-4" : 'px-5'}>add to cart</Button>
                    </Fragment>}

                  <Button onClick={handleBuyNow} type='primary' size='large' className='px-5'>Buy now</Button>
                </Flex>

                <ul className='list-unstyled p-0'>
                  <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>SKU</span>: <span className='text-secondary'>{state?.sku}</span></li>
                  <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Category</span>: <span className='text-secondary'>Fresh Coffee</span></li>
                  {(state?.tag_1 || state?.tag_2 || state?.tag_3) && <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Tags</span>: <span className='text-secondary'>{
                    <>
                      <Tag bordered={true} className='rounded' color="magenta">
                        {state.tag_1}
                      </Tag>
                      <Tag bordered={true} className='rounded' color="orange">
                        {state.tag_2}
                      </Tag>
                      <Tag bordered={true} className='rounded' color="geekblue">
                        {state.tag_3}
                      </Tag>
                    </>
                  }</span></li>}
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
          <Row gutter={[20, 20]} className='mt-5'>
            <Col span={24} className='mb-2'><h4 className='title fs-2'>You may also like.</h4></Col>
            {Array.isArray(relatedProduct?.data) && relatedProduct?.data?.slice(0, 4)?.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res} /></Col>)}
          </Row>
        </div>
      </section>
      {/* <section className="gallery-section">
            <div className="container-fluid px-0">
              <Row justify={"center"} className="mb-5 mx-0">
              <Col span={24} className='mb-2'><h4 className='title fs-2'>You may also like.</h4></Col>
              </Row>
              <Row gutter={[20, 20]} className="mx-0">
                <Col span={24}>
                  <Carousel dots={false} autoplay slidesToShow={screenSize} infinite={true} slidesToScroll={1} draggable={true} responsive={responsive}>
                  {Array.isArray(relatedProduct?.data) && relatedProduct?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res}  /></Col>)} 
                                   </Carousel>
    
                </Col>
              </Row>
            </div>
          </section> */}
    </Fragment>
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
  debugger
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


