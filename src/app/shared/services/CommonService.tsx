import { format } from 'date-fns';
import { lfConfig } from '../../../Constants';
const CommonService = (function() {
    // 
    const getBase64Image = function (img: any) {
        var canvas: any = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    }

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url, {mode: 'no-cors'});
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = function() {
            const base64data = reader.result;   
            resolve(base64data);
          }
        });
    }

    // b64 To Array of image data
    const b64ToUint8Array = function (b64Image: any) {
        var img = atob(b64Image.split(',')[1]);
        var img_buffer = [];
        var i = 0;
        while (i < img.length) {
            img_buffer.push(img.charCodeAt(i));
            i++;
        }
        return new Uint8Array(img_buffer);
    }
    // date format MMM dd, yyyy
    const dateFormat = function (cdate: any) {
        if(cdate){ // For safari need to do like this
            return format(new Date(cdate.replace(/-/g, '/')), 'MMM dd, yyyy')
        }
        return;
    }
    // Date readable format dd/MM/yyyy
    const dateReadFormat = function (cdate: any) {
        if(cdate){ // For safari need to do like this
            return format(new Date(cdate.replace(/-/g, '/')), 'dd/MM/yyyy')
        }
        return;
    }
    // Mysql date format to normal javascript format - Safari Issue
    const mysqlToJsDateFormat = function (cdate: any) {
        if(cdate){ // For safari need to do like this
            return new Date(Date.parse(cdate.replace(/-/g, '/')))
        }
        return;
    }

    const getThumbImg = function(imgName: string){
        if(imgName){
            const img = imgName.split('.');
            return `${img[0]}-thumb.${img[1]}`;
        }
        return;
    }

    // on Image loading Error
    const onImgErr = function(type: string = ''){
        const { basename } = lfConfig;
        let url = `${basename}/assets/img/placeholder.svg`;
        if( type === 'profile' ){
            url = `${basename}/assets/img/avatar.svg`;
        }
        return url;
    }

    const formatTime = (timer: any) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes: any = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
      
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    // On get Tinymce Editor config object
    const onEditorConfig = function(maxLength: number = 250){
        return {
            max_chars: maxLength, // max. allowed chars
            //setup: function(editor: any) {
            //  editor.on('click', function(e: any) {
            //  console.log('Editor was clicked');
            // });
            //  },
            init_instance_callback: function (editor: any) {
                editor.on('change', function (e: Event) {
                    let content = editor.contentDocument.body.innerText;
                    // console.log(content.split(/[\w\u2019\'-]+/).length);
                    if(content.split(/[\w\u2019\'-]+/).length > maxLength){
                        editor.contentDocument.body.innerText = content.split(/\s+/).slice(0, maxLength).join(' ');
                    }
                });
            },
            branding: false,
            height: 300,
            menubar: false,
            mobile: {
                menubar: true
            },
            default_link_target: '_blank',
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
        }
    }

    const mimeTypes = function(mime_type: string){

        let extensions = {
            'audio/ac3': 'ac3',
            'audio/aiff': 'aif',
            'audio/midi': 'mid',
            'audio/mp3': 'mp3',
            'audio/mp4': 'm4a',
            'audio/mpeg': 'mp3',
            'audio/mpeg3': 'mp3',
            'audio/mpg': 'mp3',
            'audio/ogg': 'ogg',
            'audio/wav': 'wav',
            'audio/wave': 'wav',
            'audio/x-acc': 'aac',
            'audio/x-aiff': 'aif',
            'audio/x-au': 'au',
            'audio/x-flac': 'flac',
            'audio/x-m4a': 'm4a',
            'audio/x-ms-wma': 'wma',
            'audio/x-pn-realaudio': 'ram',
            'audio/x-pn-realaudio-plugin': 'rpm',
            'audio/x-realaudio': 'ra',
            'audio/x-wav': 'wav',
            'audio/webm;codecs=opus': 'webm',
            'audio/webm': 'webm',
            'video/3gp': '3gp',
            'video/3gpp': '3gp',
            'video/3gpp2': '3g2',
            'video/avi': 'avi',
            'video/mj2': 'jp2',
            'video/mp4': 'mp4',
            'video/mpeg': 'mpeg',
            'video/msvideo': 'avi',
            'video/ogg': 'ogg',
            'video/quicktime': 'mov',
            'video/vnd.rn-realvideo': 'rv',
            'video/webm': 'webm',
            'video/x-f4v': 'f4v',
            'video/x-flv': 'flv',
            'video/x-ms-asf': 'wmv',
            'video/x-ms-wmv': 'wmv',
            'video/x-msvideo': 'avi',
            'video/x-sgi-movie': 'movie'
        };
    
        // Add as many other Mime Types / File Extensions as you like
    
        return extensions[mime_type];
    
    }

    

    return {
        // Common Fns
        getBase64Image: getBase64Image,
        getBase64FromUrl: getBase64FromUrl,
        b64ToUint8Array: b64ToUint8Array,
        dateFormat: dateFormat,
        dateReadFormat: dateReadFormat,
        mysqlToJsDateFormat: mysqlToJsDateFormat, // Safari Issue
        getThumbImg: getThumbImg,
        onImgErr,
        formatTime,
        onEditorConfig,
        mimeTypes
    }

})();

export default CommonService;