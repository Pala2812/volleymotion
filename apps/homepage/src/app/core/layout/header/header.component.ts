import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'hp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['event$']) onScroll(event: any) {
    this.isScrolled = window.scrollY > 50 ? true : false;
  }
  isScrolled = false;

  constructor() {}

  ngOnInit(): void {}
}
