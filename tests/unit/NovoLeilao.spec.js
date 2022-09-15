import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
    push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
    test('dado o formulário preenchido, um leilão deve ser criado', () => {
        createLeilao.mockResolvedValueOnce()
        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        })
        wrapper.find('.produto').setValue('Notebook')
        wrapper.find('.descricao').setValue('MacBook Pro')
        wrapper.find('.valor').setValue(15000)
        wrapper.find('form').trigger('submit')
        expect(createLeilao).toHaveBeenCalled()
    })
})