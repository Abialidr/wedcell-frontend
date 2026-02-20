import Styles from '../../styles/Dashboard/Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducer/appEssentials';
import Layout from '../../Components/Dashboard/layout';
import useWindowSize from '@rooks/use-window-size';
import WishlistCard from '../../Components/newCard/wishlistCard/WishlistCard';
import VenueCard from 'Components/Cards/VenueCard';
import {
  useGetWishlistDataQuery,
} from 'redux/Api/common.api';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const Wishlist = () => {
  const globleuser = useSelector(selectUser);
  const { innerWidth: windowWidth } = useWindowSize();
  const [wishlist, setWishlist] = useState();

  const [deleteCart, setDeleteCart] = useState(false);
  const { data: wishtlistData } = useGetWishlistDataQuery();
  const getData = async () => {
    const config = {
      headers: {
        authorization: globleuser?.data?.token,
      },
    };
    const res = { data: wishtlistData };
    setWishlist(res?.data?.data);
  };
  useEffect(() => {
    getData();
  }, [deleteCart, wishtlistData]);
  const [tab, setTab] = useState('Vendor');
  return (
    <Layout>
      <div
        className={`${Styles.main_content}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '95%',
          marginTop: windowWidth > 900 ? '' : '60px',
        }}
      >
        <div className={Styles.shoppingCartCard}>
          <div className={Styles.shoppingCartCardHead}>
            <h1
              onClick={() => setTab('Vendor')}
              style={
                tab === 'Vendor'
                  ? {
                      background: '#B6255A',
                      color: 'white',
                      border: '1px solid #B6255A',
                    }
                  : {}
              }
            >
              Vendors
            </h1>
            <h1
              onClick={() => setTab('Venue')}
              style={
                tab === 'Venue'
                  ? {
                      background: '#B6255A',
                      color: 'white',
                      border: '1px solid #B6255A',
                    }
                  : {}
              }
            >
              Venue
            </h1>
            <h1
              onClick={() => setTab('Shopping')}
              style={
                tab === 'Shopping'
                  ? {
                      background: '#B6255A',
                      color: 'white',
                      border: '1px solid #B6255A',
                    }
                  : {}
              }
            >
              Shopping Cart
            </h1>
          </div>
          <div
            className={Styles.wishlistGrid}
            style={{
              display: tab === 'Vendor' ? 'grid' : 'none',
              gap: '50px',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {wishlist?.filter((item1) => item1.product.type === 'Vendor')
              .length ? (
              wishlist
                ?.filter((item1) => item1.product.type === 'Vendor')
                .map((item, key) => {
                  return (
                    <WishlistCard
                      item={item}
                      key={key}
                      setDeleteCart={setDeleteCart}
                      deleteCart={deleteCart}
                    ></WishlistCard>
                  );
                })
            ) : (
              <h5 style={{ width: '100%', textAlign: 'center' }}>
                No Data Found
              </h5>
            )}
          </div>
          <div
            className={Styles.wishlistGrid}
            style={{
              display: tab === 'Venue' ? 'grid' : 'none',

              gap: '50px',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {wishlist?.filter((item1) => item1.product.type === 'Venue')
              .length ? (
              wishlist
                ?.filter((item1) => item1.product.type === 'Venue')
                .map((item, key) => {
                  return (
                    <>
                      {/* <VenueCard
                        data={item}
                        key={key}
                      /> */}
                      <WishlistCard
                        item={item}
                        key={key}
                        setDeleteCart={setDeleteCart}
                        deleteCart={deleteCart}
                      ></WishlistCard>
                    </>
                  );
                })
            ) : (
              <h5 style={{ width: '100%', textAlign: 'center' }}>
                No Data Found
              </h5>
            )}
          </div>
          <div
            className={Styles.wishlistGrid}
            style={{
              display: tab === 'Shopping' ? 'grid' : 'none',

              gap: '50px',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {wishlist?.filter((item1) => item1.product.type === 'Product')
              .length ? (
              wishlist
                ?.filter((item1) => item1.product.type === 'Product')
                .map((item, key) => {
                  return (
                    <WishlistCard
                      item={item}
                      key={key}
                      setDeleteCart={setDeleteCart}
                      deleteCart={deleteCart}
                      shopNow={true}
                    ></WishlistCard>
                  );
                })
            ) : (
              <h5 style={{ width: '100%', textAlign: 'center' }}>
                No Data Found
              </h5>
            )}
          </div>
        </div>
        {/* 
        <div className={Styles.shoppingCartCard}>
          <div className={Styles.shoppingCartCardHead}>
            <h1 style={{ marginBottom: '20px' }}>Venue</h1>
          </div>
        </div>
        <div className={Styles.shoppingCartCard}>
          <div className={Styles.shoppingCartCardHead}>
            <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
          </div>
          <div
            className={Styles.wishlistGrid}
            style={{
              display: 'grid',

              gap: '50px',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {wishlist?.filter((item1) => item1.product.type === 'Product')
              .length ? (
              wishlist
                ?.filter((item1) => item1.product.type === 'Product')
                .map((item, key) => {
                  return (
                    <WishlistCard
                      item={item}
                      key={key}
                      setDeleteCart={setDeleteCart}
                      deleteCart={deleteCart}
                      shopNow={true}
                    ></WishlistCard>
                  );
                })
            ) : (
              <h5 style={{ width: '100%', textAlign: 'center' }}>
                No Data Found
              </h5>
            )}
          </div>
        </div> */}
      </div>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Layout>
  );
};

export default Wishlist;
