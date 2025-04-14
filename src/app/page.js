import Image from "next/image"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function Home({ }) {
  return (
    <>
      <nav className="flex">
        <div className="flex items-center gap-2">
          <Image
            height={500}
            width={500}
            alt="Logo"
            src="/logo.svg"
            className="h-6 w-6"
          />
          <h1 className="font-ubuntu font-bold text-lg text-primary">Upmagic</h1>
        </div>
        <div className="flex-1"></div>
        <a href="https://www.linkedin.com/in/malaypatra/" target="_blank">
          <InteractiveHoverButton>Hire Us</InteractiveHoverButton>
        </a>
      </nav>
      <main>
        <div className="flex flex-col items-center justify-center mt-10 md:mt-20 m-auto">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium font-ubuntu text-center">AI-powered instant <AuroraText colors={["#06c59f", "#000"]}>Upwork</AuroraText> <br /> proposal generation.</h1>
          <h2 className="text-center text-sm md:text-base max-w-sm md:max-w-md mt-2 md:mt-4">AI-powered Upwork proposals built on real success. Backed by insights from top freelancers.</h2>
          <SparklesText sparklesCount={3}>
            <Link href="/generate">
              <Button className="p-5">
                Magic Now
                <ChevronRightIcon />
              </Button>
            </Link>
          </SparklesText>
        </div>
      </main >
    </>
  )
}