import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
    { value: 'approve', viewValue: 'Recusar' }
  ];

  submittedItem = false;
  submittedResponse = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerItem = this.formBuilder.group({
      nameRequester: ['', Validators.required],
      descriptionItem: ['', Validators.required],
      price: ['', [Validators.required]],
    });
    
    this.resolveSolicitation = this.formBuilder.group({
      actionControl: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    })
  }

  get f() { return this.registerItem.controls; }
  get g() { return this.resolveSolicitation.controls; }

  onSubmitItem() {
    this.submittedItem = true;

    if (this.registerItem.invalid) {
      return;
    }

    alert('SUCCESS ADD!! :-)')
  }

  onSubmitResponse() {
    this.submittedResponse = true;

    if (this.resolveSolicitation.invalid) {
      return;
    }

    alert('SUCCESS RESPONSE!! :-)')
  }

}
