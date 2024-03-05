import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function valideDateValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        const value = ctrl.value.trim().split('/');
        if (value.includes('/')) {
            return {
                validDate: 'La form doit être de la forme "mm/yy"'
            };
        }
        try {
            const date = new Date("20" + value[1] + "-" + value[0] + "-01");
            console.log(date);
            console.log(new Date());

            return date > new Date() ? null : {
                valideDate: {
                    main: value,
                }
            };
        } catch (error) {
            return {
                validDate: 'La form doit être de la forme "mm/yy"'
            };
        }
    };
}