import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { User } from 'src/app/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id = 0;
  userDetails : User;  
  constructor(private _modalCtrl: NgbModal,private _route: ActivatedRoute, private _userService: UserService) {
    this.id = +this._route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    console.log();
     this._userService.getUserData(this.id).subscribe(data=>{
    //  console.log(data);
      this.userDetails=data;
  })
   }

  profileEdit() {
    const modal= this._modalCtrl.open(ManageUserComponent,{size: 'lg'});
    modal.componentInstance.id=null; 
    modal.componentInstance.section='profile-data'; 
 
   }

}
