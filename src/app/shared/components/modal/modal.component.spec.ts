import { TestBed } from '@angular/core/testing';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalComponent } from './modal.component';
import { ModalType } from '../../models/modal-config.model';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let dialogRef: DialogRef<boolean>;

    beforeEach(() => {
        dialogRef = jasmine.createSpyObj('DialogRef', ['close']);

        TestBed.configureTestingModule({
            imports: [ModalComponent],
            providers: [
                { provide: DialogRef, useValue: dialogRef },
                {
                    provide: DIALOG_DATA,
                    useValue: {
                        type: ModalType.SUCCESS,
                        title: 'Test',
                        message: 'Test message'
                    }
                }
            ]
        });

        const fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
