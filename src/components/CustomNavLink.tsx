import React from 'react'
import { Link } from 'react-router-dom'
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
    wide: 'text-xl relative h-full flex items-center border-b-2 border-b-transparent text-slate-700',
    mobile:
      'text-xl relative h-[40px] w-[150px] flex items-center justify-center border-b-2 border-b-transparent text-slate-700'
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
