import React from 'react'
import { MissingShoesReportDetails } from '../../components/MissingShoesReportDetails'
import { getMissingShoeById } from '../../actions/get-missing-shoe-by-id';

const Page = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const missingShoe = await getMissingShoeById(Number(id));

  return (
    <MissingShoesReportDetails missingShoe={missingShoe} />
  )
}

export default Page;