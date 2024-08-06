import { client } from "@/lib/client";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";





export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = cookies().get("pb_auth")
  console.log(session)
  if (!session) return res.status(401).end()
  client.authStore.loadFromCookie(`pb_auth=${session}`)
  try {
    await client.collection('users').authRefresh()
    cookies().delete("pb_auth")
    return res.status(401).end()
  } catch (error) {
    cookies().set("pb_auth", client.authStore.exportToCookie({
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }))
    return res.status(200).json(client.authStore.model)
  }
}