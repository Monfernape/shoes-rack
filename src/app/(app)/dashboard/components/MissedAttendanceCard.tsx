import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Routes } from "@/lib/routes"

export default function MissedAttendanceCard() {
  const hasMissedAttendance = true

  if (!hasMissedAttendance) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">Missed Attendance</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        <p className="mb-4">You missed adding your attendance for yesterday.</p>
        <Button asChild className="h-7 text-xs">
        <Link href={Routes.AddAttendance}>Add Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
