import React, { useEffect, useState } from 'react';
import Test from '../Components/Test';
import { useRouter } from 'next/router';

const InvitationCard = () => {
  const router = useRouter();
  const { id } = router.query;
  const { FamilyId } = router.query;

  return (
    <Test
      id={id}
      FamilyId={FamilyId}
    ></Test>
  );
};

export default InvitationCard;
