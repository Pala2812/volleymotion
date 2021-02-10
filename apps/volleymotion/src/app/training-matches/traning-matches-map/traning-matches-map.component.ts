import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vm-traning-matches-map',
  templateUrl: './traning-matches-map.component.html',
  styleUrls: ['./traning-matches-map.component.scss']
})
export class TraningMatchesMapComponent implements OnInit {
  latitude = 51.164305;
  longitude = 10.4541205;
  
  constructor() { }

  ngOnInit(): void {
  }

}
