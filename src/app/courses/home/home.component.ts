import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable, of} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {concatMap, map, shareReplay, tap} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {CoursesActions} from '../courses-action-types';
import * as CoursesSelectors from '../courses.selectors';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.reload();

  }

  reload() {
    this.promoTotal$ = this.store
      .pipe(
        select(CoursesSelectors.selectPromoTotal)
      )

    this.beginnerCourses$ = this.store
      .pipe(
        select(CoursesSelectors.selectBeginnerCourses)
      )

    this.advancedCourses$ = this.store
      .pipe(
        select(CoursesSelectors.selectAdvancedCourses)
      )

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
