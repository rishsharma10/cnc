import { Badge, Flex, TypographyText } from '@/lib/AntRegistry'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import React, { Fragment, useContext } from 'react'
import { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'
import { formatString } from '@/utils/crumbValidation'
import { GlobalContext } from '@/context/Provider'

const CheckoutCartListCompo = (props: any) => {
    const { userInfo } = useContext(GlobalContext)
    console.log(props, 'prooocheckout');

    return (
        <div className='mb-3'>
            <Flex align='center' justify='space-between'>

                <Flex gap={16} align='center'>
                    <Badge count={props?.quantity}>
                        <div className='cart-image-checkout'>
                            <img onError={(e: any) => e.target.src = productImage.src} src={props?.product?.feature_image ? `${BUCKET_ROOT}${props?.product?.feature_image}` : productImage.src} />
                        </div>
                    </Badge>
                    <div>
                        <span className='fs-16 fw-bold'>{props?.product?.name}</span>
                        <br />
                        {(userInfo?.access_token && props?.is_variant) ? <Fragment>

                            {(props?.variant?.attribute_name) ?
                                <TypographyText className='text-muted fs-14 fw-semibold me-1 text-capitalize'>{props?.variant?.attribute_name}</TypographyText> : ""}
                            /
                            {(props?.variant?.variant_name) ?
                                <TypographyText className='text-muted fs-14 fw-semibold mx-1 text-capitalize'>{props?.variant?.variant_name}</TypographyText> : ""}
                        </Fragment> : props?.is_variant ?
                            <Fragment>
                                {(props?.variant?.attribute_name) ?
                                    <TypographyText className='text-muted fs-14 fw-semibold me-1 text-capitalize'>{props?.variant?.attribute_name}</TypographyText> : ""}
                                /

                                {(props?.variant?.variant_name) ?
                                    <TypographyText className='text-muted fs-14 fw-semibold mx-1 text-capitalize'>{props?.variant?.variant_name}</TypographyText> : ""}
                            </Fragment> : ""}
                    </div>
                </Flex>
                <TypographyText className='fw-bold'>{`${CURRENCY}${Number(props?.quantity * props?.price).toFixed(2)}`}</TypographyText>
            </Flex>
        </div>
    )
}

export default CheckoutCartListCompo