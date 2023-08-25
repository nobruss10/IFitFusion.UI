import { Component, Input, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/core/user-settings/user-settings.service';
@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.scss']
})
export class timeIntervalComponent implements OnInit {
  ratingValue: number = 0;
  constructor(
    private userSettingsService: UserSettingsService,
  ) { }

  ngOnInit(): void {
    let timeInterval = this.userSettingsService.getLoadInterval();
    if(!!timeInterval)
    this.ratingValue = timeInterval / 1000;
  }
  change(val){
    let miliseconds = val*1000;
    this.userSettingsService.setLoadInterval(miliseconds);
  }
}
