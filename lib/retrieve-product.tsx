import React from "react";
import products from '../products/products.json'

export function getAllProductHandles() {
  const productJson = products.products
  return productJson.map(product => {
    return {
      params: {
        handle: product.handle
      }
    }
  })
}

export function getProductData(handle) {
  const productJson = products.products
  const productSelected = productJson.filter((product) => product.handle == handle)[0]
    return {
        handle,
        ...productSelected
      }
}

