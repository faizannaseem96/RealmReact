import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { updateTodoList, deleteTodoList, deleteAllTodoLists, queryAllTodoLists } from '../schemas/Schema';

export default class FlatListItem extends Component {

    showEditModal = () => {
        alert('Hurrah')
    }

    deleteModal = (id) => {
        deleteTodoList(id)
        alert(id);
    }

  render() {

    const { itemIndex, id, name, creationDate } = this.props.tasks;

    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: 'rgb(81,134,237)',
                onPress: this.showEditModal.bind(this)
            },
            {
                text: 'Delete',
                backgroundColor: 'rgb(217,80,64)',
                onPress: this.deleteModal.bind(this, id)
            }
        ]} autoClose={true} >
            <View style={{ backgroundColor: itemIndex % 2 == 0? 'powderblue' : 'skyblue' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 10}}>{name}</Text>
                <Text style={{ fontSize: 14, margin: 10}}>{creationDate.toLocaleString()}</Text> 
            </View>
        </Swipeout>
    );
  }
}
