import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from '../hero.service';
import { Hero } from '../heroes/hero';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  let mockedValue: Hero;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        { provide: HeroService, useClass: HeroService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockedValue = {
      id: 11,
      name: 'Mr. Nice'
    };
    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHero').and.returnValue(of(mockedValue));
    spyOn(heroService, 'updateHero').and.returnValue(of(mockedValue));
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hero be defined', () => {
    expect(component.hero).toBeDefined();
  });

  it('should call getHero', () => {
    expect(heroService.getHero).toHaveBeenCalled();
  });

  it('should save hero ', () => {
    console.log(component);
    expect(true).toBeTruthy();
  });

  it('should call save', () => {
    const saveButton = fixture.debugElement.query(By.css('.button-save'));
    saveButton.nativeElement.click();
    expect(heroService.updateHero).toHaveBeenCalledWith(mockedValue);
  });

});
