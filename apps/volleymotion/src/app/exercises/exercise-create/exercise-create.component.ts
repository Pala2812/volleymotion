import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { AnimationStep, Exercise, Tag } from '@volleymotion/models';
import { interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ExerciseActions } from '../../core/store/actions';
import { TagSelectors } from '../../core/store/selectors';
import { ExerciseStepDialogComponent } from './exercise-step-dialog/exercise-step-dialog.component';

@Component({
  selector: 'vm-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss'],
})
export class ExerciseCreateComponent implements OnInit {
  @ViewChild('elements') elements: ElementRef<HTMLElement> | undefined;
  @ViewChildren('drag-element', { read: ViewContainerRef })
  dragables: QueryList<ViewContainerRef> | undefined;
  tags$: Observable<Tag[]> | undefined;
  snapshots: any[] = [];
  positions: any = {};
  tools: any = {};
  isRunning = false;
  description: string | undefined;
  isToolsToolbarExpanded = false;
  isFormVisible = false;

  constructor(
    private renderer: Renderer2,
    private dialog: NbDialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));

    if (!this.snapshots?.length) {
      return;
    }
    const index = this.snapshots?.length ?? 0;
    this.addElements(this.snapshots[index - 1]);
    this.showLastTick(this.snapshots[index - 1]);
  }

  addElementToField(element: TemplateRef<any>) {
    const fieldElement = element.createEmbeddedView(
      this.elements?.nativeElement
    ).rootNodes[0];
    this.renderer.appendChild(this.elements?.nativeElement, fieldElement);
  }

  addPosition(position: string) {
    this.positions[position] =
      this.positions[position] >= 1 ? (this.positions[position] += 1) : 1;
  }

  addTool(tool: string) {
    this.tools[tool] = this.tools[tool] >= 1 ? (this.tools[tool] += 1) : 1;
  }

  addStep() {
    const ref = this.dialog.open(ExerciseStepDialogComponent);
    ref.onClose.subscribe((description) => {
      this.saveSnapshot(description);
    });
  }

  toggleToolsToobal() {
    this.isToolsToolbarExpanded = !this.isToolsToolbarExpanded;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  saveSnapshot(description: string) {
    const snapshots = [];

    const width = this.elements?.nativeElement?.parentElement?.clientWidth;
    const height = this.elements?.nativeElement?.parentElement?.clientHeight;

    if (!this.elements?.nativeElement?.children?.length || !width || !height) {
      return;
    }

    for (const child of Array.from(
      this.elements?.nativeElement?.children
    ) as HTMLElement[]) {
      let transform = child.style.transform;
      transform = transform.substring(12, transform.length - 1);
      let positionsStrings = transform.split(',');
      const positions = positionsStrings.map((position) =>
        Number(position.replace('px', ''))
      );

      const x = positions[0] / width;
      const y = positions[1] / height;

      const snapshot = {
        element: child.outerHTML,
        position: { x, y },
      };

      snapshots.push(snapshot);
    }
    const snap = {
      description,
      elements: snapshots,
    };

    this.snapshots.push(snap);
  }

  play() {
    if (this.isRunning || !this.snapshots.length) {
      return;
    }

    const width = this.elements?.nativeElement?.parentElement?.clientWidth;
    const height = this.elements?.nativeElement?.parentElement?.clientHeight;

    if (!this.elements?.nativeElement?.children?.length || !width || !height) {
      return;
    }

    const children = Array.from(this.elements?.nativeElement?.children);
    children.forEach((child) =>
      this.renderer.removeChild(this.elements?.nativeElement, child)
    );

    this.isRunning = true;

    this.addElements(this.snapshots[0]);
    this.showSnapshot(this.snapshots[0], width, height);

    interval(3000)
      .pipe(takeWhile(() => this.isRunning))
      .subscribe((tick) => {
        const snapshot = this.snapshots[tick + 1];

        if (!snapshot) {
          this.isRunning = false;
          const snapshot = this.snapshots[tick - 1];
          this.showLastTick(snapshot);
          return;
        }

        this.showSnapshot(snapshot, width, height);
      });
  }

  addElements(snapshot: AnimationStep) {
    snapshot?.elements?.forEach((element) => {
      const htmlElement = JSON.parse(element.element);
      this.renderer.removeStyle(htmlElement, 'transform');
      this.renderer.appendChild(this.elements?.nativeElement, htmlElement);
    });
  }

  showSnapshot(snapshot: AnimationStep, width: number, height: number) {
    this.description = snapshot?.description;
    snapshot?.elements?.forEach((element) => {
      const htmlElement = JSON.parse(element.element);
      const position = element.position;
      const transform3d = `translate3d(${position.x * width}px, ${
        position.y * height
      }px, 0px)`;
      this.renderer.setStyle(
        htmlElement,
        'transition',
        'transform 1s ease-out'
      );
      this.renderer.setStyle(htmlElement, `transform`, transform3d);
    });
  }

  showLastTick(snapshot: AnimationStep) {
    this.description = '';
    snapshot?.elements?.forEach((element) => {
      const htmlElement = JSON.parse(element.element);
      this.renderer.removeStyle(htmlElement, 'transition');
    });
  }

  onFormSubmit(exercise: Exercise) {
    this.store.dispatch(ExerciseActions.createExercise({ exercise }));
  }

  delete() {
    this.snapshots = [];
    const children = Array.from(this.elements?.nativeElement?.children ?? []);
    children.forEach((child) =>
      this.renderer.removeChild(this.elements?.nativeElement, child)
    );
  }
}
