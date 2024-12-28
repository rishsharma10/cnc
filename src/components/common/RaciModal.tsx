import React, { useState } from 'react';
import { Modal, Avatar, Typography, Flex, Button } from 'antd';
import groupImage from "@/assets/images/groupraci.png";
import profile from "@/assets/images/profile.png";

const { Title } = Typography;

const RACIModal = ({ open, onOk, onCancel, state }: any) => {
    const [visibility, setVisibility] = useState<any>({
        responsible: false,
        consulted: false,
        informed: false,
    });

    const toggleVisibility = (key: string) => {
        setVisibility((prev: any) => ({ ...prev, [key]: !prev[key] }));
    };

    const renderUsers = (users: any[], key: string) => {

        if (!users || users.length === 0) return <p>N/A</p>;

        return (
            <div className={`d-flex ${Array.isArray(users) && users.length>1 ? "ms-23px":"ms-35px"}`} >
                <div className='d-flex flex-column '>
                    <p className='mb-0 text-capitalize'>{users[0]?.first_name || "N/A"}</p>
                    {users.length > 1 && (
                        <>
                            {visibility[key] && (
                                <div>
                                    {users.slice(1).map((user: any) => (
                                        <p className='mb-0 text-capitalize' key={user._id}>{user.first_name}</p>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                {
                    users.length > 1 && <Button className='rounded-circle ms-1 pt-0 pb-1 ps-2 pe-2 raci-btn' style={{height:"21px"}} onClick={() => toggleVisibility(key)}  >
                        {visibility[key] ? ' -' : ' +'}
                    </Button>
                }


            </div>
        );
    };


    return (
        <Modal
            title={<Title level={5} className="m-0 text-center">RACI</Title>}
            width={700}
            centered
            footer={null}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
        >
            <div className="raci-component">
                <Flex justify="space-between" gap={40}>
                    <div className="raci-users">
                        <Avatar
                            src={state?.responsible?.length > 1 ? groupImage.src : profile.src}
                            size={100}
                        />
                        <h6 className="m-0 fw-semibold text-center mt-2">
                            {renderUsers(state?.responsible, 'responsible')}
                        </h6>
                    </div>
                    <div className="raci-users">
                        <Avatar src={profile.src} size={100} />
                        <h6 className="m-0 fw-semibold text-center mt-2 text-capitalize">
                            {state?.accountable?.first_name || 'N/A'}
                        </h6>
                    </div>
                    <div className="raci-users">
                        <Avatar
                            src={state?.consulted?.length > 1 ? groupImage.src : profile.src}
                            size={100}
                        />
                        <h6 className="m-0 fw-semibold text-center mt-2">
                            {renderUsers(state?.consulted, 'consulted')}
                        </h6>
                    </div>
                    <div className="raci-users">
                        <Avatar
                            src={state?.informed?.length > 1 ? groupImage.src : profile.src}
                            size={100}
                        />
                        <h6 className="m-0 fw-semibold text-center mt-2">
                            {renderUsers(state?.informed, 'informed')}
                        </h6>
                    </div>
                </Flex>

                <Flex justify="space-between" gap={40}>
                    <div className="raci-R raci-char">R</div>
                    <div className="raci-A raci-char">A</div>
                    <div className="raci-C raci-char">C</div>
                    <div className="raci-I raci-char">I</div>
                </Flex>
            </div>
        </Modal>
    );
};

export default RACIModal;
