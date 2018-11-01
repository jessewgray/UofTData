import csv
import string

dataPath = "resources/budget_data.csv"

index = -1
combinedMonthsTotal = 0
prevMonthTotal = 0
averageMonthlyDiff = 0
totalMonthDiffs = 0
runningTotalDiff = 0
greatestIncrease = 0
greatestDecrease = 0
increaseMonth = ""
decreaseMonth = ""

with open(dataPath, "r", newline = "", encoding = "utf-8") as csvFile:
    csvReader = csv.reader(csvFile, delimiter = ",")
    for line in csvReader:
        if index > -1: 
            monthlyTotal = line[1]
            month = line[0]
            if int(monthlyTotal) > int(greatestIncrease):
                greatestIncrease = monthlyTotal
                increaseMonth = line[0]
            elif int(monthlyTotal) < int(greatestDecrease):
                greatestDecrease = monthlyTotal 
                decreaseMonth = line[0]
            combinedMonthsTotal = combinedMonthsTotal + int(float(monthlyTotal))
            print(f"monthlyTotal is {monthlyTotal}")
            monthlyTotalDiff = int(monthlyTotal) - int(prevMonthTotal)
            print(f"monthlyTotalDiff {monthlyTotalDiff}")
            runningTotalDiff = int(runningTotalDiff) + int(monthlyTotalDiff)
            print(f"runningTotalDiff {runningTotalDiff}")
            
            print(f"prevMonthTotal {prevMonthTotal}")
            prevMonthTotal = monthlyTotal
            
            print("_______")
        index = index + 1
    averageChange = int(runningTotalDiff) / int(index)
    print("Financial Analysis")
    print(f"Total Months: {index}")
    print(f"Total: ${combinedMonthsTotal}")
    print(f"Average Change: ${averageChange}")
    print(f"Greatest Increase in Profits: {increaseMonth} {greatestIncrease}")
    print(f"Greatest Decrease in Profits: {decreaseMonth} {greatestDecrease}")
    
 
    
with open("resources/results.csv", "w", newline="", encoding = "utf-8") as csvResultsFile:
    csvWriter = csv.writer(csvResultsFile, delimiter=",")
    csvWriter.writerow(["Financial Analysis"])
    csvWriter.writerow([f"Total Months: {index}"])
    csvWriter.writerow([f"Total: ${combinedMonthsTotal}"])
    csvWriter.writerow([f"Average Change: ${averageChange}"])
    csvWriter.writerow([f"Greatest Increase in Profits: {increaseMonth} {greatestIncrease}"])
    csvWriter.writerow([f"Greatest Decrease in Profits: {decreaseMonth} {greatestDecrease}"])