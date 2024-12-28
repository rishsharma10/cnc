import HenceforthIcons from "@/components/HenceforthIcons"
import MainLayout from "@/components/common/MainLayout"
import { Avatar, Button, Checkbox, Col, Dropdown, Flex, Input, Row, Select, Switch, Table, Tabs, TypographyText, TypographyTitle } from "@/lib/AntRegistry"
import { MenuProps, Pagination, TabsProps, Tooltip } from "antd"
import React, { ReactElement, useContext, useEffect, useState } from "react"
import profile from '@/assets/images/profile.png';
import Link from "next/link"
import { useRouter } from "next/router"
import henceforthApi from "@/utils/henceforthApi"
import henceforthValidations from "@/utils/henceforthValidations"
import { useDebounce } from "@/utils/CommonFunction"
import { GlobalContext } from "@/context/Provider"
const TeammatePage = () => {
    const router = useRouter()
    const { Toast } = useContext(GlobalContext)
    const [listing, setListing] = useState<any>({
        create: [],
        deactivate: [],
        share: [],
        export: [],
        request: [],
        add: [],
        processDelete: [],
        userDelete: [],
        deptDelete: [],
    }

    );
    const [state, setState] = useState({
        data: [],
        count: 0,
    });
    const items2: MenuProps['items'] = [
        {
            key: '1',
            label: <Button type="text" className="text-dark p-0 h-100 text-start bg-transparent" onClick={() => initDataRolseBased('')}>All</Button>,
        },
        {
            type: 'divider',
        },
        // {
        //     key: '2',
        //     label: <Button type="text" className="text-dark p-0 h-100 text-start bg-transparent" onClick={() => initDataRolseBased('COMPANY_ADMIN')}>Company Admin</Button>,
        // },
        // {
        //     type: 'divider',
        // },
        {
            key: '3',
            label: <Button type="text" className="text-dark p-0 h-100 text-start bg-transparent" onClick={() => initDataRolseBased('TEAM_ADMIN')}>Team Admin</Button>,
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: <Button type="text" className="text-dark p-0 h-100 text-start bg-transparent" onClick={() => initDataRolseBased('MEMBER')}>Member</Button>,
        },

    ];


    const handleChange = async (key: string, index: number, value: boolean, temp_type: string, type: string) => {
        console.log(key, value, "valueueueu");
        console.log("listing", listing)
        setListing((prevState: any) => {
            const updatedArray = [...prevState[temp_type]];
            updatedArray[index] = !updatedArray[index];
            return {
                ...prevState,
                [temp_type]: updatedArray,
            };
        });
        try {
            let apires = await henceforthApi.User.update(key, { [type]: value });
        } catch (error) {
            Toast.error(error)
            console.log(error);
        }
    };


    const dataSource = state.data.map((res: any, index: number) => {
        return ({
            key: (Number(router?.query?.pagination) - 1) * 10 + index + 1,
            firstName: <Tooltip title={res.first_name ? res.first_name : "N/A"}><Flex align="center" gap={8}><Avatar src={henceforthApi.FILES.imageOriginal(res.profile_pic, profile.src)} size={40} />
                {/* <TypographyText>{res.first_name ? res.first_name : "N/A"}</TypographyText> */}
            </Flex></Tooltip>,
            lastName: res.last_name ? res.last_name : "N/A",
            email: <Flex gap={3} className="tooltip-copy" style={{ minWidth: 180 }}><Tooltip title={res.email}>{res.email?.length > 20 ? `${res.email?.slice(0, 20)}...` : res?.email}</Tooltip><span role="button" className="copy-icon" onClick={() => { navigator.clipboard.writeText(res.email); Toast.success('Copied successfully') }}><HenceforthIcons.CopyFill /></span></Flex>,
            role: String(henceforthValidations.capitalizeFirstLetter(res.role)),
            department: String(henceforthValidations.capitalizeFirstLetter(res.department_id?.title)),
            create: <Switch size="small" checked={listing.create[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "create", "create_process_access")
                } />,
            deactivate: <Switch size="small" checked={listing.deactivate[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "deactivate", "user_deactivate_access")
                } />,
            share: <Switch size="small" checked={listing.share[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "share", "share_process_access")
                } />,
            export: <Switch size="small" checked={listing.export[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "export", "export_process_access")
                } />,
            request: <Switch size="small" checked={listing.request[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "request", "dep_req_access")
                } />,
            add: <Switch size="small" checked={listing.add[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "add", "user_add_access")
                } />,
            processDelete: <Switch size="small" checked={listing.processDelete[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "processDelete", "delete_process_access")
                } />,
            userDelete: <Switch size="small" checked={listing.userDelete[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "userDelete", "user_delete_access")
                } />,
            deptDelete: <Switch size="small" checked={listing.deptDelete[index]}
                onChange={(value) =>
                    handleChange(res._id, index, value, "deptDelete", "dep_delete_access")
                } />,
        })
    })
    const columns = router.query.type === 'user' ? (
        [
            // {
            //     title: '#',
            //     dataIndex: 'key',
            //     key: 'key',
            // },
            {
                title: 'User',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            // {
            //     title: 'Last Name',
            //     dataIndex: 'lastName',
            //     key: 'lastName',
            // },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: "Role",
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
            },


            {
                title: 'Add',
                dataIndex: 'add',
                key: 'add',
            },
            {
                title: 'Delete',
                dataIndex: 'userDelete',
                key: 'delete',
            },
            {
                title: 'Deactivate',
                dataIndex: 'deactivate',
                key: 'deactivate',
            }
        ]) : (router.query.type === 'process' ? ([
            // {
            //     title: '#',
            //     dataIndex: 'key',
            //     key: 'key',
            // },
            {
                title: 'User',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            // {
            //     title: 'Last Name',
            //     dataIndex: 'lastName',
            //     key: 'lastName',
            // },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title:"Role",
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: 'Create',
                dataIndex: 'create',
                key: 'create',
            },
            {
                title: 'Share',
                dataIndex: 'share',
                key: 'share',
            },
            {
                title: 'Export',
                dataIndex: 'export',
                key: 'export',
            },
            {
                title: 'Delete',
                dataIndex: 'processDelete',
                key: 'delete',
            },
        ]) : ([
            // {
            //     title: '#',
            //     dataIndex: 'key',
            //     key: 'key',
            // },
            {
                title: 'User',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            // {
            //     title: 'Last Name',
            //     dataIndex: 'lastName',
            //     key: 'lastName',
            // },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title:"Role",
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
            },

            {
                title: 'Request',
                dataIndex: 'request',
                key: 'request',
            },
            {
                title: 'Delete',
                dataIndex: 'deptDelete',
                key: 'delete',
            },
        ]));

    const handleRoute = (value: any) => {
        let old = router.query;
        console.log("prev query",old)
        router.push({
            query: { ...old, type: value }
        })
    }

    const changeHandler = (event: any) => {
        setTimeout(() => {
            let as = router.query;
            router.push({ query: { ...as, search: event.target.value } })
        }, 1500)
    }
    const removeQueryParam = (param: string) => {
        const { pathname, query } = router;
        const params = new URLSearchParams(query as any);
        params.delete(param);
        router.replace({ pathname, query: params.toString() }, undefined, {
            shallow: true,
        });
    };

    const onSearch = (value: any) => {
        if (value == "") return removeQueryParam("search");
        const oldQuery = router.query;
        router.replace(
            {
                query: { ...oldQuery, search: value },
            },
            undefined,
            { shallow: true }
        );
    };
    const itemsFilter: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Button
                    type="text"
                >
                    Dates
                </Button>
            ),
            onClick: () => {
                router.push({
                    query: { ...router.query, new_filter: "dates" },
                });
            },
        },
        {
            type: "divider",
        },
        {
            key: "2",
            label: (
                <Button

                    type="text"
                >
                    Last Update
                </Button>
            ),
            onClick: () => {
                router.push({
                    query: { ...router.query, new_filter: "last_update" },
                });
            },
        },
        {
            type: "divider",
        },
        {
            key: "3",
            label: (
                <Button

                    type="text"
                >
                    Created By
                </Button>
            ),
            onClick: () => {
                router.push({
                    query: { ...router.query, new_filter: "created_by" },
                });
            }
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: 'user',
            label: 'User',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by name or email..." size="large" defaultValue={router?.query?.search ? String(router?.query?.search) : undefined} onChange={(e: any) => onSearch(e.target.value)} prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: 'process',
            label: 'Process',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by name or email..." size="large" defaultValue={router?.query?.search ? String(router?.query?.search) : undefined} onChange={(e: any) => onSearch(e.target.value)} prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    {/* <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button> */}
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
        {
            key: 'department',
            label: 'Department',
            children: <div className="tab_content">
                <Flex gap={8} className="mb-4">
                    <Input placeholder="Search by name or email..." size="large" defaultValue={router?.query?.search ? String(router?.query?.search) : undefined} onChange={(e: any) => onSearch(e.target.value)} prefix={<span className="me-1 lh-1"><HenceforthIcons.Search /></span>} />
                    {/* <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button> */}
                    <Dropdown
                        menu={{ items: itemsFilter }}
                        placement="bottomLeft"
                        arrow
                    >
                        <Button type="primary" ghost size="large" className="d-flex align-items-center" icon={<HenceforthIcons.Filter />}>Filter</Button>
                    </Dropdown>
                </Flex>
                <Table scroll={{ x: '100%' }} pagination={false} dataSource={dataSource} columns={columns} />
            </div>,
        },
    ];
    const debounceSearch = useDebounce(router.query.search, 500)
    const initDataRolseBased = async (value: any) => {

        try {
            //   setLoading(true);
            let urlSearchParam = new URLSearchParams();
            if (router.query.type) {
                urlSearchParam.set("type", String(router.query.type).toUpperCase());
            }
            urlSearchParam.set("role", String(value).toUpperCase());
            if (router.query?.new_filter) {
                urlSearchParam.set("new_filter", String(router.query.new_filter));
            }
            if (router.query.search) {
                urlSearchParam.set("search", String(router.query.search));
            }
            if (router.query.pagination) {
                urlSearchParam.set("pagination", String(Number(router.query.pagination) - 1));
            }

            urlSearchParam.set("limit", String(10));
            console.log("ururur", urlSearchParam.toString());
            //   urlSearchParam.set("filter", String(router.query.type));
            let apiRes = await henceforthApi.User.previlege(urlSearchParam.toString());
            let crr = [], shr = [], exp = [], rq = [], ad = [], processdel = [], deactive = [],userdel=[],deptdel=[];
            for (let i = 0; i < apiRes.data.length; i++) {
                crr.push(apiRes.data[i].create_process_access);
                deactive.push(apiRes.data[i].user_deactivate_access)
                shr.push(apiRes.data[i].share_process_access)
                exp.push(apiRes.data[i].export_process_access)
                rq.push(apiRes.data[i].dep_req_access)
                ad.push(apiRes.data[i].user_add_access)
                processdel.push(apiRes.data[i].delete_process_access)
                userdel.push(apiRes.data[i].user_delete_access)
                deptdel.push(apiRes?.data[i].dep_delete_access)

            }
            setListing({
                create: crr,
                share: shr,
                deactivate: deactive,
                export: exp,
                request: rq,
                add: ad,
                processDelete: processdel,
                userDelete:userdel,
                deptDelete:deptdel
            })
            setState(apiRes);
            console.log(apiRes.data, "ddddd")
            console.log(apiRes, "apapapa");
        } catch (error) {
        } finally {
            //   setLoading(false);
        }
    };

    const initData = async () => {
        debugger;
        try {
            //   setLoading(true);
            let urlSearchParam = new URLSearchParams();
            if (router.query.type) {
                urlSearchParam.set("type", String(router.query.type).toUpperCase());
            }
            if (router.query?.new_filter) {
                urlSearchParam.set("new_filter", String(router.query.new_filter).toUpperCase());
            }
            if (router.query.search) {
                urlSearchParam.set("search", String(router.query.search));
            }
            if (router.query.pagination) {
                urlSearchParam.set("pagination", String(Number(router.query.pagination) - 1));
            }

            urlSearchParam.set("limit", String(10));
            console.log("ururur", urlSearchParam.toString());
            //   urlSearchParam.set("filter", String(router.query.type));
            let apiRes = await henceforthApi.User.previlege(urlSearchParam.toString());
            let crr = [], shr = [], exp = [], rq = [], ad = [], processdel = [], deactive = [],userdel=[],deptdel=[];
            for (let i = 0; i < apiRes.data.length; i++) {
                crr.push(apiRes.data[i].create_process_access);
                deactive.push(apiRes.data[i].user_deactivate_access)
                shr.push(apiRes.data[i].share_process_access)
                exp.push(apiRes.data[i].export_process_access)
                rq.push(apiRes.data[i].dep_req_access)
                ad.push(apiRes.data[i].user_add_access)
                processdel.push(apiRes.data[i].delete_process_access)
                userdel.push(apiRes.data[i].user_delete_access)
                deptdel.push(apiRes?.data[i].dep_delete_access)

            }
            setListing({
                create: crr,
                share: shr,
                deactivate: deactive,
                export: exp,
                request: rq,
                add: ad,
                processDelete: processdel,
                userDelete:userdel,
                deptDelete:deptdel
            })

            setState(apiRes);
            console.log(apiRes.data, "ddddd")
            console.log(apiRes, "apapapa");
        } catch (error) {
        } finally {
            //   setLoading(false);
        }
    };

    const handlePagination = (page: number, pageSize: number) => {
        router.replace({
            query: { ...router.query, pagination: page, limit: pageSize }
        }, undefined, { shallow: true })
    }

    React.useEffect(() => {
        initData();
    }, [router.query.type, router.query.pagination, debounceSearch]);
    return (
        <React.Fragment>
            <section className="teammates">
                <div className="container-fluid">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Flex justify="space-between" align="center" gap={10}>
                                <TypographyTitle level={4} className="m-0">Privileges</TypographyTitle>
                            </Flex>
                        </Col>
                        {/* tabs */}
                        <Col span={24}>
                            <Tabs defaultActiveKey={String(router?.query?.type)} items={items} onChange={handleRoute} />
                        </Col>
                        <Col span={24} className="text-center mt-2">
                            <Pagination current={Number(router.query.pagination) || 0} pageSize={Number(router.query.limit) || 10} total={state?.count} hideOnSinglePage={true} onChange={handlePagination} />

                        </Col>
                    </Row>
                </div>
            </section>
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