import { Hero, HeroSection } from "@/components/layout/hero"
import { CustomLink } from "@/components/custom/link"
import { pages } from "@/lib/links"

export default function Home() {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 w-full">
      <div className=" gap-2 p-8 place-content-end aspect-[3/1] rounded-3xl bg-orange-50 w-full">
        <h3 className="text-3xl font-bold">Simplify Your Workflow</h3>
        <p className="text-sm text-stone-500">
          Effortlessly manage your tenders, contracts, and projects and more.
        </p>
      </div>
      <div className="grid grid-cols-4 w-full gap-4">
        {pages.map(({ label, href, icon: Icon }) => (
          <CustomLink
            key={label}
            href={href}
            className="bg-white/70 col-span-1 rounded-lg p-3 flex flex-col gap-5  hover:shadow-sm transition-all duration-150 border hover:border-black"
          >
            <Icon width={22} height={22} />
            <div className="flex items-center justify-between">
              <span className="flex-1 hover:italic">{label} </span>
              <span>&rarr;</span>
            </div>
          </CustomLink>
        ))}
      </div>
    </div>
  )
}
