export class TypeEvent {
  public toType: string;
  public timeBetweenLetter: number;

  constructor(toType: string, timeBetweenLetter?: number) {
    this.toType = toType;
    this.timeBetweenLetter = timeBetweenLetter || 100;
  }
}
