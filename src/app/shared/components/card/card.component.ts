import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() description: string;
  @Input() imgUrl: string;
  @Input() sets: string;
  @Input() repetitions: number;
  @Input() weight : number;
  @Output() onDelete = new EventEmitter();
  @Input() deleteEnabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit({planExerciseId: this.id});
  }

}
