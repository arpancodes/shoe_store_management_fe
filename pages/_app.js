import { UserProvider } from "../context/user";
import { BagProvider } from "../context/bag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <BagProvider>
        <Component {...pageProps} />
      </BagProvider>
    </UserProvider>
  );
}

export default MyApp;
