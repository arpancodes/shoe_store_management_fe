import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { API } from "../utils/contants";
import { UserContext, UserDispatchContext } from "../context/user";

const Login = () => {
  const router = useRouter();

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("m");

  useEffect(() => {
    if (userDetails) {
      router.push("/");
    }
  }, [userDetails, router]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email: newEmail,
          gender,
          address,
          phone,
          password: newPassword,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
      } else {
        setMessage(data.message);
      }
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.message);
      }
      if (data.message) {
        setMessage(data.message);
        setUserDetails(data.data);
      }
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Header />
      {error && (
        <div className="w-5/6 text-red-700 bg-red-200 border border-red-700 mt-2 mx-auto text-center p-2">
          {error}
        </div>
      )}
      {message && (
        <div className="w-5/6 text-green-700 bg-green-200 border border-green-700 mt-2 mx-auto text-center p-2">
          {message}
        </div>
      )}
      <div className="flex justify-center items-stretch flex-wrap">
        <div className="md:w-2/5 w-full mt-10">
          <h1 className="mb-10 border-b mx-10 py-4 text-xl tracking-widest">
            Login
          </h1>
          <form onSubmit={handleLoginSubmit} className="px-10">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border px-2 py-4 w-full"
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </div>

            <div className="mb-4">
              <input
                id="submit-login"
                type="submit"
                value="Login"
                className="border px-2 py-4 w-full text-white bg-gray-800 cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div className="md:w-px w-full md:min-h-screen h-px bg-gray-100"></div>
        <div className="md:w-2/5 w-full mt-10">
          <h1 className="mb-10 border-b mx-10 py-4 text-xl tracking-widest">
            Signup
          </h1>
          <form onSubmit={handleSignupSubmit} className="px-10">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fname"
              >
                First Name
                <input
                  id="fname"
                  type="text"
                  name="fname"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lname"
              >
                Last Name
                <input
                  id="lname"
                  type="text"
                  name="lname"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setLname(e.target.value)}
                  value={lname}
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
                <select
                  id="gender"
                  name="gender"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="o">Other</option>
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  min={10}
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
                <textarea
                  id="address"
                  name="phone"
                  rows={3}
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></textarea>
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
                <input
                  id="new-email"
                  type="email"
                  name="email"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={newEmail}
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
                <input
                  id="new-password"
                  type="password"
                  name="password"
                  className="border px-2 py-4 w-full"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </label>
            </div>

            <div className="mb-4">
              <input
                id="submit-signup"
                type="submit"
                value={"Signup"}
                className="border px-2 py-4 w-full text-white bg-gray-800 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
