import { Flex, TypographyText } from '@/lib/AntRegistry'
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import React from 'react'
import { BUCKET_ROOT, CURRENCY } from '@/utils/crumbApis'

const CheckoutCartListCompo = (props:any) => {
    console.log(props,'prooocheckout');
    
    return (
        <div className='mb-3'>
            <Flex align='center' justify='space-between'>

                <Flex gap={16} align='center'>

                    <div className='cart-image-checkout'>
                        <img onError={(e:any) => e.target.src = productImage.src} src={props?.product?.feature_image ? `${BUCKET_ROOT}${props?.product?.feature_image}` : productImage.src} />
                    </div>
                    <div>
                        <TypographyText>{props?.product?.name}</TypographyText>
                        <br/>
                        <TypographyText className='text-muted'>{props?.grid_size} / 500g</TypographyText>
                    </div>
                </Flex>
                <TypographyText>{`${CURRENCY}${Number(props?.quantity * props?.product?.customer_buying_price).toFixed(2)}`}</TypographyText>
            </Flex>
        </div>
    )
}

export default CheckoutCartListCompo