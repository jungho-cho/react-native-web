import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams();
  const url = `${API_URL}/products/${id}`;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data.product);
        console.log(result.data.product);
      })
      .catch((error) => {
        console.error("error : " + error);
      });
  }, []);

  if (!product) {
    return <h1>상품 정보를 받고 있습니다....</h1>;
  }

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="created-at">
          {dayjs(product.createdAt).format("YYYY년MM월DD일")}
        </div>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
