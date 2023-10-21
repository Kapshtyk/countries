import React, { useState } from 'react'

import { Switch } from '@/ui'

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')
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
    <div
      data-test="dark-mode-toggle"
      className="flex items-center gap-2 justify-between font-light text-foreground/50"
    >
      <span>light</span>
      <Switch
        checked={theme === 'dark'}
        aria-description="toggle dark mode"
        onCheckedChange={() => handleThemeChange()}
      />
      <span>dark</span>
    </div>
  )
}

export default DarkModeToggle
