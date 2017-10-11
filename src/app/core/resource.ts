import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

export class Resource {
    url: string;

    constructor(protected api: ApiService) { }

    /**
     * Display a listing of the resource.
     */
    index(): Observable<any> {
        return this.api.get(this.url);
    }

    /**
     * Display the specified resource.
     * 
     * @param id 
     */
    show(id: number): Observable<any> {
        return this.api.get(`${this.url}/${id}`);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param payload 
     */
    store(payload: any): Observable<any> {
        return this.api.post(this.url, payload);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param id 
     * @param payload 
     */
    update(id: number, payload: any): Observable<any> {
        return this.api.put(`${this.url}/${id}`, payload);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param id 
     */
    destroy(id: number): Observable<any> {
        return this.api.delete(`${this.url}/${id}`);
    }
}
