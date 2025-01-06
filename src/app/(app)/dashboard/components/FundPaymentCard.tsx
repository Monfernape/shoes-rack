"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FundPaymentCard() {
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setTimeout(() => setIsPaid(true), 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">Fund Payment</CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        {isPaid ? (
          <p className="text-status-active">Fund has been paid. Thank you!</p>
        ) : (
          <div>
            <p className="mb-4 text-status-inactive">Your fund payment is due.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
