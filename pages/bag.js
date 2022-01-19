import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { API } from "../utils/contants";
import Header from "../components/Header";
import Title from "../components/Title";
import { BagContext, BagDispatchContext } from "../context/bag";
import { UserContext } from "../context/user";
import { numberWithCommas } from "../utils/contants";

const Bag = () => {
  const bagDetails = useContext(BagContext);
  const setBagDetails = useContext(BagDispatchContext);
  const userDetails = useContext(UserContext);

  const placeOrder = async () => {
    const items = bagDetails.map((item) => {
      return {
        id: item.shoe.id,
        quantity: item.quantity,
      };
    });

    try {
      const response = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setBagDetails([]);
        alert("Order placed successfully");
        localStorage.removeItem("bag");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const increaseQuantity = (id) => {
    const newBagDetails = bagDetails.map((item) => {
      if (item.shoe.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBagDetails(newBagDetails);
    localStorage.setItem("bag", JSON.stringify(newBagDetails));
  };

  const decreaseQuantity = (id) => {
    const newBagDetails = bagDetails.map((item) => {
      if (item.shoe.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBagDetails(newBagDetails);
    localStorage.setItem("bag", JSON.stringify(newBagDetails));
  };

  return (
    <div>
      <Header />
      <Title title="Your Shoe Bag" />
      {bagDetails.length > 0 ? (
        <div className="flex md:w-5/6  mx-auto flex-wrap p-3 gap-4 justify-center">
          {bagDetails.map((bagItem) => (
            <div key={bagItem.shoe.id} className="w-full border rounded-xl p-3">
              <div className="flex">
                <Image
                  src={bagItem.shoe.image}
                  alt={bagItem.shoe.name}
                  className="w-1/4"
                  height={200}
                  width={200}
                />
                <div className=" w-3/4 px-2">
                  <h3 className="text-xl font-bold">{bagItem.shoe.brand}</h3>
                  <p className="text-sm">{bagItem.shoe.price}</p>
                  <p className="text-sm">{bagItem.shoe.description}</p>
                  <div className="w-32 mt-6  border h-10 flex items-center">
                    <button
                      className="border flex-1 disabled:bg-gray-200 h-full"
                      disabled={bagItem.quantity === 1}
                      onClick={() => decreaseQuantity(bagItem.shoe.id)}
                    >
                      -
                    </button>
                    <p className="flex-1 text-center text-xl">
                      {bagItem.quantity}
                    </p>
                    <button
                      className="border flex-1 h-full"
                      onClick={() => increaseQuantity(bagItem.shoe.id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mb-6 text-sm">
                    x Rs. {numberWithCommas(bagItem.shoe.cost)}
                  </p>

                  <p className="font-bold text-xl">
                    Rs. {numberWithCommas(bagItem.quantity * bagItem.shoe.cost)}
                  </p>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      localStorage.setItem(
                        "bag",
                        JSON.stringify(
                          bagDetails.filter(
                            (item) => item.shoe.id !== bagItem.shoe.id
                          )
                        )
                      );
                      setBagDetails(
                        bagDetails.filter(
                          (item) => item.shoe.id !== bagItem.shoe.id
                        )
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="border my-2 w-full"></div>
          <div className="w-full flex justify-between">
            <p className="text-xl font-bold">Total</p>
            <p className="text-xl font-bold">
              Rs.{" "}
              {numberWithCommas(
                bagDetails.reduce((a, b) => {
                  return a + b.quantity * b.shoe.cost;
                }, 0)
              )}
            </p>
          </div>
          <div className="border my-2 w-full"></div>
          <div className="flex justify-end w-full">
            {userDetails ? (
              <button
                onClick={placeOrder}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Place Order
              </button>
            ) : (
              <Link href={"/login"}>
                <a className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                  Login to place order!
                </a>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center pt-64">
          <h2>
            Your shoe bag is empty, start filling it up{" "}
            <Link href={"/"}>
              <a className="underline">here</a>
            </Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Bag;
