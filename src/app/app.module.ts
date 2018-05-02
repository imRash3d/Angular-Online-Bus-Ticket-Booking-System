import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { SelectBusComponent } from './user/select-bus/select-bus.component';
import { SelectSeatComponent } from './user/select-seat/select-seat.component';
import { BusSearchResultComponent } from './user/bus-search-result/bus-search-result.component';
import { SelectBusService } from './user/services/selectBus.service';
import { UserFormComponent } from './user/user-form/user-form.component';
import { BookingService } from './user/services/booking.service';
import { UserService } from './user/services/user.service';
import { PrintComponent } from './user/print/print.component';

const userRoute:Routes=[
{path:'',component:SelectBusComponent},
{path:'search',component:BusSearchResultComponent},
{path:'user-form',component:UserFormComponent},
{path:'print',component:PrintComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    SelectBusComponent,
    SelectSeatComponent,
    BusSearchResultComponent,
    UserFormComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(userRoute),
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    SelectBusService,
    BookingService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
