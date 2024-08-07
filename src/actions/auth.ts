"use server"

import { client } from "@/lib/client"
import { actionClient } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"



const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6)
})


// export const login = async (form: FormData) => {

//   try {
//     await loginSchema.safeParseAsync(Object.fromEntries(form.entries()))
//     const { record, token } = await client.collection("users")
//       .authWithPassword(form.get("username") as string, form.get("password") as string)
//     const session = client.authStore.exportToCookie().split("=")
//     cookies().set(session[0], session[1])
//     return { success: true, message: "Login successful" }
//   } catch (error) {
//     console.error(error)
//     return { success: false, message: "Login failed" }
//   }
// }


// This schema is used to validate input from client.
const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(100),
});

export const login = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      await client.collection("users").authWithPassword(username, password);
      cookies().set("pb_auth", client.authStore.exportToCookie({
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }));
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  });


export const logout = async () => {
  client.authStore.clear();
  cookies().delete("pb_auth");
  return { success: true, message: "Logout successful" };
}