import { element, by } from 'protractor';

export class UsuarioPage {

    private linkCrearUsuario = element(by.id('linkCrearUsuario'));
    private linkListarUsuario = element(by.id('linkListarUsuario'));
    private inputNumeroDocumento = element(by.id('numeroDocumento'));
    private inputPrimerTpoDocumento = element.all(by.tagName('option')).first();
    private inputUltimoEstrato = element.all(by.tagName('option')).last();
    private submitCrearUsuario = element(by.id('submitCrearUsuario'));
    private botonOkVentanaModal = element(by.buttonText('OK'));
    private botonSiVentanaModal = element(by.buttonText('Si'));
    private textoSweetAlert = element(by.id('swal2-title'));
    private listaUsuario = element.all(by.css('app-root table tbody tr'));

    obtenerTextoSweetAlert(){
        return this.textoSweetAlert.getText() as Promise<string>;
    }


    async clickBotonSiVentanaModal(){
        await this.botonSiVentanaModal.click();
    }

    async clickBotonOK() {
        await this.botonOkVentanaModal.click();
    }

    async contarListaUsuario() {
        return this.listaUsuario.count();
    }

    async clickSubmitCrearUsuario(){
        await this.submitCrearUsuario.click();
    }

    async clickLinkCrearUsuario(){
        await this.linkCrearUsuario.click();
    }

    async clickLinkListarUsuario(){
        await this.linkListarUsuario.click();
    }

    async ingresarNumeroDocumento(numeroDocumento){
        this.inputNumeroDocumento.clear();
        await this.inputNumeroDocumento.sendKeys(numeroDocumento);
    }

    async clickSeleccionarInputPrimerTpoDocumento(){
        await this.inputPrimerTpoDocumento.click();
    } 

    async clickSeleccionarInputUltimoEstrato(){
        await this.inputUltimoEstrato.click();
    } 


}
