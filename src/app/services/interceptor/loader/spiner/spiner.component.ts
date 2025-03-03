import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit {

  loading: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.loading.subscribe((v) => {
      this.loading = v;
    });
  }

  ngOnInit() {
  }

}
