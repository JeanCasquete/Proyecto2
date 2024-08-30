import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
    private baseUrl = `${environment.apiUrl}/anime`;
  
    constructor(private http: HttpClient) {}
  
    // Obtener todos los animes
    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl);
    }
  
    // Obtener un anime por su ID
    findOne(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/${id}`);
    }
  
    // Crear un nuevo anime con géneros
    crearAnimeConGeneros(anime: { titulo: string; imagen: string; ano: number; capitulos: number }, generoIds: number[]): Observable<any> {
      return this.http.post<any>(this.baseUrl, { ...anime, generoIds });
    }
  
    // Actualizar un anime existente
    update(id: number, anime: Partial<{ titulo: string; imagen: string; ano: number; capitulos: number }>): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/${id}`, anime);
    }
  
    // Eliminar un anime por su ID
    remove(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
  
    // Asignar géneros a un anime
    addGenresToAnime(animeId: number, generoIds: number[]): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/${animeId}/generos`, { generoIds });
    }
  
    // Eliminar géneros de un anime
    removeGenresFromAnime(animeId: number, generoIds: number[]): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${animeId}/generos`, {
        body: { generoIds }
      });
    }
  }
