import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ManageUserComponent } from '../user/manage-user/manage-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    autoplay: false,
    speed: 1500,
     pagination: {
       el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    }
  };

  public slideImages=[{
    name: '../../assets/images/1.jfif',
    altText: 'Image 1'
  },
  {
    name: '../../assets/images/1.jpg',
    altText: 'Image 2'
  }]

  constructor(private _modalCtrl: NgbModal, private _router: Router) { }
  ngOnInit() {
  }

  onRegisterClick() {
   const modal= this._modalCtrl.open(ManageUserComponent,{size: 'lg'});
   modal.componentInstance.id=null; 
   modal.componentInstance.section='profile-data'; 
   modal.result.then(result=>{
     if(result.success) {
      this._router.navigate([`/manage-user/${result.id}`])
     }
   },err=> {
     console.log(err);
   })

  }

}
