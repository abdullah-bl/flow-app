import { createSafeActionClient } from "next-safe-action"
import { getUserFromSession } from "./auth"

export const action = createSafeActionClient()

export const authAction = action.use(async ({ next }) => {
  const user = await getUserFromSession()
  if (!user) throw new Error("Not authorized")
  return next({ ctx: { user } })
})
