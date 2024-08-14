import { Hero, HeroSection } from "@/components/layout/hero"
import { CustomLink } from "@/components/custom/link"
import { pages } from "@/lib/links"

export default function Home() {
  return (
    <div className="">
      <HeroSection className=" gap-2 p-8 rounded-lg ">
        <h3 className="text-5xl font-semibold">Follow Up</h3>
        <p className="text-sm text-stone-500">
          The way to manage your tenders, contracts, and more.
        </p>
      </HeroSection>
      <div className="grid grid-cols-4 gap-4 p-2">
        {pages.map(({ label, href, icon: Icon }) => (
          <CustomLink
            key={label}
            href={href}
            className="bg-white/70 border col-span-1 rounded-lg p-3 flex flex-col gap-5  hover:shadow-sm transition-all duration-150"
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
