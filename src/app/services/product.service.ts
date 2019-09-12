import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Products = new Products();


  constructor(private firebase: AngularFireDatabase) { }

  gerProducts() {
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Products) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }
  updateProducts(product: Products) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }
  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
