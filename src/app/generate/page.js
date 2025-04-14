import { SparklesText } from "@/components/magicui/sparkles-text"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DollarSign } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ConfettiButton } from "@/components/magicui/confetti"


export default function Home({ }) {

    return (
        <div className="max-w-2xl m-auto">
            <Image
                src="/logo.svg"
                width={500}
                height={500}
                alt="Upmagic Logo"
                className="h-8 w-8 absolute top-4 left-4"
            />
            <div className="text-center mt-10">
                <h1 className="mb-4">
                    <SparklesText sparklesCount={5} colors={{
                        first: "#FF0",
                        second: "#FF0"
                    }} className="text-3xl">
                        Upmagic 🪄
                    </SparklesText>
                </h1>

                <div className="mt-16 flex flex-col gap-4">
                    <Input placeholder="Job title..." />
                    <Textarea
                        className="min-h-[50vh]"
                        placeholder="Job description..."
                    />
                    <div className="flex items-center gap-2">
                        <Button>
                            <DollarSign />
                        </Button>
                        <Input placeholder="Budget" type="number" />
                        <Select defaultValue="fixed">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Budget type</SelectLabel>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                    <SelectItem value="notsure">Not Sure</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <ConfettiButton className="h-12">Generate ✨</ConfettiButton>
                </div>
            </div>
        </div >
    )
}