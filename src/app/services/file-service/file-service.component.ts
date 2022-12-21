import {Component} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

@Component({
    selector : 'app-file-service',
    templateUrl : './file-service.component.html',
    styleUrls : [ './file-service.component.css' ],
})
export class FileServiceComponent {
    fileName: string = "result.json";

    constructor(private _FileSaverService: FileSaverService) {}

    onSave(payload: string) {
        const fileType = this._FileSaverService.genType(this.fileName);
        const txtBlob = new Blob([ payload ], {type : fileType});
        this._FileSaverService.save(txtBlob, this.fileName);
    }
}
