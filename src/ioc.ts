import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { EditorStore } from "./stores/EditorStore";
import { MouseService } from "./services/MouseService";

const container = new Container();

container
  .bind<EditorStore>(TYPES.EditorStore)
  .to(EditorStore)
  .inSingletonScope();

container
  .bind<MouseService>(TYPES.MouseService)
  .to(MouseService)
  .inSingletonScope();

export { container };
