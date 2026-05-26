import React, { useState } from 'react';
import './Home.css';
import FlowText from '../components/FlowText/FlowText';
import { RadioGroup, Radio } from '../components/Radio/Radio';
import {
    Layout,
    Type,
    Square,
    Search,
    Bell,
    Settings,
    LogOut,
    Sparkles,
    Cpu,
    GitBranchPlus,
    Palette,
    Brush,
    Eraser,
    Scissors,
    CreditCard,
    Wallet,
    Apple,
    ArrowBigLeftDash
} from 'lucide-react';
import NavBar from '../components/NavBar/NavBar';
import logoImg from '../logo.png';

type ComponentType = 'FlowText' | 'NavBar';

const Home = () => {
    const [activeComponent, setActiveComponent] = useState<ComponentType>('FlowText');
    const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
    const [showCodeModal, setShowCodeModal] = useState(false);

    // --- FlowText State ---
    const [flowTextProps, setFlowTextProps] = useState({
        text: 'ROCKET-UI',
        bgColor: 'transparent',
        shadowColor: '#7C3AED',
        position: 'center' as any,
        smoothness: 0.6,
        intensity: 0.7
    });

    const avatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face'
    ];

    const getComponentCode = () => {
        switch (activeComponent) {
            case 'FlowText':
                return `import { FlowText } from 'rocket-ui';\n\n<FlowText \n  text="${flowTextProps.text}"\n  bgColor="${flowTextProps.bgColor}"\n  shadowColor="${flowTextProps.shadowColor}"\n  position="${flowTextProps.position}"\n  smoothness={${flowTextProps.smoothness}}\n  intensity={${flowTextProps.intensity}}\n/>`;
            case 'NavBar':
                return `import { NavBar } from 'rocket-ui';\n\n<NavBar />`;
            default:
                return '';
        }
    };

    const copySnippetCode = () => {
        navigator.clipboard.writeText(getComponentCode());
        alert('Code snippet copied to clipboard!');
    };

    const resetDemoState = () => {
        if (activeComponent === 'FlowText') {
            setFlowTextProps({
                text: 'ROCKET-UI',
                bgColor: 'transparent',
                shadowColor: '#7C3AED',
                position: 'center' as any,
                smoothness: 0.6,
                intensity: 0.7
            });
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    };

    const renderImmersiveContent = () => {
        switch (activeComponent) {
            case 'FlowText':
                return (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FlowText {...flowTextProps} />
                    </div>
                );

            case 'NavBar':
                return (
                    <div style={{ width: '100%', maxWidth: '1000px', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <NavBar />
                    </div>
                );
            default:
                return null;
        }
    };



                        return (
                        <div className="home-container">
                            <header className="top-nav">
                                <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => setViewMode('grid')}>
                                    <div className="brand-logo-box" style={{ background: 'none', boxShadow: 'none', width: 'auto', height: 'auto' }}>
                                        <img src={logoImg} alt="Rocket UI Logo" style={{ width: '32px', height: '32px', display: 'block', borderRadius: '8px' }} />
                                    </div>
                                    <span className="brand-title">ROCKET UI</span>
                                </div>
                                <div className="nav-actions">
                                    <button className="icon-button">
                                        <Search size={16} />
                                    </button>
                                    <button className="icon-button">
                                        <Bell size={16} />
                                        <span className="notification-dot"></span>
                                    </button>
                                </div>
                            </header>

                            {viewMode === 'grid' ? (
                                <div className="landing-view">
                                    <div className="hero-section">
                                        <h1 className="hero-title">ROCKET UI</h1>
                                        <p className="hero-tagline">
                                            A curated suite of modern, highly interactive UI components designed for high-performance React applications.
                                        </p>
                                    </div>

                                    <div className="components-grid">
                                        {/* FlowText Card */}
                                        <div className="micro-card" onClick={() => { setActiveComponent('FlowText'); setViewMode('detail'); }}>
                                            <div className="micro-preview-area">
                                                <span className="micro-flowtext">FLOWTEXT</span>
                                            </div>
                                            <div className="micro-card-info">
                                                <h3 className="micro-card-title">FlowText</h3>
                                                <span className="micro-card-tag">gsap</span>
                                            </div>
                                        </div>


                                        {/* Navbar Card */}
                                        <div className="micro-card" onClick={() => { setActiveComponent('NavBar'); setViewMode('detail'); }}>
                                            <div className="micro-preview-area">
                                                <div className="micro-navbar-mock">
                                                    <div className="micro-navbar-dot"></div>
                                                    <div className="micro-navbar-pill"></div>
                                                    <div className="micro-navbar-dot"></div>
                                                </div>
                                            </div>
                                            <div className="micro-card-info">
                                                <h3 className="micro-card-title">NavBar</h3>
                                                <span className="micro-card-tag">navigation</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className="detail-viewport">
                                    {/* Floating Top Bar Actions */}
                                    <div className="viewport-top-bar">
                                        {/* Left Action: Close detail mode and return to grid */}
                                        <button className="viewport-action-btn back-btn" onClick={() => setViewMode('grid')} aria-label="Return to Library Hub">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="7" height="9" rx="1"/>
                                                <rect x="14" y="3" width="7" height="5" rx="1"/>
                                                <rect x="14" y="12" width="7" height="9" rx="1"/>
                                                <rect x="3" y="16" width="7" height="5" rx="1"/>
                                            </svg>
                                        </button>

                                        {/* Right Actions */}
                                        <div className="viewport-action-pill">
                                            <button className="viewport-pill-btn" onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                                                </svg>
                                            </button>
                                            <button className="viewport-pill-btn" onClick={resetDemoState} aria-label="Reset demo state">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                                                </svg>
                                            </button>
                                            <button className={`viewport-pill-btn ${showCodeModal ? 'active' : ''}`} onClick={() => setShowCodeModal(!showCodeModal)} aria-label="Toggle Code Snippet">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                                                </svg>
                                            </button>
                                            <button className="viewport-pill-btn" onClick={copySnippetCode} aria-label="Copy Code Snippet">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Center Live Component Canvas */}
                                    <div className="viewport-canvas">
                                        {renderImmersiveContent()}
                                    </div>

                                    {/* Floating Code Snippet Overlay */}
                                    {showCodeModal && (
                                        <div className="code-overlay-card">
                                            <div className="code-overlay-header">
                                                <span>{activeComponent} Code Snippet</span>
                                                <button className="close-code-btn" onClick={() => setShowCodeModal(false)}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <pre className="code-overlay-pre">
                                                <code>{getComponentCode()}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        );
};

                        export default Home;