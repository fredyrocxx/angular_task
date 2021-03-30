import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { User } from 'src/app/user';
import { DomSanitizer } from '@angular/platform-browser';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id = null;
  profileImage: string;
  usernamehere="freddi here";
  public userDetails : User;  
  constructor( private sanitizer:DomSanitizer,private _modalCtrl: NgbModal,private _route: ActivatedRoute, private _userService: UserService) {
    this.id = +this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    
    console.log(this.id);
     this._userService.getUserData(this.id).subscribe(data=>{
      console.log(data);
    
      this.userDetails=data[0];
      // console.log(this.userDetails.image1)
      // this.profileImage = this.userDetails.image1;
      // console.log(this.profileImage);
      // this.registerForm.get('image1').patchValue('data:image/png;base64,' + atob(binaryString));
  })
}
// transform(){
//   return this.sanitizer.bypassSecurityTrustResourceUrl(this.profileImage);
// }
 
  profileEdit() {
   

    const modal= this._modalCtrl.open(ManageUserComponent,{size: 'lg'});
    modal.componentInstance.id=null; 
    modal.componentInstance.section='profile-data'; 
   
    this._userService.editId=this.id;
 
   }

}
