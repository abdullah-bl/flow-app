"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import * as actions from "@/actions/auth"

export default function LoginPage() {
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.currentTarget
      await actions.login({
        username: form.username.value,
        password: form.password.value,
      })
      toast({
        title: "Login successful",
        description: "You are now logged in, redirecting...",
      })
      setTimeout(() => {
        window.location.href = "/"
      }, 800)
    } catch (error) {
      console.error(error)
      toast({
        title: "Login failed",
        description: "Something went wrong",
      })
    }
  }

  return (
    <div className="grid gap-2 shadow-md hover:shadow-lg min-h-full border rounded-lg p-8 bg-white/70">
      <h3 className="font-bold text-xl -mb-2">Follow UP</h3>
      <span className="font-medium mb-2 text-stone-700">
        Login to your account
      </span>
      <form
        method="post"
        className="grid gap-2 w-[350px]"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="username">Username</Label>
        <Input
          type="username"
          id="username"
          name="username"
          required
          placeholder="Write your username"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Write your password"
          minLength={4}
        />
        <Button type="submit" className="flex items-center justify-between">
          <span className="flex-1">Login</span>
          &rarr;
        </Button>
      </form>
    </div>
  )
}
