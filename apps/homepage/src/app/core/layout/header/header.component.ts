import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'hp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['event$']) onScroll(event) {
    this.isScrolled = window.scrollY > 200 ? true : false;
  }
  isScrolled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
