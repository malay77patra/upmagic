import Image from "next/image"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesText } from "@/components/magicui/sparkles-text";
import * as motion from "motion/react-client"
import { TextAnimate } from "@/components/magicui/text-animate";
import Hero from "@/components/Hero";


export default function Home({ }) {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-2 z-9999">
        <motion.div
          className="flex items-center py-2 px-3 rounded-md max-w-5xl m-auto backdrop-filter backdrop-blur-sm bg-opacity-0"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            height={500}
            width={500}
            alt="Logo"
            src="/logo.svg"
            className="h-8 w-8"
          />
          <div className="flex-1"></div>
          <a href="https://www.linkedin.com/in/malaypatra/" target="_blank">
            <InteractiveHoverButton>Hire Me</InteractiveHoverButton>
          </a>
        </motion.div>
      </nav>

      <main className="flex flex-col items-center justify-center py-32">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium font-ubuntu text-center">
            <div className="flex gap-2 items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                AI-powered
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.1 }}
              >
                instant
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.2 }}
              >
                <AuroraText colors={["#06c59f", "#000"]}>Upwork</AuroraText>
              </motion.span>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.3 }}
              >
                proposal
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.4 }}
              >
                generation.
              </motion.span>
            </div>
          </h1>
          <TextAnimate className="text-center mt-2 text-sm md:text-base max-w-sm md:max-w-md" animation="blurInUp" by="character" delay={0.4} once>
            AI-powered Upwork proposals backed by
          </TextAnimate>
          <TextAnimate className="text-center text-sm md:text-base max-w-sm md:max-w-md" animation="blurInUp" by="character" delay={0.5} once>
            insights from top freelancers.
          </TextAnimate>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <SparklesText sparklesCount={3}>
              <Link href="/generate">
                <Button className="px-4 py-5">
                  Magic Now
                </Button>
              </Link>
            </SparklesText>
          </motion.div>
        </motion.div>
      </main >
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >

        <Hero />
      </motion.div>
    </>
  )
}