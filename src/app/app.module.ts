import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/menu/menu.component';
import { SubMenuComponent } from './core/sub-menu/sub-menu.component';
import { HomeComponent } from './home/home.component';
import { SharedComponent } from './shared/shared-component/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentComponent } from './content/content.component';
import { AppMainSharedModule } from './components/shared/common/main-shared.module';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SubMenuComponent,
    SharedComponent,
    ContentComponent,
    LoginComponent,
    // FooterComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule,
    AppMainSharedModule
  ],
  // providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }], //removing # from production
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], //adding # from production
  bootstrap: [AppComponent]
})
export class AppModule { }
