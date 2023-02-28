import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteBook} from '../Redux/features/books';

type Props = {
  id: number;
  bookName: string;
  bookCategory: string;
  dateCreated?: Date;
  dateCompleted?: Date;
  description?: string;
  lastRead?: string;
  editBook?: ((id: string) => void) | undefined;
};

const Books = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.bookComponent}
      id={props.id}
      onPress={() => {
        Alert.alert(
          'Kitap Düzenle',
          'Kitabı düzenlemek istediğinize emin misiniz?',
          [
            {
              text: 'Hayır',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Evet',
              onPress: () => {
                props.editBook(props.id);
              },
            },
          ],
          {cancelable: false},
        );
      }}
      onLongPress={() => {
        Alert.alert(
          'Kitap Sil',
          'Kitabı silmek istediğinize emin misiniz?',
          [
            {
              text: 'Hayır',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Evet',
              onPress: () =>
                dispatch(
                  deleteBook({
                    id: props.id,
                  }),
                ),
            },
          ],
          {cancelable: false},
        );
      }}>
      <Text style={styles.bookName}>{'Kitap Adı: ' + props.bookName}</Text>
      <Text style={styles.bookAuthor}>{'Kategori: ' + props.bookCategory}</Text>
      <Text style={styles.bookAuthor}>
        Kitaba Başlangıç Tarihi:{' '}
        {new Date(props.dateCreated).toLocaleDateString()}
      </Text>
      <Text style={styles.bookAuthor}>
        Kitabın Bitiş Tarihi:{' '}
        {new Date(props.dateCompleted).toLocaleDateString()}
      </Text>
      <Text style={styles.bookAuthor}>{props.description}</Text>
      <Text style={styles.bookAuthor}>{props.lastRead}</Text>
    </TouchableOpacity>
  );
};

export default Books;

const styles = StyleSheet.create({
  bookComponent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    height: 250,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  bookImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  bookName: {
    color: '#FFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookAuthor: {
    color: '#a7acb5',
    fontSize: 15,
    textAlign: 'center',
  },
});
