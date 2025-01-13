"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFundDetailsByMemberId } from "../../funds/actions/get-funds-by-member-id";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import useSWR from 'swr'

const fetchFunds = async () => {
  const loggedUser = await getLoggedInUser();
  const response = await getFundDetailsByMemberId(loggedUser.id);
  if (response.error) {
    console.error("Error fetching funds:", response.error.message);
  }
  return response.data;
};
export default function FundPaymentCard() {
  const { data: funds } = useSWR("funds", fetchFunds);
  const loggedUserFunds = Array.isArray(funds) ? funds : [];
  const isCurrentMonthFundAdded = loggedUserFunds?.some(
    (fund) => fund?.amount !== "0"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="tracking-tight text-sm font-medium text-gray-800">
          Fund Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        {isCurrentMonthFundAdded ? (
          <p className="text-status-active">Fund has been paid.</p>
        ) : (
          <div>
            <p className="mb-4 text-status-pending">
              Your fund payment is due.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
