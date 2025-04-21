"use client"

import { useEffect, useState, useId } from "react";

export default function Beam({
    containerRef,
    fromRef,
    toRef,
    lineColor = "#ddd",
    lineWidth = 2,
    gradientRadius = 60,
    gradientColor = "rgba(124, 2, 240, 0.67)",
    ...props
}) {
    const [rect, setRect] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        angle: 0,
    });
    const cid = useId();

    useEffect(() => {
        function updateRect() {
            if (!containerRef.current || !fromRef.current || !toRef.current) return;

            const container = containerRef.current.getBoundingClientRect();
            const from = fromRef.current.getBoundingClientRect();
            const to = toRef.current.getBoundingClientRect();

            const fromCenterX = from.left + from.width / 2 - container.left;
            const fromCenterY = from.top + from.height / 2 - container.top;
            const toCenterX = to.left + to.width / 2 - container.left;
            const toCenterY = to.top + to.height / 2 - container.top;

            const width = Math.sqrt(Math.pow(toCenterX - fromCenterX, 2) + Math.pow(toCenterY - fromCenterY, 2));
            const angle = Math.atan2(toCenterY - fromCenterY, toCenterX - fromCenterX) * 180 / Math.PI;

            setRect({
                x: fromCenterX,
                y: fromCenterY,
                width: width,
                height: lineWidth,
                angle: angle,
            });
        }

        updateRect(); // initial

        window.addEventListener("resize", updateRect);
        return () => window.removeEventListener("resize", updateRect);
    }, [containerRef, fromRef, toRef, lineWidth]);


    const transformString = `rotate(${rect.angle} ${rect.x} ${rect.y})`;

    return (
        <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1 }}
            {...props}
        >
            <defs>
                <radialGradient id={`${cid}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: gradientColor, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: gradientColor, stopOpacity: 0 }} />
                </radialGradient>
                <clipPath id={`${cid}-clip`}>
                    <rect
                        x={rect.x}
                        y={rect.y - rect.height / 2}
                        width={rect.width}
                        height={rect.height}
                        fill={lineColor}
                        transform={transformString}
                    />
                </clipPath>
            </defs>
            <rect
                x={rect.x}
                y={rect.y - rect.height / 2}
                width={rect.width}
                height={rect.height}
                fill={lineColor}
                transform={transformString}
            />
            <circle
                r={gradientRadius}
                fill={`url(#${cid}-gradient)`}
                clipPath={`url(#${cid}-clip)`}
            >
                <animate
                    attributeName="cx"
                    from={rect.x}
                    to={rect.x + Math.cos((rect.angle * Math.PI) / 180) * rect.width}
                    dur="2s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="cy"
                    from={rect.y}
                    to={rect.y + Math.sin((rect.angle * Math.PI) / 180) * rect.width}
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>


        </svg>
    );
}