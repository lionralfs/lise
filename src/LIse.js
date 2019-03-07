export class LIse {
  /**
   * @param {string} [workInProgress]
   */
  constructor(workInProgress = '') {
    this.workInProgress = workInProgress;
    this.readPointer = 0;
  }

  resetReadPointer() {
    this.readPointer = 0;
  }

  encodeSingle(str) {
    this.workInProgress += `${this.getLengthIndicatorFor(str)}${str}`;
  }

  encodeMultiple(strings) {
    strings.forEach(this.encodeSingle, this);
  }

  decodeMultiple(limit) {
    return this.decodeMultipleDel(limit, false);
  }

  decodeMultipleDel(limit, deleteDecoded) {
    let res = [];
    let decSingle = '';
    while ((limit < 0 || res.length < limit) && (decSingle = this.decodeSingle(deleteDecoded)) !== null) {
      res.push(decSingle);
    }
    return res;
  }

  /**
   * Decodes all stored values.
   * Leaves the read pointer at the start.
   *
   * @return {Array<string>} all encoded values as a decoded string array
   */
  decodeAll() {
    this.resetReadPointer();
    const res = this.decodeMultiple(-1);
    this.resetReadPointer();
    return res;
  }

  decodeSingle(deleteDecoded) {
    let findgoodname = LIse.getStartAndEndIndexOfNextLIString(this.readPointer, this.getEncodedString());
    if (findgoodname.length === 2) {
      let decoded = this.workInProgress.substring(findgoodname[0], findgoodname[1]);
      if (deleteDecoded) {
        // TODO: check if this "cutting" of the string actually works
        this.workInProgress = this.workInProgress.substr(0, this.readPointer) + this.workInProgress.substr(findgoodname[1]);
      } else {
        this.readPointer = findgoodname[1];
      }
      return decoded;
    } else {
      return null;
    }
  }

  static getStartAndEndIndexOfNextLIString(startIndex, str) {
    let i = startIndex;

    if (i + 1 > str.length) {
      return [];
    }

    let lengthIndicator = str.substring(i, (i += 1));
    while (true) {
      let lengthIndicatorAsInt = LIse.getInt(lengthIndicator, -1);
      if (lengthIndicatorAsInt === -1 || i + lengthIndicatorAsInt > str.length) {
        return [];
      }
      let eitherDataOrIndicator = str.substring(i, i + lengthIndicatorAsInt);
      let ifitwasAnIndicator = LIse.getInt(eitherDataOrIndicator, -1);
      if (ifitwasAnIndicator > lengthIndicatorAsInt && i + ifitwasAnIndicator <= str.length) {
        i += lengthIndicatorAsInt;
        lengthIndicator = eitherDataOrIndicator; // assume to be an indicator
      } else {
        return [i + 1, i + lengthIndicatorAsInt]; // i+1 for the pseudo random hash char
      }
    }
  }

  static getInt(str, fallback) {
    const int = parseInt(str, 10);
    return isNaN(int) ? fallback : int;
  }

  getEncodedString() {
    return this.workInProgress;
  }

  getLengthIndicatorFor(str) {
    const lengthIndicators = [];

    lengthIndicators.push(str.length + 1 + '');
    while (lengthIndicators[0].length !== 1) {
      lengthIndicators.unshift(lengthIndicators[0].length + '');
    }

    return this.listToString(lengthIndicators, '') + this.getPseudoRandomHashedCharAsString(str);
  }

  listToString(list, splitStr) {
    return list.reduce((acc, curr, i, arr) => (acc += `${curr}${i === arr.length - 1 ? '' : splitStr}`), '');
  }

  getPseudoRandomHashedCharAsString(str) {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz!?()[]{}=#';
    let byteArray = this.toUTF8Array(str);
    let additionHashSaltThingy = byteArray.reduce((acc, current) => (acc += current & 0xff), 0);
    return possibleChars.charAt((str.length + additionHashSaltThingy) % possibleChars.length) + '';
  }

  /**
   * https://gist.github.com/joni/3760795
   */
  toUTF8Array(str) {
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }
}
