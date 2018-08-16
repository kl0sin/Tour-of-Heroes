import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Hero } from './hero';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;
  let mockedValue: Hero[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [ HeroesComponent ]
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
    spyOn(heroService, 'deleteHero').and.returnValue(of(mockedValue));
    spyOn(heroService, 'addHero').and.returnValue(of(mockedValue));
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should heroes to be defined', () => {
    expect(component.heroes).toBeDefined();
  });

  it('should render hero list', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.item > .item__badge').textContent).toContain('11');
    expect(compiled.querySelector('.item > .item__hero').textContent).toContain('Mr. Nice');
  });

  it('should render proper h2 title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('My Heroes');
  });

  it('should call getHeroes', () => {
    expect(heroService.getHeroes).toHaveBeenCalled();
  });

  it('should call removeHero after remove button clicked', () => {
    const removeButton = fixture.debugElement.query(By.css('.heroes__delete'));
    removeButton.nativeElement.click();
    expect(heroService.deleteHero).toHaveBeenCalled();
  });

  describe('add method', () => {

    it('should not call addHero', () => {
      const heroNameInput = fixture.debugElement.query(By.css('.hero-name'));
      const heroNameButton = fixture.debugElement.query(By.css('.heroes__add'));

      heroNameInput.nativeElement.value = '';
      heroNameButton.nativeElement.click();

      expect(heroService.addHero).not.toHaveBeenCalled();
    });

    it('should call addHero', () => {
      const heroNameInput = fixture.debugElement.query(By.css('.hero-name'));
      const heroNameButton = fixture.debugElement.query(By.css('.heroes__add'));

      heroNameInput.nativeElement.value = 'John';
      heroNameButton.nativeElement.click();

      expect(heroService.addHero).toHaveBeenCalledWith({ name: 'John' });
    })
  })
});
