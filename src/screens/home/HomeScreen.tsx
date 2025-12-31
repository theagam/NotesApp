import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../services/supabase';
import { getNotes, deleteNote } from '../../services/notes.service';
import { COLORS, FONTS } from '../../constants';
import Header from '../../components/Header/Header';
import renderToast from '../../helper/renderToast';
import { useToast } from 'react-native-toast-notifications';
import AppButton from '../../components/Button/AppButton';

const HomeScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('User');

  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
      fetchUser();
    }, []),
  );

  //fetch user
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user?.user_metadata?.display_name) {
      setUserName(data.user.user_metadata.display_name);
    }
  };

  //fetch notees
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data || []);
    } catch {
      renderToast(toast, 'Failed to load notes', 'danger');
    } finally {
      setLoading(false);
    }
  };

  //delete fun
  const handleDelete = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNote(id);
            setShowModal(false);
            fetchNotes();
            renderToast(toast, 'Note deleted', 'success');
          } catch {
            renderToast(toast, 'Unable to delete note', 'danger');
          }
        },
      },
    ]);
  };

  //logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await supabase.auth.signOut();
          renderToast(toast, 'Logged out successfully', 'success');
        },
      },
    ]);
  };
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  //card
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedNote(item);
        setShowModal(true);
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={`Hi, ${userName}`} showLogout onLogout={handleLogout} />

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchNotes}
        contentContainerStyle={[
          notes.length === 0 && styles.emptyContainer,
          { marginTop: 10 },
        ]}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No notes yet. Add one!</Text>
          ) : null
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteForm')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedNote?.title}</Text>

              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('NoteForm', {
                      note: selectedNote,
                    });
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(selectedNote.id)}
                  style={{ marginLeft: 16 }}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScroll}
            >
              <Text style={styles.modalContent}>{selectedNote?.content}</Text>
            </ScrollView>

            {/* Divider */}
            <View style={styles.metaDivider} />

            {/* Meta info */}
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>
                Created • {formatDateTime(selectedNote?.created_at)}
              </Text>

              {selectedNote?.updated_at && (
                <Text style={styles.metaText}>
                  Updated • {formatDateTime(selectedNote.updated_at)}
                </Text>
              )}
            </View>

            <AppButton
              onPress={() => setShowModal(false)}
              title="Close"
              containerStyle={{ marginTop: 30 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  title: {
    fontFamily: FONTS.GilroyBold,
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },

  content: {
    fontFamily: FONTS.GilroyRegular,
    fontSize: 14,
    color: '#475569',
  },

  fab: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontFamily: FONTS.GilroyMedium,
    color: '#64748B',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  modalScroll: {
    paddingBottom: 10,
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%', // IMPORTANT for scroll
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontFamily: FONTS.GilroyBold,
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },

  iconRow: {
    flexDirection: 'row',
  },

  modalContent: {
    fontFamily: FONTS.GilroyRegular,
    fontSize: 15,
    color: '#334155',
  },

  closeBtn: {
    marginTop: 20,
    alignSelf: 'center',
  },

  closeText: {
    fontFamily: FONTS.GilroyBold,
    color: COLORS.primary,
  },
  updatedModalText: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: FONTS.GilroyMedium,
    marginBottom: 12,
  },
  metaDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },

  metaContainer: {
    alignItems: 'flex-start',
    gap: 4,
  },

  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: FONTS.GilroyMedium,
  },
});
