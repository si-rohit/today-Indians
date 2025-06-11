import SettingComp from '@/components/MobileComponents/SettingComp'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='hidden max-[426px]:block'>
            <SettingComp />
        </div>
    </div>
  )
}

export default page