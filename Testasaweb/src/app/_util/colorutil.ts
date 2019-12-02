

export class ColorUtil {
  private static _instance: ColorUtil = null;
  private constructor() { };
  public static getInstance(): ColorUtil {
    if (this._instance == null) {
      this._instance = new ColorUtil();
    }
    return this._instance;
  }
  /**
   * RGBA轉Hex
   *
   * @param {*} r
   * @param {*} g
   * @param {*} b
   * @returns
   * @memberof ColorUtil
   */
  RGBAToHexA(rn: number, gn: number, bn: number, an: number) {
    let r = rn.toString(16);
    let g = gn.toString(16);
    let b = bn.toString(16);
    let a = Math.round(an * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
  }

}
