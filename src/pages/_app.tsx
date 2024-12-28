import GlobalProvider from "@/context/Provider";
import { COOKIES_USER_RAIZE_ACCESS_TOKEN, COOKIES_USER_TYPE } from "@/context/actionTypes";
import "@/styles/globals.scss";
import henceforthApi from "@/utils/henceforthApi";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import NProgress from 'nprogress';
import Head from "next/head";
import { parseCookies } from "nookies";
import logo from "@/assets/images/raize_logo.png"
import { Router } from 'next/router';
import { Fragment, ReactElement, ReactNode } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement,) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  access_token: string,
  user_info: any
  signInPrivacy: string,
  userType: string,
}
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
const MyApp = ({ Component, pageProps, ...props }: AppPropsWithLayout) => {
  const googleClientId = "283960079753-s7lis0jv2c5gdfkv6o0u89q5a5tkd0gr.apps.googleusercontent.com";
  const getLayout = Component.getLayout ?? ((page) => page)
  return <Fragment>
     <GoogleOAuthProvider clientId={googleClientId}>
    <GlobalProvider {...props}>
      <Head>
        <title>
          Raize
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Wide Selection of Music Artists." />
        <link rel="stylesheet" href="https://unpkg.com/treeflex/dist/css/treeflex.css"></link>
        <link rel="icon" href={logo.src} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
        {/* <style jsx global>{`
      * {
        font-family: ${montserrat.style.fontFamily} !important; 
      }
    `}</style> */}
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </GlobalProvider >
    </GoogleOAuthProvider>
  </Fragment>
}

MyApp.getInitialProps = async (context: any) => {
  const accessToken = parseCookies(context.ctx)[COOKIES_USER_RAIZE_ACCESS_TOKEN]
  const userType = parseCookies(context.ctx)[COOKIES_USER_TYPE]
  console.log(accessToken, 'accessToken');
  let user_Type = userType == "admin" ? "admin" : userType
  try {
    if (accessToken) {
      henceforthApi.setToken(accessToken)
      let apiRes = await henceforthApi.Auth.profile()
      // console.log(apiRes,"apooooooo");

      const user_info = { ...apiRes.data }
      return { user_info: { ...user_info, access_token: accessToken, userType:user_Type } }
    }
    return { user_info: { userType:user_Type, access_token: accessToken } }

  } catch (error: any) {
    return { user_info: { access_token: accessToken, userType:user_Type } }
  }
}

export default MyApp

