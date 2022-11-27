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

    // const dados = data.map((item) => {
    //   return {
    //     ...item, data: Intl.DateTimeFormat("pt-BR", {
    //       day: "2-digit", month: "2-digit", year: "numeric"
    //     }).format(new Date(item.data))
    //   }
    // })

    // console.log(dados)

    const dadosFormatados = data.map((tabela) => {

      const dataCorrigida = new Date(tabela.data)
      dataCorrigida.setDate(dataCorrigida.getDate() + 1)

      tabela.data = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric"
      }).format(new Date(dataCorrigida))

      // tabela.data = Intl.DateTimeFormat("pt-BR", {
      //   day: "2-digit", month: "2-digit", year: "numeric"
      // }).format(new Date(tabela.data))

      if (tabela.sistema == 1) {
        tabela.sistema = "eJud"
      } else if (tabela.sistema == 2) {
        tabela.sistema = "PJe"
      } else if (tabela.sistema == 3) {
        tabela.sistema = "eJud/PJe"
      }
      return tabela
    })

    console.log(dadosFormatados)

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
