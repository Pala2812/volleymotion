import { Component, Input } from '@angular/core';

@Component({
  selector: 'vm-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent {
  @Input() src: string = '/assets/images/no-data.svg';
  @Input() alt: string = 'Keine Daten';
  @Input() message: string | undefined;
  @Input() routerLink: string | undefined;
  @Input() linkMessage: string | undefined;
}
