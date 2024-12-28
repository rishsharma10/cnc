import { COOKIES_USER_RAIZE_ACCESS_TOKEN } from '@/context/actionTypes';
import henceforthApi from '@/utils/henceforthApi';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Fragment, ReactNode } from 'react'
const CustomerInvoicePdf = dynamic(() => import('@/components/common/customer-invoice/customer-invoice-pdf'), {
  ssr: false,
})

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const Invoice: Page = (props: any) => {
    console.log(props,"CustomerInvoicePdfCustomerInvoicePdf");
    
  return <Fragment>
    <Head>
      <title>{'Download Process'}</title>
      <meta name="description" content="Homepage desc" />
    </Head>
    <CustomerInvoicePdf {...props} />
  </Fragment>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let cookies = context.req.cookies
    let query = context.query
    let access_token = context.query?.access_token
    let acess_tokenGet = access_token ?? cookies[COOKIES_USER_RAIZE_ACCESS_TOKEN]
    console.log("ogu",query)
  if (acess_tokenGet) {
    henceforthApi.setToken(String(acess_tokenGet))
    try {
      let apiRes = await henceforthApi.Process.getById(query?._id as string)
      const data = Array.isArray(apiRes?.data) ? apiRes.data[0] : apiRes
      return { props: { ...data } }
    } catch (error) {
      return {
        redirect: {
          destination: '/profile/orders/stores',
          permanent: false,
        },
      }
    }
  } else {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
}
Invoice.displayName = "Home"

export default Invoice
