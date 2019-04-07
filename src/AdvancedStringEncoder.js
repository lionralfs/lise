import { LIse } from './LIse';

export class AdvancedStringEncoder {
  constructor() {
    this.lise = new LIse();
  }

  getEncodedString() {
    return this.lise.getEncodedString();
  }

  addEntry(tag, entry) {
    // this.deleteEntry(tag); //just in case it already exists

    this.lise.encodeSingle(tag);
    this.lise.encodeSingle(entry.toString());
  }

  getEntry(tag) {
    this.lise.resetReadPointer();
    let tagContentPair;
    while ((tagContentPair = this.lise.decodeMultiple(2)).length == 2) {
      if (tag === tagContentPair[0]) {
        return tagContentPair[1];
      }
    }
    return null;
  }
}
