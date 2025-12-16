import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactStatusSelect } from "@/components/admin/contact-status-select";
import { ContactFilters } from "@/components/admin/contact-filters";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminContactsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = (resolvedSearchParams.query as string) || "";
  const status = (resolvedSearchParams.status as string) || "";

  const supabase = await createClient();

  let dbQuery = supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    dbQuery = dbQuery.eq("status", status);
  }

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  // Need to await the modified query
  const { data: contacts } = await dbQuery;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-muted-foreground mt-1">
          Manage inquiries from potential clients
        </p>
      </div>

      <ContactFilters />

      <div className="grid gap-4">
        {contacts?.map((contact) => (
          <Card key={contact.id} className="py-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <Badge
                      variant={
                        contact.status === "new"
                          ? "default"
                          : contact.status === "read"
                          ? "secondary"
                          : contact.status === "replied"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {contact.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-foreground"
                    >
                      {contact.email}
                    </a>
                    {contact.project_type && (
                      <span>Type: {contact.project_type}</span>
                    )}
                    {contact.budget_range && (
                      <span>Budget: {contact.budget_range}</span>
                    )}
                    {contact.deadline && (
                      <span>Timeline: {contact.deadline}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{contact.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <ContactStatusSelect
                  contactId={contact.id}
                  currentStatus={contact.status}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        {(!contacts || contacts.length === 0) && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No contact submissions found matching your filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
