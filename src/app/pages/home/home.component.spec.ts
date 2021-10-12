import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { CoreHttpService } from 'src/app/services/core-http/core-http.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => TestBed.configureTestingModule({
        providers: [
            {
                provide: ActivatedRoute,
                useValue: {
                    params: of({ q: 'node' })
                }
            },
            LoadingService,
            HttpClient,
            CoreHttpService,
            HttpHandler
        ],
        imports: [
            RouterTestingModule.withRoutes([])
        ]
    }).compileComponents());

    /** Teste básico para ver se o componente foi criado */
    it('Home componente deve existir', () => {
        fixture = TestBed.createComponent(HomeComponent);
        // testService = TestBed.inject(TestService);
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(fixture.componentInstance).toBeTruthy();
        });
    });
    
});