import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../heroes/hero';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: HeroService;
  let mockedValue: Hero[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent,
      ],
      providers: [
        { provide: HeroService, useClass: HeroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockedValue = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
    ];
    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHeroes').and.returnValue(of(mockedValue));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero lists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.dashboard__hero').length).toBe(2);
    expect(compiled.querySelector('.dashboard__hero').textContent).toContain('Mr. Nice');
  });

  it('should heroes be defined', () => {
    expect(component.heroes).toBeDefined();
  });

  it('should call getHeroes', () => {
    expect(heroService.getHeroes).toHaveBeenCalled();
  });

});
