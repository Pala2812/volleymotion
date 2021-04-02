import { Component, ElementRef, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { interval, } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ExerciseStepDialogComponent } from './exercise-step-dialog/exercise-step-dialog.component';

@Component({
  selector: 'vm-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {
  @ViewChild('elements') elements: ElementRef<HTMLElement>;
  @ViewChildren("drag-element", { read: ViewContainerRef }) dragables: QueryList<ViewContainerRef>
  snapshots: any[] = [];
  isRunning = false;
  description: string;
  isToolsToolbarExpanded = false;

  constructor(private renderer: Renderer2, private dialog: NbDialogService) { }

  ngOnInit(): void { }

  addElementToField(element: TemplateRef<any>) {
    const fieldElement = element.createEmbeddedView(this.elements.nativeElement).rootNodes[0];
    this.renderer.appendChild(this.elements.nativeElement, fieldElement);
  }

  addStep() {
    const ref = this.dialog.open(ExerciseStepDialogComponent);
    ref.onClose.subscribe(description => {
      this.saveSnapshot(description);
    })
  }

  toggleToolsToobal() {
    this.isToolsToolbarExpanded = !this.isToolsToolbarExpanded;
  }

  saveSnapshot(description: string) {
    const snapshots = [];

    const width = this.elements.nativeElement.parentElement.clientWidth;
    const height = this.elements.nativeElement.parentElement.clientHeight;

    for (const child of (Array.from(this.elements.nativeElement.children) as HTMLElement[])) {
      let transform = child.style.transform;
      transform = transform.substring(12, transform.length - 1);
      let positionsStrings = transform.split(',');
      const positions = positionsStrings.map(position => Number(position.replace('px', '')));

      const x = positions[0] / width;
      const y = positions[1] / height;

      const snapshot = {
        element: child,
        position: { x, y }
      }

      snapshots.push(snapshot);
    };
    const snap = {
      description,
      elements: snapshots,
    }

    this.snapshots.push(snap);
  }

  play() {
    if (this.isRunning) { return; }

    const width = this.elements.nativeElement.parentElement.clientWidth;
    const height = this.elements.nativeElement.parentElement.clientHeight;


    const children = Array.from(this.elements.nativeElement.children);
    children.forEach(child => this.renderer.removeChild(this.elements.nativeElement, child));

    this.isRunning = true;


    interval(3000).pipe(takeWhile(() => this.isRunning)).subscribe(tick => {
      const snapshot = this.snapshots[tick];

      if (!snapshot) {
        this.isRunning = false;
        const snapshot = this.snapshots[tick - 1];
        this.description = '';
        snapshot.elements.forEach(element => {
          this.renderer.removeStyle(element.element, 'transition');
        })
        return;
      }

      if (tick === 0) {
        snapshot[tick].elements.forEach(element => {
          this.renderer.removeStyle(element.element, 'transform');
          this.renderer.appendChild(this.elements.nativeElement, element.element);
        });
      }

      this.description = snapshot?.description;
      snapshot.elements.forEach(element => {
        const position = element.position;
        const transform3d = `translate3d(${position.x * width}px, ${position.y * height}px, 0px)`;
        this.renderer.setStyle(element.element, 'transition', 'transform 1s ease-out');
        this.renderer.setStyle(element.element, `transform`, transform3d);
      });
    });

  }
}
