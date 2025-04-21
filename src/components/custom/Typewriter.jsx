"use client"

import { useEffect, useRef } from 'react';

export default function TypeWriter({
    type = "normal",
    text = "",
    delay = 500,
    duration = 100,
    props = {}
}) {
    const className = props.className || "";
    const writerRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!writerRef.current) return;
        writerRef.current.innerHTML = "";

        const timeout = setTimeout(() => {
            let i = 0;
            intervalRef.current = setInterval(() => {
                if (i < text.length) {
                    writerRef.current.innerHTML += text.charAt(i);
                    i++;

                    // Auto-scroll functionality
                    if (writerRef.current) {
                        if (type === "input") {
                            writerRef.current.scrollLeft = writerRef.current.scrollWidth;
                        } else if (type === "textarea") {
                            writerRef.current.scrollTop = writerRef.current.scrollHeight;
                        }
                    }
                } else {
                    clearInterval(intervalRef.current);
                }
            }, duration);
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearInterval(intervalRef.current);
            if (writerRef.current) {
                writerRef.current.innerHTML = "";
            }
        };
    }, [text, duration, delay, type]);

    if (type === "input") {
        return (
            <div className="px-3 py-2 border w-full shadow-sm rounded-md h-10">
                <span
                    {...props}
                    ref={writerRef}
                    className={`${className} min-w-[300px] w-full flex items-center whitespace-nowrap overflow-x-auto no-scrollbar`}
                    style={{ display: 'inline-block' }}
                ></span>
            </div>
        )
    } else if (type === "textarea") {
        return (
            <div className="px-3 py-2 border w-full shadow-sm rounded-md min-h-20">
                <span
                    {...props}
                    ref={writerRef}
                    className={`${className} min-w-[300px] w-full block overflow-y-auto no-scrollbar`}
                    style={{ whiteSpace: 'pre-wrap' }}
                ></span>
            </div>
        )
    }

    return (
        <span {...props} ref={writerRef}></span>
    )
}