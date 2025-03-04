import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppComponent } from '../app.component';
import { QuestFormComponent } from '../quest-form/quest-form.component';
import { PhoenixComponent } from '../phoenix/phoenix.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from '../services/interceptor/error.interceptor';
import { LoaderInterceptor } from '../services/interceptor/loader/loader.interceptor';
import { SpinerComponent } from '../services/interceptor/loader/spiner/spiner.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [		
    AppComponent,
      QuestFormComponent,
      PhoenixComponent,
      SpinerComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
