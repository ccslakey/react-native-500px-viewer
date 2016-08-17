/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    fetch
} from 'react-native';

import request from 'superagent';

class TextInputTest extends Component {
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
          console.log('rowHasChanged');
          return r1 !== r2;
        }});

        this.state = {
            photos: this.ds.cloneWithRows(["https://drscdn.500px.org/photo/65621765/m%3D1080_k%3D1_a%3D1/3eeba70ce751f3dc990b8129fb6481c8"]),
            input: ''
        };
    }

    componentDidMount(){
        console.log('comp mounting');
        console.log(this.getPhotos());
    }


    getPhotos() {
        console.log('getting photos');
        return request('https://api.500px.com/v1/photos/search?consumer_key=pgEYIjkGkNgKmMzNxcWgV0VpTbUyAwHCMlUOT2hv&tag=cat&image_size=1080')
            .then((response) => {
                console.log('hi from the res');
                return response.body;
            })
            .then((res) => {
                console.log(res);
                let photoUrls = [];
                res.photos.map((photo) => {
                    photoUrls.push(photo.image_url)
                });
                this.setState({
                    photos: this.ds.cloneWithRows(photoUrls)
                });
            })
             .catch(function(err) {
                console.log(err);
              })
             .done();
    }

    _onPressButton(){
        console.log('hi');
    }

    renderRow(url) {

        return (
            <TouchableOpacity onPress={this._onPressButton}>
                <Image
                  style={styles.button}
                  source={{uri:url}}
                />
            </TouchableOpacity>
         );
    }

    render() {
        return (
            // <View style={styles.container}>
            <ListView
                dataSource={this.state.photos}
                renderRow={this.renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 100,
        backgroundColor: 'powderblue',
    },
    button: {
        width: 400,
        height: 200

    },
});

AppRegistry.registerComponent('TextInputTest', () => TextInputTest);
