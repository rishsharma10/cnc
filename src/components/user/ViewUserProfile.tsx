import { Button } from '@/lib/AntRegistry';
import { Card, Descriptions, Grid } from 'antd';

const ViewUserProfile = (props:any) => {
    const screens = Grid.useBreakpoint()
  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto'}}>

    <Card title={<div className='text-center'><h4>Profile</h4></div>} bordered={false} style={{ maxWidth: 800, margin: 'auto',padding:screens.sm ? 30 : '20px 10px' }}>
      <Descriptions column={1} bordered className='rounded-3' size="default">
        <Descriptions.Item label="Name">{props?.first_name} {props?.last_name}</Descriptions.Item>
        <Descriptions.Item label="Email">{props?.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{props?.phone}</Descriptions.Item>
        <Descriptions.Item label="Loyalty Points">{props?.loyalty} Points</Descriptions.Item>
        {props?.address_line_1 && <Descriptions.Item label="Address">{props?.address_line_1}</Descriptions.Item>}
      </Descriptions>
      <Button
            type="primary"
            style={{ marginTop: '20px', display: 'block', marginInline: 'auto' }}
            onClick={() => props?.setEditing(true)}
            block
          >
            Edit Profile
          </Button>
    </Card>
    </div>
  );
};

export default ViewUserProfile;
