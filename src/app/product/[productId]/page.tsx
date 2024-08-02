import DetailClient from '@/components/Detail/DetailClient'
import { products } from '@/utils/Products'
import React from 'react'

interface DetailProps{
    productId? : string,
}

const Detail = ({params}:{params:DetailProps}) => {

    const {productId} = params
    const product = products.find(product => product.id == productId)


  return (
    <div>
        <DetailClient product={product}/>
    </div>
  )
}

export default Detail