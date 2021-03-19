import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GigService } from '../gig.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() titleEvent = new EventEmitter<NgForm>();
  gigs: any = [];
  constructor(private gigService: GigService) {}

  ngOnInit(): void {}

  emitTitle = (form: NgForm) => {
    this.titleEvent.emit(form);
  };
}
