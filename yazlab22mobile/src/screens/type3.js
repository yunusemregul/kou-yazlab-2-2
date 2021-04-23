import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet, Text,

    TouchableOpacity,
    View
} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { mysqlConfig } from '../../App';

export default function Type3({ navigation }) {
    const [queryResult, setQueryResult] = useState(null);

    const query = `SELECT tpep_pickup_datetime, tpep_dropoff_datetime, passenger_count, trip_distance, PULocationID, DOLocationID, total_amount, PUlatitude, PUlongitude, DOlatitude, DOlongitude FROM taxi t 
	INNER JOIN (SELECT LocationID, latitude AS PUlatitude, longitude AS PUlongitude FROM taxi_zones) tz1 ON t.PULocationID = tz1.LocationID
	INNER JOIN (SELECT LocationID, latitude AS DOlatitude, longitude AS DOlongitude FROM taxi_zones) tz2 ON t.DOLocationID = tz2.LocationID
	WHERE 
	trip_distance = (SELECT MIN(trip_distance) FROM taxi WHERE passenger_count >= 3)
	OR trip_distance = (SELECT MAX(trip_distance) FROM taxi WHERE passenger_count >= 3);`
    async function runQuery() {
        try {
            const connection = await MySqlConnection.createConnection(mysqlConfig);
            let res = await connection.executeQuery(query);
            setQueryResult(res);
            connection.close();
        }
        catch (err) {
            console.error(err);
        }
    }

    const tableHead = ["tpep_pickup_datetime", "tpep_dropoff_datetime", "passenger_count", "trip_distance", "PULocationID", "DOLocationID", "total_amount", "PUlatitude", "PUlongitude", "DOlatitude", "DOlongitude"];

    return (
        <View style={styles.mainContainer}>
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.typeText}>Tip 3</Text>
            </View>
            <View style={{ padding: 12 }}>
                <View style={{ marginBottom: 16, backgroundColor: '#111', padding: 12, borderWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#0e9594', fontSize: 16 }}>Çalıştırılacak istek: </Text>
                    <Text style={{ color: '#f5dfbb' }}>{query}</Text>
                </View>
                <TouchableOpacity onPress={runQuery} style={{ backgroundColor: '#111', padding: 12, borderWidth: 1 }}>
                    <Text style={{ color: '#0e9594', fontWeight: 'bold' }}>MySQL isteğini çalıştır</Text>
                </TouchableOpacity>
                {
                    queryResult && (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Tip 3 Harita', {
                                queryResult
                            });
                        }} style={{ backgroundColor: '#111', padding: 12, borderWidth: 1, marginTop: 6 }}>
                            <Text style={{ color: '#0e9594', fontWeight: 'bold' }}>Haritada Göster</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView horizontal={true} style={{ marginBottom: 12 }}>
                <ScrollView>
                    <View style={{ paddingLeft: 12, paddingRight: 12 }}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={tableHead} widthArr={[170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170]} style={tableStyle.head} textStyle={tableStyle.headText} />
                            <TableWrapper style={tableStyle.wrapper}>
                                <Rows data={queryResult ? queryResult.map((value, index) => {
                                    let toReturn = [];

                                    for (const index in tableHead) {
                                        const header = tableHead[index];
                                        if (value[header]) {
                                            toReturn.push(value[header]);
                                        }
                                    }

                                    return toReturn;
                                }) : []} widthArr={[170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170]} style={tableStyle.row} textStyle={tableStyle.text} />
                            </TableWrapper>
                        </Table>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { backgroundColor: '#222', flex: 1 },
    typeText: { fontSize: 48, fontWeight: 'bold', color: '#f2542d' },
    input: { backgroundColor: '#111', borderWidth: 1, color: '#f5dfbb', padding: 12, height: 40 }
});

const tableStyle = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#222' },
    head: { height: 40, backgroundColor: '#111' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28, backgroundColor: '#111' },
    text: { textAlign: 'center', color: '#f5dfbb' },
    headText: { textAlign: 'center', color: '#0e9594', marginLeft: 12, marginRight: 12 }
});