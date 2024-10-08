import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditPageComponent } from './blog-edit-page.component';

describe('BlogEditPageComponent', () => {
  let component: BlogEditPageComponent;
  let fixture: ComponentFixture<BlogEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
