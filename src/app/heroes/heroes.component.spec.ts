import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  const heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
  ];
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroesComponent ],
      providers: [
        { provide: 'heroes', useValue: heroes }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
