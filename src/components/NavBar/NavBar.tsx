import React, { useState, useEffect } from 'react'
import './NavBar.css'
import MenuPanel from '../MenuPanel/MenuPanel'

interface NavBarProps {
  initialDark?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ initialDark = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(initialDark)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target === document 
        ? document.documentElement 
        : (event.target as HTMLElement || document.documentElement)
      
      const scrollTop = target.scrollTop || 0
      const scrollHeight = target.scrollHeight || 0
      const clientHeight = target.clientHeight || 0
      
      const scrollableHeight = scrollHeight - clientHeight
      if (scrollableHeight > 0) {
        const percentage = Math.round((scrollTop / scrollableHeight) * 100)
        setScrollPercentage(percentage)
      } else {
        setScrollPercentage(0)
      }
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [])

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode
    setIsDarkMode(nextMode)
    // Apply dark mode to document or app
    if (nextMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <div className="navbar-section navbar-left">
        <button 
          className="menu-button" 
          onClick={isMenuOpen ? closeMenu : openMenu} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
              <span>Close</span>
            </>
          ) : (
            <>
              <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
              <span>Menu</span>
            </>
          )}
        </button>
      </div>

      <div className="navbar-section navbar-center">
        <button 
          className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <svg className="theme-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      <div className="navbar-section navbar-right">
        <span className="percentage">{scrollPercentage}%</span>
      </div>

      <MenuPanel
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        percentage={`${scrollPercentage}%`}
      />
    </nav>
  )
}

export default NavBar