import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  classBounceInRight = true
  classBounceOutLeft = false
  classShake = false

  submittedItem = false;
  submittedResponse = false;
  profile: string;
  productPending: any;
  loadingNewProduct: boolean = false;
  loadingUpdateProduct: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerItem = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
    });
    this.resolveSolicitation = this.formBuilder.group({
      observation: [{ value: '', disabled: true }, [Validators.required]]
    })
    const profileStorage = localStorage.getItem('profile')
    this.profile = profileStorage ? profileStorage : 'requester'
    if (this.profile === 'approver') this.configApprover()
  }

  get f() { return this.registerItem.controls; }
  get g() { return this.resolveSolicitation.controls; }


  configApprover() {
    this.registerItem.controls['name'].disable()
    this.registerItem.controls['description'].disable()
    this.registerItem.controls['price'].disable()
    this.actionControl.setValue(' ')
    this.resolveSolicitation.controls['observation'].setValue(' ')
    this.api.getProductPending().subscribe(
      product => {
        this.productPending = product
        if (Object.keys(this.productPending).length === 0) {
          this.openSnackBar(`Nenhuma Solicitação Pendente no Momento`)
          this.actionControl.disable()
        } else {
          this.actionControl.enable()
        }
        this.registerItem.controls['name'].setValue(this.productPending.name)
        this.registerItem.controls['description'].setValue(this.productPending.description)
        this.registerItem.controls['price'].setValue(this.productPending.price)
      }, error => {
        console.log(error)
      })
  }

  onSubmitItem() {
    this.submittedItem = true;
    if (this.validString(this.registerItem.controls['name'].value))
      this.registerItem.controls['name'].setValue('')
    if (this.validString(this.registerItem.controls['description'].value))
      this.registerItem.controls['description'].setValue('')
    if (this.registerItem.controls['price'].value === 0
      || this.registerItem.controls['price'].value === ' ') {
      this.registerItem.controls['price'].setValue('')
    }
    if (this.registerItem.invalid) return
    this.loadingNewProduct = true;
    this.api.postProduct(this.registerItem.value).subscribe(_ => {
      this.submittedItem = false;
      this.loadingNewProduct = false;
      this.openSnackBar(`${this.registerItem.controls['name'].value}, o produto foi solicitado com sucesso.`)
      this.registerItem.reset()
      this.registerItem.controls['name'].setValue(' ')
      this.registerItem.controls['name'].updateValueAndValidity()
      this.registerItem.controls['description'].setValue(' ')
      this.registerItem.controls['description'].updateValueAndValidity()
      this.registerItem.controls['price'].setValue(' ')
      this.registerItem.controls['price'].updateValueAndValidity()
      this.animationCardSucess()
    }, error => {
      alert(error)
      this.loadingNewProduct = false;
    })
  }

  validString(text: string): boolean {
    return text.replace(/ /g, '').length === 0
  }

  selectOption() {
    if (this.actionControl.value === 'refuse') {
      this.resolveSolicitation.controls['observation'].enable()
      this.resolveSolicitation.controls['observation'].setValidators([Validators.required])
      this.resolveSolicitation.controls['observation'].updateValueAndValidity()
    }
    if (this.actionControl.value === 'approve') {
      this.resolveSolicitation.controls['observation'].disable()
      this.resolveSolicitation.controls['observation'].setValue(' ')
      this.resolveSolicitation.controls['observation'].clearValidators()
    }
  }

  onSubmitResponse() {
    this.submittedResponse = true;
    if (this.validString(this.actionControl.value))
      this.actionControl.setValue('')
    if (this.validString(this.resolveSolicitation.controls['observation'].value))
      this.resolveSolicitation.controls['observation'].setValue('')
    if (this.resolveSolicitation.invalid || this.actionControl.invalid) {
      return
    }
    this.loadingUpdateProduct = true
    let data = {};
    data['status'] = this.actionControl.value;
    if (this.resolveSolicitation.value.observation !== "") data['observation'] = this.resolveSolicitation.value.observation
    if (this.productPending) {
      this.api.updateProduct(data, this.productPending.id).subscribe(_ => {
        this.resolveSolicitation.controls['observation'].disable()
        this.loadingUpdateProduct = false
        this.configApprover()
        this.openSnackBar(`A solicitação do produto foi respondida com sucesso!`)
        this.animationCardSucess()
      }, error => {
        alert(error)
        this.loadingUpdateProduct = false
      })
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2500,
    });
  }

  animationCardSucess() {
    this.classBounceInRight = false
    this.classBounceOutLeft = true
    setTimeout(_ => {
      this.classBounceOutLeft = false
      this.classBounceInRight = true
    }, 500)
  }

}
