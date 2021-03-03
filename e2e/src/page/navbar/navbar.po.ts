import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkCita = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkUsuario = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));
    linkEspecialista = element(by.xpath('/html/body/app-root/app-navbar/nav/a[4]'));

    async clickBotonHome() {
        await this.linkHome.click();
    }

    async clickBotonUsuario() {
        await this.linkUsuario.click();
    }

    async clickBotonCita() {
        await this.linkCita.click();
    }

    async clickBotonEspecialista() {
        await this.linkEspecialista.click();
    }
}
