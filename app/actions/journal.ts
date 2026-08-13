"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { journalEntries } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export async function getEntries() {
  const userId = await getUserId()
  return db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.userId, userId))
    .orderBy(desc(journalEntries.createdAt))
}

export async function createEntry(input: {
  content: string
  title?: string
  prompt?: string
  mood?: string
  source?: string
}) {
  const userId = await getUserId()
  const content = input.content?.trim()
  if (!content) throw new Error("Entry cannot be empty")

  await db.insert(journalEntries).values({
    userId,
    content,
    title: input.title?.trim() || null,
    prompt: input.prompt?.trim() || null,
    mood: input.mood?.trim() || null,
    source: input.source?.trim() || "journal",
  })

  revalidatePath("/")
}

export async function deleteEntry(id: number) {
  const userId = await getUserId()
  await db
    .delete(journalEntries)
    .where(and(eq(journalEntries.id, id), eq(journalEntries.userId, userId)))
  revalidatePath("/")
}
