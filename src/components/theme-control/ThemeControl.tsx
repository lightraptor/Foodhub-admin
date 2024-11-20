import { Themes } from '@/defines'
import { useState } from 'react'

export const ThemeControl = () => {
  const [currentTheme, setCurrentTheme] = useState(Themes.Light)
  const changeTheme = (theme: Themes) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
  return (
    <div>
      {currentTheme === Themes.Light ? (
        <button onClick={() => changeTheme(Themes.Dark)} className='text-primary'>
          Change Theme Dark
        </button>
      ) : (
        <button onClick={() => changeTheme(Themes.Light)} className='text-primary'>
          Change Theme Light
        </button>
      )}
    </div>
  )
}
