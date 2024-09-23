import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service';
import { Role } from '../enums/role.enum';

@Component({ templateUrl: 'loginn.component.html' })
export class LoginnComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/calendar']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .pipe(first())
            .subscribe({
                next: (user) => {
                    let returnUrl
                    if (user.role===Role.RH) {
                         returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/conges-list';

                    }else{
                        returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/calendar';

                    }
                    // get return url from query parameters or default to home page
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}