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

  imageError : string;
  registerForm: FormGroup;
  userDetailsedit : User;
  // userList: any = [];
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
    console.log('ng on init');
    console.log(this._userservice.editId);
    this.id=this._userservice.editId;
    if (this.id)
    {

      console.log(this.id);
      this.getUpdatedUser();
    }
     

      
  }

  getUpdatedUser(){
    this._userservice.getUserData(this.id).subscribe(data=>{
      console.log(data);
      this.userDetailsedit=data[0];
      console.log(this.userDetailsedit);
    })
    this.registerForm.patchValue({
      fname: this.userDetailsedit.fname,
      lname: this.userDetailsedit.lname,
      email: this.userDetailsedit.email,
      mobile: this.userDetailsedit.mobile,
      state: this.userDetailsedit.state,
      country: this.userDetailsedit.country

   })
}

  onSubmit() {
    this.formSubmit = true;
   if (this.id) {
    if (this.registerForm.valid) {
      this._userservice.updateUser(this.registerForm.value,this.id).subscribe(data => {
        console.log(data)
        this.activeModal.close({success: true,id: data.id})
        this.getUpdatedUser() 
        this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this._router.navigate(['user-profile']);
      });
        
        // this._router.navigate(['/user-profile/'])
       },err => {
        console.log(err)
      });
    }
    }
    else {
      if (this.registerForm.valid) {
        this._userservice.addUsers(this.registerForm.value).subscribe(data => {
          console.log(data)
          this.activeModal.close({success: true,id: data.id})
          // this._router.navigate(['/user-profile/'])
         },err => {
          console.log(err)
        });
      }
    }

  }

  // onFileSelected(event: Event) {
  //   const file = (<HTMLInputElement>event.target).files[0];
  //   if (file) {
  //     this.registerForm.get('image1').patchValue(file.name);
  //     var reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(file);

  //   }
  //   onChange(event: Event) {
  //     const URL = window.URL || window.webkitURL;
  //     const Img = new Image();
  
  //     const file = (<HTMLInputElement>.event.target).files[0];
  //     Img.src = URL.createObjectURL(filesToUpload[0]);w
  
  //     Img.onload = (e: any) => {
  //       const height = e.path[0].height;
  //       const width = e.path[0].width;
  
  //       console.log(height,width);
  //   }

  // }

  onFileSelected(event: Event) {
    this.imageError=null;
    window.URL = window.URL;
    const file = (<HTMLInputElement>event.target).files[0];
    console.log(1);
    if (file) {
      
      this.registerForm.get('image1').patchValue(file.name);
      // var readerr = new FileReader();
      const img = new Image();
       img.src = window.URL.createObjectURL( file );
       console.log(2);
       const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          if( width > 310 && height > 325 ) {
                 console.log(width); 
                 console.log(height);
                 this.registerForm.get('image').patchValue('../../assets/images/user-default-img.jfif');
                   this.imageError=("Please upload an image with in 310*325px resolution");
                 } 
          console.log('Width and Height', width, height);
        } ;
      };
      //  readerr.onload = () => {
      //    console.log(3);
      //    setTimeout(() => {
      //    const width = img.naturalWidth;
      //    const height = img.naturalHeight;

      //    window.URL.revokeObjectURL( img.src );
      //   console.log(width); 
      //     console.log(height);
      //    if( width > 310 && height > 325 ) {
      //     console.log(width); 
      //     console.log(height);
          
      //       alert("photo should be 310 x 325 size");
      //     }   
      //    }, 2000);
        
      //    };
         console.log(4);
       var readerr = new FileReader();
       readerr.onload = this._handleReaderLoaded.bind(this);
       readerr.readAsBinaryString(file);
      }
      }
      
  

  _handleReaderLoaded(readerEvt) {
    console.log(5);
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

  // editUser(userDetails,id){
  //   console.log(this.userDetails.id);
  //   this.registerForm.patchValue({
  //     fname: this.userDetails.fname,
  //     lname: this.userDetails.lname

  //   })
    
    
  //   // if (id)
  //   // {
  //   //   this._userservice.updateUser(this.userDetails.id).subscribe(data=>{
  //   //     alert(this.userDetails.fname + 'has been updated');
  //   //     this.userDetails=data;
  //   //   })

  //   // }else{
  //   //   this._userservice.addUsers(this.userDetails.id).subscribe(data=>{
  //   //     alert(this.userDetails.fname + 'has been added');
  //   //     this.userDetails=data;
  //   //   })
  //   // }
  // }
}
