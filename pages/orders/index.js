import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { API } from "../../utils/contants";
import { toBase64, shimmer } from "../../utils/utils";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API}/orders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  }, []);

  return (
    <div>
      <Header />
      <Title title="All Orders" />
      <div className="w-5/6 mx-auto">
        <div>
          {orders.map((order) => (
            <div className="flex gap-5" key={order.order_id}>
              <div>
                <Image
                  alt={order.brand}
                  src={order.image}
                  width={200}
                  height={200}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  placeholder="blur"
                />
              </div>
              <div>
                <Link href={`/orders/${order.order_id}`}>
                  <a className="text-black text-2xl underline mb-3 block">
                    Order #{order.order_id}
                  </a>
                </Link>
                <p>
                  {order.brand}
                  <span className="font-bold">
                    {order.total_items > 1 && ` + ${order.total_items - 1}`}
                  </span>
                </p>
                <p>
                  <span className="font-bold">Rs. {order.total_amount}</span>
                </p>
                <div
                  className={`w-fit -skew-x-12 px-1 ${
                    order.status === "ORDERED"
                      ? "bg-yellow-900"
                      : order.status === "PAYMENT_RECEIVED"
                      ? "bg-blue-900"
                      : "bg-green-900"
                  }`}
                >
                  <div
                    className={`w-fit -skew-x-6 p-2 ${
                      order.status === "ORDERED"
                        ? "bg-yellow-500"
                        : order.status === "PAYMENT_RECEIVED"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    <span className="block text-white font-bold text-xs -skew-x-6">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
