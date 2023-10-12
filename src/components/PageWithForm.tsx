import React from 'react'

interface IPageWithForm {
  children: React.ReactNode
}

const PageWithForm = ({ children }: IPageWithForm) => {
  return (
    <div className="w-[350px] border border-sky-200 bg-white rounded-md shadow-md m-auto p-3 mt-2">
      {children}
    </div>
  )
}

export default PageWithForm
