import pandas as pd
import MyHelper

df = pd.read_csv('./WCA_export/WCA_export_RanksAverage.tsv', sep='\t', encoding='utf-8')
MyHelper.clear_screen()

while True:
    print('Event ID: 222, 333, ..., 777, 333oh, 333bf, 333fm, clock, pyram, skewb, minx, sq1, 444bf, 555bf')
    print('e: exit; c: clear screen; m: make file')
    currentEvent=input("Please input the Event ID: ")
    if currentEvent == 'e':
        break
    if currentEvent == 'c':
        MyHelper.clear_screen()
        continue
    if currentEvent == 'm':
        MyHelper.makeFile(df)
    else:
        MyHelper.processEvent(df, currentEvent)