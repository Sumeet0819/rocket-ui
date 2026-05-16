import React, { useState } from 'react'
import './NavBar.css'
import MenuPanel from '../MenuPanel/MenuPanel'

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Apply dark mode to document or app
    if (!isDarkMode) {
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
    <>
      <nav className="navbar">
        <div className="navbar-section navbar-left">
          <button className="menu-button" onClick={openMenu} aria-label="Menu">
            <svg className="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
            <span>Menu</span>
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
          <span className="percentage">0%</span>
        </div>
      </nav>

      <MenuPanel
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        percentage="0%"
      />
    </>
  )
}

export default NavBar