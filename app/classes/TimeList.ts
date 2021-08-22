class TimeList {
  times: Array<number> = [];
  ao5s: Array<number | null> = [];
  ao12s: Array<number | null> = [];

  public constructor(times: Array<number>) {
    this.times = times;
    this.ao5s = this.times.map((item, index) => {
      if (index < 4) return null;
      const five = this.times.slice(index - 4, index);
      return this.average(this.removeWorstAndBest(five));
    });
    this.ao12s = this.times.map((item, index) => {
      if (index < 11) return null;
      const twelve = this.times.slice(index - 11, index);
      return this.average(this.removeWorstAndBest(twelve));
    });
  }

  public getAverageOf5(index: number): number | null {
    if (this.ao5s.length < 4) return null;
    return this.ao5s[index];
  }

  public getAverageOf12(index: number): number | null {
    if (this.ao12s.length < 11) return null;
    return this.ao12s[index];
  }

  // Get the best time
  public getBestTime(): number | null {
    if (this.times.length < 1) return null;
    return Math.min(...this.times);
  }

  // Get the last time
  public getLastTime(): number | null {
    if (this.times.length < 1) return null;
    return this.times[this.times.length - 1];
  }

  // Get the best average of 5
  public getBestAverageOf5(): number | null {
    if (this.ao5s.length < 4) return null;
    let timesWithoutNull = <Array<number>>(
      this.ao5s.filter((time) => time !== null)
    );
    return Math.min(...timesWithoutNull);
  }

  // Get the last average of 5
  public getLastAverageOf5(): number | null {
    if (this.ao5s.length < 4) return null;
    return this.ao5s[this.ao5s.length - 1];
  }

  // Get the best average of 12
  public getBestAverageOf12(): number | null {
    if (this.ao12s.length < 11) return null;
    let timesWithoutNull = <Array<number>>(
      this.ao12s.filter((time) => time !== null)
    );
    return Math.min(...timesWithoutNull);
  }

  // Get the last average of 12
  public getLastAverageOf12(): number | null {
    if (this.ao5s.length < 11) return null;
    return this.ao12s[this.ao12s.length - 1];
  }

  // Return the average of a list of times
  private average(times: Array<number>): number {
    let total: number = 0;
    times.forEach((time) => (total += time));
    return total / times.length;
  }

  // Remove the shortest and the longest time from a list of times
  private removeWorstAndBest(times: Array<number>): Array<number> {
    const best = Math.min(...times);
    const worst = Math.max(...times);
    const withoutBest = times.filter((time) => time !== best);
    return withoutBest.filter((time) => time !== worst);
  }
}

export default TimeList;