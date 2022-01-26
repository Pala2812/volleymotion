import { MapsAPILoader } from '@agm/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { Address, _geoloc } from '@volleymotion/models';

@Component({
  selector: 'vm-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements AfterViewInit {
  @Output() addressSelected = new EventEmitter<{
    address: Address;
    geometry: _geoloc;
  }>();
  @ViewChild('search') searchElementRef:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) {}

  ngAfterViewInit(): void {
    this.findAddress();
  }

  findAddress() {
    this.mapsAPILoader.load().then(() => {
      if (!this.searchElementRef?.nativeElement) {
        return;
      }

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const addressComponents = place.address_components;

          const street = this.getValue(addressComponents, 'route');
          const streetnumber = this.getValue(
            addressComponents,
            'street_number'
          );
          const locality = this.getValue(addressComponents, 'locality');
          const postalcode = this.getValue(addressComponents, 'postal_code');
          const administrativeArea = this.getValue(
            addressComponents,
            'administrative_area_level_1'
          );
          const country = this.getValue(addressComponents, 'country');

          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();

          const address: Address = {
            street,
            streetnumber,
            locality,
            postalcode,
            administrativeArea,
            country,
          };

          if (!lat || !lng) {
            throw new Error('Unable to retrieve latitude and logitude');
          }

          const geometry: _geoloc = {
            lat,
            lng,
          };

          this.addressSelected.next({ address, geometry });
        });
      });
    });
  }

  getValue(components: any[] | undefined, key: string) {
    return components?.filter((components) =>
      (components.types as string[])?.includes(key)
    )[0]?.long_name;
  }
}
