import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';

import AppButton from '../../components/Button/AppButton';
import Label from '../../components/Label/Label';
import { COLORS, FONTS } from '../../constants';
import { createNote, updateNote } from '../../services/notes.service';
import TextBox from '../../components/Label/TextBox';
import Header from '../../components/Header/Header';

type FormData = {
  title: string;
  content: string;
};

const NoteForm = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const editingNote = route.params?.note ?? null;
  const isEdit = Boolean(editingNote);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      setValue('title', editingNote.title);
      setValue('content', editingNote.content);
    }
  }, [isEdit]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (isEdit) {
        await updateNote(editingNote.id, data);
      } else {
        await createNote(data);
      }

      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Add Note" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Label
            labelContent={isEdit ? 'Edit Note' : 'New Note'}
            size={26}
            family={FONTS.GilroyBold}
            color={COLORS.textSecondary}
            align="center"
            mb={24}
          />

          <TextBox
            name="title"
            control={control}
            label="Title"
            placeholder="Enter note title"
            required
            errors={errors}
            containerStyle={styles.input}
          />

          <TextBox
            name="content"
            control={control}
            label="Content"
            placeholder="Write your note here..."
            multiline
            required
            errors={errors}
            containerStyle={styles.input}
          />

          <AppButton
            title={isEdit ? 'Update Note' : 'Save Note'}
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NoteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 1,
  },
  input: {
    marginBottom: 16,
  },
});
