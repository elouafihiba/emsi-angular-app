import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../modele/product.modele";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.productService.getProducts(1,2)
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })
    // this.products$=this.productService.getProducts();

  }

  constructor(private productService: ProductService) {

  }

  handleCheckProduct(product: Product) {
    this.productService.checkProducts(product)
      .subscribe({
        next: updatedProduct => {
          product.checked = !product.checked;
          this.getProducts();

        }
      })
  }

  handleDelete(product: Product) {
    if (confirm("Are you sure?"))
      this.productService.deleteProducts(product)
        .subscribe({
          next: value => {
            // this.getProducts();
            this.products = this.products.filter(p => p.id != product.id)
          }
        })
  }


  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next: value => {
        this.products = value;
      }
    })
  }
}
