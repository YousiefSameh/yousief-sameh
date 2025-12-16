import { ClientForm } from "@/components/admin/client-form";

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Client</h1>
        <p className="text-muted-foreground mt-1">
          Create a new client with portal access
        </p>
      </div>
      <ClientForm />
    </div>
  );
}
