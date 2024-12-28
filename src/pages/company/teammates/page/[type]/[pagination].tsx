import HenceforthIcons from "@/components/HenceforthIcons"
import MainLayout from "@/components/common/MainLayout"
import { Avatar, Button, Checkbox, Col, Dropdown, Spin, Flex, Input, Pagination, Row, Select, Tabs, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import { Form, MenuProps, Table, TabsProps, Tooltip } from "antd"
import React, { ReactElement, useEffect, useState } from "react"
import profile from '@/assets/images/profile.png';
import Link from "next/link"
import { useRouter } from "next/router"
import { GlobalContext } from "@/context/Provider"
import henceforthApi from "@/utils/henceforthApi"
import { getRoleForUrl } from "@/utils/henceforthValidations"
import { EyeOutlined } from '@ant-design/icons';
import FilterDateModal from "@/components/modal/FilterDatesModal"
import dayjs from "dayjs"
import { userInfo } from "os"
const TeammatePage = () => {
    const router = useRouter()
    const [dateForm] = Form.useForm()
    const query = router.query;
    const [dateModal, setDateModal] = useState(false)
    const { userType, userInfo, Toast } = React.useContext(GlobalContext)
    const [state, setState] = React.useState({
        data: [],
        count: 0
    });
    const [loading, setLoading] = React.useState(false)
    const itemsFilter: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Button
                onClick={() => {
                    router.push({
                      query: { ...router.query, new_filter: "dates" },
                    });setDateModal(true)
                  }}>
                    Dates
                </Button>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "2",
            label: (
                <Button
                    onClick={() => {
                        router.push({
                            query: { ...router.query, new_filter: "last_update" },
                        });
                    }}
                    type="text"
                >
                    Last Update
                </Button>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "3",
            label: (
                <Button
                    onClick={() => {
                        router.push({
                            query: { ...router.query, new_filter: "created_by" },
                        });
                    }}
                    type="text"
                >
                    Created By
                </Button>
            ),
        },
    ];
    const items2: MenuProps['items'] = [
        {
            key: '1',
            label: <Button onClick={() => handleRoute('all')} type="text" className="text-dark p-0 h-100 text-start bg-transparent">All</Button>,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Button onClick={() => handleRoute('team_admin')} type="text" className="text-dark p-0 h-100 text-start bg-transparent">Team Admin</Button>,
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: <Button onClick={() => handleRoute('members')} type="text" className="text-dark p-0 h-100 text-start bg-transparent">Member</Button>,
        },
    ];
    const action = (res: any) => [
        {
            key: '1',
            label: <Link href={`/${userType}/teammates/${res?._id}/view`} className="fw-semibold">View</Link>,
        },
        // {
        //     type: 'divider',
        // },
        // {
        //     key: '2',
        //     label: <Link href={`/${userType}/teammates/${res._id}/view`} className="fw-semibold">Deactivate</Link>,
        // },
        // {
        //     type: 'divider',
        // },
        // {
        //     key: '2',
        //     label: <Link href={`/${userType}/teammates/${res._id}/view`} className="fw-semibold">Delete</Link>,
        // },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            render: (text: any, res: any, i: any) => { return (router.query.pagination ? (Number(router.query.pagination) - 1) * Number(router.query.limit || 10) + (i + 1) : i + 1) }
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text: any, res: any, index: any) => { return <Flex align="center" gap={8}><Avatar src={res?.profile_pic ? henceforthApi.FILES.imageMedium(res?.profile_pic, "") : profile.src} size={40} /><TypographyText>{res?.first_name ?? "N/A"}</TypographyText></Flex> }
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (text: any, res: any, index: any) => { return (res?.last_name ?? "N/A") }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any, res: any, index: any) => { return <Flex gap={3} className="tooltip-copy" style={{ minWidth: 180 }}><Tooltip title={res.email}>{res.email?.length > 20 ? `${res.email?.slice(0, 20)}...` : res?.email}</Tooltip><span role="button" className="copy-icon" onClick={() => { navigator.clipboard.writeText(res.email); Toast.success('Copied successfully') }}><HenceforthIcons.CopyFill /></span></Flex> }
        },
        {
            title: <Dropdown menu={{ items: items2 }} >
                <Button type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" >Role <HenceforthIcons.ChevronDownBlack color /></Button>
            </Dropdown> 
            ,
            dataIndex: 'role',
            key: 'role',
            render: (text: any, res: any, index: any) => { return <span className="text-capitalize">{(getRoleForUrl(res.role))}</span> }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (text: any, res: any, index: any) => { return (res?.department_id?.title ? res?.department_id?.title?.length > 20 ? `${res?.department_id?.title.slice(0,20)}...` : res?.department_id?.title : "N/A") }
        },
        {
            title: 'Process Created',
            dataIndex: 'processCreated',
            key: 'processCreated',
            render: (text: any, res: any, index: any) => { return (res?.total_processes ?? 0) }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, res: any, index: any) => {
                return (
                    <Button onClick={() => { router.push(`/${userType}/teammates/${res._id}/view?type=OWN_PROCESS`) }} type="text" className="text-secondary d-flex align-items-center gap-2 p-0 h-100 bg-transparent" size="small" ><EyeOutlined /></Button>
                )
            }
        },
    ];

    // const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);


    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    //   };

    //   const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // };

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: 'All',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data.map((res: any) => { return { ...res, key: res?._id } })} columns={columns} />
            </div>,
        },
        // {
        //     key: 'company_admin',
        //     label: 'Company Admins',
        //     children: <div className="tab_content">
        //         <Flex gap={8} className="mb-4">
        //             <Input onChange={(e:any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
        //             <Dropdown
        //                 menu={{ items: itemsFilter }}
        //                 placement="bottomLeft"
        //                 arrow
        //             >
        //                 <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
        //             </Dropdown>
        //         </Flex>
        //         <Table  scroll={{ x: '100%' }} pagination={false} dataSource={state.data.map((res:any)=>{return {...res,key:res?._id}})} columns={columns} />
        //     </div>,
        // },
        {
            key: 'team_admin',
            label: 'Team Admins',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data.map((res: any) => { return { ...res, key: res?._id } })} columns={columns} />
            </div>,
        },
        {
            key: 'members',
            label: 'Members',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input onChange={(e: any) => onSearch(e.target.value)} placeholder="Search by name or email..." size="large" prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={state.data.map((res: any) => { return { ...res, key: res?._id } })} columns={columns} />
            </div>,
        },
    ];

    // if (userInfo?.role === "COMPANY_ADMIN") {
    //     items.splice(1, 1)

    // }
    // if(userInfo?.role==="TEAM_ADMIN"){
    // items.splice(0,3)
    //  }

    const initData = async () => {
        debugger;
        try {
            setLoading(true)
            let urlSearchParam = new URLSearchParams();

            if (query.pagination) {
                urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
            }
            if (query.search) {
                urlSearchParam.set("search", String(query.search));
            }
            if(query.new_filter == "dates"){
                if (query.start_date) {
                  urlSearchParam.set("start_date", String(query.start_date));
                }
                if (query.end_date) {
                  urlSearchParam.set("end_date", String(query.end_date));
                }
              }
            if (query.new_filter) {
                urlSearchParam.set("new_filter", String(query.new_filter));
            }
            urlSearchParam.set("limit", String(10));
            urlSearchParam.set("filter", String(query.type).toUpperCase())
            let apiRes = await henceforthApi.Team.teammatesList(urlSearchParam.toString());
            setState(apiRes.data);
            console.log(apiRes.data, "company_data")
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false);
        }
    };
    console.log(state, "stataatt");

    const handleDateSubmit = async (values:any) => {
        console.log(values,"valuessjsjsjs");
        
        setLoading(true);
        try {
          // const apiRes = await henceforthApi.Process.archieved( {});
          // await initData()
          // router.replace(`/process/list/all/1`);
          router.replace({
            query:{...router.query,new_filter:"dates",start_date:dayjs(values?.leaveDates[0]).valueOf(),end_date:dayjs(values?.leaveDates[1]).valueOf()}
          })
          dateForm.resetFields()
          setDateModal(false)
        } catch (error) {
          setLoading(false);
        } finally {
        }
      };
    const removeQueryParam = (param: string) => {
        const { pathname, query } = router;
        const params = new URLSearchParams(query as any);
        params.delete(param);
        router.replace(
            { pathname, query: params.toString() },
            undefined,
            { shallow: true }
        );
    };

    console.log(state, "statetetet");
    const handleRoute = (value: any) => {
        console.log(router.query, "tabchanges")
        const oldQuery = router.query
        router.replace({
            query: { ...oldQuery, pagination: 1, type: value }
        }, undefined, { shallow: true })
    }

    //   const onSearch = (value:any) => {
    //     if (value == '') return removeQueryParam('search')
    //    const oldQuery = router.query
    //     router.replace({
    //       query:{...oldQuery, search:value}
    //     },undefined,{shallow:true})
    //   }
    let timer: any

    const onChangeRouter = (key: string, value: string) => {
        if (value == '' && key == "search") return removeQueryParam('search')
        //    const oldQuery = router.query
        router.replace({
            query: { ...router.query, [key]: value }
        })
    }

    const onSearch = (value: string) => {
        console.log("onserach value", value);
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            onChangeRouter("search", String(value).trim())
        }, 1000);
    }

    const handlePagination = (page: number, pageSize: number) => {
        router.replace({
            query: { ...router.query, pagination: page, limit: pageSize }
        }, undefined, { shallow: true })
    }

    React.useEffect(() => {
        initData();
        if(router.query.new_filter !== "dates"){
            delete router.query.start_date
            delete router.query.end_date
          }
    }, [query.type, query.pagination, query.search, query.new_filter,query.start_date, query.end_date]);




    return (
        <React.Fragment>
            <section className="teammates">
                <div className="container-fluid">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex justify="space-between" align="center" gap={10}>
                                <TypographyTitle level={4} className="m-0">Teammates</TypographyTitle>
                                <Link href={`/${userType}/teammates/add`}><Button type="primary" size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Plus />}>Add New Teammate</Button></Link>
                            </Flex>
                        </Col>
                        {/* tabs */}
                        <Spin spinning={loading} prefixCls="tab">
                            <Col span={24}>
                                <Tabs onChange={handleRoute} defaultActiveKey={String(router.query.type)} items={items} />
                            </Col>
                        </Spin>
                    </Row>
                    <Row justify={'center'} className="mt-4 mb-4">
                        <Col span={24} className="text-center mt-2">
                            <Pagination current={Number(router.query.pagination) || 0} pageSize={Number(router.query.limit) || 10} total={state?.count} hideOnSinglePage={true} disabled={loading} onChange={handlePagination} />

                        </Col>
                    </Row>
                </div>
            </section>
            <FilterDateModal open={dateModal} setOpen={setDateModal} loading={loading} submit={handleDateSubmit} form={dateForm}/>
        </React.Fragment>
    )
}
TeammatePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export default TeammatePage