import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../model/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: Tarea[] = [];
  nuevoTitulo: string = '';

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareaService.getTareas().subscribe(data => {
      this.tareas = data;
    });
  }

  agregarTarea() {
    if (!this.nuevoTitulo.trim()) return;

    this.tareaService.crearTarea({
      titulo: this.nuevoTitulo,
      completada: false
    }).subscribe(() => {
      this.nuevoTitulo = '';
      this.cargarTareas();
    });
  }

  toggleTarea(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    this.tareaService.actualizarTarea(tarea).subscribe();
  }

  eliminarTarea(id: number) {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.cargarTareas();
    });
  }
}
