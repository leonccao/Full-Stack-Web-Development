import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MenuComponent } from './menu.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs/Observable';

import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {

    let dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return Observable.of(DISHES);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])
      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
      ]
    })
    .compileComponents();

    let dishservice = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });

  it('should use dishes in the template', () => {
    fixture.detectChanges();

    let de:      DebugElement;
    let el:      HTMLElement;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());

  });

});
