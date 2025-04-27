import { Col, TypographyText, TypographyTitle } from "@/lib/AntRegistry";
import { BUCKET_ROOT, CURRENCY } from "@/utils/crumbApis";
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
import { Fragment, useContext, useState } from "react";
import productImage from "@/assets/images/product-placeholder-wp.jpg";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GlobalContext } from "@/context/Provider";

const dummyOrderDetails = {
  id: "1",
  customer: "John Doe",
  date: "2025-04-25",
  total: 250,
  status: "Shipped",
  address: "123 Main Street, New Delhi",
  paymentMethod: "Credit Card",
};

const OrderDetails = () => {
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
  const [state, setState] = useState({
    data: [],
  });

  const dataSource: any =
    Array.isArray(state?.data) &&
    state?.data.map((res: any, index) => {
      return {
        key: index,
        product: (
          <Link
            href={`/product/${stringReplace(res?.product?.name)}/${
              res?.product.id
            }`}
          >
            <Flex align="center" gap={8}>
              <Avatar
                src={
                  res?.product?.feature_image
                    ? `${BUCKET_ROOT}${res?.product?.feature_image}`
                    : productImage.src
                }
                shape="square"
                size={100}
              />
              <div>
                <span className="fs-16 fw-bold">{res?.product.name}</span>
                <br />
                {res?.is_variant ? (
                  <Fragment>
                    {res?.variant?.attribute_name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold me-1 text-capitalize">
                        {res?.variant?.attribute_name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                    /
                    {res?.variant?.variant_name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold mx-1 text-capitalize">
                        {res?.variant?.variant_name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ) : res?.is_variant ? (
                  <Fragment>
                    {res?.variant?.attribute_name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold me-1 text-capitalize">
                        {res?.variant?.attribute_name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                    /
                    {res?.variant?.variant_name ? (
                      <TypographyText className="text-muted fs-14 fw-semibold mx-1 text-capitalize">
                        {res?.variant?.variant_name}
                      </TypographyText>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
            </Flex>
          </Link>
        ),
        price: (
          <span className="fs-14 fw-semibold">{`${CURRENCY}${res?.price}`}</span>
        ),
        quantity: 2,
        subtotal: (
          <span className="fs-14 fw-semibold">{`${CURRENCY}${Number(
            res?.quantity * res?.price
          )?.toFixed(2)}`}</span>
        ),
      };
    });

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Card className="p-3">
        <Flex align="center" gap={3}>
          <Button
            type="text"
            className="d-flex align-items-center mb-2 px-0"
            onClick={() => router.back()}
          >
            <BiLeftArrowAlt className="fs-4" />
          </Button>
          <TypographyTitle level={5}>Order Number: #1020</TypographyTitle>
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
                  <div>{userInfo?.full_name}</div>
                  <div>{userInfo?.phone}</div>
                  <div>
                    {userInfo?.address_line_1},
                    <span className="mx-1">{userInfo?.address_line_2}</span>
                  </div>
                  <div>
                    {userInfo?.city},
                    <span className="mx-1">
                      {userInfo?.state},
                      <span className="mx-1">{userInfo?.zipcode}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <span className="fw-bold fs-6 text-black">
                    Billing Address
                  </span>
                  <div>{userInfo?.full_name}</div>
                  <div>{userInfo?.phone}</div>
                  <div>
                    {userInfo?.address_line_1},
                    <span className="mx-1">{userInfo?.address_line_2}</span>
                  </div>
                  <div>
                    {userInfo?.city},
                    <span className="mx-1">
                      {userInfo?.state},
                      <span className="mx-1">{userInfo?.zipcode}</span>
                    </span>
                  </div>
                </div>
              </Flex>
              <Flex className="mt-3 " align="center" gap={3} justify="space-between">
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Delivery
                  </span>
                  <div className="fs-6">{userInfo?.full_name}</div>
                  </div>
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Payment Mode
                  </span>
                  <div className="fs-6">{userInfo?.full_name}</div>
                  </div>
              <div>
                  <span className="fw-bold fs-6 text-black">
                    Payment status
                  </span>
                  <div className="fs-6">{userInfo?.full_name}</div>
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
                    <span>Subtotal . {2} items</span>
                    <span className="fw-semibold">
                      {CURRENCY}
                      {Number(2000).toFixed(2)}
                    </span>
                  </li>
                  <li className="cart-list">
                    <span>Shipping</span>
                    <span className="fw-semibold">FREE</span>
                  </li>
                  <li className="cart-list">
                    <span>Tax</span>
                    <span className="fw-semibold">{CURRENCY}9</span>
                  </li>
                  <Divider className="m-0 p-0" />
                  <li className="cart-list">
                    <span className="fs-5 fw-bold">Total</span>
                    <span className="fs-5 fw-bold">
                      {CURRENCY}
                      {800}
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
    </div>
  );
};

export default OrderDetails;
