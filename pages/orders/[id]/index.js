import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useRouter, withRouter } from "next/router";
import { API } from "../../../utils/contants";
import Image from "next/image";
import Title from "../../../components/Title";

const Payment = ({ router }) => {
  const { id } = router.query;
  const routerObj = useRouter();
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  useEffect(() => {
    if (id) {
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(`${API}/orders/${id}`, {
            credentials: "include",
          });
          const data = await response.json();
          console.log(data.data);
          setOrderItems(data.data);
          setOrderTotal(
            data.data.reduce((acc, item) => {
              return acc + item.amount;
            }, 0)
          );
          setOrderStatus(data.data[0].status);
        } catch (e) {
          console.log(e);
        }
      };
      fetchOrderDetails();
    }
  }, [id]);

  const makePayment = async () => {
    if (!confirm("Are you sure you want to make payment?")) return;
    try {
      const response = await fetch(`${API}/orders/${id}/pay`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        routerObj.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <Title title={`Order No: ${id}`} />
      <div className="w-5/6 mx-auto">
        <div
          className={`w-fit -skew-x-12 px-1 my-4 ${
            orderStatus === "ORDERED"
              ? "bg-yellow-900"
              : orderStatus === "PAYMENT_RECEIVED"
              ? "bg-blue-900"
              : "bg-green-900"
          }`}
        >
          <div
            className={`w-fit -skew-x-6 p-2 my-4 ${
              orderStatus === "ORDERED"
                ? "bg-yellow-500"
                : orderStatus === "PAYMENT_RECEIVED"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            <span className="block text-white font-bold -skew-x-6">
              {orderStatus}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className=" w-1/2">
            {orderItems.length > 0 &&
              orderItems.map((item) => {
                return (
                  <div className="flex gap-3" key={item.shoe_id}>
                    <div>
                      <Image
                        src={item.image}
                        width={200}
                        height={200}
                        alt={item.brand}
                      />
                    </div>
                    <div className="py-5">
                      <p>
                        <span className="text-2xl font-bold">{item.brand}</span>
                      </p>
                      <p>
                        <span className=" italic text-sm">
                          {item.description}
                        </span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="font-bold">Rs. {item.amount}</span>
                      </p>
                      <p>
                        Quantity: <span>{item.quantity}</span>
                      </p>
                      <p>
                        Store: <span>{item.store_name}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className=" 1/5">
            {orderStatus === "PAYMENT_RECEIVED" ? (
              <p>Payment Made! Order will be delivered soon.</p>
            ) : orderStatus === "ORDERED" ? (
              <button
                onClick={makePayment}
                className=" px-4 py-3 text-white bg-zinc-900 cursor-pointer rounded-md"
              >
                Make payment of Rs. {orderTotal}
              </button>
            ) : (
              <p>Ordered was Delivered</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Payment);
