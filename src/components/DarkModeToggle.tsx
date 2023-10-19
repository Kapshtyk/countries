import React from 'react'

import { Switch } from '@/ui'

const DarkModeToggle = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  )
  const html = document.querySelector('html')

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
      html?.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
      html?.classList.remove('dark')
    }
  }

  return (
    <div className="flex items-center gap-2 justify-between font-light text-foreground/50">
      <span>light</span>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => handleThemeChange()}
      />
      <span>dark</span>
    </div>
  )
}

export default DarkModeToggle
