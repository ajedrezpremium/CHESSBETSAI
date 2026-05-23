import { redirect } from 'next/navigation'
import { checkAdmin } from '@/lib/admin/service'
import SidebarNav from '@/components/admin/SidebarNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await checkAdmin()

  if (!isAdmin) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <SidebarNav />
      <div className="flex-1">{children}</div>
    </div>
  )
}
