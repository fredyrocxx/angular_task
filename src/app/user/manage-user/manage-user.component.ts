import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../user.service";
import { User } from "../../user";
import { CustomValidators } from 'src/app/custom-validators.service';





@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  registerForm: FormGroup;
  userList: any = [];
  message: string;
  interestList: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public formSubmit: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(public activeModal: NgbActiveModal, private _userservice: UserService, private _router: Router) {
  }
  @Input() id;

  ngOnInit() {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, CustomValidators.validateName]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email ]),
      mobile: new FormControl('', [Validators.required]),
      age: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      address: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      interests: new FormControl([]),
      image: new FormControl(null),
      image1: new FormControl(null, CustomValidators.validateImage),
      ischeck: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.formSubmit = true;
   if (this.id) {

    }
    else {
      if (this.registerForm.valid) {
        this._userservice.addUsers(this.registerForm.value).subscribe(data => {
          console.log(data)
          this.activeModal.close({success: true,id: data.id})
         },err => {
          console.log(err)
        });
      }
    }

  }
  onFileSelected(event: Event) {
    const file = (<HTMLInputElement>event.target).files[0];
    if (file) {
      this.registerForm.get('image1').patchValue(file.name);
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.registerForm.get('image').patchValue('data:image/png;base64,' + btoa(binaryString));
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interestList.push(value);
      this.registerForm.patchValue({
        interests: this.interestList
      })
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item): void {
    const index = this.interestList.indexOf(item);

    if (index >= 0) {
      this.registerForm.patchValue({
        interests: this.interestList
      })
    }
  }

  validationField(type: string, field: string) {
    return (
      this.registerForm.get(`${field}`).hasError(type) &&
      (this.registerForm.get(`${field}`).dirty ||
        this.registerForm.get(`${field}`).touched ||
        this.formSubmit)
    );
  }
}
