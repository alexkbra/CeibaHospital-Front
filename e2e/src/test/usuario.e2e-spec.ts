import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { UsuarioPage } from '../page/usuario/usuario.po';

describe('workspace-project Usuario', () => {

    let page: AppPage;
    let navBar: NavbarPage;
    let usuario: UsuarioPage;

    const NUMERO_DOCUMENTO = '123456789';
    

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        usuario = new UsuarioPage();
        browser.driver.manage().window().maximize();
    });

    it('Deberia crear un usuario', () => {

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickLinkCrearUsuario();
        usuario.clickSeleccionarInputPrimerTpoDocumento();
        usuario.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        usuario.clickSeleccionarInputUltimoEstrato();
        usuario.clickSubmitCrearUsuario();
        usuario.clickBotonSiVentanaModal();

        expect(usuario.obtenerTextoSweetAlert()).toContain('Usuario creado con id');
        usuario.clickBotonOK();
    });

    it('Deberia listar usuario', () => {

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickLinkListarUsuario();


        expect(usuario.contarListaUsuario()).toBeGreaterThanOrEqual(1);
    });




});