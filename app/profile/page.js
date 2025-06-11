'use client'
import SettingComp from '@/components/MobileComponents/SettingComp'
import ProfilePageComp from '@/components/Profile/ProfilePageComp'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <div className='block max-[426px]:hidden'> */}
        <ProfilePageComp />
      {/* </div> */}
      {/* <div className='hidden max-[426px]:block'>
        <SettingComp />
      </div> */}
    </div>
  )
}

export default page