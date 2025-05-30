import React, { useContext, useState } from "react";
import logo from "@/assets/brand-guide/logo.png";
import { Button, Drawer, Dropdown, Flex } from "@/lib/AntRegistry";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import { Avatar, Badge, Grid, MenuProps } from "antd";
import profile from "@/assets/images/profile.png";
import crumbApi from "@/utils/crumbApis";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const HeaderSmall = () => {
  const screens = Grid.useBreakpoint();
  const { userInfo, logout, cartData, collapsed, setCollapsed, category } =
    useContext(GlobalContext);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="text"
          onClick={() => router.push(`/account/profile`)}
          size="small"
          className="p-0 fw-medium bg-transparent rounded-0 h-100"
        >
          Profile
        </Button>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <Button
          type="text"
          onClick={() => router.push(`/account/orders`)}
          size="small"
          className="p-0 fw-medium bg-transparent rounded-0 h-100"
        >
          Orders
        </Button>
      ),
    },
    { type: "divider" },
    {
      key: "3",
      label: (
        <Button
          type="text"
          onClick={() => router.push(`/account/address/update`)}
          size="small"
          className="p-0 fw-medium bg-transparent rounded-0 h-100"
        >
          Address
        </Button>
      ),
    },
    { type: "divider" },
    {
      key: "4",
      label: (
        <Button
          type="text"
          onClick={() => logout()}
          size="small"
          className="p-0 fw-medium bg-transparent rounded-0 h-100"
        >
          Log Out
        </Button>
      ),
    },
  ];

  const router = useRouter();

  const items1: any =
    Array.isArray(category) &&
    category.map((res: any) => {
      return {
        key: "1",
        label: (
          <Link
            className="nav-item"
            href={`/products/search/${res.id}/1?sub_category=all`}
            legacyBehavior
          >
            {String(res?.name)?.toLocaleUpperCase()}
          </Link>
        ),
      };
    });

  return (
    <nav className="navbar py-3 navbar-expand-lg ">
      <div className="container-fluid">
        <Flex gap={4} align="center">
          <Link className="navbar-brand p-0" href="/">
            <img src={logo.src} alt="error" height={50} width={50} />
          </Link>
        </Flex>
        <Flex gap={20} align="center">
          <Link className="nav-item" href="/search" legacyBehavior>
            <a className="nav-link " href="/search">
              <SearchOutlined />
            </a>
          </Link>
          <Badge count={cartData.count} showZero={false}>
            <Link className="nav-item" href="/viewcart" legacyBehavior>
              <a className="nav-link">
                <ShoppingCartOutlined />
              </a>
            </Link>
          </Badge>

          <div onClick={() => setCollapsed(!collapsed)}>
            <button
              className="navbar-toggler bg-light p-0 border-0 shadow-none fs-6"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </Flex>
        {/* <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
        <Drawer
          open={collapsed}
          onClose={() => setCollapsed(!collapsed)}
          placement="left"
          width={250}
          closable={false}
        >
          <Flex className="h-100 flex-column " justify="start" align="start">
            <div className="d-flex flex-column gap-3">
              {!userInfo?.access_token ? (
                <Link href={`/login`}>
                  <Button className="text-white" type="primary" size="small">
                    SIGN IN
                  </Button>
                </Link>
              ) : (
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button type="text" className="h-100 p-0" shape="circle">
                    <Avatar
                      src={
                        userInfo?.profile_pic
                          ? crumbApi.FILES.imageSmall(userInfo?.profile_pic)
                          : profile.src
                      }
                      size={40}
                    />
                    <div>
                      <div>{userInfo?.first_name} {userInfo?.last_name}</div>
                      <div className="text-start">{userInfo?.loyalty} Points</div>
                    </div>
                  </Button>
                </Dropdown>
              )}
              {userInfo?.access_token && (
                <>
                  {" "}
                  <Link
                    className="nav-item"
                    href="/account/profile"
                    legacyBehavior
                  >
                    Profile
                  </Link>
                  <Link
                    className="nav-item"
                    href="/account/orders"
                    legacyBehavior
                  >
                    Orders
                  </Link>
                  <Link
                    className="nav-item"
                    href="/account/address/update"
                    legacyBehavior
                  >
                    Saved Address
                  </Link>
                </>
              )}
              <Link className="nav-item" href="/" legacyBehavior>
                Home
              </Link>
              {/* <Link className="nav-item my-2 d-inline-block" href="/products/search/all/1" legacyBehavior>
                                Shop
                            </Link> */}
              <Dropdown menu={{ items: items1 }} placement="bottom">
                <a className="nav-link" role="button">
                  Shop
                </a>
              </Dropdown>
              <Link className="nav-item" href="/about" legacyBehavior>
                About us
              </Link>
              <Link className="nav-item" href="/our-story" legacyBehavior>
                Our story
              </Link>
              <Link className="nav-item my-2" href="/blog" legacyBehavior>
                Blog
              </Link>
              <Link
                className="nav-item"
                href="/pages/contact-us"
                legacyBehavior
              >
                Contact us
              </Link>

              {/* {!userInfo?.access_token ? <Link href={`/login`}><Button size='small' className='text-white' type='primary'>SIGN IN</Button></Link> : ""} */}
            </div>
            {userInfo?.access_token ? (
              <Button
                onClick={() => logout()}
                type="text"
                className="p-0 text-capitalize text-danger mt-auto h-auto"
              >
                Logout
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Drawer>
        {/* {!userInfo?.access_token ? <Link href={`/login`}><Button className='text-white' type='primary'>SIGN IN</Button></Link> :  <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button type="text" className="h-100 p-0" shape="circle">
                    <Avatar
                      src={
                        userInfo?.profile_pic
                          ? crumbApi.FILES.imageSmall(
                            userInfo?.profile_pic
                          )
                          : profile.src
                      }
                      size={40}
                    />
                    {userInfo?.first_name}
                  </Button>
                </Dropdown> } */}
      </div>
    </nav>
  );
};

export default HeaderSmall;
