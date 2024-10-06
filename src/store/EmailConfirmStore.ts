import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

export class EmailConfirmStore {

    private _email: string = '';
    private _countdown: number = 0;
    private _intervalId: NodeJS.Timeout | null = null;
    private _isLoading: boolean = false;
    private _error: string | null = null;
    private _jwt: string | null = null
    private _isCodeSent: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    get email() {
        return this._email;
    }


    get isCodeSent() {
        return this._isCodeSent;
    }

    get countdown() {
        return this._countdown;
    }


    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    get jwt() {
        return this._jwt
    }

    setEmail(email: string) {
        if (email !== this._email){
            this.reset()
            this._email = email;
        }
    }

    private set isLoading(isLoading: boolean){
        this._isLoading = isLoading
    }

    private set countdown(countdown: number) {
        this._countdown = countdown
    }

    private set error(error: string | null) {
        this._error = error;
    }

    private set isCodeSent(isCodeSent: boolean) {
        this._isCodeSent = isCodeSent;
    }
    private set jwt(jwt: string | null) {
        this._jwt = jwt;
    }
    private set intervalId(intervalId: NodeJS.Timeout | null) {
        this._intervalId = intervalId;
    }
    private set email(email: string) {
        this._email = email;
    }
    sendCode() {
        if (this.isCodeSent) {
            this.error = 'Письмо уже отправлено'
            return
        };
        if (!this.email) {
            this.error = 'Почта не задана'
            return
        }
        this.isLoading = true
        this.error = null;

        // Логика отправки кода на почту в зависимости от типа действия

        setTimeout(() => {
            this.isCodeSent = true;
            this.countdown = 40;

            this.intervalId = setInterval(() => {
                this.countdown -= 1;
                if (this.countdown <= 0) {
                    this.countdownReset();
                }
            }, 1000);

            this.isLoading = false;
        }, 1000);
    }

    confirmCode(code: string) {
        this.isLoading = true;
        this.error = null;

        // Логика подтверждения кода в зависимости от типа действия


        setTimeout(() => {
            if (code === '1') {
                this.countdownReset();
                this.jwt = 'sdgfhfdjhgdkjhgdfjdhgjsgfj'
            }
            else{
                this.error = 'Введен неверный код'   
            }
            this.isLoading = false;
        }, 1000);
    }

    countdownReset() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this.intervalId = null;

        }
        this.countdown = 0;
        this.isCodeSent = false;
    }
    reset() {
        this.email = '';
        this.isLoading = false;
        this.error = null;
        this.jwt = null
        this.countdownReset()
    }
}