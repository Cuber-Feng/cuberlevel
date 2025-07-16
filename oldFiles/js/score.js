class Event {
    eventId;
    wr = 0;
    top01 = 0;
    top1 = 0;
    top5 = 0;
    top10 = 0;
    top20 = 0;
    top50 = 0;
    slowest = 0;
    count = 0;

    constructor(eventId) {
        this.eventId = eventId;
    }

    getGrade(result = -1) {
        if (result <= this.wr)
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
}

const eventDict = new Map();