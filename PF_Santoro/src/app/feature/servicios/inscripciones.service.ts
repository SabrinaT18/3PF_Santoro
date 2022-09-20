import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inscripciones } from '../Model/Inscripciones';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
InscSubject= new Subject<any>();
private api = environment.URLapi ;

constructor(
  private http: HttpClient)
{  }

  
    obtenerInscripciones(): Observable<Inscripciones[]> {
      return this.http.get<Inscripciones[]>(`${this.api}/Inscripciones`); 
     }
         
     agregarInscripciones(insc: Inscripciones){
       return this.http.post<Inscripciones>(`${this.api}/Inscripciones`, insc).pipe(tap({
        next: (insc) => this.InscSubject.next(insc),
      })
    ); 
       }
   
     EditarInscripciones(insc: Inscripciones){
     return this.http.put<Inscripciones>(`${this.api}/Inscripciones/${insc.id}`, insc).pipe(    
      tap({
        next: () => this.InscSubject.next(insc),
      })
    ); 
     }
     
     eliminarInscripciones(id: string){
       return this.http.delete<Inscripciones>(`${this.api}/Inscripciones/${id}`); 
}

obtenerInscripcionesFiltradoCurso(inscripcion: any): Observable<any> {
  return this.http.get<any>(
    `${this.api}/Inscripciones?idCurso=${inscripcion.idCurso}`
  );
}

obtenerInscripcionesFiltradoAlumno(inscripcion: any): Observable<any> {
  return this.http.get<any>(
    `${this.api}/Inscripciones?idAlumno=${inscripcion.idAlumno}`
  );
}

desinscribirAlumnoCurso(idAlumno: string, idCurso: string): Observable<any> {
  return this.http
    .get<any>(`${this.api}/Inscripciones`)
    .pipe(
      map((inscripciones: any) => {
        return inscripciones.filter(
          (i: any) => i.idAlumno === idAlumno && i.idCurso === idCurso
        )[0];
      })
    );
}


}
