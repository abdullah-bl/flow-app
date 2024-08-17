import { client } from "@/lib/client"
import { Contract } from "@/types"

export const getContract = async (tenderId: string) => {
  try {
    return await client
      .collection("contracts")
      .getOne<Contract>(`tender = "mwd3efvu9wu938x"`)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getContracts = async () => {
  try {
    return await client.collection("contracts").getFullList<Contract>()
  } catch (error) {
    console.error(error)
    return []
  }
}
