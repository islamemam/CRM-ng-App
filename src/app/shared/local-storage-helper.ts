
import * as CryptoJS from 'crypto-js';
export class LocalStorageManger{
    encryptSecretKey = 'hollat-sa-secret'
    setPermissions(data){
        localStorage.setItem('permissions', this.encryptData(data));
    }

    getPermissions(){
        return this.decryptData(localStorage.getItem('permissions'));
    }

    setHospital(hospital){
      localStorage.setItem('hospital', this.encryptData(hospital));
    }

    getHospitalId(){
      let r = localStorage.getItem('hospital');
      if(r == undefined){
        return null;
      }
      return this.decryptData(r).id;
  }

    encryptData(data) {
        try {
          return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
        } catch (e) {
          // console.log(e);
        }
      }
    
      decryptData(data) {
        try {
          const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
          if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          }
          return data;
        } catch (e) {
          // console.log(e);
        }
      }
}