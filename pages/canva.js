import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducer/appEssentials';
import Test from 'src/Test';

const Canva = () => {
  const globleuser = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    !globleuser && router.push('user-dashboard?direction=Invites');
  }, [globleuser]);
  return <Test />;
};

export default Canva;
