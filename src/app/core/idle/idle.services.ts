import { EventEmitter, Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';


@Injectable({
    providedIn: 'root'
})
export class IdleService {

    private _startTimeout = 5;
    private _inactivityTimeout = 14400;
    private _keepAliveInterval = 15;

    idleState = 'TIMEOUT_NOT_STARTED';
    timedOut = false;
    lastPing?: Date;
    countdown: number = 0;
    onTimeout: EventEmitter<any> = new EventEmitter();
    onTimeoutWarning: EventEmitter<any> = new EventEmitter();

    constructor(private idle: Idle, private keepalive: Keepalive, private configService: ConfigService) {
        this.config();
    }

    config() {
        const config = this.configService.getConfiguration();
        if (config.timeoutInterval) 
            this._inactivityTimeout = config.timeoutInterval;
        
        // sets an idle timeout of 5 seconds, for testing purposes.
        this.idle.setIdle(this._startTimeout);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(this._inactivityTimeout);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => this.idleState = 'TIMEOUT_RENEW');
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'TIMEOUT';
            this.timedOut = true;
            this.onTimeout.emit(null);
        });
        this.idle.onIdleStart.subscribe(() => this.idleState = 'TIMEOUT_STARTED');
        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.countdown = countdown;
            this.onTimeoutWarning.emit(null);
        });

        // sets the ping interval to 15 seconds
        this.keepalive.interval(15);

        this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    }

    start() {
        this.config();
        this.idle.watch();
        this.idleState = 'TIMEOUT_STARTED';
        this.timedOut = false;
    }

    stop() {
        this.idle.stop();
        this.idleState = 'TIMEOUT_STOPED';
    }
}