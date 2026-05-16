import React, { useState } from 'react';
import './Home.css';
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarItem,
    SidebarFooter
} from '../components/Sidebar/Sidebar';
import { ComponentPlayground } from '../components/Docs/ComponentPlayground';
import FlowText from '../components/FlowText/FlowText';
import { SelectionCard } from '../components/SelectionCard/SelectionCard';
import { PlanCard } from '../components/PlanCard/PlanCard';
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

type ComponentType = 'FlowText' | 'Sidebar' | 'SelectionCard' | 'PlanCard' | 'NavBar';

const Home = () => {
    const [activeComponent, setActiveComponent] = useState<ComponentType>('FlowText');

    // --- FlowText State ---
    const [flowTextProps, setFlowTextProps] = useState({
        text: 'FLOWTEXT',
        bgColor: '#000000',
        shadowColor: '#F4793A',
        position: 'center' as any,
        smoothness: 0.6,
        intensity: 0.7
    });

    // --- Sidebar State ---

    // --- SelectionCard State ---
    const [selectedCard, setSelectedCard] = useState('palette');

    // --- PlanCard State ---
    const [selectedPlan, setSelectedPlan] = useState('plus');

    const renderContent = () => {
        switch (activeComponent) {
            case 'FlowText':
                return (
                    <ComponentPlayground
                        title="FlowText"
                        description="A premium animated text component that reacts to mouse position with smooth scaling effects."
                        demo={
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FlowText {...flowTextProps} />
                            </div>
                        }
                        controls={[
                            { label: 'Text Content', type: 'text', value: flowTextProps.text, onChange: (v) => setFlowTextProps(p => ({ ...p, text: v })) },
                            { label: 'Background Color', type: 'color', value: flowTextProps.bgColor, onChange: (v) => setFlowTextProps(p => ({ ...p, bgColor: v })) },
                            { label: 'Shadow Color', type: 'color', value: flowTextProps.shadowColor, onChange: (v) => setFlowTextProps(p => ({ ...p, shadowColor: v })) },
                            { label: 'Position', type: 'select', value: flowTextProps.position, options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'], onChange: (v) => setFlowTextProps(p => ({ ...p, position: v })) },
                            { label: 'Smoothness', type: 'range', value: flowTextProps.smoothness, min: 0, max: 1, step: 0.1, onChange: (v) => setFlowTextProps(p => ({ ...p, smoothness: v })) },
                            { label: 'Intensity', type: 'range', value: flowTextProps.intensity, min: 0, max: 1, step: 0.1, onChange: (v) => setFlowTextProps(p => ({ ...p, intensity: v })) }
                        ]}
                        code={`import { FlowText } from 'my-ui-library';\n\n<FlowText \n  text="${flowTextProps.text}"\n  bgColor="${flowTextProps.bgColor}"\n  shadowColor="${flowTextProps.shadowColor}"\n  position="${flowTextProps.position}"\n  smoothness={${flowTextProps.smoothness}}\n  intensity={${flowTextProps.intensity}}\n/>`}
                        dependencies={['gsap', '@gsap/react']}
                    />
                );
            case 'Sidebar':
                return (
                    <ComponentPlayground
                        title="Sidebar"
                        description="A highly customizable, compound sidebar component with support for collapsing, grouping, and active states."
                        demo={
                            <div style={{ width: '100%', minHeight: '600px', display: 'flex', background: 'radial-gradient(circle at top right, #0d3d3d, #000000)', borderRadius: '1rem', overflow: 'hidden' }}>
                                <Sidebar>
                                    <SidebarHeader>
                                        <div className="sidebar-logo">
                                            <Sparkles size={24} />
                                        </div>
                                    </SidebarHeader>
                                    <SidebarContent>
                                        <SidebarItem icon={<Layout size={20} />} label="Home" />
                                        <SidebarItem icon={<Palette size={20} />} label="Measure" />
                                        <SidebarItem icon={<Type size={20} />} label="Analyze" />
                                        <SidebarItem icon={<Square size={20} />} label="Reduce" active />
                                        <SidebarItem icon={<Bell size={20} />} label="Report" />
                                    </SidebarContent>
                                    <SidebarFooter>
                                        <div style={{ padding: '0 0.5rem', opacity: 0.5, fontSize: '10px', color: 'white' }}>V 2.0.4</div>
                                    </SidebarFooter>
                                </Sidebar>
                                <div style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifySelf: 'center', color: 'var(--text-secondary)' }}>
                                    <p>Main viewport rendering in dark mode.</p>
                                </div>
                            </div>
                        }
                        controls={[]}
                        code={`import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from 'my-ui-library';\n\n<Sidebar>\n  <SidebarHeader>Logo</SidebarHeader>\n  <SidebarContent>\n    <SidebarItem icon={<Home />} label="Home" active />\n    <SidebarItem icon={<Settings />} label="Settings" />\n  </SidebarContent>\n</Sidebar>`}
                        dependencies={['lucide-react']}
                    />
                );
            case 'SelectionCard':
                return (
                    <ComponentPlayground
                        title="SelectionCard"
                        description="A premium card component for selection states, supporting icons, subtitles, and radio/checkbox indicators."
                        demo={
                            <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '3rem', alignContent: 'start' }}>
                                <SelectionCard
                                    title="Palette"
                                    icon={<Palette size={20} />}
                                    selected={selectedCard === 'palette'}
                                    onClick={() => setSelectedCard('palette')}
                                />
                                <SelectionCard
                                    title="Brush"
                                    icon={<Brush size={20} />}
                                    selected={selectedCard === 'brush'}
                                    onClick={() => setSelectedCard('brush')}
                                />
                                <SelectionCard
                                    title="Eraser"
                                    icon={<Eraser size={20} />}
                                    selected={selectedCard === 'eraser'}
                                    onClick={() => setSelectedCard('eraser')}
                                />
                                <SelectionCard
                                    title="Scissors"
                                    icon={<Scissors size={20} />}
                                    selected={selectedCard === 'scissors'}
                                    onClick={() => setSelectedCard('scissors')}
                                />
                                <SelectionCard
                                    title="Card"
                                    subtitle="Sublabel"
                                    description="You can use this card with a label and description."
                                    icon={<CreditCard size={20} />}
                                    selected={selectedCard === 'card'}
                                    onClick={() => setSelectedCard('card')}
                                    className="full-width"
                                    size="lg"
                                />
                            </div>
                        }
                        controls={[]}
                        code={`import { SelectionCard } from 'my-ui-library';\n\n<SelectionCard \n  title="Palette" \n  icon={<Palette size={20} />} \n  selected={true}\n/>`}
                        dependencies={['lucide-react']}
                    />
                );
            case 'PlanCard':
                return (
                    <ComponentPlayground
                        title="PlanCard"
                        description="Row-based pricing cards with custom selection indicators and 'Popular' badge support."
                        demo={
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem' }}>
                                <div style={{ width: '100%', maxWidth: '500px' }}>
                                    <PlanCard
                                        name="Hobby"
                                        price="$9"
                                        selected={selectedPlan === 'hobby'}
                                        onClick={() => setSelectedPlan('hobby')}
                                    />
                                    <PlanCard
                                        name="Plus"
                                        price="$29"
                                        popular
                                        selected={selectedPlan === 'plus'}
                                        onClick={() => setSelectedPlan('plus')}
                                    />
                                    <PlanCard
                                        name="Team"
                                        price="$49"
                                        selected={selectedPlan === 'team'}
                                        onClick={() => setSelectedPlan('team')}
                                    />
                                    <PlanCard
                                        name="Enterprise"
                                        price="Custom"
                                        period=""
                                        selected={selectedPlan === 'enterprise'}
                                        onClick={() => setSelectedPlan('enterprise')}
                                    />
                                </div>
                            </div>
                        }
                        controls={[]}
                        code={`import { PlanCard } from 'my-ui-library';\n\n<PlanCard \n  name="Plus" \n  price="$29" \n  popular={true}\n  selected={true}\n/>`}
                        dependencies={['lucide-react']}
                    />
                );
            case 'NavBar':
                return (
                    <ComponentPlayground
                        title="NavBar"
                        description="A responsive navigation bar component with branding, search, and notification features."
                        demo={
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <NavBar />
                            </div>
                        }
                        controls={[]}
                        code={`import { NavBar } from 'my-ui-library';\n\n<NavBar />`}
                        dependencies={['lucide-react']}
                            />
                        );

                        default:
                        return null;
        }
    };

                        return (
                        <div className="home-container">
                            <header className="top-nav">
                                <div className="nav-brand">
                                    <div className="brand-logo-box">
                                        <Cpu size={18} strokeWidth={2.5} />
                                    </div>
                                    <span className="brand-title">LIBRARY HUB</span>
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

                            <div className="main-layout">
                                <Sidebar>
                                    <SidebarContent>
                                        <SidebarGroup label="Animation">
                                            <SidebarItem
                                                icon={<Type size={18} />}
                                                label="FlowText"
                                                active={activeComponent === 'FlowText'}
                                                onClick={() => setActiveComponent('FlowText')}
                                            />
                                        </SidebarGroup>

                                        <SidebarGroup label="Layout">
                                            <SidebarItem
                                                icon={<Square size={18} />}
                                                label="Sidebar"
                                                active={activeComponent === 'Sidebar'}
                                                onClick={() => setActiveComponent('Sidebar')}
                                            />
                                            <SidebarItem
                                                icon={<ArrowBigLeftDash size={18}/>}
                                                label="Navbar"
                                                active={activeComponent === 'NavBar'}
                                                onClick={() => setActiveComponent('NavBar')}
                                            />
                                        </SidebarGroup>

                                        <SidebarGroup label="Selection UI">
                                            <SidebarItem
                                                icon={<Palette size={18} />}
                                                label="SelectionCard"
                                                active={activeComponent === 'SelectionCard'}
                                                onClick={() => setActiveComponent('SelectionCard')}
                                            />
                                            <SidebarItem
                                                icon={<CreditCard size={18} />}
                                                label="PlanCard"
                                                active={activeComponent === 'PlanCard'}
                                                onClick={() => setActiveComponent('PlanCard')}
                                            />
                                        </SidebarGroup>

                                        <SidebarGroup label="Development">
                                            <SidebarItem
                                                icon={<GitBranchPlus size={18} />}
                                                label="GitHub"
                                                href="https://github.com"
                                            />
                                        </SidebarGroup>
                                    </SidebarContent>
                                </Sidebar>

                                <main className="content-pane">
                                    <div className="page-header">
                                        <h1 className="page-title">{activeComponent}</h1>
                                        <p className="page-description">
                                            {activeComponent === 'FlowText' && "A premium animated text component that reacts to mouse position with smooth scaling effects."}
                                            {activeComponent === 'Sidebar' && "A highly customizable, compound sidebar component with support for collapsing, grouping, and active states."}
                                            {activeComponent === 'SelectionCard' && "Modern, interactive selection cards for forms and settings."}
                                            {activeComponent === 'PlanCard' && "Pricing and subscription cards with popular/selected state highlights."}
                                        </p>
                                    </div>
                                    <div className="component-showcase-wrapper">
                                        {renderContent()}
                                    </div>
                                </main>
                            </div>
                        </div>
                        );
};

                        export default Home;