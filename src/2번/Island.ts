export class Island {
  private map: Array<Array<number>>;
  private visited: Array<Array<boolean>>;

  private H: number;

  private W: number;

  private landCount: number;

  private directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  constructor(map: Array<Array<number>>) {
    this.map = map;
    this.H = map.length;
    this.W = map[0].length;
    this.landCount = -1;
    this.visited = Array.from({ length: this.H }, () =>
      Array(this.W).fill(false)
    );
  }

  public setMap(map: Array<Array<number>>) {
    this.map = map;
    this.H = map.length;
    this.W = map[0].length;
    this.landCount = -1;
    this.visited = Array.from({ length: this.H }, () =>
      Array(this.W).fill(false)
    );
  }

  public countLand(): number {
    if (this.landCount !== -1) return this.landCount;
    let count = 0;

    for (let h = 0; h < this.H; h++) {
      for (let w = 0; w < this.W; w++) {
        if (this.map[h][w] === 1 && !this.visited[h][w]) {
          count++;
          this.dfs(w, h);
        }
      }
    }

    this.landCount = count;
    return count;
  }

  private dfs(w: number, h: number) {
    this.visited[h][w] = true;

    for (const [dw, dh] of this.directions) {
      const nW = w + dw;
      const nH = h + dh;

      if (
        nH >= 0 &&
        nH < this.H &&
        nW >= 0 &&
        nW < this.W &&
        !this.visited[nH][nW] &&
        this.map[nH][nW] === 1
      ) {
        this.dfs(nW, nH);
      }
    }
  }
}
