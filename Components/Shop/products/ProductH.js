import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

function ProductH(props) {
  const router = useRouter();
  const price = 10000;
  let percentOff;
  let offPrice = `${props.data.productPrice} Rs`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{props.data.productPrice} Rs</del>{" "}
        {props.data.productPrice -
          (props.percentOff * props.data.productPrice) / 100}{" "}
        Rs
      </>
    );
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <Link
            href={{
              pathname: `/products/${props.data.productName
                .toLowerCase()
                .replaceAll(" ", "-")}/${props.data._id}`,
              query: { uid: props.uid },
            }}
            passHref
          >
            <div className="col-4">
              {percentOff}
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt=""
                src={`${S3PROXY}${props.data.images[0]}`}
              />
            </div>
          </Link>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {props.data.productName}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button
                    className="btn btn-outline-dark ms-auto"
                    onClick={() => {
                      // props.uid
                      //   ? AddToCart(props.data, props.uid).then(() =>
                      //       alert("Item added. Check your cart to buy now!")
                      //     )
                      //   : router.push("/customer-login");
                    }}
                  >
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
