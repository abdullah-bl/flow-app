


import { getUserFromSession } from "@/lib/auth";
import { client } from "@/lib/client";
import { Tender, TenderItem } from "@/types";



export const getTenders = async () => {
  try {
    getUserFromSession()
    return await client.collection("tenders").getFullList<Tender>({
      expand: 'user,members,status,department',
      sort: "-updated"
    })
  } catch (error) {
    console.error(error)
    return []
  }
}


export const getTender = async (id: string) => {
  try {
    getUserFromSession()
    return await client.collection("tenders").getOne<Tender>(id, {
      expand: 'user,members,status,department'
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getTenderItems = async (id: string) => {
  try {
    getUserFromSession()
    return await client.collection("tender_items").getFullList<TenderItem>({
      filter: `tender = "${id}"`,
      sort: "-updated"
    })
  } catch (error) {
    console.error(error)
    return []
  }
}