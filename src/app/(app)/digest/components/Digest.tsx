"use client";
import React, { useState } from "react";
import { DigestData, DigestReviews } from "./DigestReviews";
import { useSearchParams } from "next/navigation";
import DigestReviewsFilter from "./DigestReviewsFilter";
import { NoDataFound } from "@/common/NoDataFound";
import { User } from "@/types";

type Props = {
  loginUser: User;
  digest: DigestData | null | undefined;
};
export const Digest = ({ loginUser, digest }: Props) => {
  const [shift, setShift] = useState("");
  const params = useSearchParams().get("date");
  const date = params?.split(" ")[0];
  return (
    <div>
      <div className="flex  flex-col sm:flex-row items-start gap-2 justify-start sm:justify-between sm:items-center mb-6 ">
        <h4 className="text-xs text-gray-700">
          Digest for <b>Date :</b> {date} <b>{}</b>
        </h4>
        <DigestReviewsFilter
          loginUser={loginUser}
          shift={shift}
          onSetShift={setShift}
        />
      </div>
      {digest ? (
        <DigestReviews loginUser={loginUser} digest={digest} shift={shift} />
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
