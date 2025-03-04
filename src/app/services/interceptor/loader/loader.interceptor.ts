import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType,
    HttpProgressEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';


@Injectable()

export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }


    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.loading.next(this.requests.length > 0);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req)
   
        
        // console.log("No of requests--->" + this.requests.length);
        this.loaderService.loading.next(true);
        // if (req.params.get('useLoader')) {
        //     this.requests.push(req);
        //     // console.log("No of requests--->" + this.requests.length);
        //     this.loaderService.loading.next(true);
        // }
        // tslint:disable-next-line: deprecation
        return Observable.create((observer: { next: (arg0: HttpProgressEvent | HttpResponse<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        } else if (event.type === HttpEventType.UploadProgress) {
                            observer.next(event);
                        }
                     
                    },
                    err => {
                        // alert('error returned');
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
