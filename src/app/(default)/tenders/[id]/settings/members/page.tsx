import ManageMember from "@/components/members/manage"
import { getTender } from "@/data/tenders"
import { getUsers } from "@/data/users"
import { getUserFromSession } from "@/lib/auth"

export default async function Members({ params }: { params: { id: string } }) {
  const user = await getUserFromSession()
  const tender = await getTender(params.id)
  const owner = tender?.user === user?.id
  const users = await getUsers()
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Members</h3>
          <p className="text-sm text-stone-500">
            Manage the members of this tender.
          </p>
        </div>
        {owner && (
          <ManageMember
            id={params.id}
            users={users}
            members={tender?.expand?.members}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div className="grid gap-0">
            <h3 className="font-medium">{tender?.expand?.user.name}</h3>
            <p className="text-stone-500 text-sm">
              {tender?.expand?.user.username}
            </p>
          </div>
          <span>Owner</span>
        </div>
        {tender?.expand?.members?.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="grid gap-0">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-stone-500 text-sm">{member.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
