import React, { createContext, useContext, useState, ReactNode } from 'react';
import './Sidebar.css';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

// --- Context ---
interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// --- Sub-components ---

interface SidebarHeaderProps {
  children?: ReactNode;
  showToggle?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children }) => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-logo">
        {children}
      </div>
    </div>
  );
};

export const SidebarContent: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="sidebar-content">{children}</div>
);

interface SidebarGroupProps {
  label?: string;
  children: ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ label, children }) => (
  <div className="sidebar-group">
    {label && <div className="sidebar-group-label">{label}</div>}
    {children}
  </div>
);

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, href }) => {
  const { collapsed } = useSidebar();

  const content = (
    <>
      <span className="sidebar-item-icon">{icon}</span>
      <span className="sidebar-item-label">{label}</span>
    </>
  );

  const className = `sidebar-item ${active ? 'active' : ''}`;

  if (href) {
    return (
      <a href={href} className={className} data-label={label} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} data-label={label} onClick={onClick}>
      {content}
    </button>
  );
};

export const SidebarFooter: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="sidebar-footer">{children}</div>
);

// --- Main Component ---

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  className = ""
}) => {
  const [isMobile] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed: false, setCollapsed: () => {}, isMobile }}>
      <aside className={`sidebar-root ${className}`}>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
