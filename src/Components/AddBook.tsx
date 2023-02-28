import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {addBook, updateBook} from '../Redux/features/books';
import {useAppSelector} from '../Redux/store';

type Props = {
  categories: string[];
  setModalVisible: (value: boolean) => void;
  editBook?: ((id: number) => void) | undefined;
  setEditBook?: ((value: number) => void) | null;
};

const AddBook = (props: Props) => {
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);
  console.log(props.editBook);
  const [bookData, setBookData] = useState<{
    id: number;
    bookName: string;
    bookCategory: string;
    dateCreated: Date;
    dateCompleted: Date;
    description: string;
    lastRead: string;
  }>({
    id: 0,
    bookName: '',
    bookCategory: '',
    dateCreated: new Date(),
    dateCompleted: new Date(),
    description: '',
    lastRead: '',
  });
  const dispatch = useDispatch();

  const addBookAsync = () => {
    props.editBook
      ? dispatch(
          updateBook({
            id: bookData.id,
            name: bookData.bookName,
            category: bookData.bookCategory,
            dateCreated: bookData.dateCreated,
            dateCompleted: bookData.dateCompleted,
            description: bookData.description,
            lastRead: bookData.lastRead,
          }),
        )
      : dispatch(
          addBook({
            name: bookData.bookName,
            category: bookData.bookCategory,
            dateCreated: bookData.dateCreated,
            dateCompleted: bookData.dateCompleted,
            description: bookData.description,
            lastRead: bookData.lastRead,
          }),
        );
  };

  const data = useAppSelector(state => state.book.books);

  useEffect(() => {
    if (props.editBook) {
      const book = data.find(book => book.id === props.editBook);
      if (book) {
        setBookData({
          id: book.id,
          bookName: book.name,
          bookCategory: book.category,
          dateCreated: book.dateCreated,
          dateCompleted: book.dateCompleted,
          description: book.description,
          lastRead: book.lastRead,
        });
      }
    }
  }, [props.editBook]);

  return (
    <View style={styles.mainComponent}>
      <Text style={styles.title}>Kitabınızı Ekleyin</Text>
      <TextInput
        value={bookData.bookName}
        onChangeText={text => {
          setBookData({...bookData, bookName: text});
        }}
        style={styles.addBookInput}
        placeholder="Kitap Adı"
        placeholderTextColor={'#adadad'}
      />
      <SelectDropdown
        data={props.categories}
        defaultButtonText={'Kategori Seçiniz'}
        rowStyle={{
          backgroundColor: '#303030',
          borderBottomWidth: 0,
        }}
        buttonStyle={{
          backgroundColor: '#303030',
          width: '80%',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 5,
        }}
        rowTextStyle={{
          color: '#FFFF',
          textAlign: 'left',
          fontSize: 15,
          fontWeight: '400',
        }}
        dropdownStyle={{
          backgroundColor: '#303030',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopWidth: 1,
          marginTop: -8,
        }}
        buttonTextStyle={{
          textAlign: 'left',
          color: '#adadad',
          fontSize: 15,
          fontWeight: '400',
          marginLeft: 1,
        }}
        selectedRowStyle={{
          borderWidth: 0,
        }}
        selectedRowTextStyle={{}}
        onSelect={(selectedItem, index) => {
          setBookData({...bookData, bookCategory: selectedItem.name});
        }}
        dropdownOverlayColor={'rgba(0, 0, 0, 0)'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          return item.name;
        }}
      />

      <TouchableOpacity
        style={styles.addBookInput}
        onPress={() => setOpenStartDate(true)}>
        <Text style={[styles.addBookDate]}>
          {'Okumaya Başladığınız Tarih: ' +
            bookData.dateCreated.toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addBookInput}
        onPress={() => setOpenEndDate(true)}>
        <Text style={[styles.addBookDate]}>
          {'Okumayı Bitirdiğiniz Tarih: ' +
            bookData.dateCompleted.toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={openStartDate}
        date={bookData.dateCreated}
        confirmText="Onayla"
        onConfirm={date => {
          setOpenStartDate(false);
          setBookData({...bookData, dateCreated: date});
        }}
        onCancel={() => {
          setOpenStartDate(false);
        }}
        mode="date"
      />

      <DatePicker
        modal
        open={openEndDate}
        date={bookData.dateCompleted}
        confirmText="Onayla"
        onConfirm={date => {
          setOpenEndDate(false);
          setBookData({...bookData, dateCompleted: date});
        }}
        onCancel={() => {
          setOpenEndDate(false);
        }}
        mode="date"
      />

      <TextInput
        style={styles.addBookInput}
        value={bookData.description}
        onChangeText={text => {
          setBookData({...bookData, description: text});
        }}
        placeholder="Açıklama"
        placeholderTextColor={'#adadad'}
      />

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addBookAsync();
            props.setModalVisible(false);
            props.setEditBook(null);
          }}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.setEditBook(null);
            setBookData({
              id: 0,
              bookName: '',
              bookCategory: '',
              dateCreated: new Date(),
              dateCompleted: new Date(),
              description: '',
              lastRead: '',
            });
          }}>
          <Text style={styles.buttonText}>Temizle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBook;

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFF',
    marginVertical: 20,
  },
  addBookInput: {
    backgroundColor: '#303030',
    width: '80%',
    marginVertical: 10,
    padding: 10,
    height: 50,
    borderRadius: 10,
    color: 'white',
    fontWeight: '400',
    justifyContent: 'center',
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#303030',
    width: '45%',
    marginVertical: 10,
    padding: 10,
    height: 50,
    borderRadius: 10,
    color: 'white',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addBookDate: {
    color: '#adadad',
    fontSize: 15,
    fontWeight: '400',
  },
});
