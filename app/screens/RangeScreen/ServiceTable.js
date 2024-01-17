import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ServiceTable = ({ serviceData, onServiceSelect }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.body}>
          {serviceData.map((product, index) => (
            <TouchableOpacity onPress={() => onServiceSelect(product)}>
              <View key={index} style={styles.row}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />
                <Text style={styles.description}>{product.itemDescription}</Text>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => onServiceSelect(product)}>
                  <Text style={styles.buttonText}>  >> </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1, // Add a border at the bottom of the header
    paddingBottom: 5, // Add some padding to separate header and body
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1, // Add a border at the bottom of each row
    paddingBottom: 5, // Add some padding to separate rows
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  description: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  selectButton: {
    backgroundColor: '#B78D05',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ServiceTable;
