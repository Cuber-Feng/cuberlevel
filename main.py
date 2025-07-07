import pandas as pd

df = pd.read_csv('WCA_export_RanksAverage.tsv', sep='\t', encoding='utf-8')

# 查看数据
print(df.head())

# 筛选 status == 'active' 的行
filtered_df = df[df['eventId'] == 'sq1']

# 查看结果
print(filtered_df)
