import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id = ${hero.id}`)),
        catchError(this.handleError<any>(`updateHero`))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
