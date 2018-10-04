import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,Modal } from 'react-native';
import { insertNewTodoList } from '../schemas/Schema';

export default class PopupDialogComponent extends Component {

    state = {
        id: 0,
        name: '',
        isAddNew: true
    }

  render() {
    return (
    <Modal  animationType="fade"
            onRequestClose={ () => {}} 
            transparent 
            visible = {this.props.visible} >
          <View style={styles.containerStyle}>
             <View style={styles.container}>
                <Text style={styles.headerStyle}>Add Notes</Text>
                <TextInput style={styles.textInput} placeholder='Enter TodoList name' autoCorrect={false}
                    onChangeText={text => this.setState({ name: text })} 
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (this.state.name.trim() == "") {
                        alert('Please enter todoList name')
                        return;
                    } else {
                        const newTodoList = {
                            id : Math.floor(Date.now() / 1000),
                            name: this.state.name,
                            creationDate: new Date(),
                        }
                        insertNewTodoList(newTodoList);
                    }
                }}>
                    <Text style={styles.textLabel}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={ this.props.onDecline}>
                    <Text style={styles.textLabel}>Cancel</Text>
                </TouchableOpacity>
             </View>
          </View>
    </Modal>
    )
  }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput : {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLabel : {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        width: '90%',
        height: 250,
        borderRadius: 5,
    },
    headerStyle: {
        fontSize: 23,
        color: 'steelblue',
        margin: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}