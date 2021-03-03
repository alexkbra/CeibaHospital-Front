import { element, by } from 'protractor';

export class CitaPage {

    
    private inputPrimerTpoDocumento = element.all(by.tagName('option')).first();
    private inputNumeroDocumento = element(by.id('numeroDocumento'));
    private submitBuscarUsuarioCita = element(by.id('submitBuscarUsuarioCita'));
    private linkReservarCita = element(by.id('linkReservarCita'));
    private linkBuscarCita  = element(by.id('linkBuscarCita'));
    private linkCrearUsuario = element(by.id('linkCrearUsuario'));
    private inputFechaCita = element(by.id('fechaCita'));
    private inputTiempofechaCita = element(by.id('tiempofechaCita'));
    private inputPrimeroEspecialista = element.all(by.tagName('option')).last();
    private submitReservarCita = element(by.id('submitReservarCita'));
    private buttonEditarCita = element(by.id('buttonEditarCita'));
    private buttonEliminarCita = element(by.id('buttonEliminarCita'));
    private fechaCitaEditar = element(by.id('fechaCitaEditar'));
    private tiempoCitaEditar = element(by.id('tiempoCitaEditar'));
    private buttonActualizarCita = element(by.id('buttonActualizarCita'));
    private textoSweetAlert = element(by.id('swal2-title'));
    private linkSiReservarCita = element(by.id('swal2-confirm'));
    private botonOkVentanaModal = element(by.buttonText('OK'));
    private listaCita = element.all(by.css('app-root table tbody tr'));

    async clickBotonOK() {
        await this.botonOkVentanaModal.click();
    }

    async contarListaCita() {
        return this.listaCita.count();
    }

    async clickLinkSiReservarCita(){
        await this.linkSiReservarCita.click();
    }

    async clickSeleccionPrimerTipoDocumento(){
        await this.inputPrimerTpoDocumento.click();
    }

    async ingresarNumeroDocumento(numeroDocumento){
        this.inputNumeroDocumento.clear();
        await this.inputNumeroDocumento.sendKeys(numeroDocumento);
    }

    async clickLinkReservarCita(){
        await this.linkReservarCita.click();
    }

    async clickLinkBuscarCita(){
        await this.linkBuscarCita.click();
    }

    async clickLinkCrearUsuario(){
        await this.linkCrearUsuario.click();
    }

    async ingresarInputFechaCita(fechaCita){
        this.inputFechaCita.clear();
        await this.inputFechaCita.sendKeys(fechaCita);
    }

    async ingresarInputTiempofechaCita(tiempoFechaCita){
        this.inputTiempofechaCita.clear();
        await this.inputTiempofechaCita.sendKeys(tiempoFechaCita);
    }


    async clickSubmitBuscarUsuarioCita(){
        await this.submitBuscarUsuarioCita.click();
    }

    async clickSeleccionarPrimeroEspecialista(){
        await this.inputPrimeroEspecialista.click();
    } 

    async clickSubmitReservarCita(){
        await this.submitReservarCita.click();
    }

    async clickButtonEditarCita(){
        await this.buttonEditarCita.click();
    }

    async clickbuttonEliminarCita(){
        await this.buttonEliminarCita.click();
    }

    async ingresarFechaCitaEditar(fechaCitaEditar){
        this.fechaCitaEditar.clear();
        await this.fechaCitaEditar.sendKeys(fechaCitaEditar);
    }

    async ingresarTiempoCitaEditar(tiempoCitaEditar){
        this.tiempoCitaEditar.clear();
        await this.tiempoCitaEditar.sendKeys(tiempoCitaEditar);
    }

    async clickButtonActualizarCita(){
        await this.buttonActualizarCita.click();
    }
   
    obtenerTextoSweetAlert(){
        return this.textoSweetAlert.getText() as Promise<string>;
    }

}
