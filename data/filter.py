import csv
from datetime import datetime

taxiZones = []

istenenColumns = ["LocationID","zone","longitude","latitude"]

with open('taxi_zones.csv') as csvFile:
    reader = csv.DictReader(csvFile)

    for row in reader:
        row = {key:value for key,value in row.items() if key in istenenColumns}
        taxiZones.append(row)

with open('taxi_zones_filtered.csv', 'w', newline='') as csvFile:
    writer = csv.DictWriter(csvFile, fieldnames=istenenColumns)

    # writer.writeheader()

    for veri in taxiZones:
        writer.writerow(veri)

istenenColumns = ["tpep_pickup_datetime", "tpep_dropoff_datetime", "passenger_count", "trip_distance", "PULocationID", "DOLocationID", "total_amount"]

verimiz = list()

gunler = set()
yerler = set()

with open('yellow_tripdata_2020-12.csv') as csvFile:
    reader = csv.DictReader(csvFile)
    global fieldnames
    fieldnames = reader.fieldnames

    index = -1

    nextIndex = 0

    for row in reader:
        index += 1

        if index==0:
            continue

        if index<nextIndex:
            continue

        pickupTimeStr = row['tpep_pickup_datetime']
        pickupTime = datetime.strptime(pickupTimeStr, "%Y-%m-%d %H:%M:%S")

        location = row['PULocationID']

        if len(verimiz) < 1000 or (len(gunler)<15 or len(yerler)<30):
            gunler.add(pickupTime.day)
            yerler.add(location)
            row = {key:value for key, value in row.items() if key in istenenColumns}
            verimiz.append(row)

            nextIndex += 999
        else:
            break
    
with open('verimiz.csv', 'w', newline='') as csvFile:
    writer = csv.DictWriter(csvFile, fieldnames=istenenColumns)

    # writer.writeheader()

    for veri in verimiz:
        writer.writerow(veri)