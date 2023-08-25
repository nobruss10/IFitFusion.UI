import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/settings/settings.service';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
  }

}
