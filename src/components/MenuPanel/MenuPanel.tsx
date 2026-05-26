import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
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
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isOpen) {
        // --- ENTER ANIMATION ---
        // 1. Overlay fade-in
        gsap.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power2.out',
        })

        // 2. Panel grow downwards (with custom springy elasticity)
        gsap.fromTo(
          panelRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: 'center top' },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.75)',
            clearProps: 'transform,opacity',
          }
        )

        // 3. Stagger section titles and links (with smooth overshoot ease)
        const staggerItems = gsap.utils.toArray<HTMLElement>(
          '.menu-section-label, .menu-link, .menu-divider'
        )
        gsap.fromTo(
          staggerItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: 'back.out(1.5)',
            delay: 0.15,
            clearProps: 'transform,opacity',
          }
        )
      } else {
        // --- EXIT ANIMATION ---
        // 1. Panel collapse upwards
        gsap.to(panelRef.current, {
          scaleY: 0,
          opacity: 0,
          transformOrigin: 'center top',
          duration: 0.35,
          ease: 'power2.inOut',
        })

        // 2. Overlay fade-out
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        })
      }
    },
    { dependencies: [isOpen], scope: overlayRef }
  )

  return (
    <div
      className={`menu-overlay ${isDarkMode ? 'dark' : ''}`}
      ref={overlayRef}
      onClick={onClose}
    >
      <div
        className={`menu-panel ${isDarkMode ? 'dark' : ''}`}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
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
