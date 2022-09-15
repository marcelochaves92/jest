import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro Amazon',
        lanceInicial: 50,
        descricao: 'Livro auto-ajuda'
    },
    {
        produto: 'Livro Amazon',
        lanceInicial: 50,
        descricao: 'Livro sobre test units'
    }
]

describe('Um avaliador que se conecta com a API', () => {
    test('mostra todos os leiloes retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)
    })
    test('não há leiloes retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()
        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)
    })
})