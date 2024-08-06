import { getCurrentUser } from '@/app/actions/getCurrentUser'
import CreateForm from '@/components/Admin/CreateForm'
import WarningText from '@/components/WarningText'
import React from 'react'

const AdminCreatePage = async() => {
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role !== "ADMIN"){
    return (
      <WarningText text='Giriş izniniz yok'/>
    )
  }
  return (
    <div className='flex w-full justify-center mt-5'>
      <CreateForm/>
    </div>
  )
}

export default AdminCreatePage