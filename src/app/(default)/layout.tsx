import Navbar from "@/components/layout/nav";



export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full h-full mx-auto max-w-5xl">
      <Navbar />
      {children}
    </div>
  )
}