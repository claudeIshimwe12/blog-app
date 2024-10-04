import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedBlogComponent } from './published-blog.component';

describe('PublishedBlogComponent', () => {
  let component: PublishedBlogComponent;
  let fixture: ComponentFixture<PublishedBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishedBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
