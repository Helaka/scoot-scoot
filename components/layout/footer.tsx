import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              ScootScoot
            </span>
          </div>

          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">© {new Date().getFullYear()} All Rights Reserved</span>
            <Link
              href="/admin-login"
              className="text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
