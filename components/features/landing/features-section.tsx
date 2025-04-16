import { Shield, Zap, Map, CreditCard } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">Why Choose ScootScoot</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Zap className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Fast & Easy</h3>
          <p className="text-muted-foreground">
            Rent a scooter in minutes with our streamlined process. No paperwork, no hassle.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Map className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Find Nearby</h3>
          <p className="text-muted-foreground">Easily locate available scooters near you with our interactive map.</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Shield className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Secure & Safe</h3>
          <p className="text-muted-foreground">
            All rentals include insurance options and our safety verification system.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <CreditCard className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Easy Payments</h3>
          <p className="text-muted-foreground">Secure payment processing with multiple options for your convenience.</p>
        </div>
      </div>
    </section>
  )
}
