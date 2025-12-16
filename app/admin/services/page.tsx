import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, GripVertical } from "lucide-react"
import { DeleteServiceButton } from "@/components/admin/delete-service-button"

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from("services").select("*").order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the services you offer</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </div>

      <Card className="py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground w-8"></th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Service</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services?.map((service) => (
                  <tr key={service.id} className="border-b border-border last:border-0">
                    <td className="p-4">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{service.short_description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/services/${service.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteServiceButton serviceId={service.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!services || services.length === 0) && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No services yet. Add your first service!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
