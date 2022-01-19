import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "next/router";
import { API, numberWithCommas } from "../../../../utils/contants";
import { shimmer, toBase64 } from "../../../../utils/utils";
import Image from "next/image";
import Link from "next/link";
import Title from "../../../../components/Title";
import Header from "../../../../components/Header";
import { BagContext, BagDispatchContext } from "../../../../context/bag";

const Shoe = ({ router }) => {
  const bagDetails = useContext(BagContext);
  const setBagDetails = useContext(BagDispatchContext);
  const { id, shoeid } = router.query;
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [alreadyInBag, setAlreadyInBag] = useState(false);

  useEffect(() => {
    if (id && shoeid) {
      const fetchShopDetails = async () => {
        try {
          const response = await fetch(`${API}/shops/${id}/shoes/${shoeid}`);
          const data = await response.json();
          setShoe(data.data.shoe);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };
      fetchShopDetails();
    }
  }, [id, shoeid]);

  useEffect(() => {
    console.log(bagDetails);
    if (bagDetails.length > 0) {
      const shoe = bagDetails.find((item) => item.shoe.id === Number(shoeid));
      if (shoe) {
        setAlreadyInBag(true);
      }
    }
  }, [bagDetails, shoeid]);

  const handleAddToBag = () => {
    localStorage.setItem(
      "bag",
      JSON.stringify([...bagDetails, { shoe, quantity }])
    );
    setBagDetails([...bagDetails, { shoe, quantity }]);
  };

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <Header />
      <Title title={`${shoe.shop_name}`} />
      <div className="flex flex-wrap p-3 gap-4 justify-center">
        <div className="max-w-full">
          <Image
            src={shoe.image}
            placeholder="blur"
            width={700}
            height={500}
            className="rounded-xl overflow-hidden"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            alt={shoe.brand}
          />
        </div>
        <div className="px-4 w-full md:w-1/2">
          <h2 className="md:text-6xl text-4xl">{shoe.brand}</h2>
          <h2 className="my-2 text-sm italic">{shoe.description}</h2>
          <div className="flex gap-4">
            <h2 className="my-2 border flex max-w-fit p-2 gap-2">
              <span
                className={`w-6 h-6 ${
                  shoe.color === "brown"
                    ? "bg-yellow-900"
                    : shoe.color === "dark green"
                    ? "bg-green-900"
                    : shoe.color === "pink"
                    ? "bg-pink-600"
                    : shoe.color === "black and white"
                    ? "bg-gradient-to-r from-neutral-50 to-neutral-900"
                    : shoe.color === "white"
                    ? "bg-gray-100"
                    : shoe.color === "black"
                    ? "bg-black"
                    : shoe.color === "blue"
                    ? "bg-blue-600"
                    : shoe.color === "rainbow"
                    ? "bg-gradient-to-r from-blue-500 via-yellow-500 to-pink-500"
                    : shoe.color === "yellow"
                    ? "bg-yellow-600"
                    : shoe.color === "green"
                    ? "bg-green-600"
                    : shoe.color === "off-white"
                    ? "bg-stone-200"
                    : shoe.color === "deep blue"
                    ? "bg-blue-900"
                    : ""
                } block`}
              ></span>
              {shoe.color}
            </h2>
            <h2 className="my-2 border w-20 text-center p-2">
              Size: {shoe.size}
            </h2>
          </div>
          <h2 className="my-2 text-xl">Rs. {numberWithCommas(shoe.cost)}</h2>
          {alreadyInBag ? (
            <Link href="/bag">
              <a className="border w-full px-2 py-4 block my-2 text-gray-800 bg-white cursor-pointer">
                Added in Bag (see Bag)
              </a>
            </Link>
          ) : (
            <div className="flex items-stretch">
              <div className="w-1/4 border flex items-center">
                <button
                  className="border flex-1 disabled:bg-gray-200 h-full"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <p className="flex-1 text-center text-xl">{quantity}</p>
                <button
                  className="border flex-1 h-full"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToBag}
                className="border px-2 py-4 w-full text-white bg-gray-800 cursor-pointer"
              >
                Add to Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Shoe);
