import { makeAutoObservable } from "mobx";
import { injectable } from "inversify";
import { type ToolType } from "../types";

@injectable()
export class EditorStore {
  selectedTool: ToolType = "select";

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: ToolType) {
    this.selectedTool = tool;
  }
}
