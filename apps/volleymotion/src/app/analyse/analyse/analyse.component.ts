import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vm-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  teams$: Observable<any[]>;
  tags$: Observable<any[]>;

  constructor(private fs: AngularFirestore) { }

  ngOnInit(): void {
    this.teams$ = this.fs.collection<any>('audits').doc('teams').valueChanges()
      .pipe(map((team) => this.getArray(team)));

    this.tags$ = this.fs.collection<any>('audits').doc('tags').valueChanges()
      .pipe(map((tags) => this.getArray(tags)));
  }

  getArray(object: any) {
    const objects: any[] = []
    Object.keys(object).forEach(key => {
      const obj = { title: key, content: object[key] };
      delete obj?.content?.sum;
      objects.push(obj);
    });
    return objects;
  }
}
