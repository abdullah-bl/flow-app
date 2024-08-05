import { client } from "@/lib/client"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
  const url = new URL(req.url)
  const path = url.pathname.split("/")
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
  redirect(process.env.DB_URL + `/api/files/` + path.slice(2).join("/"))
}
