import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ball-spin-fade-load',
  templateUrl: './ball-spin-fade-load.component.html',
  styleUrls: ['./ball-spin-fade-load.component.scss']
})
export class BallSpinFadeLoadComponent implements OnInit {
  @Input() show: boolean;
  @Input() smallSpin: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
