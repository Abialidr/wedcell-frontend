import ProductDetail1 from 'Components/DetailPages/shopnow/ProductDetail1';
import { useRouter } from 'next/router';
// import ProductDetail1 from '../../Components/newDetailsPage/shopnow/ProductDetail1';
import { Spinner } from 'react-bootstrap';
import { useGetOneProductQuery } from 'redux/Api/common.api';
function Details() {
  const router = useRouter();
  const queryData = router.query;
  const givenSize = router.query.size;
  const variantId = router.query.variantId;
  const { data: productData } = useGetOneProductQuery(queryData.id);
  const data = productData?.data;
  return data ? (
    <ProductDetail1
      alldata={data}
      givenSize={givenSize}
      variantId={variantId}
    ></ProductDetail1>
  ) : (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner></Spinner>
    </div>
  );
}

export default Details;
