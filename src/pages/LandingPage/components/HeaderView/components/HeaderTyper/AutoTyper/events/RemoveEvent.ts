export class RemoveEvent {
  public charCount?: number;
  public all: boolean;

  constructor(charCount?: number) {
    this.charCount = charCount;
    this.all = !charCount;
  }
}
