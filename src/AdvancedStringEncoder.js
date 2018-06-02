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
}
