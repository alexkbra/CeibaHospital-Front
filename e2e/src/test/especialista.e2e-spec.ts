import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { EspecialistaPage } from '../page/especialista/especialista.po';

describe('workspace-project Cita', () => {

    let page: AppPage;
    let navBar: NavbarPage;
    let especialistaPage: EspecialistaPage;


    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        especialistaPage = new EspecialistaPage();
        browser.driver.manage().window().maximize();
    });

    it('Deberia listar los especialistas', () => {

        page.navigateTo();
        navBar.clickBotonEspecialista();


        expect(especialistaPage.contarListaEspecialista()).toBeGreaterThanOrEqual(1);
    });




});