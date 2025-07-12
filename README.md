<img src='./web_icons/grade.png'>

# Cuber Score

> A new marking system for cubers, which is to show a cuber's ability for all official WCA events.
>
> Database Last Updated: Jul-11, 2025
> 

## How does the marking system work?
- It based on both the rank and the result. For the result, I use single result for 4 blindfolded events, while average result for others.
- It will generate serval boundary points for every event.
  - e.g. for `3x3x3 Cube`
  
  | Boundary Point  | Result   | Score |
  |-----------------|----------|-------|
  | World Record    | 3.91     | 100   |
  | Top 0.1% or WR3        | 6.67     | 95    |
  | Top 1% or WR10         | 8.58     | 90    |
  | Top 5% or WR50         | 11.22    | 80    |
  | Top 10%         | 13.27    | 70    |
  | Top 20%         | 16.67    | 60    |
  | Top 50%         | 28.74    | 50    |
  | The Slowest One | 8:45.07  | 40    |
  
- And different boundary points have their corresponding score. The cuber will get a score between two boundary points where he or she is in.
  - e.g. If your `3x3x3 Cube`'s PR is `9.90`, which is `(8.58+11.22)/2`, then your score is `85`.
- The Code (For score calculation)
```js
getGrade(result = -1) {
    if (result == this.wr)
        return 100;
    else if (result <= this.top01)
        return 95 + (this.top01 - result) / (this.top01 - this.wr) * 5;
    else if (result <= this.top1)
        return 90 + (this.top1 - result) / (this.top1 - this.top01) * 5;
    else if (result <= this.top5)
        return 80 + (this.top5 - result) / (this.top5 - this.top1) * 10;
    else if (result <= this.top10)
        return 70 + (this.top10 - result) / (this.top10 - this.top5) * 10;
    else if (result <= this.top20)
        return 60 + (this.top20 - result) / (this.top20 - this.top10) * 10;
    else if (result <= this.top50)
        return 50 + (this.top50 - result) / (this.top50 - this.top20) * 10;
    else if (result > -1)
        return 40 + (this.slowest - result) / (this.slowest - this.top50) * 10;
    else
        return 0;
}
```
