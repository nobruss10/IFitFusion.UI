import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from './configuration';

@Injectable()
export class ConfigService {
  private configuration!: Configuration 
  constructor(private http: HttpClient) { }

  load(url: string) {
    return new Promise((resolve: any) => {
      this.http.get<Configuration>(url).subscribe((data) => {
        this.configuration = data;
        resolve();
      });
    });
  }

  getConfiguration(): Configuration {
    return this.configuration;
  }
}
