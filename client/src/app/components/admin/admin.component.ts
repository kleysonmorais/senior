import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface ControllerItem {
  id: number,
  createAt: Date,
  nameRequester: string;
  descriptionItem: string;
  price: number;
  status: string;
}

const ELEMENT_DATA: ControllerItem[] = [
  {
    id: 1,
    createAt: new Date(),
    nameRequester: "Cadeira",
    descriptionItem: "Estamos Precisando de Cadeiras",
    price: 15.5,
    status: "APROVADO"
  },
  {
    id: 1,
    createAt: new Date(),
    nameRequester: "Cadeira",
    descriptionItem: "Estamos Precisando de Cadeiras",
    price: 15.5,
    status: "APROVADO"
  },
  {
    id: 1,
    createAt: new Date(),
    nameRequester: "Cadeira",
    descriptionItem: "Estamos Precisando de Cadeiras",
    price: 15.5,
    status: "APROVADO"
  },
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['id', 'createAt', 'nameRequester', 'descriptionItem', 'price', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
