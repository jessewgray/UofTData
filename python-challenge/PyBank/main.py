import csv
import string

dataPath = "resources/budget_data.csv"

index = -1
combinedMonthsTotal = 0

with open(dataPath, "r", newline = "", encoding = "utf-8") as csvFile:
    csvReader = csv.reader(csvFile, delimiter = ",")
    for line in csvReader:
        if index > -1: 
            monthlyTotal = line[1]
            combinedMonthsTotal = combinedMonthsTotal + int(float(monthlyTotal))
            #print(monthlyTotal)
            #print(combinedMonthsTotal)
        index = index + 1
    print("Financial Analysis")
    print(f"Total Months: {index}")
    print(f"Total: {combinedMonthsTotal}")
    
#with open(dataPath, "w", newline="", encoding = "utf-8") as csvResults:
    #csvWriter = csv.writer(csvResults, delimiter=",")
    
    
