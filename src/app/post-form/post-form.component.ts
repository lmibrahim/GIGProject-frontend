import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GigService } from '../gig.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  id: string | null = null;
  constructor(
    private gigService: GigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response: any) => {
      console.log(response);
      this.id = response.get('id');
    });
  }

  onSubmit = (form: NgForm): void => {
    let newPost: Post = {
      id: form.form.value.id,
      memo: form.form.value.memo,
      poster: form.form.value.poster,
      post: form.form.value.post,
      show_id: 0,
      time_stamp: `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    };
    console.log(form);
    console.log(newPost);
    if (this.id) {
      newPost.show_id = parseInt(this.id);
    }
    this.gigService.addPost(newPost).subscribe((response: any) => {
      form.reset();
      location.reload();
    });
  };
}
