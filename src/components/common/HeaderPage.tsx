import React,{useContext} from 'react'
import logo from '@/assets/brand-guide/logo.png';
import { Button, Dropdown } from '@/lib/AntRegistry';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { GlobalContext } from '@/context/Provider';
import { Avatar, Badge, MenuProps } from 'antd';
import profile from "@/assets/images/profile.png";
import crumbApi from '@/utils/crumbApis';
const HeaderPage = () => {
    const {userInfo,logout,cartData} = useContext(GlobalContext)
    console.log(userInfo,'userinfoooooooo');


    const items: MenuProps["items"] = [
        // {
        //   key: "2",
        //   label: (
        //     <Link href={`/profile`} className="fw-medium">
        //       Profile
        //     </Link>
        //   ),
        // },
        // {
        //   key: "1",
        //   label: (
        //     <Link href={`/address`} className="fw-medium">
        //       Address
        //     </Link>
        //   ),
        // },
        {
          key: "3",
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
    

    const router = useRouter()
    return (
        <nav className="navbar navbar-expand-lg common-bg">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img src={logo.src} alt="error" height={60} width={60} />
                </Link>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 ms-auto gap-2 gap-lg-4 mb-lg-0 align-items-center">
                        <Link className="nav-item"  href="/" legacyBehavior>
                            <a className="nav-link active" aria-current="page">Home</a>
                        </Link>
                        <Link className="nav-item"  href="/products/search/1/1" legacyBehavior>
                            <a className="nav-link">Shop</a>
                        </Link>
                        <Link className="nav-item"  href="/about" legacyBehavior>
                            <a className="nav-link">About us</a>
                        </Link>
                        <Link className="nav-item"  href="/our-story" legacyBehavior>
                            <a className="nav-link">Our story</a>
                        </Link>
                        <Link className="nav-item"  href="/our-blog" legacyBehavior>
                            <a className="nav-link">Our Blog</a>
                        </Link>
                        <Link className="nav-item"  href="/pages/contact-us" legacyBehavior>
                            <a className="nav-link">Contact us</a>
                        </Link>
                        <Badge count={cartData.count} showZero={false}>
                        <Link className="nav-item" href="/viewcart" legacyBehavior>
                            <a className="nav-link" >Cart</a>
                        </Link>
                        </Badge>
                        {/* <li className="nav-item">
                            <a className="nav-link " href="#">Portofolio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Element</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link " href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                        </li>
                        {/* <Link className="nav-item bg-white"  href="/login"> */}
                        {!userInfo?.access_token ? <Link href={`/login`}><Button className='text-white' type='primary'>SIGN IN</Button></Link> :  <Dropdown menu={{ items }} placement="bottomLeft">
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
                </Dropdown> }
                        {/* </Link> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HeaderPage