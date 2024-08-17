import { client } from "@/lib/client"
import { Invoice } from "@/types"

export const getInvoices = async () => {
  try {
    return await client.collection("invoices").getFullList<Invoice>({
      expand: `budget, user`,
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
