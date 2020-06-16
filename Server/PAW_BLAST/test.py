import os
import pandas

file = "/Users/K/Downloads/PAW_BLAST-master/RefSeq_Narwhal_100_GCF_005190385.1_NGI_Narwhal_1_protein_subset_vs_2019.06_UP000005640_9606_Homo_sapiens_canonical.txt"
df = pandas.read_csv(file, sep='\t')
result = df.isin(["hit_acc"])
# Get list of columns that contains the value
seriesObj = result.any()
columnNames = list(seriesObj[seriesObj == True].index)
# Iterate over list of columns and fetch the rows indexes where value exists
x = 0
y = 0
for col in columnNames:
   rows = list(result[col][result[col] == True].index)
   for row in rows:
      x = row 
      y = col
      break
df = df[[y]]
df.columns = df.iloc[x]
df = df[x+1:]
df['hit_acc'] = df['hit_acc'].fillna(0)
list_df = df.iloc[:,0].tolist()
_index = list_df.index(float(0))
print(_index)
s = '\n'.join(list_df[:_index])
print(s)
