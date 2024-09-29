'use server';

import {z} from "zod";
import {validatedAction} from "@/lib/auth/middleware";
import { redirect } from 'next/navigation';
import {db} from "@/lib/db/drizzle";
import {events} from "@/lib/db/schema";

const dateSchema = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

const newEventSchema = z.object({
    title: z.string().min(3).max(255),
    date: dateSchema,
});

export const addEvent = validatedAction(newEventSchema, async (data, formData) => {
    const { title, date } = data;

    // Create a new event
    await db.insert(events).values({
        name: title,
        date: date
    });

    redirect('/dashboard');
});
