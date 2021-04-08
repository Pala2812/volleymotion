import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() src: string;
  @Input() alt: string;
  @Input() content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
