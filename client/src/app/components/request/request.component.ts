import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

export interface Action {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  registerItem: FormGroup;
  resolveSolicitation: FormGroup;

  actionControl = new FormControl('', [Validators.required]);
  actions: Action[] = [
    { value: 'approve', viewValue: 'Aprovar' },
    { value: 'refuse', viewValue: 'Recusar' }
  ];

  submittedItem = false;
  submittedResponse = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.registerItem = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
    });

    this.resolveSolicitation = this.formBuilder.group({
      observation: ['', [Validators.required]]
    })
  }

  get f() { return this.registerItem.controls; }
  get g() { return this.resolveSolicitation.controls; }

  onSubmitItem() {
    this.submittedItem = true;

    if (this.registerItem.invalid) {
      return;
    }
    console.log(this.registerItem.value)
    this.api.postProduct(this.registerItem.value).subscribe(_ => alert('Produto Adicionado com Sucesso!'))
  }

  onSubmitResponse() {
    this.submittedResponse = true;

    if (this.resolveSolicitation.invalid) {
      return;
    }

    let data = this.resolveSolicitation.value
    data.status = this.actionControl.value
    
    console.log(data)
    this.api.updateProduct(data, 1).subscribe(_ => alert('Produto Atualizado com Sucesso!'))
  }

}
