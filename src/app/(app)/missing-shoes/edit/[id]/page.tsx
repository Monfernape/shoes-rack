import React from 'react'
import { MissingShoesFormBuilder } from '../../add/components/MissingShoesFormBuilder';
import { getMissingShoeById } from '../../actions/get-missing-shoe-by-id';

const Page = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const missingShoe = await getMissingShoeById(Number(id));
  return (
    <MissingShoesFormBuilder missingShoe={missingShoe}/>
  )
}

export default Page;