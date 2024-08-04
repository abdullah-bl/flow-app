import { NextResponse } from "next/server"





export const GET = async (req: Request, res: Response) => {

  const url = new URL(req.url)
  const path = url.pathname
  return new NextResponse(
    JSON.stringify({ path }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}