import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {
  listLibros: Libro[] = [];

  constructor(private _libroService: LibroService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(){
    this._libroService.getLibros().subscribe(data => {
      console.log(data);
      this.listLibros = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarLibro(id: any){
    this._libroService.eliminarLibro(id).subscribe(data => {
      this.toastr.error('El libro fue eliminado correctamente');
      this.obtenerLibros();
    }, error => {
      console.log(error);
    })
  }
}
