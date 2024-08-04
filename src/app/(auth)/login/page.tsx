"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import * as auth from '@/actions/auth'

export default function LoginPage() {
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const { success, message } = await auth.login(data)
      if (success) {
        toast({
          title: 'Login successful',
          description: 'You have successfully logged in',
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 800)
      } else {
        toast({
          title: 'Login failed',
          description: message,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Login failed',
        description: 'Something went wrong',
      })
    }
  }

  return (
    <div className="grid gap-4  min-h-full border rounded-lg shadow-sm p-4 bg-white/70">
      <h3 className="font-medium text-lg">
        Login to your account
      </h3>
      <form className="grid gap-2 w-[350px]" onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input type="username" id="username" name="username" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" required />
        <Button type="submit" className="flex items-center justify-between">
          <span className="flex-1">
            Login
          </span>
          &rarr;
        </Button>
      </form>
    </div>
  )
}