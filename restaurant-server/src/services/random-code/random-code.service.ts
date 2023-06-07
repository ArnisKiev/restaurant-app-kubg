import { Injectable } from '@nestjs/common';
import { ApplicationConstants } from 'src/constants/application-constants';
@Injectable()
export class RandomCodeService {

    public generateCode() {
       let code = '';

       for( let i = 0; i<ApplicationConstants.MaxDigitsCodeLength; i++) {
        code += (Math.random()*10).toFixed(0);
       }
    
       return code;
    }

}
