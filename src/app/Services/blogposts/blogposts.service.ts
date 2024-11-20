import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class BlogpostsService {
  private githubApiUrl =
    'https://api.github.com/repos/robgito/blogpostsSKLO/contents/src/assets/blogposts';

  constructor(private http: HttpClient) {}

  // Fetch the list of Markdown files
  getPostList(): Observable<any[]> {
    return this.http.get<any[]>(this.githubApiUrl);
  }

  // Fetch and parse content of a single file
  getPostContent(url: string): Observable<Post> {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((rawContent) => this.parseMarkdown(rawContent)));
  }

  // Parse Markdown to extract frontmatter (title) and content
  private parseMarkdown(markdown: string): Post {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = markdown.match(frontmatterRegex);

    let title = 'Untitled';
    let content = markdown;

    if (match) {
      const frontmatter = match[1];
      content = markdown.slice(match[0].length).trim();

      // Extract the title from the frontmatter
      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    return { title, content };
  }
}
