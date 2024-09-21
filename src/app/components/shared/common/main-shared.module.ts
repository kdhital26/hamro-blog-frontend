import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FooterComponent } from "src/app/footer/footer.component";
import { ButtonComponent } from "./button/button.component";
import { LoaderComponent } from "./loader/loader.component";
import { ModalComponent } from './modal/modal.component';
import { AppBaseComponent } from './app-base/app-base.component';
import { BsModalService } from "ngx-bootstrap/modal";

@NgModule({
    declarations:[
        ButtonComponent,
        LoaderComponent,
        FooterComponent,
        ModalComponent,
        AppBaseComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ButtonComponent,
        LoaderComponent,
        FooterComponent,

    ],
  providers : [BsModalService]

})

export class AppMainSharedModule{

}