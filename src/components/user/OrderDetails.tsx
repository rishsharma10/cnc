import { Col, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import crumbApi, { BUCKET_ROOT, CURRENCY } from "@/utils/crumbApis";
import { stringReplace } from "@/utils/crumbValidation";
import {
  Card,
  Descriptions,
  Button,
  Spin,
  Table,
  Flex,
  Avatar,
  Row,
  Divider,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import productImage from "@/assets/images/product-placeholder-wp.jpg";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GlobalContext } from "@/context/Provider";
import { GetServerSideProps } from "next";

const dummyOrderDetails = {
  id: "1",
  customer: "John Doe",
  date: "2025-04-25",
  total: 250,
  status: "Shipped",
  address: "123 Main Street, New Delhi",
  paymentMethod: "Credit Card",
};

const OrderDetails = (props:any) => {
  console.log(props,'propssssssssssssssssss');
  
  const router = useRouter();
  const { userInfo } = useContext(GlobalContext);
  const { id } = router.query; // dynamic ID from URL

  const order = dummyOrderDetails; // Ideally fetch order based on id

  const columns = [
    {
      title: "",
      dataIndex: "cross",
      key: "cross",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];
  const [state, setState] = useState({} as any);
const [loading, setLoading] = useState(false)

  const initData = async () => {
    setLoading(true)
    try {
      const apiRes = await crumbApi.Order.details({order_id:id})
      setState(apiRes.data)
      console.log(apiRes)
      
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    initData()
  },[id])

  const dataSource: any =
    Array.isArray(state?.invoice_data?.items) &&
    state?.invoice_data?.items.map((res: any, index:number) => {
      return {
        key: index,
        product: (
          <Link
            href={`/product/${stringReplace(res?.name)}/${
              res?.product_id
            }`}
          >
            <Flex align="center" gap={8}>
              <Avatar
                src={
                  res?.feature_image
                    ? `${BUCKET_ROOT}${res?.feature_image}`
                    : productImage.src
                }
                shape="square"
                size={100}
              />
              <div>
                <span className="fs-16 fw-bold">{res.name}</span>
                <br />
                {Number(res?.is_variant) > 0 && (
                  <Fragment>
                    {res?.attribute?.name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold me-1 text-capitalize">
                        {res?.attribute?.name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                    /
                    {res?.attribute_item?.name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold mx-1 text-capitalize">
                        {res?.attribute_item?.name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                  </Fragment>
                )}
              </div>
            </Flex>
          </Link>
        ),
        price: (
          <span className="fs-14 fw-semibold">{`${CURRENCY}${res?.price}`}</span>
        ),
        quantity: res?.quantity,
        subtotal: (
          <span className="fs-14 fw-semibold">{`${CURRENCY}${Number(
            res?.quantity * res?.price
          )?.toFixed(2)}`}</span>
        ),
      };
    });


    let shipping = state.invoice_data?.shipping
    let billing = state.invoice_data?.billing
  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Spin spinning={loading}>

      <Card className="p-3">
        <Flex align="center" gap={3}>
          <Button
            type="text"
            className="d-flex align-items-center mb-2 px-0"
            onClick={() => router.back()}
          >
            <BiLeftArrowAlt className="fs-4" />
          </Button>
          <TypographyTitle level={5}>Order ID: #{state?.order_id}</TypographyTitle>
        </Flex>
        <Spin spinning={false}>
          <div className="cart-content mb-4">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              scroll={{ x: "100%" }}
            />
          </div>
        </Spin>
        <Divider />
        <Row gutter={[0, 0]}>
          <Col span={16}>
            <Card className="mx-4 p-3 text-muted fw-semibold">
              <TypographyTitle level={5}>Consumer Details</TypographyTitle>
              <Divider className="m-0 p-0" />
              <Flex justify="space-between" wrap>
                <div>
                  <span className="fw-bold fs-6 text-black">
                    Shipping Address
                  </span>
                  <div>{shipping?.name}</div>
                  <div>{shipping?.phone}</div>
                  <div>
                    {shipping?.address_line_1},
                    <span className="mx-1">{shipping?.address_line_2}</span>
                  </div>
                  <div>
                    {shipping?.city},
                    <span className="mx-1">
                      {shipping?.state},
                      <span className="mx-1">{shipping?.zip}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="fw-bold fs-6 text-black">
                    Billing Address
                  </span>
                  <div>{billing?.name}</div>
                  <div>{billing?.phone}</div>
                  <div>
                    {billing?.address_line_1},
                    <span className="mx-1">{billing?.address_line_2}</span>
                  </div>
                  <div>
                    {billing?.city},
                    <span className="mx-1">
                      {billing?.state},
                      <span className="mx-1">{billing?.zip}</span>
                    </span>
                  </div>
                </div>
              </Flex>
              <Flex className="mt-3 " align="center" gap={3} justify="space-between">
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Delivery
                  </span>
                  <div className="fs-6">{state?.payload?.first_name}</div>
                  </div>
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Payment Mode
                  </span>
                  <div className="fs-6">{state?.invoice_data?.payments[0]?.type}</div>
                  </div>
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Payment status
                  </span>
                  <div className="fs-6">{state?.invoice_data?.status ?? 'Shipped'}</div>
                  </div>
              </Flex>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="mx-4 p-3 text-muted fw-semibold">
              <TypographyTitle level={5}>Summary</TypographyTitle>
              <Divider className="m-0 p-0" />
              <div className="cart-total-checkout">
                <ul className="list-unstyled mb-5 p-0">
                  <li className="cart-list">
                    <span>Subtotal . {state?.invoice_data?.items?.length ??0} items</span>
                    <span className="fw-semibold">
                      {CURRENCY}
                      {Number(state?.invoice_data?.payments[0]?.amount).toFixed(2)}
                    </span>
                  </li>
                  <li className="cart-list">
                    <span>Shipping</span>
                    <span className="fw-semibold">FREE</span>
                  </li>
                  {/* <li className="cart-list">
                    <span>Tax</span>
                    <span className="fw-semibold">{CURRENCY}{state?.invoice_data?.tax ?? 0}</span>
                  </li> */}
                  <Divider className="m-0 p-0" />
                  <li className="cart-list">
                    <span className="fs-5 fw-bold">Total</span>
                    <span className="fs-5 fw-bold">
                      {CURRENCY}
                      {Number(state?.invoice_data?.payments[0]?.amount)}
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
        {/* <Card
          title={
            <div className="mb-3 mt-2 text-center">{`Order Details - #${order.id}`}</div>
          }
          className="px-3"
        >
          <Descriptions bordered column={1} size="default">
            <Descriptions.Item label="Customer Name">
              {order.customer}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {order.date}
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              ₹{order.total}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
            <Descriptions.Item label="Shipping Address">
              {order.address}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {order.paymentMethod}
            </Descriptions.Item>
          </Descriptions>
        </Card> */}
      </Card>
      </Spin>

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const payload = {
      order_id:context.query.id
    }
    const apiRes = await crumbApi.Order.details(payload)
    console.log(apiRes,'apiresssss')
    return {
      props: { ...apiRes.data },

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
export default OrderDetails;
