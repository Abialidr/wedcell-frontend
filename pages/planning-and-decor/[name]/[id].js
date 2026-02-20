import DecoreDetail from "Components/DetailPages/DecoreDetail/DecoreDetail";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
// import ProductDetail1 from '../../Components/newDetailsPage/shopnow/ProductDetail1';
import { Spinner } from "react-bootstrap";
import {
  useGetAllDecoreQuery,
  useGetAllRemaningDecoreQuery,
  useGetOneProductQuery,
  useLazyGetAllRemaningDecoreQuery,
} from "redux/Api/common.api";
function Details() {
  const router = useRouter();
  const queryData = router.query;
  const givenSize = router.query.size;
  const variantId = router.query.variantId;
  const [rv, setRv] = useState();
  const { data: allVendors, refetch: vendorFetch } = useGetAllDecoreQuery({
    _id: queryData.id,
  });
  let data = undefined;
  data = allVendors?.data[0];
  const [getAll] = useLazyGetAllRemaningDecoreQuery();

  useEffect(() => {
    if (allVendors) {
      (async () => {
        const hello = await getAll({
          _id: data.vendor_id,
        });
        console.log(hello, "asasasasas");
        setRv(
          hello?.data?.data?.filter((d) => {
            return d._id !== data._id;
          })
        );
      })();
    }
  }, [allVendors]);

  return data ? (
    <DecoreDetail
      alldata={data}
      rv={rv}
      givenSize={givenSize}
      variantId={variantId}
    ></DecoreDetail>
  ) : (
    <div
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner></Spinner>
    </div>
  );
}

export default Details;
