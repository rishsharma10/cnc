import { ProductDetails } from '@/interface/product/ProductDetails'
import { Button, Col } from '@/lib/AntRegistry'
import { stringReplace } from '@/utils/crumbValidation'
import productImage from '@/assets/brand-guide/product-img-5.png'
import Link from 'next/link'
import React from 'react'
import { CURRENCY } from '@/utils/crumbApis'
interface newDetails extends ProductDetails {
    class: string;
  }

const ProductCard = (props: newDetails) => {
    return (
        <Col span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <Link href={`/product/${stringReplace(props.name)}/${props.id}`}>
            <div className="cart-card">
                <div className="cart-image text-center">
                    <div className={props?.class ?props?.class : "product-image"}>
                        <img src={props?.thumb_url ?? productImage.src} alt="error" />

                    </div>
                    {/* <div className="cart-overlay">
                        <Link href={`/product/${stringReplace(props.name)}/${props.id}`}><Button type="primary" className="px-5 py-3 h-auto">Add To Cart</Button></Link>
                    </div> */}
                </div>
                <div className="cart-content mt-4 text-center">
                    <Link href={`/product/${stringReplace(props.name)}/${props.id}`}><h4>{props?.name ?? 'N/A'}</h4></Link>
                    <p className="text-secondary fs-6 m-0">{CURRENCY}{Number(props?.customer_buying_price).toFixed(2)}</p>
                </div>
            </div>
            </Link>
        </Col>
    )
}

export default ProductCard