import { supabase } from './supabase';

export const getNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createNote = async (title: string, content: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('notes').insert({
    title,
    content,
    user_id: user.id,
  });

  if (error) throw error;
};

export const updateNote = async (
  id: string,
  title: string,
  content: string,
) => {
  const { error } = await supabase
    .from('notes')
    .update({ title, content, updated_at: new Date() })
    .eq('id', id);

  if (error) throw error;
};

export const deleteNote = async (id: string) => {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) throw error;
};
