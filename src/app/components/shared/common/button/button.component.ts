import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterViewInit {
  @Input() btnLable: string = 'Button Name, Please';
  @Output() eventEmit = new EventEmitter<any>();
  @Input() addClass: string | undefined;
  @Input() style: any = {};
  @Input() disabled = false
  @Input() showLoader: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.showLoader)
  }

  emitValue(value: any) {
    this.eventEmit.emit(value);
  }

}
