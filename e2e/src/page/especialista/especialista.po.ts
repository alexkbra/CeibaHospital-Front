import { element, by } from 'protractor';

export class EspecialistaPage {

    private listaEspecialista = element.all(by.css('app-root table tbody tr'));

    async contarListaEspecialista() {
        return this.listaEspecialista.count();
    }

}