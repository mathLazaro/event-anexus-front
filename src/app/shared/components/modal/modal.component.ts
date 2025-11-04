import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ModalConfig, ModalType } from '../../models/modal-config.model';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    readonly ModalType = ModalType;

    constructor(
        public dialogRef: DialogRef<boolean>,
        @Inject(DIALOG_DATA) public data: ModalConfig
    ) {
        // Define valores padrão
        this.data.confirmText = this.data.confirmText || 'OK';
        this.data.cancelText = this.data.cancelText || 'Cancelar';
        this.data.showCancel = this.data.showCancel ?? false;
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    getIcon(): string {
        switch (this.data.type) {
            case ModalType.SUCCESS:
                return '✓';
            case ModalType.ERROR:
                return '✕';
            case ModalType.WARNING:
                return '⚠';
            case ModalType.INFO:
                return 'ℹ';
            default:
                return 'ℹ';
        }
    }

    getIconClass(): string {
        switch (this.data.type) {
            case ModalType.SUCCESS:
                return 'bg-green-100 text-green-600';
            case ModalType.ERROR:
                return 'bg-red-100 text-red-600';
            case ModalType.WARNING:
                return 'bg-yellow-100 text-yellow-600';
            case ModalType.INFO:
                return 'bg-blue-100 text-blue-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }

    getButtonClass(): string {
        switch (this.data.type) {
            case ModalType.SUCCESS:
                return 'bg-green-600 hover:bg-green-700';
            case ModalType.ERROR:
                return 'bg-red-600 hover:bg-red-700';
            case ModalType.WARNING:
                return 'bg-yellow-600 hover:bg-yellow-700';
            case ModalType.INFO:
                return 'bg-blue-600 hover:bg-blue-700';
            default:
                return 'bg-gray-600 hover:bg-gray-700';
        }
    }
}
