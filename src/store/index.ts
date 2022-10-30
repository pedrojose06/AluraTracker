import IProjeto from "@/Interfaces/IProjeto";
import { createStore, Store,useStore as vuexUseStore} from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUIR_PROJETO } from "./tipos-mutacoes";

interface Estado{
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations:{
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjeto){
             const index = state.projetos.findIndex(proj => proj.id == projeto.id)
             state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string){
             state.projetos = state.projetos.filter(proj => proj.id != id)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}