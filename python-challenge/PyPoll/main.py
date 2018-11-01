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
index = 0

totalVotes = len(pandasCsv['Voter ID'])

for row in pandasCsv['Candidate']:
    if str(pandasCsv["Candidate"][index]) == "Khan":
        khanVotes = khanVotes + 1
    elif str(pandasCsv["Candidate"][index]) == "Correy":
        correyVotes = correyVotes + 1
    elif str(pandasCsv["Candidate"][index]) == "Li":
        liVotes = liVotes + 1
    else:
        other = other + 1
    index = index + 1

khanPercent = round(khanVotes / totalVotes * 100)
correyPercent = round(correyVotes / totalVotes * 100)
liPercent = round(liVotes / totalVotes * 100)
otherPercent = round(other / totalVotes * 100)

l = [khanVotes, correyVotes, liVotes, other]
max(l)

print("Election Results")
print("------------------")
print(f"Total Votes: {len(pandasCsv['Voter ID'])}")
print("------------------")
print(f"Khan Votes: %{khanPercent} {khanVotes}")
print(f"Correy Votes: %{correyPercent} {correyVotes}")
print(f"Li Votes: %{liPercent} {liVotes}")
print(f"Other Votes: %{otherPercent} {other}")
print("------------------")
print(f"Winner: Khan {khanVotes}")
print("------------------")


