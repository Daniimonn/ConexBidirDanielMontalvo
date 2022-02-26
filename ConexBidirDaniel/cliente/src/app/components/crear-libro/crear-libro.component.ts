import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  libroForm: FormGroup;
  titulo = 'crear libro';
  id: string | null;
  constructor (private fb: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               private _libroService: LibroService,
               private aRouter: ActivatedRoute) {
    this.libroForm = this.fb.group({
      libro: ['', Validators.required],
      categoria: ['', Validators.required],
      autor: ['', Validators.required],
      precio: ['', Validators.required],
    }) 
    this.id = this.aRouter.snapshot.paramMap.get('id');               
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarLibro(){
    const LIBRO: Libro = {
      nombre: this.libroForm.get('libro')?.value,
      categoria: this.libroForm.get('categoria')?.value,
      autor: this.libroForm.get('autor')?.value,
      precio: this.libroForm.get('precio')?.value,
    }

    if(this.id !== null){
      // editamos libro

      this._libroService.editarLibro(this.id, LIBRO).subscribe(data => {
        this.toastr.success('El libro fue editado correctamente');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.libroForm.reset();
      })

    } else{
      //agregamos libro
      console.log(LIBRO);
      this._libroService.guardarLibro(LIBRO).subscribe(data => {
        this.toastr.success('El libro fue registrado correctamente');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.libroForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Libro';
      this._libroService.obtenerLibro(this.id).subscribe(data => {
        this.libroForm.setValue({
          libro: data.nombre,
          categoria: data.categoria,
          autor: data.autor,
          precio: data.precio,
        })
      })
    }
  }
}
