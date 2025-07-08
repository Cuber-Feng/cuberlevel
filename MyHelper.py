import os
import platform
import pandas as pd

def clear_screen():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")
        
def save_to_csv(data_rows, filename):
    df = pd.DataFrame(data_rows)
    df = df.set_index('EventId')  # 把 'name' 列设为索引
    df.to_csv(filename, index=True, encoding='utf-8-sig')  # index=True 会保存索引列
    print(f"Data saved to {filename}")

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
    if rank == 0:
        return getResultByRank(sheet, 1)
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


def makeFile(df):
    rows=[]
    eventList=['222','333','444','555','666','777','333oh','333fm','333bf','clock','skewb','sq1','minx','pyram','444bf','555bf']
    for cur_event in eventList:
        sheet_event = df[df['eventId'].astype(str) == str(cur_event)]
        event_count = sheet_event.shape[0]
        
        row = {
        'eventId': cur_event,
        'wr': getResultByRank(sheet_event, 1),
        'top001': getResultByRank(sheet_event, max(1, int(event_count * 0.001))),
        'top1': getResultByRank(sheet_event, max(1, int(event_count * 0.01))),
        'top5': getResultByRank(sheet_event, max(1, int(event_count * 0.05))),
        'top10': getResultByRank(sheet_event, max(1, int(event_count * 0.1))),
        'top20': getResultByRank(sheet_event, max(1, int(event_count * 0.2))),
        'top50': getResultByRank(sheet_event, max(1, int(event_count * 0.5))),
        'slowest': getResultByRank(sheet_event, event_count),
        'cnt': event_count
        }
        rows.append(row)

    # 转成DataFrame
    result_df = pd.DataFrame(rows)
    print(rows)
    # 保存成CSV（根据需要修改文件名）
    result_df.to_csv('event_rank_summary.csv', index=False, encoding='utf-8-sig')
    print("Summary saved to event_rank_summary.csv")
        
        