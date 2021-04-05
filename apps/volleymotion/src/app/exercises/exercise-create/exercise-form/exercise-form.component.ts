import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationStep, Tag } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vm-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  @Input() tags$: Observable<Tag[]>;
  @Input() animationSteps: AnimationStep[];
  filteredTags$: Observable<Tag[]>;
  form: FormGroup;
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];

  constructor() { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.filteredTags$ = this.tags$;
  }


  initForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      sportType: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
      tags: new FormArray([]),
    });
  }

  get tags() {
    return this.form.controls.tags as FormArray;
  }

  filterTags(event: any) {
    const query = String(event.target.value).toLowerCase();

    if (!query) {
      this.filteredTags$ = this.tags$;
      return;
    }

    if (event.key === 'Backspace' || event.code === 'Backspace') {
      this.filteredTags$ = this.tags$;
    }

    this.filteredTags$ = this.filteredTags$.pipe(
      map(tags => tags.filter(tag => tag.name.toLowerCase().includes(query)))
    );
  }

  onTagAdded(event: any) {
    const tag = event.option.value;
    const control = new FormControl(tag);
    this.filteredTags$ = this.tags$;
    this.tags.push(control);
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  submit(form: FormGroup, animationSteps: AnimationStep[]) {
    form.markAllAsTouched();

    if (!animationSteps?.length) {
      alert('Bitte füge eine Übunganimations hinzu');
      return;
    }

    if (form.valid) {
      const exercise = form.value;
      console.log(exercise);
    }
  }

}
