# Cuber Score

> A new marking system for cubers, which is to show a cuber's ability for all official WCA events. 
> 

## How does the marking system work?
- It based on both the rank and the result.
- It will generate serval boundary points for every event.
  - e.g. for `3x3x3 Cube`
  
  | Boundary Point  | Result   | Score |
  |-----------------|----------|-------|
  | World Record    | 3.91     | 100   |
  | Top 0.1%        | 6.67     | 95    |
  | Top 1%          | 8.58     | 90    |
  | Top 5%          | 11.22    | 80    |
  | Top 10%         | 13.27    | 70    |
  | Top 20%         | 16.67    | 60    |
  | Top 50%         | 28.74    | 50    |
  | The Slowest One | 8:45.07  | 40    |
- And different boundary points have their corresponding score. The cuber will get a score between two boundary points where he or she is in.
  - e.g. If your `3x3x3 Cube`'s PR is `9.90`, which is `(8.58+11.22)/2`, then your score is `85`.
