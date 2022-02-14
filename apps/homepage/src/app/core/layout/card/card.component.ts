import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() src: string | undefined;
  @Input() alt: string | undefined;
  @Input() content: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
