/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, View, FlatList, TouchableOpacity, Button} from 'react-native';
import { updateTodoList, deleteTodoList, deleteAllTodoLists, queryAllTodoLists } from './schemas/Schema';
import realm from './schemas/Schema';
import PopupDialogComponent from './src/PopupDialogComponent';
import PopupDialog from 'react-native-popup-dialog';
import FlatListItem from './src/FlatListItem';


export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        todoLists: [],
        showPopUp: false,
    };
    this.fetchData();
    realm.addListener('change', () => {
        this.fetchData();
    });
}

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Home',
    headerRight: (
      <Button
        onPress = { navigation.getParam('displayDialog')}
        title='Add'
        color='black'
      />
    )
  });

  _displayDialog = () => {
    this.setState({ showPopUp: true });
  };

  componentDidMount() {
    this.props.navigation.setParams({ displayDialog: this._displayDialog });
  }
  
  fetchData = () => {
    queryAllTodoLists().then((todoLists) => {
          this.setState({ todoLists });
      }).catch((error) => {
          this.setState({ todoLists: [] });
    });
  }

  onDecline() {
    this.setState({ showPopUp: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={styles.flatList}
          data={this.state.todoLists}
          renderItem = {({item, index}) => 
            <FlatListItem tasks={item} />
          }
          keyExtractor = { item => item.id.toString() }
        />
        <PopupDialogComponent visible={this.state.showPopUp}
         onDecline={this.onDecline.bind(this)} />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  flatList: {
    flex: 1,
    flexDirection: 'column',
  }
}