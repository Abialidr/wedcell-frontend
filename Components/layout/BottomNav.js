import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Person from '@mui/icons-material/Person';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import Colours from '../constants.js/Colors';
import { useRouter } from 'next/router';
import useWindowSize from '@rooks/use-window-size';

const BottomNav = () => {
  const router = useRouter();
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  const [value, setValue] = useState(0);
  var role;
  if (typeof window !== 'undefined') {
    let local = localStorage.getItem('role');
    role = local ? JSON.parse(local).role : null;
  }

  useEffect(() => {
    if (router.pathname.includes('/vendors')) {
      setValue(2);
    } else if (router.pathname.includes('/venue')) {
      setValue(1);
    } else if (router.pathname.includes('/products')) {
      setValue(3);
    } else if (
      router.pathname.includes('/customer-login') ||
      router.pathname.includes('/user-dashboard')
      // router.pathname.includes("/vendor-login")
    ) {
      setValue(4);
    } else {
      setValue(0);
    }
  }, [router]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: '1000',
        // paddingLeft: "8vw",
        // paddingRight: "8vw",
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'center',
        height: '70px',
        // bgcolor: "red",
        // width: "100%",
        background: 'linear-gradient(180deg, #C53244 0%, #B4245D 100%)',

        border: 'none',
        '.MuiBottomNavigation-root': {
          paddingX: 10,
          width: '95vw',
          height: '100%',
          background: 'linear-gradient(180deg, #C53244 0%, #B4245D 100%)',

          //   marginX: "8vw",
        },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          localStorage.setItem('navTab', newValue);
          if (newValue === 0) {
            router.push('/');
          } else if (newValue === 1) {
            router.push('/venue');
          } else if (newValue === 2) {
            router.push('/vendors');
          } else if (newValue === 3) {
            router.push('/products');
          } else if (newValue === 4) {
            router.push(
              role === 'User' ? '/user-dashboard' : '/customer-login'
            );
          }
        }}
      >
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&:focus': {
              color: Colours.Champagne_Gold.Dark,
            },
            fontWeight: '600',
            fontSize: '15px',
            minWidth: innerWidth > 400 ? '82px' : '65px',
          }}
          label={
            <span style={{ fontSize: innerWidth > 400 ? '1.1rem' : '.8rem' }}>
              Home
            </span>
          }
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&:focus': {
              color: Colours.Champagne_Gold.Dark,
            },
            fontWeight: '600',
            minWidth: innerWidth > 400 ? '82px' : '65px',
          }}
          label={
            <span style={{ fontSize: innerWidth > 400 ? '1.1rem' : '.8rem' }}>
              Venues
            </span>
          }
          icon={<LocationCityIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&:focus': {
              color: Colours.Champagne_Gold.Dark,
            },
            fontWeight: '600',
            fontSize: '',
            minWidth: innerWidth > 400 ? '82px' : '65px',
          }}
          label={
            <span style={{ fontSize: innerWidth > 400 ? '1.1rem' : '.8rem' }}>
              Vendors
            </span>
          }
          icon={<StorefrontIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&:focus': {
              color: Colours.Champagne_Gold.Dark,
            },
            fontWeight: '600',
            minWidth: innerWidth > 400 ? '82px' : '65px',
          }}
          label={
            <span style={{ fontSize: innerWidth > 400 ? '1.1rem' : '.8rem' }}>
              Shop
            </span>
          }
          icon={<ShoppingBagIcon />}
        />
        <BottomNavigationAction
          sx={{
            color: 'white',
            '&:focus': {
              color: Colours.Champagne_Gold.Dark,
            },
            fontWeight: '600',
            minWidth: innerWidth > 400 ? '82px' : '65px',
          }}
          label={
            <span style={{ fontSize: innerWidth > 400 ? '1.1rem' : '.8rem' }}>
              Planning
            </span>
          }
          icon={<Person />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
