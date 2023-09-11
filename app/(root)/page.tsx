import { UserButton } from "@clerk/nextjs/app-beta"


export default function Home() {
  return (
    <div className="p-4">
      <UserButton />
    </div>
  )
}
