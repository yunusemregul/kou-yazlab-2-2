import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'GOOGLE_MAPS_API_KEY_REMOVED_FOR_PRIVACY_PUT_YOURS_HERE';

export default function Type3Map({ route, navigation }) {
    const { queryResult } = route.params;
    const point1Start = { latitude: parseFloat(queryResult[0].PUlatitude), longitude: parseFloat(queryResult[0].PUlongitude) }
    const point1End = { latitude: parseFloat(queryResult[0].DOlatitude), longitude: parseFloat(queryResult[0].DOlongitude) }
    const point2Start = { latitude: parseFloat(queryResult[1].PUlatitude), longitude: parseFloat(queryResult[1].PUlongitude) }
    const point2End = { latitude: parseFloat(queryResult[1].DOlatitude), longitude: parseFloat(queryResult[1].DOlongitude) }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 40.6426,
                    longitude: -73.7783,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                <Marker title="3 kişiden fazla maks mesafe başlangıç" coordinate={point1Start} />
                <Marker title="3 kişiden fazla maks mesafe bitiş" coordinate={point1End} />
                <MapViewDirections
                    origin={point1Start}
                    destination={point1End}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={2}
                    strokeColor="red"
                />
                <Marker title="3 kişiden fazla min mesafe başlangıç" pinColor='blue' coordinate={point2Start} />
                <Marker title="3 kişiden fazla min mesafe bitiş" pinColor='blue' coordinate={point2End} />
                <MapViewDirections
                    origin={point2Start}
                    destination={point2End}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={2}
                    strokeColor="blue"
                />
            </MapView>
        </View>
    );
}