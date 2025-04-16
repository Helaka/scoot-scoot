import { getScooterById } from "@/actions/scooter-actions"
import { ScooterForm } from "@/components/scooter-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditScooterPageProps {
  params: {
    id: string
  }
}

export default async function EditScooterPage({ params }: EditScooterPageProps) {
  const scooter = await getScooterById(params.id)

  if (!scooter) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href={`/scooters/${params.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Scooter Details
          </Button>
        </Link>
      </div>

      <ScooterForm initialData={scooter} shopId={scooter.shop_id} isEditing={true} />
    </div>
  )
}
