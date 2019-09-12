import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { Products } from "../../../models/products";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productList: Products[];

  constructor(private productService: ProductService, private toaster: ToastrService) {

  }

  ngOnInit() {
    this.productService.gerProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.productList.push(x as Products)
        })
      })

  }

  onEdit(product: Products) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    if (confirm('Are you sure you want delete')) {
      this.productService.deleteProduct($key);
      this.toaster.success('Success full operatiop', 'Producto ELimado')
    }
  }
}
