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
  filter;
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
    this.api.getProductsParams(filterValue.trim().toLowerCase(), this.actionControl.value).subscribe(this.subscribeProduct)
  }

  selectOption(filterValue: string) {
    this.api.getProductsParams(filterValue.trim().toLowerCase(), this.actionControl.value).subscribe(this.subscribeProduct)
  }
}
