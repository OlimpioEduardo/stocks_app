'use server'

import { headers } from "next/headers"
import { auth } from "../better-auth/auth"
import { inngest } from "../inngest/client"

export const signUpWithEmail = async({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry}:SignUpFormData)=>{
    try {

        const res = await auth.api.signUpEmail({ // criando um novo registro de usuario para o mongoDB
            body:  //e fazendo o hash da senha e tbm amrmazenar tokens
            {
                email, 
                password, 
                name:fullName,
               
            }
        })

        if (res) { // se o usuario for criado com sucesso
            await inngest.send({
                email,
                name: 'app/user.created',// adicionaremos o evento criado pelo o usuario
                country,
                investmentGoals,
                riskTolerance,
                preferredIndustry
            })
        }

        return {success:true, data:res}
        
    } catch (error) {
        console.log('Sign up failed', error)
        return {success: false, error:'Sign up failed'}
    }
}

{/* Login function */}

export const signInWithEmail = async({email, password, }:SignInFormData)=>{
    try {
        const res = await auth.api.signInEmail({body:{email, password}
        })

        return {success:true, data:res}
        
    } catch (error) {
        console.log('Sign in failed', error)
        return {success: false, error:'Sign in failed'}
    }
}


/////////////////////////////////////////
{/* Sign out function */}

export const signOut = async()=>{
    try {
        await auth.api.signOut({headers:await headers()})
    } catch (error) {
        console.log('Sign out failed', error)
        return {success:false, error:'Sign out failed'}
    }
}