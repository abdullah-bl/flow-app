import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { Obligation } from "@/types"




export const getObligations = async ({
  target,
  id
}: {
  target: "tender" | "contract"
  id: string
}) => {
  try {
    getUserFromSession()
    return await client.collection("obligations").getFullList<Obligation>({
      filter: `${target} = "${id}"`,
      sort: "-updated",
      expand: 'budget,user'
    })
  } catch (error) {
    console.error(error)
    return []
  }
}