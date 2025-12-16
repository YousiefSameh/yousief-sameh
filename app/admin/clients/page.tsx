import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye } from "lucide-react";
import { DeleteClientButton } from "@/components/admin/delete-client-button";
import { CopyTokenButton } from "@/components/admin/copy-token-button";

export default async function AdminClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your clients and their portal access
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <Card className="py-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Client
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Company
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Access Token
                  </th>
                  <th className="text-right p-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {client.avatar_url && (
                          <img
                            src={client.avatar_url}
                            alt={client.name}
                            className="w-8 h-8 rounded-full bg-muted object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{client.company || "-"}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <code className="text-xs bg-muted px-1 py-0.5 rounded truncate flex-1">
                          {client.access_token}
                        </code>
                        <CopyTokenButton token={client.access_token} />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link
                            href={`/portal/${client.access_token}`}
                            target="_blank"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/clients/${client.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteClientButton clientId={client.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!clients || clients.length === 0) && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No clients yet. Add your first client!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
