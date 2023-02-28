import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Slider from '../Components/Slider';
import Books from '../Components/Books';
import AddBook from '../Components/AddBook';
import {useAppSelector} from '../Redux/store';

type Props = {};

const Home = (props: Props) => {
  useEffect(() => {
    setHideLoader(true);
    axios
      .get(
        'https://res.cloudinary.com/drxffezfe/raw/upload/v1661977358/book-categories_qbktat.json',
      )
      .then(res => {
        setTimeout(() => {
          setCategories(res.data.data);
          setHideLoader(false);
        }, 1000);
      });
  }, []);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(undefined);
  const [hideLoader, setHideLoader] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [editable, setEditable] = useState<number>(null);

  const data = useAppSelector(state => state.book.books);

  useEffect(() => {
    setModalVisible(editable !== null);
  }, [editable]);

  return (
    <SafeAreaView style={styles.homePage}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <AddBook
          categories={categories}
          setModalVisible={(value: boolean) => {
            setModalVisible(value);
          }}
          editBook={editable}
          setEditBook={value => {
            setEditable(value);
          }}
        />
      </Modal>

      {hideLoader ? (
        <Text style={styles.loader}>Yükleniyor...</Text>
      ) : (
        <View style={styles.home}>
          <FlatList
            style={styles.sliderList}
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Slider
                id={item.id}
                name={item.name}
                onPress={() => {
                  selectedCategory === item.name
                    ? setSelectedCategory(undefined)
                    : setSelectedCategory(item.name);
                }}
              />
            )}
          />

          <FlatList
            style={styles.sliderBook}
            data={
              selectedCategory
                ? data.filter(item => item.category === selectedCategory)
                : data
            }
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 5,
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Books
                id={item.id}
                bookName={item.name}
                bookCategory={item.category}
                dateCreated={item.dateCreated}
                dateCompleted={item.dateCompleted}
                description={item.description}
                lastRead={item.lastRead}
                editBook={id => {
                  setEditable(id);
                }}
              />
            )}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.addButtonIcon}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  home: {
    flex: 1,
  },
  loader: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: '45%',
    left: '35%',
    zIndex: 1,
  },
  sliderList: {
    flex: 1,
    maxHeight: 50,
  },
  sliderBook: {},
  notFoundText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2e2d',
  },
  addButtonIcon: {
    color: 'white',
    fontSize: 30,
    marginLeft: 1,
    marginBottom: 2,
  },
});
