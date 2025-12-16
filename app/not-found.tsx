import Link from "next/link"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center py-32">
        <div className="text-center">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <Link href="/projects">
                <Search className="h-4 w-4" />
                Browse Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
