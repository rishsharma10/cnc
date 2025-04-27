import CheckoutCartListCompo from "@/components/CheckoutCartListCompo";
import CheckLayout from "@/components/common/CheckoutLayout";
import StatusModal from "@/components/PaymentStatusModal";
import { GlobalContext } from "@/context/Provider";
import { ProductDetails } from "@/interface/product/ProductDetails";
import {
  AntForm,
  Button,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  Flex,
  FormItem,
  Input,
  InputPassword,
  Row,
  Space,
  Switch,
  TextArea,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import crumbApi, { CURRENCY } from "@/utils/crumbApis";
import { Alert, Card, Divider, Form, Grid, Radio } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, ReactElement, useContext, useState } from "react";

const Payment = () => {
    const router = useRouter()
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const { Toast, userInfo, cartData } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    data: cartData.data,
    count: cartData.count,
    sub_total: 0,
    total_tax:0
  });
  const [billing, setBilling] = useState("BILLING_SAME");
  const [defaultAddress, setDefaultAddress] = useState(
    userInfo?.access_token && userInfo?.address_line_1
      ? "DEFAULT_ADDRESS"
      : "NEW_ADDRESS"
  );
  const [couponLoading, setCouponLoading] = useState(false);
  const [isLoyalityApplied, setIsLoyalityApplied] = useState(false);
  const [couponCode, SetCouponCode] = useState("");
  const [coupon, setCoupon] = useState({
    is_applied: false,
    discount: 0,
  });
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSuccess = () => {
    setStatus("success");
    setOpen(true);
  };

  const handleError = () => {
    setStatus("error");
    setOpen(true);
  };

  const ALL_TAXES = userInfo?.access_token ? cartData?.total_tax : state?.total_tax ?? 0;
  console.log(cartData, "cartdatata");

  const handleSubmit = async (values: any) => {
    debugger;

    const PayloadCartData = await cartData.data?.map((res: any) => {
      return {
        id: res.id,
        attribute: {
          id: res?.variant?.attribute_id ?? "",
          name: res?.variant?.attribute_name ?? "",
        },
        attribute_item: {
          id: res?.variant?.attribute_item_id ?? "",
          name: res?.variant?.variant_name ?? "",
        },
        is_variant: res?.is_variant ? "1" : "0",
        product_id: String(res?.product?.id),
        split_sale: res?.product?.split_sale ?? "",
        sku: res?.product?.sku,
        name: res?.product?.name,
        price: String(res?.product?.customer_buying_price),
        stock: String(res?.product?.stock),
        quantity: String(res?.quantity),
        tax_status: res?.product?.tax_status,
        custom_tax: String(res?.product?.custom_tax),
        discount: String(res?.product?.discount),
        discount_type: String(res?.product?.discount_type),
      };
    });

    const default_shipping = {
      name: userInfo?.full_name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address_line_1: userInfo.address_line_1,
      address_line_2: userInfo.address_line_2,
      city: userInfo.city,
      state: userInfo.state,
      zip: userInfo.zipcode,
      country:userInfo?.country,
    }

    const shipping_new = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      city: values.city,
      state: values.state,
      zip: values.zip,
      country: "India",
    };
    const shipping = defaultAddress == "DEFAULT_ADDRESS" ?default_shipping : shipping_new
    const billing_Address = {
      name: values.b_name,
      email: values.email,
      phone: values.b_phone,
      address_line_1: values.b_address_line_1,
      address_line_2: values.b_address_line_2,
      city: values.b_city,
      state: values.b_state,
      zip: values.b_zip,
      country: "India",
    };
    const payload = {
      shipping: shipping,
      date: new Date(),
      warehouse_id: "1",
      due_date: new Date(),
      tax: "0",
      discount: discount  ? String(discount) : "0",
      
      discount_type: null,
      notes: values.notes,
      status: null,
      payments: [
        {
          type: "online",
          amount: isLoyalityApplied ? String(Number(state.sub_total) - Number(loyalityDiscount + discount))  : String(state.sub_total),
          selected: true,
        },
      ],
      items: PayloadCartData,
      walkin_customer:{
        full_name:!userInfo?.access_token ? values.name : "",
        phone:!userInfo?.access_token ? values.phone: "",
        email:!userInfo?.access_token ? values.email: "",
      },
      customer_id :userInfo?.access_token ? String(userInfo.id) : null
    } as any;

    if (billing == "BILLING_SAME") {
      payload.billing = shipping;
    } else {
      payload.billing = billing_Address;
    }
    if(userInfo?.access_token){
      if(isLoyalityApplied){
        payload.loyalty_discount = String(loyalityDiscount)
      }else{
        payload.loyalty_discount = "0"
      }
    }else{
      payload.loyalty_discount = "0"
    }
    console.log(payload, "billig_payload");
    // handleSuccess()
    // handleError()
    // return;
    try {
      setLoading(true)
      let apiRes = await crumbApi.Product.checkout(payload)
      if(apiRes?.payment_url){
        router.push(apiRes?.payment_url)
      }
      form.resetFields()
      if(localStorage?.getItem("cart")){
        localStorage?.removeItem("cart")
      }
    } catch (error) {
      Toast.error(error)
      setLoading(false)
    } finally {
    }
  };

  let discount = coupon.is_applied ? Number(coupon.discount) : 0;
  let loyalityDiscount = isLoyalityApplied ? Number(userInfo?.loyalty ?? 0) : 0;
  const applyCoupon = async ({ code }: any) => {
    if (!screens.md && !couponCode.trim()) {
      setCouponLoading(false);
      return;
    }
    if (coupon.is_applied) {
      form.resetFields();
      SetCouponCode("");
      return setCoupon({ is_applied: false, discount: 0 });
    }
    debugger;
    const productIds = Array.isArray(state.data)
      ? state.data.map(
          (res: any) => res?.product?.id
        )
      : [];
    const payload = {
      code: !screens.md ? couponCode : code,
      product_ids: JSON.stringify(productIds),
    };
    try {
      setCouponLoading(true);
      let apiRes = await crumbApi.Auth.validateCoupon(payload);
      if (apiRes?.error) {
        return Toast.warning(apiRes?.error);
      }
      let percent = "percent";
      let fixed = "fixed";
      let amount =
        apiRes?.coupon?.discount_type == percent
          ? (state.sub_total / 100) * Number(apiRes?.coupon?.discount)
          : apiRes?.coupon?.discount;
      setCoupon({
        is_applied: true,
        discount: Number(amount),
      });
      Toast.success("Coupon applied successfully");
    } catch (error) {
      Toast.error(error);
    } finally {
      setCouponLoading(false);
    }
  };
  const handleLoyality = () => {
    setIsLoyalityApplied(!isLoyalityApplied);
  };


  const calculateTotalTax = (items:any) => {
    debugger
    return Array.isArray(items?.data) && items.data.reduce((totalTax:any, item:any) => {
      const itemTotalPrice = Number(item.price) * Number(item.quantity);
      const itemTax = (Number(item.product?.custom_tax) / 100) * itemTotalPrice;
      return totalTax + itemTax;
    }, 0);
  }

  const totalTaxAmn = calculateTotalTax(cartData);
  React.useEffect(() => {
    const total = cartData?.data?.reduce((acc: any, item: any) => {
      const price = parseFloat(item?.price); // Convert price to number
      const quantity = item?.quantity; // Get quantity
      return acc + price * quantity; // Add to the accumulator
    }, 0);
    setState({
      data: cartData.data,
      count: cartData.count,
      sub_total: total,
      total_tax:totalTaxAmn
    });
  }, [cartData,totalTaxAmn]);

  return (
    <Fragment>
      <Head>
        <title>{`Checkout`} - Copper & Crumb</title>
        <meta name="desription" content={`Checkout`} />
      </Head>
      <div className="checkout-section-payment pt-0 bg-white h-100">
        {/* <CommonBanner title="CHeckout" /> */}
        <Row gutter={[0, 10]}>
          <Col span={!screens.md ? 24 : 12}>
            <div className="container mt-4 h-100 px-5">
              <Flex align="center" justify="space-between">
                <TypographyTitle level={5}>Contact</TypographyTitle>
                {!userInfo?.access_token && (
                  <Link href={`/login?checkout=true`}>
                    <Button type="text" className="text-primary">
                      Login
                    </Button>
                  </Link>
                )}
              </Flex>
              <AntForm
                className="w-100"
                layout="vertical"
                size={!screens.md ? "middle" : "large"}
                onFinish={handleSubmit}
              >
                <Row gutter={[10, 0]}>
                  <Col span={24}>
                    <FormItem
                      name="email"
                      rules={[
                        {type:"email", required: true, message: "Please enter email" },
                      ]}
                      label={"Email"}
                    >
                      <Input placeholder="Enter email" />
                    </FormItem>
                  </Col>
                  {/* <Col span={24}>
                    <FormItem name="news_offer">
                      <Checkbox />
                      <span className="mx-3">
                        Email me with news and offers
                      </span>
                    </FormItem>
                  </Col> */}
                  {userInfo?.access_token && userInfo?.address_line_1 ? (
                    <>
                      <Col span={24}>
                        <TypographyText className="fw-bold fs-6">
                          Shipping Address
                        </TypographyText>
                      </Col>
                      <Col span={24}>
                        <Radio.Group
                          name="radiogroupaddress"
                          className="my-2"
                          value={defaultAddress}
                          onChange={(e: any) =>
                            setDefaultAddress(e.target.value)
                          }
                          options={[
                            {
                              value: "DEFAULT_ADDRESS",
                              label: "Default address",
                            },
                            { value: "NEW_ADDRESS", label: "Add new address" },
                          ]}
                        />
                      </Col>
                    </>
                  ) : (
                    <Col span={24}>
                      <TypographyText className="fw-bold fs-6">
                        Shipping Address
                      </TypographyText>
                    </Col>
                  )}
                  {/* <Col span={24}>
                                        <TypographyTitle level={5}>Delivery</TypographyTitle>
                                    </Col> */}
                  {defaultAddress == "DEFAULT_ADDRESS" ? (
                    <Col span={24}>
                      <Card className="mx-4 p-3 text-muted fw-semibold">
                        <div>
                          {userInfo?.full_name}
                        </div>
                        <div>
                          {userInfo?.phone}
                        </div>
                        <div>
                        {userInfo?.address_line_1},<span className="mx-1">
                        {userInfo?.address_line_2}
                        </span>
                        </div>
                        <div>
                        {userInfo?.city},<span className="mx-1">
                        {userInfo?.state},<span className="mx-1">{userInfo?.zipcode}</span>
                        </span>
                        </div>
                        
                      </Card>
                    </Col>
                  ) : (
                    <>
                      <Col span={12}>
                        <FormItem
                          name="name"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                          label={"Name"}
                        >
                          <Input placeholder="Enter name" />
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Please enter phone number",
                            },
                            {
                              pattern: /^\d+$/,
                              message: "Only numbers are allowed",
                            },
                            {
                              max: 12,
                              message: "Phone number cannot exceed 12 digits",
                            },
                          ]}
                          label={"Phone"}
                        >
                          <Input maxLength={12}  placeholder="Enter phone number" />
                        </FormItem>
                      </Col>
                      {/* <Col span={12}>
                                        <FormItem name='company' rules={[{ required: false, message: "Please enter company" }]} label={'Company'}>
                                            <Input placeholder='Enter Company' />
                                        </FormItem>
                                    </Col> */}
                      <Col span={24}>
                        <FormItem
                          name="address_line_1"
                          rules={[
                            { required: true, message: "Please enter address" },
                          ]}
                          label={"Address"}
                        >
                          <Input placeholder="Enter Address" />
                        </FormItem>
                      </Col>
                      <Col span={24}>
                        <FormItem
                          name="address_line_2"
                          rules={[
                            {
                              required: true,
                              message: "Please enter apartment",
                            },
                          ]}
                          label={"Apartment suites"}
                        >
                          <Input placeholder="Apartment, suites, etc. " />
                        </FormItem>
                      </Col>

                      {/* <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                    <FormItem name='b_country' rules={[{ required: true, message: "Please enter country" }]} label={'Country'}>
                                    <Input placeholder='Enter country' />
                                    </FormItem>
                                    </Col> */}
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={12}
                        md={12}
                        xs={12}
                      >
                        <FormItem
                          name="city"
                          rules={[
                            { required: true, message: "Please enter city" },
                          ]}
                          label={"City"}
                        >
                          <Input placeholder="Enter city" />
                        </FormItem>
                      </Col>
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={12}
                        md={12}
                        xs={12}
                      >
                        <FormItem
                          name="state"
                          rules={[
                            { required: true, message: "Please enter state" },
                          ]}
                          label={"State"}
                        >
                          <Input placeholder="Enter state" />
                        </FormItem>
                      </Col>
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={24}
                        md={24}
                        xs={24}
                      >
                        <FormItem
                          name="zip"
                          rules={[
                            { required: true, message: "Please enter pincode" },
                          ]}
                          label={"Pincode"}
                        >
                          <Input placeholder="Enter pincode" />
                        </FormItem>
                      </Col>
                      {/* <Col span={24} xxl={24} xl={24} lg={24} sm={12} md={12} xs={12}>
                                        <FormItem name='phone' rules={[{ required: true, message: "Please enter phone number" }]} label={'Phone'}>
                                            <Input placeholder='Enter phone number' />
                                        </FormItem>
                                    </Col> */}
                    </>
                  )}
                  {/* <Col span={24}>
                    <FormItem name="news_offer">
                      <Checkbox />
                      <span className="mx-2">
                        Save this information for next time
                      </span>
                    </FormItem>
                  </Col> */}
                  <Col span={24}>
                    <TypographyText className="fw-bold fs-6">
                      Shipping method
                    </TypographyText>
                  </Col>
                  <Col span={24}>
                    <Alert
                      className="p-3 my-3"
                      message={
                        <Flex align="center" justify="space-between">
                          <TypographyText>Domestic Shipping</TypographyText>
                          <TypographyText className="fw-bold">
                            FREE
                          </TypographyText>
                        </Flex>
                      }
                      type="info"
                    />
                  </Col>
                  <Col span={24}>
                    <TypographyText className="fw-bold fs-6">
                      Notes
                    </TypographyText>
                  </Col>
                  <Col span={24}>
                  <FormItem
                          name="notes"
                          rules={[
                            { required: false, message: "Please enter notes" },
                          ]}
                          className="my-2"
                        >

                    <TextArea rows={4} placeholder="Enter notes"/>
                        </FormItem>
                  </Col>
                  <Col span={24}>
                    <TypographyText className="fw-bold fs-6">
                      Billing address
                    </TypographyText>
                  </Col>
                  <Col span={24}>
                    <Radio.Group
                      name="radiogroup"
                      className="my-2"
                      value={billing}
                      onChange={(e: any) => setBilling(e.target.value)}
                      options={[
                        {
                          value: "BILLING_SAME",
                          label: "Same as shipping address",
                        },
                        {
                          value: "BILLING_DIFFERENT",
                          label: "Use a different billing address",
                        },
                      ]}
                    />
                  </Col>
                  {billing == "BILLING_DIFFERENT" && (
                    <Fragment>
                      <Col span={24}>
                        <TypographyTitle level={5}>
                          Add Your Billing Address
                        </TypographyTitle>
                      </Col>
                      <Col span={12}>
                        <FormItem
                          name="b_name"
                          rules={[
                            { required: true, message: "Please enter name" },
                          ]}
                          label={"Name"}
                        >
                          <Input placeholder="Enter name" />
                        </FormItem>
                      </Col>
                      <Col
                        span={12}
                        xxl={12}
                        xl={12}
                        lg={12}
                        sm={12}
                        md={12}
                        xs={12}
                      >
                        <FormItem
                          name="b_phone"
                          rules={[
                            {
                              required: true,
                              message: "Please enter phone number",
                            },
                            {
                              pattern: /^\d+$/,
                              message: "Only numbers are allowed",
                            },
                            {
                              max: 12,
                              message: "Phone number cannot exceed 12 digits",
                            },
                          ]}
                          label={"Phone"}
                        >
                          <Input maxLength={12} placeholder="Enter phone number" />
                        </FormItem>
                      </Col>
                      <Col span={24}>
                        <FormItem
                          name="b_address_line_1"
                          rules={[
                            { required: true, message: "Please enter address" },
                          ]}
                          label={"Address"}
                        >
                          <Input placeholder="Enter Address" />
                        </FormItem>
                      </Col>
                      <Col span={24}>
                        <FormItem
                          name="b_address_line_2"
                          rules={[
                            {
                              required: true,
                              message: "Please enter apartment",
                            },
                          ]}
                          label={"Apartment suites"}
                        >
                          <Input placeholder="Enter apartment suites" />
                        </FormItem>
                      </Col>

                      {/* <Col span={6} xxl={6} xl={6} lg={6} sm={12} md={12} xs={11}>
                                    <FormItem name='b_country' rules={[{ required: true, message: "Please enter country" }]} label={'Country'}>
                                    <Input placeholder='Enter country' />
                                    </FormItem>
                                    </Col> */}
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={12}
                        md={12}
                        xs={12}
                      >
                        <FormItem
                          name="b_city"
                          rules={[
                            { required: true, message: "Please enter city" },
                          ]}
                          label={"City"}
                        >
                          <Input placeholder="Enter city" />
                        </FormItem>
                      </Col>
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={12}
                        md={12}
                        xs={12}
                      >
                        <FormItem
                          name="b_state"
                          rules={[
                            { required: true, message: "Please enter state" },
                          ]}
                          label={"State"}
                        >
                          <Input placeholder="Enter state" />
                        </FormItem>
                      </Col>
                      <Col
                        span={8}
                        xxl={8}
                        xl={8}
                        lg={8}
                        sm={24}
                        md={24}
                        xs={24}
                      >
                        <FormItem
                          name="b_zip"
                          rules={[
                            { required: true, message: "Please enter pincode" },
                          ]}
                          label={"Pincode"}
                        >
                          <Input placeholder="Enter pincode" />
                        </FormItem>
                      </Col>
                    </Fragment>
                  )}
                  {!screens.md && (
                    <Col
                      span={!screens.md ? 24 : 12}
                      className={`${
                        !screens.md
                          ? "cart-section-checkout-withoutbg"
                          : "cart-section-checkout"
                      }`}
                    >
                      <div
                        className={`position-sticky`}
                        style={{
                          top: 0,
                          bottom: 0,
                          right: "auto",
                          left: "auto",
                        }}
                      >
                        <div>
                          <div
                            className={` ${
                              !screens.md ? "" : "mt-3 px-5"
                            } h-100`}
                          >
                            {!screens.md && (
                              <TypographyTitle level={5}>
                                Order summary
                              </TypographyTitle>
                            )}
                            {Array.isArray(state.data) &&
                              state.data.map((res, index) => (
                                <CheckoutCartListCompo {...res} key={index} />
                              ))}
                            <div className="coupon">
                              <Flex gap={10} wrap>
                                <FormItem
                                  className="w-100"
                                  name={`code`}
                                  rules={[
                                    {
                                      required: false,
                                      message: "Please enter coupon code",
                                    },
                                  ]}
                                >
                                  <Input
                                    className="w-100"
                                    onChange={(e: any) =>
                                      SetCouponCode(e.target.value)
                                    }
                                    placeholder="Coupon Code"
                                    disabled={coupon.is_applied}
                                  />
                                </FormItem>

                                <Button
                                  loading={couponLoading}
                                  onClick={applyCoupon}
                                  type="primary"
                                  // htmlType="submit"
                                  block={!screens.sm ? true : false}
                                  className="px-5 text-uppercase"
                                >
                                  {coupon.is_applied ? "Remove" : "Apply"}
                                </Button>
                              </Flex>
                            </div>
                            {coupon?.is_applied && (
                              <Card
                                className="mt-3 shadow-sm"
                                style={{
                                  backgroundColor: "#E5E4E2",
                                  padding: "10px",
                                  color: "black",
                                }}
                              >
                                <h6>
                                  🎉{" "}
                                  <span className="fw-bold">
                                    {form.getFieldValue("code")}
                                  </span>{" "}
                                  Applied Successfully!
                                </h6>
                                <p>
                                  You saved{" "}
                                  <strong>
                                    {CURRENCY}
                                    {Number(coupon.discount).toFixed(2)}
                                  </strong>{" "}
                                  off your order. Enjoy your shopping!
                                </p>
                              </Card>
                            )}
                            {Number(userInfo?.loyalty) &&
                            userInfo?.access_token ? (
                              <Card
                                style={{ backgroundColor: "#E5E4E2" }}
                                className="p-2 px-3 my-3 shadow-sm"
                                title={
                                  <Flex align="center" justify="space-between">
                                    <TypographyTitle level={5}>
                                      Loyality Points
                                    </TypographyTitle>
                                    <Flex align="center" gap={6}>
                                      <TypographyTitle level={5}>
                                        {userInfo?.loyalty}
                                      </TypographyTitle>
                                      <Switch
                                        checked={isLoyalityApplied}
                                        onChange={handleLoyality}
                                      />
                                    </Flex>
                                  </Flex>
                                }
                              >
                                <TypographyText className="fw-semibold text-muted fs-14">
                                  Your loyalty points have been applied to this
                                  order. Thank you for being a valued customer!
                                </TypographyText>
                              </Card>
                            ) : (
                              ""
                            )}

                            <div className="cart-total-checkout">
                              <ul className="list-unstyled mb-5 p-0">
                                <li className="cart-list">
                                  <span>Subtotal . {state.count} items</span>
                                  <span className="fw-semibold">
                                    {CURRENCY}
                                    {Number(state.sub_total).toFixed(2)}
                                  </span>
                                </li>
                                <li className="cart-list">
                                  <span>Shipping</span>
                                  <span className="fw-semibold">FREE</span>
                                </li>
                                {coupon?.is_applied && (
                                  <li className="cart-list">
                                    <span>Discount</span>
                                    <span className="fw-semibold">
                                      {CURRENCY}
                                      {Number(discount).toFixed(2)}
                                    </span>
                                  </li>
                                )}
                                {isLoyalityApplied && loyalityDiscount && (
                                  <li className="cart-list">
                                    <span>
                                      Loyality Points ({loyalityDiscount})
                                    </span>
                                    <span className="fw-semibold">
                                      {Number(loyalityDiscount).toFixed(2)}
                                    </span>
                                  </li>
                                )}
                                <li className="cart-list">
                                  <span className="fs-5 fw-bold">Total</span>
                                  <span className="fs-5 fw-bold">
                                    {CURRENCY}
                                    {Number(
                                      Number(state.sub_total) -
                                        (discount + loyalityDiscount)
                                    ).toFixed(2)}
                                  </span>
                                </li>
                                <li className="">
                                  <span className="">
                                    Including {CURRENCY}
                                    {ALL_TAXES} in taxes
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}
                  <Col span={24}>
                    <Button
                      className="my-3"
                      htmlType="submit"
                      block
                      loading={loading}
                      type="primary"
                    >
                      Pay now
                    </Button>
                  </Col>
                  {screens.md && <Divider />}
                  {screens.md && (
                    <div className="text-center py-2">
                      <ul
                        className="list-unstyled m-0 p-0 gap-5 d-flex"
                        style={{ textDecoration: "underline" }}
                      >
                        <li>
                          {" "}
                          <div className="line"></div>{" "}
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/privacy-policy"}
                          >
                            Privacy policy
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/return-policy"}
                          >
                            Return policy
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/terms-and-conditions"}
                          >
                            Terms & Conditions
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/contact-us"}
                          >
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </Row>
              </AntForm>
            </div>
          </Col>
          {screens.md && (
            <Col
              span={!screens.md ? 24 : 12}
              className={`${
                !screens.md
                  ? "cart-section-checkout-withoutbg"
                  : "cart-section-checkout"
              }`}
            >
              <div
                className={`container  p-4 position-sticky`}
                style={{ top: 0, bottom: 0, right: "auto", left: "auto" }}
              >
                <div>
                  <div
                    className={` ${!screens.md ? "px-4" : "mt-3 px-5"} h-100`}
                  >
                    {!screens.md && (
                      <TypographyTitle level={5}>Order summary</TypographyTitle>
                    )}
                    {Array.isArray(state.data) &&
                      state.data.map((res, index) => (
                        <CheckoutCartListCompo {...res} key={index} />
                      ))}
                    <div className="coupon">
                      <AntForm
                        size="large"
                        form={form}
                        className="d-flex flex-wrap align-items-center gap-3"
                        onFinish={applyCoupon}
                      >
                        <Flex gap={10} className="w-100">
                          <FormItem
                            className="w-100"
                            name={`code`}
                            rules={[
                              {
                                required: true,
                                message: "Please enter coupon code",
                              },
                            ]}
                          >
                            <Input
                              className="w-100"
                              placeholder="Coupon Code"
                              disabled={coupon.is_applied}
                            />
                          </FormItem>

                          <Button
                            loading={couponLoading}
                            type="primary"
                            htmlType="submit"
                            block={!screens.sm ? true : false}
                            className="px-5 text-uppercase"
                          >
                            {coupon.is_applied ? "Remove" : "Apply"}
                          </Button>
                        </Flex>

                        {/* <Button type='primary' block={screens.sm ? false : true} className='px-5 text-uppercase'>Update cart</Button> */}
                      </AntForm>
                    </div>
                    {coupon?.is_applied && (
                      <Card
                        className="mt-3 mb-3 shadow-sm"
                        style={{
                          backgroundColor: "#E5E4E2",
                          padding: "10px",
                          color: "black",
                        }}
                      >
                        <h6>
                          🎉{" "}
                          <span className="fw-bold">
                            {form.getFieldValue("code")}
                          </span>{" "}
                          Applied Successfully!
                        </h6>
                        <p>
                          You saved{" "}
                          <strong>
                            {CURRENCY}
                            {Number(coupon.discount).toFixed(2)}
                          </strong>{" "}
                          off your order. Enjoy your shopping!
                        </p>
                      </Card>
                    )}
                    {Number(userInfo?.loyalty) && userInfo?.access_token ? (
                      <Card
                        style={{ backgroundColor: "#E5E4E2" }}
                        className="p-2 px-3 my-3 shadow-sm"
                        title={
                          <Flex align="center" justify="space-between">
                            <TypographyTitle level={5}>
                              Loyality Points
                            </TypographyTitle>
                            <Flex align="center" gap={6}>
                              <TypographyTitle level={5}>
                                {userInfo?.loyalty}
                              </TypographyTitle>
                              <Switch
                                checked={isLoyalityApplied}
                                onChange={handleLoyality}
                              />
                            </Flex>
                          </Flex>
                        }
                      >
                        <TypographyText className="fw-semibold text-muted fs-14">
                          Your loyalty points have been applied to this order.
                          Thank you for being a valued customer!
                        </TypographyText>
                      </Card>
                    ) : (
                      ""
                    )}
                    {/* <Card className='p-2 px-3 my-3' title={<Flex align='center' justify='space-between'>
                                        <TypographyTitle level={5}>Membership Discount 15%</TypographyTitle>
                                        <Flex align='center' gap={6}>
                                            <TypographyTitle level={5}>15</TypographyTitle>
                                            <Switch />
                                        </Flex>
                                    </Flex>}>
                                        <TypographyText className='fw-semibold text-muted fs-14'>Enjoy 15% off as a valued member! Your discount has been applied to your order.</TypographyText>
                                    </Card> */}

                    <div className="cart-total-checkout">
                      <ul className="list-unstyled mb-5 p-0">
                        <li className="cart-list">
                          <span>Subtotal . {state.count} items</span>
                          <span className="fw-semibold">
                            {CURRENCY}
                            {Number(state.sub_total).toFixed(2)}
                          </span>
                        </li>
                        <li className="cart-list">
                          <span>Shipping</span>
                          <span className="fw-semibold">FREE</span>
                        </li>
                        {coupon?.is_applied && (
                          <li className="cart-list">
                            <span>Discount</span>
                            <span className="fw-semibold">
                              {CURRENCY}
                              {Number(discount).toFixed(2)}
                            </span>
                          </li>
                        )}
                        {isLoyalityApplied && (
                          <li className="cart-list">
                            <span>Loyality Points ({loyalityDiscount})</span>
                            <span className="fw-semibold">
                              {Number(loyalityDiscount).toFixed(2)}
                            </span>
                          </li>
                        )}
                        <li className="cart-list">
                          <span className="fs-5 fw-bold">Total</span>
                          <span className="fs-5 fw-bold">
                            {CURRENCY}
                            {Number(
                              Number(state.sub_total) -
                                (discount + loyalityDiscount)
                            ).toFixed(2)}
                          </span>
                        </li>
                        <li className="">
                          <span className="text-muted">
                            Including {CURRENCY}
                            {ALL_TAXES} in taxes
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Col>
                  {!screens.md && (
                    <div className="text-center py-2">
                      <ul
                        className="list-unstyled m-0 p-0 gap-3 d-flex justify-content-center"
                        style={{ textDecoration: "underline" }}
                      >
                        <li>
                          {" "}
                          <div className="line"></div>{" "}
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/privacy-policy"}
                          >
                            Privacy policy
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/return-policy"}
                          >
                            Return policy
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/terms-and-conditions"}
                          >
                            Terms & Conditions
                          </Link>
                        </li>
                        <li>
                          <div className="line"></div>
                          <Link
                            style={{ color: "blue" }}
                            href={"/pages/contact-us"}
                          >
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </Col>
              </div>
            </Col>
          )}
        </Row>
      </div>
      <StatusModal
        open={open}
        status={status}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
      />
    </Fragment>
  );
};
Payment.getLayout = function getLayout(page: ReactElement) {
  return <CheckLayout>{page}</CheckLayout>;
};

export default Payment;
