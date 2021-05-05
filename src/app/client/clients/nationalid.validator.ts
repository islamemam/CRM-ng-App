import { AbstractControl, ValidationErrors } from '@angular/forms';

export class nationalidValidators {
    static nationalidformat(control:AbstractControl) : ValidationErrors | null{
        let nationalid: string = String (control.value);
        if(nationalid.charAt(0) === "1" || nationalid.charAt(0) === "2" && nationalid.length > 0 ){
            if(nationalid.length == 10){
                return null
            }else{
                return {nationalidlength:false}
            }
           
        }else if (nationalid === "null" || nationalid === ""){
            return null
        }else{
            return {nationalidformat:false}
        }
    }
}