import { BrowserModule,HAMMER_GESTURE_CONFIG  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManageUserComponent } from './user/manage-user/manage-user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatChipsModule  } from '@angular/material/chips';
import { MatIconModule, MatFormFieldModule, GestureConfig} from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManageUserComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SwiperModule,
    MatMenuModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
   
  ],
  providers: [UserService,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
