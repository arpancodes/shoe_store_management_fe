import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { API, numberWithCommas } from "../../../utils/contants";
import { shimmer, toBase64 } from "../../../utils/utils";
import Title from "../../../components/Title";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";

const Shop = ({ router }) => {
  const { id } = router.query;
  const [shoes, setShoes] = useState([]);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchShopDetails = async () => {
        try {
          const response = await fetch(`${API}/shops/${id}`);
          const data = await response.json();
          console.log(data);
          setShoes(data.data.shoes);
          setShop(data.data.shop);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };
      fetchShopDetails();
    }
  }, [id]);

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <Header />
      <Title title={`All outlets`} />
      <div className="md:w-5/6 w-full my-4 h-100 after:absolute after:opacity-70 after:bg-gray-900 after:top-0 after:left-0 after:w-full after:h-full relative transition-opacity flex mx-auto">
        <Image
          src={shop.image}
          width={1200}
          height={300}
          alt={shop.name}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-white font-bold text-6xl">{shop.name}</h2>
          <p className="text-white text-sm italic">{shop.tagline}</p>
          <p className="text-white">{shop.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 w-5/6 mx-auto md:grid-cols-3">
        {shoes.length > 0 &&
          shoes.map((shoe) => (
            <Link
              href={`/shop/${id}/shoe/${shoe.id}`}
              className="border rounded-xl"
              key={shoe.id}
            >
              <a>
                <div className="">
                  <Image
                    src={shoe.image}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    width={400}
                    height={300}
                    className="rounded-xl overflow-hidden"
                    alt={shoe.name}
                  />
                </div>
                <div className="px-2 py-1 flex items-center justify-between">
                  <div className="w-2/3">
                    <h2 className="text-xl">{shoe.brand}</h2>
                    <p className="text-sm">{shoe.description}</p>
                  </div>
                  <p>Rs. {numberWithCommas(shoe.cost)}</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default withRouter(Shop);
