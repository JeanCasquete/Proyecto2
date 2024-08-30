import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimeService } from './anime.service'; // Ajusta la ruta según la ubicación de tu servicio
import { Observable } from 'rxjs';
@Component({
  selector: 'app-crud-animes',
  templateUrl: './crud-animes.component.html',
  styleUrl: './crud-animes.component.css'
})
export class CrudAnimesComponent implements OnInit {

  animeForm!: FormGroup;
  Animes: any[] | undefined;
  constructor(private fb: FormBuilder, private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      capitulos: [null, [Validators.required, Validators.min(1)]],
      generoIds: ['', Validators.required]
    });
    this.loadAnimes();
  }

  onSubmit(): void {
    if (this.animeForm.valid) {
      const formValue = this.animeForm.value;
      const generoIds = formValue.generoIds.split(',').map((id: string) => parseInt(id.trim(), 10));

      const animeData = {
        titulo: formValue.titulo,
        imagen: formValue.imagen,
        ano: formValue.ano,
        capitulos: formValue.capitulos
      };

      this.animeService.crearAnimeConGeneros(animeData, generoIds).subscribe(response => {
        console.log('Anime creado:', response);
        // Llama a tu método para actualizar la lista de animes aquí
      });
    }
  }


  loadAnimes(): void {
    this.animeService.findAll().subscribe(data => {
      this.Animes = data;
      console.log(this.Animes)

    });
  }

  editAnime(anime: any): void {
    // Implementar lógica de edición aquí
  }

  deleteAnime(id: number): void {
    this.animeService.remove(id).subscribe(() => {
      // Manejo de respuesta
      console.log('Anime eliminado');
      this.loadAnimes(); // Recargar la lista de animes
    });
  }
}