import { Button, Flex } from '@/lib/AntRegistry'
import React from 'react'

interface typeProps {
    handleIncDec:any
    quantity:number
    pid:number
    index?:number
}
const CartCountCompo = ({handleIncDec,quantity,pid,index}:typeProps) => {
  return (
    <Flex className='quantity-counter'><Flex className='p-3 counter-div'>{quantity}</Flex><Flex className='flex-column h-100'><Button onClick={() => handleIncDec(pid,'INC',1,index)}>+</Button><Button disabled={quantity <= 1} onClick={() =>  handleIncDec(pid,'DEC',1,0)}>-</Button></Flex></Flex>
  )
}

export default CartCountCompo