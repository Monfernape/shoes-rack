import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Routes } from "@/lib/routes"

export default function LeaveRequestCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
      <p className="mb-4 h-10 overflow-hidden text-xs text-muted-foreground">
      Need to take a day off?
    </p>
        <Button asChild className="h-7 text-xs">
          <Link  href={Routes.AddLeaveRequest}>Create Leave Request</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
