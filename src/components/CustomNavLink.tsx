import React from 'react'
import { NavLink } from 'react-router-dom'

interface ICustomNavLink {
  to: string
  mobile?: boolean
  label: string
  onClick?: () => void
}

const CustomNavLink = ({
  to,
  mobile = false,
  label,
  onClick
}: ICustomNavLink) => {
  const variant = {
    wide: 'text-xl relative h-full flex items-center border-b-2 border-b-transparent',
    mobile:
      'text-xl relative h-[40px] w-[150px] flex items-center justify-center border-b-2 border-b-transparent'
  }
  return (
    <NavLink
      to={to}
      className={mobile ? variant.mobile : variant.wide}
      onClick={onClick}
    >
      {label}
    </NavLink>
  )
}

export default CustomNavLink
