import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';

export interface Action {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products;
  filterValue = '';
  previousPage: any;
  subscribeProduct = products => this.products = products
  actionControl = new FormControl('');
  actions: Action[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'approve', viewValue: 'Aprovados' },
    { value: 'refuse', viewValue: 'Recusados' },
    { value: 'pending', viewValue: 'Pendentes' }
  ];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProductsParams().subscribe(this.subscribeProduct)
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue
    this.api.getProductsParams(this.filterValue.trim().toLowerCase(), this.actionControl.value).subscribe(this.subscribeProduct)
  }

  selectOption() {
    this.api.getProductsParams(this.filterValue.trim().toLowerCase(), this.actionControl.value).subscribe(this.subscribeProduct)
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.api.getProductsParams(this.filterValue.trim().toLowerCase(), this.actionControl.value, page).subscribe(this.subscribeProduct)
    }
  }
}
