import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { of } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { CoreHttpService } from "./core-http.service";

describe('CoreHttpService', () => {
    let service: CoreHttpService;

    let _activatedRoute: ActivatedRoute;
    let _httpClient: HttpClient;
    let _router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    queryParams: of({ q: 'node' })
                }
            }],
            imports: [
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule
            ]
        }).compileComponents();

        _activatedRoute = TestBed.inject(ActivatedRoute);
        _httpClient = TestBed.inject(HttpClient);
        _router = TestBed.inject(Router);
        _router.initialNavigation();

        service = new CoreHttpService(
            _activatedRoute,
            _httpClient,
            _router
        )
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('search term deve estar na URL e ser = node', fakeAsync(() => {
        service.searchTerm.next('node');
        _activatedRoute.queryParams.subscribe(params => {
            expect(params.q).toEqual('node')
        });
        tick();
    }));

    it('searchTerm deve ser = node', fakeAsync(async () => {
        service.searchTerm.subscribe(val => {
            expect(val).toBe('node');
        });
        service.searchTerm.next('node');
        tick();
    }));

    it('deve retornar repositorios', fakeAsync(async () => {
        service.fetchRepositories().subscribe(val => {
            expect(val).toBeTruthy();
        });
        tick();
    }));

    it('url da api prod deve ser = https://api.github.com/', () => {
        expect(environment.gitURL).toEqual('https://api.github.com/');
    });
});