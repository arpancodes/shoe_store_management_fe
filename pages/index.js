import Image from "next/image";
import { useEffect, useState } from "react";
import { API } from "../utils/contants";
import { shimmer, toBase64 } from "../utils/utils";
import Link from "next/link";
import Title from "../components/Title";
import Header from "../components/Header";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [tab, setTab] = useState("SHOES");
  const [search, setSearch] = useState("");

  const fetchShoes = async () => {
    try {
      const response = await fetch(`${API}/shoes?search=${search}`);
      const data = await response.json();
      setShoes(data.data);
    } catch (e) {
      console.log(e);
    }
  };

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

    const fetchShoes = async () => {
      try {
        const response = await fetch(`${API}/shoes?search=${search}`);
        const data = await response.json();
        setShoes(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (tab === "SHOES") {
      fetchShoes();
    } else {
      fetchShops();
    }
  }, [tab, search]);
  return (
    <div>
      <Header />
      <Title title="" noBack={true} />
      <div className="w-5/6 mx-auto">
        <div className="flex gap-2 w-fit py-2 border-b mb-10">
          <button className="px-4 border-r" onClick={() => setTab("SHOES")}>
            All Shoes
          </button>
          <button className="px-4" onClick={() => setTab("SHOPS")}>
            All Shops
          </button>
        </div>
        {tab === "SHOPS" ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
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
        ) : (
          <div>
            <div className="flex border mb-5">
              <input
                className="w-full py-2 px-4"
                placeholder="Search for a shoe"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />{" "}
              <button onClick={fetchShoes} className="p-2 border-l">
                Search
              </button>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {shoes.length > 0 &&
                shoes.map((shoe) => (
                  <Link
                    href={`/shop/${shoe.shop_id}/shoe/${shoe.id}`}
                    key={shoe.id}
                  >
                    <a className="border rounded-xl">
                      <div className="w-100 rounded-xl">
                        <Image
                          src={shoe.image}
                          placeholder="blur"
                          width={500}
                          height={300}
                          className="rounded-xl overflow-hidden"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(700, 475)
                          )}`}
                          alt={shoe.brand}
                        />
                      </div>
                      <div className="px-2 py-2">
                        <h2 className="text-xl">{shoe.brand}</h2>
                        <p className="text-sm">{shoe.description}</p>
                        <p className="text-sm">Rs. {shoe.cost}</p>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
