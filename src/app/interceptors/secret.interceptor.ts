import { Injectable } from '@angular/core';
import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn
} from '@angular/common/http';
import { environment } from '../../environments/environment';

export const SecretInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const secret = environment.appSecret;

    const cloned = req.clone({
        setHeaders: {
            'X-App-Secret': secret
        }
    });

    return next(cloned);
};
