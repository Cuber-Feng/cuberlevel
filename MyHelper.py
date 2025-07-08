import os
import platform

def clear_screen():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")

def formatResult(tick):
    total_ms = tick * 10
    seconds, milliseconds = divmod(total_ms, 1000)
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    subsec = milliseconds // 10  # 取到1/100秒

    if hours > 0:
        return f"{hours}:{minutes:02}:{seconds:02}.{subsec:02}"
    elif minutes > 0:
        return f"{minutes}:{seconds:02}.{subsec:02}"
    else:
        return f"{seconds}.{subsec:02}"

def getResultByRank(sheet, rank):
    # print(sheet[sheet['worldRank'] == rank]['best'].tolist())
    if sheet[sheet['worldRank'] == rank]['best'].tolist():
        return sheet[sheet['worldRank'] == rank]['best'].tolist()[0]
    return getResultByRank(sheet, rank-1)


def processEvent(df, cur_event):
    print('-----------------------------The Event:', cur_event, '----------------------------')
    # 筛选 eventId == 'sq1' 的行, 打印sq1的表
    sheet_event = df[df['eventId'].astype(str) == str(cur_event)]
    print(sheet_event)

    #统计符合要求的行数
    event_count = sheet_event.shape[0]
    print(event_count, 'cubers have ',cur_event,' average result')

    wr=getResultByRank(sheet_event, 1)
    top01=getResultByRank(sheet_event, int(event_count*0.001))
    top1=getResultByRank(sheet_event, int(event_count*0.01))
    top5=getResultByRank(sheet_event, int(event_count*0.05))
    top10=getResultByRank(sheet_event, int(event_count*0.1))
    top20=getResultByRank(sheet_event, int(event_count*0.2))
    top50=getResultByRank(sheet_event, int(event_count*0.5))
    slowest = getResultByRank(sheet_event, event_count)

    print('WR:', formatResult(wr))
    print('0.1%:', formatResult(top01))
    print('1%:', formatResult(top1))
    print('5%:', formatResult(top5))
    print('10%:', formatResult(top10))
    print('20%:', formatResult(top20))
    print('50%:', formatResult(top50))
    print('Slowest:', formatResult(slowest))
    
    print("------------------------------------------------------------------------")
