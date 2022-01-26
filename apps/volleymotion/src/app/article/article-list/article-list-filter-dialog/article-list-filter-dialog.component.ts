import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Tag } from '@volleymotion/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreState } from '../../../core/store/reducers';
import { TagSelectors } from '../../../core/store/selectors';

@Component({
  selector: 'vm-article-list-filter-dialog',
  templateUrl: './article-list-filter-dialog.component.html',
  styleUrls: ['./article-list-filter-dialog.component.scss'],
})
export class ArticleListFilterDialogComponent implements OnInit {
  @Input() tags: Tag[] = [];
  tags$: Observable<Tag[]> | undefined;
  filteredTags$: Observable<Tag[]> | undefined;
  sportType = 'Hallenvolleyball';
  sportTypes = ['Hallenvolleyball', 'Beachvolleyball', 'Snowvolleyball'];

  constructor(
    private dialogRef: NbDialogRef<ArticleListFilterDialogComponent>,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.tags$ = this.store.pipe(select(TagSelectors.selectTags));
    this.filteredTags$ = this.store.pipe(select(TagSelectors.selectTags));
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

    this.filteredTags$ = this.filteredTags$?.pipe(
      map((tags) =>
        tags.filter((tag) => tag.name.toLowerCase().includes(query))
      )
    );
  }

  onTagAdded(event: any) {
    const tag = event.option.value;
    this.tags.push(tag);
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  cancel() {
    this.dialogRef.close();
  }

  reset() {
    this.dialogRef.close('reset');
  }

  applyFilter() {
    this.dialogRef.close({ tags: this.tags, sportType: this.sportType });
  }
}
