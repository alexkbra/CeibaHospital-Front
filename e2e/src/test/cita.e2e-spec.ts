import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { CitaPage } from '../page/cita/cita.po';

describe('workspace-project Cita', () => {

    let page: AppPage;
    let navBar: NavbarPage;
    let cita: CitaPage;

    const NUMERO_DOCUMENTO = '1017205545';
    const FECHA_CITA = '2023-01-01';
    const TIEMPO_FECHA_CITA = '03:00';

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cita = new CitaPage();
        browser.driver.manage().window().maximize();
    });

    it('Deberia crear una cita', () => {

        page.navigateTo();
        navBar.clickBotonCita();
        cita.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        cita.clickSeleccionPrimerTipoDocumento();
        cita.clickSubmitBuscarUsuarioCita();
        cita.clickLinkReservarCita();
        cita.ingresarInputFechaCita(FECHA_CITA);
        cita.ingresarInputTiempofechaCita(TIEMPO_FECHA_CITA);
        cita.clickSeleccionarPrimeroEspecialista();
        cita.clickSubmitReservarCita();
        cita.clickLinkSiReservarCita();


        //expect(cita.obtenerTextoSweetAlert()).toContain('La fecha seleccionada para la cita es =');
        //cita.clickBotonOK();
    });

    it('Deberia listar las citas', () => {

        page.navigateTo();
        navBar.clickBotonCita();
        cita.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        cita.clickSeleccionPrimerTipoDocumento();
        cita.clickSubmitBuscarUsuarioCita();
        cita.clickLinkBuscarCita()


        expect(cita.contarListaCita()).toBeGreaterThanOrEqual(1);
    });




});