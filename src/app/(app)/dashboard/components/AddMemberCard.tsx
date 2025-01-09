import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/lib/routes";

export default function AddMemberCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">
          Add New Member
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        <p className="mb-4">Add a new member by clicking the button below.</p>
        <Button asChild className="h-7 text-xs">
          <Link href={Routes.AddMember}>Add Member</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
