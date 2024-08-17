export const Item = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children?: React.ReactNode
}) => {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between">
      <div className="flex flex-col gap-0">
        <h3 className="font-medium">{title}</h3>
        <p className="text-stone-500">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
