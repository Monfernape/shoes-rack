"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FundPaymentCard() {
  const isPaid = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">
          Fund Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        {isPaid ? (
          <p className="text-status-active">Fund has been paid. Thank you!</p>
        ) : (
          <div>
            <p className="mb-4 text-status-inactive">
              Your fund payment is due.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
