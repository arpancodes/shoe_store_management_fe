import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FaUserAlt, FaShoppingBag, FaReceipt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { UserContext, UserDispatchContext } from "../context/user";
import { API } from "../utils/contants";

const Header = () => {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API}/auth/logout`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setUserDetails(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-gray-100">
      <header className="flex items-center justify-between md:w-5/6 w-full mx-auto p-4">
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <span className="ml-2 text-sm">Shoe Verse</span>
          </a>
        </Link>
        <nav>
          <div className="flex items-center content-center">
            <Link href="/bag">
              <a className="px-2 py-1">
                <FaShoppingBag className="text-3xl mx-2" />
              </a>
            </Link>
            {userDetails ? (
              <>
                <Link href="/orders">
                  <a className="px-2 py-1">
                    <FaReceipt className="text-3xl mx-2" />
                  </a>
                </Link>
                <p className="flex items-center">
                  Hello, {userDetails.fname}{" "}
                  <FiLogOut
                    className="text-3xl mx-2 cursor-pointer"
                    onClick={handleLogout}
                  />
                </p>
              </>
            ) : (
              <Link href="/login">
                <a className="px-2 py-1">
                  <FaUserAlt className="text-3xl mx-2" />
                </a>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
