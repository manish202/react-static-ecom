import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle,theme} from "./components/styles/GlobalStyle";
import Header from "./components/partials/Header";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Error404 from "./components/Error404";
import Footer from "./components/partials/Footer";
import {CartProvider} from "./components/partials/CartProvider";
import { Auth0Provider } from '@auth0/auth0-react';
const App = () => {
  return(
    <Auth0Provider domain={import.meta.env.VITE_AUTH_DOMAIN} clientId={import.meta.env.VITE_AUTH_CLIENTID} authorizationParams={{ redirect_uri: window.location.origin }} >
      <CartProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/single_product/:id" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </CartProvider>
    </Auth0Provider>
    )
}
export default App;