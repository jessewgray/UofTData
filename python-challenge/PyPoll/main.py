import os
import pandas as pd
import csv
import string

csvPath = os.path.join(".", "resources", "election_data.csv")


pandasCsv = pd.read_csv(csvPath)

khanVotes = 0
correyVotes = 0
liVotes = 0
other = 0

for i in pandasCsv:
    
    if str(pandasCsv["Candidate"]) == "Khan":
        khanVotes = khanVotes + 1
    elif str(pandasCsv["Candidate"]) == "Correy":
        correyVotes = correyVotes + 1
    elif str(pandasCsv["Candidate"]) == "Li":
        liVotes = liVotes + 1
    else:
        other = other + 1
print(f"Khan Votes: {khanVotes}")
print(f"Correy Votes: {correyVotes}")
print(f"Li Votes: {liVotes}")
print(f"Other Votes: {other}")
print("Election Results")
print(f"Total Votes: {len(pandasCsv['Voter ID'])}")


