import { Component, Input } from '@angular/core';
import { Review } from '../../Models/review';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [MatListModule,MatIconModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() review:Review|null = null;
  constructor(private httpClient:HttpClient){}
  deleteReview() {
    this
    .httpClient
    .delete("/api/review/"+this.review?.id, {headers:new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')})
    .subscribe({
      next:r=>{
        console.log("On deletion:",r)
      },
      error:err=>{
        console.log("err:",err)
      }
    })
  }

}
