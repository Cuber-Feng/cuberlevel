import pandas as pd
import MyHelper
import leaderboard as lb
import time

df_average = pd.read_csv('./WCA_export/WCA_export_RanksAverage.tsv', sep='\t', encoding='utf-8')
df_single = pd.read_csv('./WCA_export/WCA_export_RanksSingle.tsv', sep='\t', encoding='utf-8')
df_person = pd.read_csv('./WCA_export/WCA_export_Persons.tsv', sep='\t', encoding='utf-8')
df_scoreAppendix = pd.read_csv('./event_rank_summary.csv', encoding='utf-8-sig')
MyHelper.clear_screen()

while True:
    start_time = time.time()
    print('Event ID: 222, 333, ..., 777, 333oh, 333bf, 333fm, clock, pyram, skewb, minx, sq1, 444bf, 555bf')
    print('e: exit; c: clear screen; m: make file')
    currentEvent=input("Please input the Event ID: ")
    if currentEvent == 'e':
        break
    if currentEvent == 'c':
        MyHelper.clear_screen()
        continue
    if currentEvent == 'm':
        MyHelper.makeFile(df_average, df_single)
    if currentEvent == 'p':
        lb.genRank(df_person, df_average, df_single, df_scoreAppendix)
    else:
        if currentEvent in ['333bf', '333mbf', '444bf', '555bf']:
            MyHelper.processEvent(df_single, currentEvent)
        else:
            MyHelper.processEvent(df_average, currentEvent)
            
    end_time = time.time()
    print(f"運行時間: {end_time - start_time:.4f} 秒")