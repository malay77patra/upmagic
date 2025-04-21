"use client"

import Image from "next/image"
import TypeWriter from "@/components/custom/Typewriter"
import { Button } from "@/components/ui/button"
import { forwardRef, useRef } from "react"
import { Copy } from 'lucide-react'
import { Check } from 'lucide-react'
import Beam from "@/components/custom/Beam"
import ActionButton from "@/components/custom/ActionButton"

const GENERATED_PROPOSAL = `Hi [Client's Name],

I'm a Fullstack Developer with strong experience in React, Node.js, and building scalable web applications using RESTful APIs. I’ve worked extensively with AWS and PostgreSQL as well, which adds flexibility and robustness to the solutions I build.

I’d love to bring my technical expertise and collaborative mindset to your team and contribute to your exciting projects. Let’s connect and discuss how I can add value from day one.

Looking forward to hearing from you!

Best regards,  
[Your Name]`

const BeamWrapper = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref}>
            {children}
        </div>
    );
});


export default function Hero() {
    const leftBoxRef = useRef(null)
    const middleBoxRef = useRef(null)
    const rightBoxRef = useRef(null)
    const containerBoxRef = useRef(null)

    return (
        <div className="flex items-center justify-center w-full mt-12 relative flex-col gap-10 min-[912px]:flex-row min-[912px]:gap-0" ref={containerBoxRef}>
            <div className="flex-1 flex items-center justify-center">
                <BeamWrapper ref={leftBoxRef}>
                    <div className="w-[350px] flex flex-col gap-2 bg-white">
                        <TypeWriter
                            text="Looking for a fullstack developer."
                            type="input"
                            duration={20}
                            props={{
                                className: "font-semibold"
                            }}
                        />
                        <TypeWriter
                            text={`We're on the lookout for a talented Fullstack Developer to join our dynamic team!

You'll be working on exciting web applications using modern frameworks and scalable architecture.
Strong experience with React, Node.js, and RESTful APIs is a must—bonus if you’ve worked with AWS or PostgreSQL.`}
                            type="textarea"
                            duration={20}
                            delay={1200}
                            props={{
                                className: "h-[180px] text-sm"
                            }}
                        />
                        <Button>Generate</Button>
                    </div>
                </BeamWrapper>
            </div>
            <div>
                <BeamWrapper ref={middleBoxRef}>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={500}
                        height={500}
                        className="size-12"
                    />
                </BeamWrapper>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <BeamWrapper ref={rightBoxRef}>
                    <div className="w-[350px] bg-white flex flex-col gap-2 items-end">
                        <TypeWriter
                            text={GENERATED_PROPOSAL}
                            type="textarea"
                            duration={20}
                            delay={7500}
                            props={{
                                className: "h-[250px] text-sm"
                            }}
                        />
                        <div className="flex gap-1">
                            <ActionButton
                                idealIcon={<Copy />}
                                actionIcon={<Check />}
                                idealText="Copy"
                                actionText="Copied"
                                onClick={() => {
                                    navigator.clipboard.writeText(GENERATED_PROPOSAL)
                                }}
                            />
                        </div>
                    </div>
                </BeamWrapper>
            </div>
            <Beam
                containerRef={containerBoxRef}
                fromRef={leftBoxRef}
                toRef={rightBoxRef}
                gradientColor="rgba(124, 2, 240, 0.67)"
            />
        </div>
    )
}