"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function ActionButton({ idealIcon, actionIcon, idealText, actionText, onClick, duration = 3, ...props }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (clicked) return;

        setClicked(true);
        onClick();
        setTimeout(() => {
            setClicked(false);
        }, duration * 1000);
    }

    return (
        <Button {...props} onClick={handleClick}>
            {clicked ? (
                <>
                    {actionIcon}
                    {actionText}
                </>
            ) : (
                <>
                    {idealIcon}
                    {idealText}
                </>
            )}
        </Button>
    )
}