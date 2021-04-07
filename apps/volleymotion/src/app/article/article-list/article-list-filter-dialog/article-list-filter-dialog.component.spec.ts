import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListFilterDialogComponent } from './article-list-filter-dialog.component';

describe('ArticleListFilterDialogComponent', () => {
  let component: ArticleListFilterDialogComponent;
  let fixture: ComponentFixture<ArticleListFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
