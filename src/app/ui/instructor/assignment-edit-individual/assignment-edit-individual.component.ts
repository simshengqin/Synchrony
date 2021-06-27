import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assignment-edit-individual',
  templateUrl: './assignment-edit-individual.component.html',
  styleUrls: ['./assignment-edit-individual.component.scss']
})
export class AssignmentEditIndividualComponent implements OnInit {
  @Input() assignmentDocId: string;
  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {}

}
