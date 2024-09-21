import { Component, Inject, inject, Injector, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss'],
})
export class AppBaseComponent {
  bsModalRef: BsModalRef | undefined
  private modalService: BsModalService;
  ngbModalOptions = {
    backdrop: "static",
    keyboard: true
  }
  constructor(
    @Inject(Injector) injector: Injector
  ) {
    this.modalService = injector.get(BsModalService)
   }

  public openModalWithComponent(modalContentComponent: any, data: any, className?: string) {
    const initialState: ModalOptions = {
      initialState: {
        data: data
      }
    };
    this.bsModalRef = this.modalService.show(
      modalContentComponent, 
        Object.assign({}, this.ngbModalOptions, { class: className }, initialState)
    );
  }

}
