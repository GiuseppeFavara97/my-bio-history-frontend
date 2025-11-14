'use client';

import {Switch} from "../components/ui/switch"
import { useTheme } from 'next-themes';
import {useEffect, useState} from "react";

export default function ToggleTheme () {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(theme === 'dark')
  }, [theme])

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
    setIsDark(checked)
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={isDark} onCheckedChange={handleToggle} />
      <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  )
}