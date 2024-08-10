import { Hero, HeroSection } from "@/components/layout/hero"
import { CustomLink } from "@/components/custom/link"
import { pages } from "@/lib/links"

export default function Home() {
  return (
    <div className="flex flex-col gap-4  flex-1 ">
      <HeroSection className=" aspect-[5/1] ">
        <h3 className="text-5xl font-semibold">Follow UP</h3>
        <p className="text-sm text-stone-500">
          The way to manage your tenders, contracts, and more.
        </p>
      </HeroSection>
      <div className="grid grid-cols-4 gap-4 p-2">
        {pages.map(({ label, href, icon: Icon }) => (
          <CustomLink
            key={label}
            href={href}
            className="bg-white/70 border col-span-1 rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
          >
            <Icon width={22} height={22} />
            <span className="flex-1 w-full text-justify ">{label} &rarr;</span>
          </CustomLink>
        ))}
      </div>
    </div>
  )
}
