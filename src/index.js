class LIse {
  constructor() {
    this.workInProgress = '';
  }

  encodeSingle(str) {
    this.workInProgress += `${this.getLengthIndicatorFor(str)}${str}`;
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

    return (
      this.listToString(lengthIndicators, '') +
      this.getPseudoRandomHashedCharAsString(str)
    );
  }

  listToString(list, splitStr) {
    let res = '';
    for (let i = 0; i !== list.length; i++) {
      res += `${list[i]}${i === list.length - 1 ? '' : splitStr}`;
    }
    return res;
  }

  getPseudoRandomHashedCharAsString(str) {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz!?()[]{}=#';
    let byteArray = this.toUTF8Array(str);
    let additionHashSaltThingy = byteArray.reduce(
      (acc, current) => (acc += current & 0xff),
      0
    );
    return (
      possibleChars.charAt(
        (str.length + additionHashSaltThingy) % possibleChars.length
      ) + ''
    );
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
        utf8.push(
          0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode =
          0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(
          0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
    }
    return utf8;
  }
}

module.exports = LIse;
