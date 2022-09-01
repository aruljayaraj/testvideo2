import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import CommonService from '../shared/services/CommonService';

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}

export function useCameraPhoto() {
  
    const takePhoto = async (callbackFn: any) => {
      try {
        const cameraPhoto = await Camera.getPhoto({
          quality: 100,
          allowEditing: true,
          correctOrientation: true,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera
        })
        if( cameraPhoto && cameraPhoto.webPath ){
          const base64Image = await base64FromPath(cameraPhoto.webPath);
          var u8Image  = CommonService.b64ToUint8Array(base64Image);
          return callbackFn(u8Image);
        }
      } catch (e) {
        console.log('No photo');
      }
    };
  
    return {
      takePhoto
    };
  }