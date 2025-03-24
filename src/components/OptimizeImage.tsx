import Image from 'next/image'
import React from 'react'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
interface typeProps {
    image: string,
    blurDataURL: string,
    height: number,
    width: number,
    classExtra?:string

}

const OptimizeImage = ({ image, blurDataURL, height, width,classExtra }: typeProps) => {
    return (
        <Image
            className={`object-fit-cover h-100 w-100 ${classExtra ? classExtra : ""}`}
            src={image}
            alt="Blog Image"
            width={width ?? 420}
            height={height ?? 240}
            layout="responsive" // Adjusts size based on container width
            priority={false} // Load lazily unless it's crucial
            placeholder="blur" // Uses a blurred preview
            blurDataURL={blurDataURL ?? blogImage.src} // Helps with LCP performance
            sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width ?? 420}px`} // Adaptive sizes
        />
    )
}

export default OptimizeImage