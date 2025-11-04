import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalConfig, ModalType } from '../models/modal-config.model';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private dialog: Dialog) { }

    /**
     * Abre um modal genérico
     */
    open(config: ModalConfig): Observable<boolean | undefined> {
        const dialogConfig = {
            data: config,
            panelClass: 'custom-dialog-container',
            disableClose: false,
            hasBackdrop: true,
            backdropClass: 'custom-backdrop',
            width: '90vw',
            maxWidth: '500px'
        };

        const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
        return dialogRef.closed as Observable<boolean | undefined>;
    }

    /**
     * Exibe modal de sucesso
     */
    success(title: string, message: string, confirmText?: string): Observable<boolean | undefined> {
        return this.open({
            type: ModalType.SUCCESS,
            title,
            message,
            confirmText: confirmText || 'OK',
            showCancel: false
        });
    }

    /**
     * Exibe modal de erro
     */
    error(title: string, message: string, confirmText?: string): Observable<boolean | undefined> {
        return this.open({
            type: ModalType.ERROR,
            title,
            message,
            confirmText: confirmText || 'OK',
            showCancel: false
        });
    }

    /**
     * Exibe modal de aviso
     */
    warning(title: string, message: string, confirmText?: string): Observable<boolean | undefined> {
        return this.open({
            type: ModalType.WARNING,
            title,
            message,
            confirmText: confirmText || 'OK',
            showCancel: false
        });
    }

    /**
     * Exibe modal de informação
     */
    info(title: string, message: string, confirmText?: string): Observable<boolean | undefined> {
        return this.open({
            type: ModalType.INFO,
            title,
            message,
            confirmText: confirmText || 'OK',
            showCancel: false
        });
    }

    /**
     * Exibe modal de confirmação (com botão cancelar)
     */
    confirm(
        title: string,
        message: string,
        type: ModalType = ModalType.INFO,
        confirmText?: string,
        cancelText?: string
    ): Observable<boolean | undefined> {
        return this.open({
            type,
            title,
            message,
            confirmText: confirmText || 'Confirmar',
            cancelText: cancelText || 'Cancelar',
            showCancel: true
        });
    }
}
