import { injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";

export interface MouseCoords {
  x: number;
  y: number;
}

@injectable()
export class MouseService {
  private coordsSubject = new BehaviorSubject<MouseCoords>({ x: 0, y: 0 });

  public coords$: Observable<MouseCoords> = this.coordsSubject.asObservable();

  public updateCoords(x: number, y: number): void {
    this.coordsSubject.next({ x: Math.round(x), y: Math.round(y) });
  }

  public get currentCoords(): MouseCoords {
    return this.coordsSubject.getValue();
  }
}
