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

    const dadosFormatados = data.map((tabela) => {
      const dataCorrigida = new Date(tabela.data)
      dataCorrigida.setDate(dataCorrigida.getDate() + 1)

      tabela.data = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric"
      }).format(new Date(dataCorrigida))

      if (tabela.sistema == 1) {
        tabela.sistema = "e-JUD"
      } else if (tabela.sistema == 2) {
        tabela.sistema = "PJe"
      } else if (tabela.sistema == 3) {
        tabela.sistema = "e-JUD / PJe"
      }
      return tabela
    })

    return dadosFormatados
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

  const update = async (table, dados) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        data: dados.data,
        feriado: dados.feriado,
        sistema: dados.sistema
      })
      .eq('id', dados.id)
    if (error) throw error
    return data
  }

  const deletar = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    if (error) throw error
    return data
  }

  return {
    list,
    getById,
    post,
    update,
    deletar,
  }
}
