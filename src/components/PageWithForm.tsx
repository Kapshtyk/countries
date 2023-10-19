import React from 'react'

interface IPageWithForm {
  children: React.ReactNode
}

const PageWithForm = ({ children }: IPageWithForm) => {
  return (
    <div className="w-[350px] border border-[var(--main-color-200)] bg-[var(--neutral)] rounded-md shadow-md m-auto p-3 mt-2">
      {children}
    </div>
  )
}

export default PageWithForm
