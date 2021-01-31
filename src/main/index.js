import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const url = "http://localhost:8080/products";
    axios
      .get(url)
      .then(function (result) {
        setProducts(result.data.products);
      })
      .catch(function (error) {
        console.error(`Error = ${error}`);
      });
  }, [products]);

  return (
    <div>
      <div id="banner">
        <img src="images/banners/banner1.png" />
      </div>
      <h1>판매되는 상품들</h1>
      <div id="product-list">
        {products.map((product, index) => {
          const { name, price, seller, imageUrl, id } = product;
          return (
            <Link className="product-link" to={"/products/" + id}>
              <div className="product-card">
                <img className="product-image" src={imageUrl} />
                <div className="product-contents">
                  <span className="product-name">{name}</span>
                  <span className="product-price">{price} 원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/avatar.png"
                    />
                    <span>{seller}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
