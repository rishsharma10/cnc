import crumbApi from "@/utils/crumbApis";
import { formatToDDMMYYYY } from "@/utils/crumbValidation";
import { Table, Card, Button, Grid } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";

const OrderList = () => {
  const router = useRouter();
  const [state, setState] = useState([]);

  const orderList = async () => {
    try {
      let apiRes = await crumbApi.Order.list();
      setState(apiRes.data);
      console.log(apiRes);
    } catch (error) {}
  };
  console.log(state, "statetete");

  const orders =
    Array.isArray(state) &&
    (state.map((res: any) => {
      let data = res?.payment_session;
      let customerData = data?.invoice_data;

      return {
        id: `#${data?.order_id}`,
        customer:
          customerData?.customer?.full_name ?? customerData?.customer?.email,
        date: formatToDDMMYYYY(data?.updated_at),
        total: customerData["payments"][0]?.amount,
        status: customerData?.status ?? "Shipped",
        action:<Button
        type="link"
        onClick={() => router.push(`/account/order/${data.order_id}/details`)}
      >
        <BsFillEyeFill color="#666666" size={20} />
      </Button>
      };
    }) as any);

  useEffect(() => {
    orderList();
  }, [router.query.type]);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (value: number) => `₹${value}`,
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      dataIndex:"action"
    },
  ];

  const screens = Grid.useBreakpoint();

  return (
    <div
      style={{
        padding: screens.sm ? "24px" : "0",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <Card
        style={{ padding: "0px 10px" }}
        title={
          <div style={{ textAlign: "center", padding: 15 }}>
            <h4>Order List</h4>
          </div>
        }
        bordered={false}
      >
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }} // 👈 important for mobile table scrolling
        />
      </Card>
    </div>
  );
};

export default OrderList;
