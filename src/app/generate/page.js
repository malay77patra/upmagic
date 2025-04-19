"use client"

import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DollarSign } from 'lucide-react';
import { Copy } from 'lucide-react';
import { Loader } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"


export default function Home({ }) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm()

    const [tab, setTab] = useState("generate")
    const [generating, setGenerating] = useState(false)
    const budgetType = watch("budgetType", "fixed")
    const [result, setResult] = useState("")
    const [copied, setCopied] = useState(false)

    const onSubmit = async (data) => {
        setGenerating(true)
        try {
            const resp = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!resp.ok) {
                throw new Error(resp)
            }
            const respJSON = await resp.json()
            setResult(respJSON.proposal)
            setTab("preview")
        } catch (err) {
            toast.error("Something went wrong!")
            console.log(err)
        } finally {
            setGenerating(false)
        }
    }


    return (
        <div className="max-w-2xl m-auto">
            <Link className="absolute top-4 left-4" href="/">
                <Image
                    src="/logo.svg"
                    width={500}
                    height={500}
                    alt="Upmagic Logo"
                    className="h-8 w-8"
                />
            </Link>
            <div className="text-center mt-10">
                <h1 className="mb-4">
                    <SparklesText sparklesCount={5} colors={{
                        first: "#FF0",
                        second: "#FF0"
                    }} className="text-3xl text-primary">
                        Upmagic 🪄
                    </SparklesText>
                </h1>
                <Tabs value={tab}>
                    <TabsList className="grid w-full grid-cols-2 m-auto">
                        <TabsTrigger value="generate" onClick={() => setTab("generate")}>Generate</TabsTrigger>
                        <TabsTrigger value="preview" onClick={() => setTab("preview")}>Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="generate">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                className={`text-lg font-semibold ${errors.title ? 'border-red-400' : ''}`}
                                placeholder="Job title..."
                                {...register("title", { required: "Title is required" })}
                            />
                            <Textarea
                                className={`min-h-[50vh] ${errors.description ? 'border-red-400' : ''}`}
                                placeholder="Job description..."
                                {...register("description", { required: "Description is required" })}
                            />
                            <div className="flex items-center gap-2">
                                <div className="text-sm border p-2 rounded-sm">
                                    <DollarSign size="1rem" />
                                </div>
                                <Input
                                    placeholder="Budget"
                                    type="number"
                                    className={`${errors.budget ? 'border-red-400' : ''}`}
                                    {...register("budget", { required: (budgetType === "notsure") ? false : "Budget is required" })}
                                    disabled={budgetType === "notsure"}
                                />
                                <Controller
                                    name="budgetType"
                                    control={control}
                                    defaultValue="fixed"
                                    rules={{ required: "Budget type is required" }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select budget type" />
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
                                    )}
                                />

                            </div>
                            <Button className="h-12" type="submit" disabled={generating}>
                                {generating ? <Loader className="animate-spin" /> : "Generate ✨"}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="preview">
                        <div className="flex flex-col gap-4 items-start">
                            <Textarea
                                className="min-h-[60vh]"
                                value={result}
                                onChange={(event) => setResult(event.target.value)}
                            />
                            <Button
                                onClick={async () => {
                                    await navigator.clipboard.writeText(result)
                                    setCopied(true)
                                    setTimeout(() => setCopied(false), 1000)
                                }}
                            >
                                <Copy />
                                {copied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}