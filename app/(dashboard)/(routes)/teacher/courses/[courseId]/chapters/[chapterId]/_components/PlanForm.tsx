"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import toast from "react-hot-toast"
import axios from "axios"
import { Chapter } from "@prisma/client"

interface PlanFormProps {
    courseId: string;
    chapter: Chapter
}


const formSchema = z.object({
    isFree: z.boolean().default(false).optional(),
})

export const PlanForm = ({ courseId, chapter }: PlanFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: chapter?.isFree!,
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.patch(`/api/courses/${courseId}/chapters/${chapter.id}`, values)
            toast.success(`plan has been updated`)
        } catch (error) {
            toast.error('something went wrong')
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <div className="flex flex-row items-center justify-between space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        className="h-6 w-6"
                                        disabled={isSubmitting}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-xl font-semibold">
                                        Free?
                                    </FormLabel>
                                    <FormDescription>
                                        If plan is free, everybody can watch it
                                    </FormDescription>
                                </div>
                            </div>
                            <Button disabled={isSubmitting} type="submit">Submit</Button>

                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
