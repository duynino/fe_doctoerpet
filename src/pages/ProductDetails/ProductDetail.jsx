import React from 'react';
import HeaderPage from '../../components/header';
import FooterPage from '../../components/footer';
import Product from '../../components/Product/Product';


const ProductDetail = () => {
  return (
    <>
      <HeaderPage/>
        <div className="product-detail">
            <Product />
        </div>
      <FooterPage/>
    </>
  );
}

export default ProductDetail;