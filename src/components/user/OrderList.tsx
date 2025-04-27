import { Table, Card, Button, Grid } from 'antd';
import { useRouter } from 'next/router';
import { BsFillEyeFill } from 'react-icons/bs';

const orders = [
  { id: '1', customer: 'John Doe', date: '2025-04-25', total: 250, status: 'Shipped' },
  { id: '2', customer: 'Jane Smith', date: '2025-04-24', total: 100, status: 'Pending' },
  { id: '3', customer: 'Mark Johnson', date: '2025-04-23', total: 400, status: 'Delivered' },
];

const OrderList = () => {
  const router = useRouter();

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total Amount', dataIndex: 'total', key: 'total', render: (value: number) => `₹${value}` },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => router.push(`/account/order/${record.id}/details`)}>
          <BsFillEyeFill color='#666666' size={20}/>
        </Button>
      ),
    },
  ];

  const screens = Grid.useBreakpoint()

  return (
    <div style={{ padding:screens.sm ? '24px' : "0", maxWidth: '100%', overflowX: 'auto' }}>
      <Card
      style={{padding:'0px 10px'}}
        title={<div style={{ textAlign: 'center',padding:15 }} ><h4>Order List</h4></div>}
        bordered={false}
      >
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 'max-content' }} // 👈 important for mobile table scrolling
        />
      </Card>
    </div>
  );
};

export default OrderList;
