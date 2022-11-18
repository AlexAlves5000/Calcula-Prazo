import useSupabase from "../boot/supabase"
import useAuthUser from "../composables/UseAuthUser"

export default function useApi() {
  const { user } = useAuthUser()
  const { supabase } = useSupabase()

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select()
    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id
        }
      ])
    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        ...form
      ])
      .match({ id: form.id })
    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id: id })
    if (error) throw error
    return data
  }

  return {
    list,
    getById,
    post,
    update,
    remove
  }
}
