import { provide, ref } from 'vue'
import useSupabase from '../boot/supabase'


const user = ref(null)

export default function useAuthUser() {
    const { supabase } = useSupabase()

    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        return user
    }

    const loginWithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signIn({ provider })
        if (error) throw error
        return user
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    const isLoggedIn = () => {
        return !!user.value
    }

    const register = async ({ name, email, password }) => {
        const { user, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        usuario: name,
                    }
                }
            },
            {
                redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
            }
        )
        if (error) throw error
        return user
    }

    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    // Função que envia o email de reset da senha
    const sendPasswordRestEmail = async (email) => {

        const { user, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) throw error
        return user
    }

    // Função que cadastra nova senha
    const resetPassword = async (newPassword) => {

        // const resetPassword = async (accessToken, newPassword) => {
        // const { user, error } = await supabase.auth.api.updateUser(
        //     accessToken,
        //     { password: newPassword }
        // )

        console.log('entrou em resetPassword -> cadastrar nova senha')
        const { user, error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) throw error
        return user
    }

    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
        resetPassword
    }
}