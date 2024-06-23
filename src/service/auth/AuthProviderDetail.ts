import {AuthProvider} from "@/service/auth/AuthProvider";
import {BadResponse, ResponseData} from "@/service/utils/ResponseInterface";
import axios from "axios";
import {AuthUser} from "@/service/auth/data/Type";
import {AuthFailed} from "@/service/auth/data/Enum";

export class AuthProviderDetail extends AuthProvider {
    isLogin = false
    serverUrl: string
    sessionToken: string | null = null

    constructor(serverUrl: string) {
        super()
        this.serverUrl = serverUrl
    }

    checkLogin(): Promise<AuthUser> {
        return new Promise<AuthUser>((resolve, reject) => {
            const sessionToken = localStorage.getItem('token');
            if (sessionToken == null) {
                reject(AuthFailed.USER_NOT_LOGGED_IN)
                return
            }
            axios.post<ResponseData>(
                this.serverUrl + '/auth/check',
                {
                    sessionToken: sessionToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            ).then((response) => {
                if (response.data.status) {
                    this.sessionToken = sessionToken
                    this.isLogin = true
                    resolve(response.data.message as AuthUser)
                } else {
                    this.sessionToken = null
                    this.isLogin = false
                    reject(AuthFailed.SESSION_EXPIRED)
                }
            }).catch((reason: BadResponse) => {
                reject(reason.response.data.code as AuthFailed)
            })
        })
    }

    checkProduct(productId: string): Promise<void> {
        return new Promise((resolve) => {
            if (this.sessionToken == null) {
                resolve()
                return
            }
            axios.post<ResponseData>(
                this.serverUrl + '/auth/check-product',
                {
                    productId: productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.sessionToken,
                    },
                }
            ).then().catch().finally(() => {
                resolve()
            })
        })
    }

    getUser(): Promise<AuthUser> {
        return new Promise<AuthUser>((resolve, reject) => {
            if (this.sessionToken == null) {
                reject(AuthFailed.USER_NOT_LOGGED_IN)
            }
            axios.post<ResponseData>(
                this.serverUrl + '/auth/get-user',
                {
                    sessionToken: this.sessionToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            ).then((response) => {
                resolve(response.data.message as AuthUser)
            }).catch((reason: BadResponse) => {
                reject(reason.response.data.code as AuthFailed)
            })
        })
    }

    login(email: string, password: string): Promise<AuthUser> {
        return new Promise<AuthUser>((resolve, reject) => {
            axios.post<ResponseData>(
                this.serverUrl + '/auth/login',
                {
                    email: email,
                    password: this.sha256(password),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            ).then((response) => {
                const authUser = response.data.message as AuthUser
                this.isLogin = true
                localStorage.setItem('token', authUser.sessionToken);
                resolve(authUser)
            }).catch((reason: BadResponse) => {
                reject(reason.response.data.code as AuthFailed)
            })
        })
    }

    logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.sessionToken == null) {
                reject(AuthFailed.USER_NOT_LOGGED_IN)
            }
            axios.post<ResponseData>(
                this.serverUrl + '/auth/logout',
                {
                    sessionToken: this.sessionToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            ).then((response) => {
                if (!response.data.status) {
                    reject(AuthFailed.SESSION_NOT_FOUND)
                    return
                }
                this.sessionToken = null
                this.isLogin = false
                resolve()
            }).catch((reason: BadResponse) => {
                reject(reason.response.data.code as AuthFailed)
            })
        })
    }

    register(email: string, name: string, phone: string, password: string, confirmPassword: string): Promise<AuthUser> {
        return new Promise<AuthUser>((resolve, reject) => {
            if (password !== confirmPassword) {
                reject(AuthFailed.PASSWORD_NOT_MATCH)
                return
            }
            axios.post<ResponseData>(
                this.serverUrl + '/auth/register',
                {
                    email: email,
                    name: name,
                    phone: phone,
                    password: this.sha256(password),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            ).then((response) => {
                const authUser = response.data.message as AuthUser
                this.isLogin = true
                localStorage.setItem('token', authUser.sessionToken);
            }).catch((reason: BadResponse) => {
                reject(reason.response.data.code as AuthFailed)
            })
        })
    }

    private sha256(input: string): string {
        return input
    }

}
