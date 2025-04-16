"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Bike,
  Globe,
  BarChart,
  FileText,
  CreditCard,
  ShieldAlert,
  Database,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  // Don't render the sidebar navigation if we're on the main dashboard
  // This prevents duplicate navigation elements
  const isMainDashboard = pathname === "/admin-dashboard"

  if (isMainDashboard) {
    return <div className="min-h-screen bg-gray-950 text-white">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link href="/admin-dashboard" className="flex items-center gap-2">
            <Bike className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-bold text-white">ScootScoot</span>
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              href="/admin-dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-dashboard"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin-user-management"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-user-management"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </Link>
            <Link
              href="/admin-fleet-management"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-fleet-management"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Bike className="h-5 w-5" />
              <span>Fleet Management</span>
            </Link>
            <Link
              href="/admin-shop-management"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-shop-management"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Globe className="h-5 w-5" />
              <span>Shop Management</span>
            </Link>
            <Link
              href="/admin-analytics"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-analytics"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <BarChart className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/admin-reports"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-reports"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            <Link
              href="/admin-payments"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-payments"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              href="/admin-blacklist"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-blacklist"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <ShieldAlert className="h-5 w-5" />
              <span>Blacklist</span>
            </Link>
          </div>

          <div className="mt-6 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">Developer Tools</div>
            <Link
              href="/admin-database"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-database"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Database className="h-5 w-5" />
              <span>Database</span>
            </Link>
            <Link
              href="/admin-api-testing"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-api-testing"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Wrench className="h-5 w-5" />
              <span>API Testing</span>
            </Link>
            <Link
              href="/admin-settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/admin-settings"
                  ? "bg-gray-800 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href="/admin-login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
