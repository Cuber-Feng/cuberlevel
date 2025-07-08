import pandas as pd
import MyHelper

df = pd.read_csv('./WCA_export/WCA_export_RanksAverage.tsv', sep='\t', encoding='utf-8')
MyHelper.clear_screen()

while True:
    currentEvent=input("Please input the Event ID: ")
    MyHelper.processEvent(df, currentEvent)