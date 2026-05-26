import React, { useRef } from 'react'
import './FlowText.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface FlowTextProps {
    /** The text string to display */
    text: string;
    /** Background color of the container */
    bgColor?: string;
    /** Smoothness of the animation (0 to 1). Default is 0.5 */
    smoothness?: number;
    /** Intensity/Fastness of the scaling effect (0 to 1). Default is 0.5 */
    intensity?: number;
    /** Position of the text within the container */
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Color of the text shadow */
    shadowColor?: string;
    /** Optional className for the container */
    className?: string;
}

/**
 * FlowText - A premium animated text component that reacts to mouse position.
 */
const FlowText: React.FC<FlowTextProps> = ({
    text = "FOLLOW ART",
    bgColor = "transparent",
    smoothness = 0.5,
    intensity = 0.5,
    shadowColor = "#7C3AED",
    position = "center",
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Map props to GSAP values
    const duration = 0.3 + (smoothness * 1.2); // Range: 0.3s to 1.5s
    const scaleMultiplier = 0.5 + (intensity * 1.5); // Range: 0.5 to 2.0

    useGSAP(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const chars = gsap.utils.selector(container)(".char");

        // Cache boundingClientRect to completely prevent layout thrashing
        let bounds = container.getBoundingClientRect();
        
        const updateBounds = () => {
            if (container) {
                bounds = container.getBoundingClientRect();
            }
        };

        const handleMouseEnter = () => {
            updateBounds();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX } = e;
            const { width, left } = bounds;

            if (width === 0) return;

            const mousePos = ((clientX - left) / width - 0.5) * 2;

            chars.forEach((char, index) => {
                // Safeguard against division by zero if text has only one character
                const charPos = chars.length > 1 ? (index / (chars.length - 1) - 0.5) * 2 : 0;

                // Smooth continuous scaling factor using product to avoid abrupt jump boundaries
                const product = mousePos * charPos;
                const scaleFactor = product > 0 ? 1 + (product * scaleMultiplier) : 1;

                gsap.to(char, {
                    scaleY: scaleFactor,
                    duration: duration,
                    ease: "power4.out",
                    overwrite: "auto",
                    force3D: true
                });
            });
        };

        const handleMouseLeave = () => {
            gsap.to(chars, {
                scaleY: 1,
                duration: duration * 2,
                ease: "elastic.out(1, 0.3)",
                overwrite: "auto",
                force3D: true
            });
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mousemove", handleMouseMove as any);
        container.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", updateBounds);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mousemove", handleMouseMove as any);
            container.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", updateBounds);
        };
    }, { scope: containerRef, dependencies: [duration, scaleMultiplier] });

    // Split text into words then characters for proper spacing
    const words = text.split(" ");

    // Map position to flex properties
    const getAlignment = () => {
        switch (position) {
            case 'top': return { justify: 'flex-start', align: 'center' };
            case 'bottom': return { justify: 'flex-end', align: 'center' };
            case 'left': return { justify: 'center', align: 'flex-start' };
            case 'right': return { justify: 'center', align: 'flex-end' };
            case 'top-left': return { justify: 'flex-start', align: 'flex-start' };
            case 'top-right': return { justify: 'flex-start', align: 'flex-end' };
            case 'bottom-left': return { justify: 'flex-end', align: 'flex-start' };
            case 'bottom-right': return { justify: 'flex-end', align: 'flex-end' };
            default: return { justify: 'center', align: 'center' };
        }
    };

    const { justify, align } = getAlignment();

    return (
        <div
            className={`container ${className}`}
            ref={containerRef}
            style={{ 
                backgroundColor: bgColor,
                justifyContent: justify,
                alignItems: align,
                ['--shadow-color' as any]: shadowColor 
            }}
        >
            <div className='flow-text'>
                {words.map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                        <div className="word">
                            {word.split("").map((char, charIndex) => (
                                <span
                                    key={charIndex}
                                    className="char"
                                    data-char={char}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                        {wordIndex < words.length - 1 && <span className="space" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default FlowText