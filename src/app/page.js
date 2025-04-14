import Image from "next/image"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Input } from "@/components/ui/input";

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
          <h2 className="text-center text-sm md:text-base max-w-sm md:max-w-md mt-2 md:mt-4">AI-powered Upwork proposals built on <a href="https://www.linkedin.com/posts/malaypatra_freelancing-upwork-fiverr-activity-7316805712355946497-_kP-" className="underline hover:text-blue-800">real success</a>. Backed by insights from top freelancers.</h2>
          <SparklesText sparklesCount={3}>
            <Link href="/generate">
              <Button className="p-5">
                Magic Now
                <ChevronRightIcon />
              </Button>
            </Link>
          </SparklesText>
        </div>
        <div className="flex items-center justify-center">
          <Image
            alt="Workfloe image"
            height={500}
            width={500}
            className="w-full max-w-[650px]"
            src="/workflow.svg"
          />
        </div>
      </main >
      <footer className="bg-primary rounded-lg text-gray-200 p-8 flex flex-col gap-3 items-start">
        <h2 className="text-lg font-semibold">Get more updates...</h2>
        <p className="text-sm max-w-4xl">Do you want to get notified when we launch powerful new AI tools, roll out exciting features, or share exclusive tips to boost your Upwork game? Subscribe to our updates and never miss a beat.</p>
        <div className="flex items-center gap-2 mt-6">
          <Input
            placeholder="Your email address"
            className="border-gray-600"
          />
          <Button variant="outline" className="text-primary font-semibold">Subscribe</Button>
        </div>
      </footer>
    </>
  )
}