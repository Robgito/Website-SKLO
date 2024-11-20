import { Component, OnInit } from '@angular/core';
import { BlogpostsService } from '../Services/blogposts/blogposts.service';
import { Post } from '../models/post';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PostsComponent implements OnInit {
  posts: Post[] = []; // Array to hold parsed posts
  loading = true;

  constructor(private blogpostsService: BlogpostsService) {}

  ngOnInit(): void {
    this.blogpostsService.getPostList().subscribe((files) => {
      const markdownFiles = files.filter((file: any) =>
        file.name.endsWith('.md')
      );

      const requests = markdownFiles.map((file: any) =>
        this.blogpostsService.getPostContent(file.download_url)
      );

      forkJoin(requests).subscribe((posts: any) => {
        this.posts = posts; // Update posts once all requests are completed
        this.loading = false;
      });
    });
  }
}
