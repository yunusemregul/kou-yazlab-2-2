import React, { useState } from 'react';
import {
    StyleSheet, Text,
    TouchableOpacity,
    View
} from 'react-native';
import MySqlConnection from 'react-native-my-sql-connection';
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { mysqlConfig } from '../App';

const query = 'SELECT tpep_pickup_datetime, trip_distance FROM taxi ORDER BY trip_distance DESC LIMIT 5';

export default function Type1({ navigation }) {
    const [queryResult, setQueryResult] = useState(null);

    async function runQuery() {
        console.log('hello');
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

    const tableHead = ['tpep_pickup_datetime', 'trip_distance'];

    return (
        <View style={styles.mainContainer}>
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.typeText}>Tip 1</Text>
            </View>
            <View style={{ padding: 12 }}>
                <View style={{ marginBottom: 16, backgroundColor: '#111', padding: 12, borderWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#0e9594', fontSize: 16 }}>Çalıştırılacak istek: </Text>
                    <Text style={{ color: '#f5dfbb' }}>{query}</Text>
                </View>
                <TouchableOpacity onPress={runQuery} style={{ backgroundColor: '#111', padding: 12, borderWidth: 1 }}>
                    <Text style={{ color: '#0e9594', fontWeight: 'bold' }}>MySQL isteğini çalıştır</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 12 }}>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={tableHead} flexArr={[1, 1]} style={tableStyle.head} textStyle={tableStyle.headText} />
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
                        }) : []} flexArr={[1, 1]} style={tableStyle.row} textStyle={tableStyle.text} />
                    </TableWrapper>
                </Table>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { backgroundColor: '#222', flex: 1 },
    typeText: { fontSize: 48, fontWeight: 'bold', color: '#f2542d' }
});

const tableStyle = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#222' },
    head: { height: 40, backgroundColor: '#111' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28, backgroundColor: '#111' },
    text: { textAlign: 'center', color: '#f5dfbb' },
    headText: { textAlign: 'center', color: '#0e9594' }
});