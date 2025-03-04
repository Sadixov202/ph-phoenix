import { Injectable } from '@angular/core';
import { HttpsService } from '../https/https.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class AppService extends HttpsService {
  public QUEST = 'lotteries';
  public TICKETS = 'tickets'
  public hubConnection!: signalR.HubConnection;
  private dataSubject = new BehaviorSubject<any | null>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(public http: HttpClient) {
    super();
  }
  public getAllTickets(params: any = {}): Observable<any> {
    return this.get(this.http, this.TICKETS, params);
  }
  public addQuest(params: any = {}): Observable<any> {
    return this.post(this.http, this.QUEST, params);
  }
  // Запуск соединения
  public startConnection(hubUrl: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.error('Error connecting to SignalR:', err));

    this.listenForUpdates();
  }

  // Прослушивание сообщений от сервера
  private listenForUpdates(): void {
    this.hubConnection.on('TicketSelected', (data) => {
      this.dataSubject.next(data);
    });
  }

  // Отключение
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR Disconnected'));
    }
  }
}
