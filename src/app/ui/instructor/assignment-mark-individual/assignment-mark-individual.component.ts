import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-assignment-mark-individual',
  templateUrl: './assignment-mark-individual.component.html',
  styleUrls: ['./assignment-mark-individual.component.scss']
})
export class AssignmentMarkIndividualComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  constructor() {}
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    console.log(response);
  }
  onFeedback(feedback: string) {
    console.log(feedback);
  }

}
