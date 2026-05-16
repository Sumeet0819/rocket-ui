import React from 'react'
import './MenuPanel.css'

interface MenuPanelProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  percentage: string
}

const MenuPanel: React.FC<MenuPanelProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
  percentage,
}) => {
  if (!isOpen) return null

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="menu-header">
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
          <button
            className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
          >
            <svg className="theme-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
          <span className="percentage">{percentage}</span>
        </div>

        {/* Content */}
        <div className="menu-content">
          {/* Menu Section */}
          <div className="menu-section">
            <div className="menu-section-label">Menu</div>
            <nav className="menu-items">
              <a href="#" className="menu-link">
                PDP's
              </a>
              <a href="#" className="menu-link">
                Products
              </a>
              <a href="#" className="menu-link">
                Videos
              </a>
              <a href="#" className="menu-link">
                Our features
              </a>
            </nav>
          </div>

          {/* Divider */}
          <div className="menu-divider"></div>

          {/* Other Section */}
          <div className="menu-section">
            <div className="menu-section-label">Other</div>
            <nav className="menu-items">
              <a href="#" className="menu-link">
                Privacy Policy
              </a>
              <a href="#" className="menu-link">
                Terms of Service
              </a>
              <a href="#" className="menu-link">
                Cookie Policy
              </a>
            </nav>
          </div>

          {/* Divider */}
          <div className="menu-divider"></div>

          {/* Social Media Section */}
          <div className="menu-section">
            <div className="menu-section-label">Social media</div>
            <nav className="menu-items">
              <a href="#" className="menu-link">
                Instagram
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPanel
