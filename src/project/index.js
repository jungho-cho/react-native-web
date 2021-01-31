import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

function ProductPage() {
  const { id } = useParams();
  const url = `http://localhost:8080/products/${id}`;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data);
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
        <img src={"/" + product.imageUrl} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="created-at">2020년 12월 8일</div>
        <div id="description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductPage;
