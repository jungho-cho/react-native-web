import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";
import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(() => {
    const productsUrl = `${API_URL}/products`;
    axios
      .get(productsUrl)
      .then(function (result) {
        setProducts(result.data.products);
      })
      .catch(function (error) {
        console.error(`Error = ${error}`);
      });

    const bannersUrl = `${API_URL}/banners`;
    axios
      .get(bannersUrl)
      .then((result) => {
        setBanners(result.data.banners);
        console.log(result.data.banners);
      })
      .catch((error) => {
        console.error("get banners error : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      {/* <div id="banner">
        <img src="images/banners/banner1.png" />
      </div> */}
      <h1>판매되는 상품들</h1>
      <div id="product-list">
        {products.map((product, index) => {
          const { name, price, seller, imageUrl, id, createdAt } = product;
          return (
            <Link className="product-link" to={"/products/" + id} key={id}>
              <div className="product-card">
                <img className="product-image" src={`${API_URL}/${imageUrl}`} />
                <div className="product-contents">
                  <span className="product-name">{name}</span>
                  <span className="product-price">{price} 원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                      />
                      <span>{seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(createdAt).fromNow()}
                    </span>
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
