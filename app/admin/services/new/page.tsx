import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="inline-flex items-center justify-center rounded-lg border border-border p-2.5 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Service</h1>
          <p className="text-muted-foreground">
            Create a new service offering.
          </p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}
