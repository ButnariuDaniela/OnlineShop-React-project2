export class ProductService {
  getProductsSmall() {
    return fetch("data/products-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProducts() {
    return fetch("http://localhost:3000/data/productsTemp.json")
      .then((res) => res.json())
      .then((d) => console.log(d.data));
  }

  getProductsWithOrdersSmall() {
    return fetch("data/products-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
