import { LIse } from './LIse';

export class AdvancedStringEncoder {
  /**
   * @param {string} [workInProgress]
   */
  constructor(workInProgress = '') {
    this.lise = new LIse(workInProgress);
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
