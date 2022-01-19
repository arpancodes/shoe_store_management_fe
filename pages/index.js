import Image from "next/image";
import { useEffect, useState } from "react";
import { API } from "../utils/contants";
import { shimmer, toBase64 } from "../utils/utils";
import Link from "next/link";
import Title from "../components/Title";
import Header from "../components/Header";

const Home = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch(`${API}/shops`);
        const data = await response.json();
        setShops(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchShops();
  }, []);
  return (
    <div>
      <Header />
      <Title title="" noBack={true} />
      <div className="grid grid-cols-1 gap-10 w-5/6 mx-auto md:grid-cols-3">
        {shops.length > 0 &&
          shops.map((shop) => (
            <Link href={`/shop/${shop.id}`} key={shop.id}>
              <a className="border rounded-xl">
                <div className="w-100 rounded-xl">
                  <Image
                    src={shop.image}
                    placeholder="blur"
                    width={500}
                    height={300}
                    className="rounded-xl overflow-hidden"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    alt={shop.name}
                  />
                </div>
                <div className="px-2 py-2">
                  <h2 className="text-xl">{shop.name}</h2>
                  <p className="text-sm">{shop.tagline}</p>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
