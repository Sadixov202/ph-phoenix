import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../services/app/app.service';

@Component({
  selector: 'app-phoenix',
  templateUrl: './phoenix.component.html',
  styleUrls: ['./phoenix.component.scss']
})
export class PhoenixComponent implements OnInit {

  receivedData: any | null = null;
  private subscription!: Subscription;
  selectedIds: any[] = [];
  private hubUrl = 'https://phapi.form.az/ticketHub';
  videoURl = '';

  constructor(
    private appServices: AppService
  ) { }

  ngOnInit() {
    this.videoURl = 'https://customer-jo5phtbhu7hihx5u.cloudflarestream.com/a7c6c1da328c3556e1acfd7ef0ed1688/downloads/default.mp4'
    this.appServices.startConnection(this.hubUrl);
    this.appServices.hubConnection.onreconnected(connectionId => {
      this.getAllIds();
      console.log('SignalR reconnected. Connection ID:', connectionId);
    });
    this.getAllIds();
    this.subscription = this.appServices.data$.subscribe((data) => {
      this.receivedData = data;
      this.selectedIds.push(this.receivedData);
      this.addClass();
    });
  }

  addClass() {
    this.selectedIds.forEach(id => {
        let el = document.getElementById(`${id}`);
        el?.classList.add('selected');        
    });
  }

  getAllIds() {
    this.appServices.getAllTickets({limit: 2000}).subscribe(response => {
      response?.items.forEach((element: any) => {
        this.selectedIds.push(element.ticketNumber);
      });
      this.addClass();
    });    
  }

}
