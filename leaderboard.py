import pandas as pd
import MyHelper

eventList = [
    "222", "333", "444", "555", "666", "777",
    "333oh", "333fm", "333bf", "clock", "skewb",
    "sq1", "minx", "pyram", "444bf", "555bf", "333mbf"
]

def getScore(eventId, result, scoreAppendix):
    row = scoreAppendix[scoreAppendix['eventId'].astype(str) == str(eventId)]
    if row.empty:
        print(eventId,'fuck')
    percentiles = ['wr','top001', 'top1', 'top5', 'top10', 'top20', 'top50', 'slowest']
    values = [row.iloc[0][p] for p in percentiles]
    
    if result <= values[0]:
        return 100
    elif result <= values[1]:
        return 95 + (values[1] - result) / (values[1] - values[0]) * 5
    elif result <= values[2]:
        return 90 + (values[2] - result) / (values[2] - values[1]) * 5
    elif result <= values[3]:
        return 80 + (values[3] - result) / (values[3] - values[2]) * 10
    elif result <= values[4]:
        return 70 + (values[4] - result) / (values[4] - values[3]) * 10
    elif result <= values[5]:
        return 60 + (values[5] - result) / (values[5] - values[4]) * 10
    elif result <= values[6]:
        return 50 + (values[6] - result) / (values[6] - values[5]) * 10
    elif result > -1:
        return 40 + (values[7] - result) / (values[7] - values[6]) * 10
    else:
        return 0

class Event:
    def __init__(self, event_id, single_result, average_result, score=-1):
        self.id = event_id
        self.singleResult = single_result
        self.averageResult = average_result
        self.score = score

    def __repr__(self):
        return (f"\nEvent({self.id}:\n single: {self.singleResult}, "
                f"average: {self.averageResult}, score:{self.score})")
        
    def getScore(self, df_scoreAppendix):
        if self.id in ['333bf', '333mbf', '444bf', '555bf']:
            self.score = round(getScore(self.id, self.singleResult, df_scoreAppendix),2)
        else:
            self.score = round(getScore(self.id, self.averageResult, df_scoreAppendix),2)
        # print('score:', self.score)
            


class Person:
    def __init__(self, person_id, overall_score=-1):
        self.id = person_id
        self.overallScore = overall_score
        self.events = []  # 存放Event對象的列表

    def add_event(self, event):
        if isinstance(event, Event):
            self.events.append(event)
        else:
            raise ValueError("只能添加Event對象")

    def __repr__(self):
        return (f"Person_id: {self.id}, overallScore: {self.overallScore}\n")
    
    def getOverallScore(self):
        sum=0
        for e in self.events:
            sum += e.score
        self.overallScore = round(sum/17.0, 2)



def genRank(df_person, df_average, df_single, df_scoreAppendix):
    
    # 計數器
    count = 0

    # 遍歷Persons表中的每個ID
    for wca_id in df_person['id']:
        user_results = df_average[df_average['personId'] == wca_id]
        user_results2 = df_single[df_single['personId'] == wca_id]
        
        if user_results.empty and user_results2.empty:
            continue
        
        # 處理一個person
        p=Person(wca_id)
        # average events: 
        for row in user_results.itertuples():
            if (not str(row.eventId) in eventList) or (row.eventId in ['333bf', '333mbf', '444bf', '555bf']):
                continue
            tmp = Event(row.eventId, -1, row.best)
            tmp.getScore(df_scoreAppendix)
            p.add_event(tmp)
        
        # single events:
        for row in user_results2.itertuples():
            if not row.eventId in ['333bf', '333mbf', '444bf', '555bf']:
                continue
            tmp = Event(row.eventId, row.best,-1)
            tmp.getScore(df_scoreAppendix)
            p.add_event(tmp)    
            
        p.getOverallScore()
        if p.overallScore <= 0:
            continue 
        # print(p)
        
        # 打印該ID及其成績
        # print(f"\nWCA ID: {wca_id}")
        # print(user_results)

        # 計數
        count += 1
        if count >= 500:
            print("\n已處理1000個ID，提前停止。")
            break