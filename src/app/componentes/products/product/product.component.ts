import { Component, OnInit } from '@angular/core';
// Este es el setvicio
import { ProductService } from '../../../services/product.service'
import { NgForm } from '@angular/forms';
// Product Class
import { Products } from "../../../models/products";
// importando el toaster
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productosService: ProductService,private toastr:ToastrService) { }

  ngOnInit() {
    this.productosService.gerProducts();
    this.restForm();
  }

  restForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productosService.selectedProduct = new Products();
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      this.productosService.insertProduct(productForm.value);
      this.toastr.success('Se añadio correctamente','Elemento añadido')
    } else {
      this.productosService.updateProducts(productForm.value);
      this.toastr.success('Se edito correctamente','Elemento actualizado');
      
    }
    this.restForm(productForm);

  }
}
