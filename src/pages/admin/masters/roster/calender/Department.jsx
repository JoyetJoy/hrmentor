import MenuHeader from '@/components/common/MenuHeader'
import React from 'react'
import RosterItemList from '@/components/sidebars/roster/Index'
import RosterCalendar from './Calender'

export default function RosterDepartment() {
  return (
    <>
      <MenuHeader menu="Menu" currentpath="Roster" />
      <div className='flex gap-2'>
  <RosterItemList/>
  <RosterCalendar/>
</div>


      
    </>
  )
}
