import http from "@/http";
import ITarefa from "@/Interfaces/ITarefa";
import { Estado } from "@/store";
import {  OBTER_TAREFAS , ALTERAR_TAREFA, CADASTRAR_TAREFA} from "@/store/tipos-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/tipos-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },

        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tare => tare.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'
            if (filtro){
                url += '?descricao=' + filtro
            }
            http.get(url)
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))

        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post(`/tarefas`, tarefa)
            .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => commit(ALTERA_TAREFA, resposta.data))
        },
    }
}