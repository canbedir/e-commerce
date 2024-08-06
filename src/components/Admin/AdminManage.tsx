import { Product } from '@prisma/client'
import React from 'react'
import { DataTableDemo } from '../General/DataTable'
import Heading from '../General/Heading'

interface AdminManageProps{
    products: Product[]
}

const AdminManage = ({products}:AdminManageProps) => {
  return (
    <div className='w-full'>
        <Heading text='Ürünleri Yönet' center/>
        <DataTableDemo data={products} />
    </div>
  )
}

export default AdminManage