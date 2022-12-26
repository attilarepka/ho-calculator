import {Injectable} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

@Injectable({providedIn : 'root'})
export class FileServeService {
    fileName: string = 'result.json';

    constructor(private _FileSaverService: FileSaverService) {}

    onSave(payload: string) {
        const fileType = this._FileSaverService.genType(this.fileName);
        const txtBlob = new Blob([ payload ], {type : fileType});
        this._FileSaverService.save(txtBlob, this.fileName);
    }
}
