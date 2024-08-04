import Pocketbase from "pocketbase"



const url = process.env.DB_URL || "http://localhost:8090"
export const client = new Pocketbase(url)


client.autoCancellation(false)