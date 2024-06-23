import {AuthProvider} from "@/service/auth/AuthProvider";
import {AuthProviderDetail} from "@/service/auth/AuthProviderDetail";
import {AuthUser} from "@/service/auth/data/Type";


/**
 * the service to manage the authentication
 * @category Service
 * @module auth
 * @class
 * @extends {@link AuthProvider}
 * @example
 *  const authService = AuthService.create(serverUrl)
 *  // authService. ...
 */
export class AuthService extends AuthProvider {

    /**
     * Create the auth service
     * @param serverUrl server url
     * @returns AuthService
     * @example
     *  const authService = AuthService.create(serverUrl)
     */
    public static create(serverUrl: string): AuthProvider {
        return new AuthService(new AuthProviderDetail(serverUrl))
    }

    private constructor(private readonly provider: AuthProvider) {
        super();
    }

    /**
     * Check the login status
     * @returns AuthService
     * @example
     *   const status = authService.isLogin
     *
     *   // if you want to implement with session token
     *   authService.checkLogin(sessionToken).then((authUser: AuthUser) => {
     *     // do something
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    get isLogin(): boolean {
        return this.provider.isLogin;
    }

    /**
     * Get the server url
     * @returns serverUrl
     * @example
     *   const serverUrl = authService.serverUrl
     */
    get serverUrl(): string {
        return this.provider.serverUrl;
    }


    /**
     * Get the session token
     * @returns sessionToken
     * @example
     *   const sessionToken = authService.sessionToken
     */
    get sessionToken(): string | null {
        return this.provider.sessionToken;
    }

    /**
     * check the login status
     * @returns AuthUser
     * @example
     *   authService.checkLogin().then((authUser: AuthUser) => {
     *     // do something
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    checkLogin(): Promise<AuthUser> {
        return this.provider.checkLogin();
    }


    /**
     * log the user check product record
     * before calling this function, you need to check the login status
     * @param productId product id
     * @returns AuthUser
     * @example
     *   // must call checkLogin before
     *   authService.checkLogin().then((authUser: AuthUser) => {
     *     authService.checkProduct(productId).then()
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    checkProduct(productId: string): Promise<void> {
        return this.provider.checkProduct(productId);
    }


    /**
     * Get the user information with the session token
     * before calling this function, you need to check the login status
     * @returns AuthUser
     * @example
     *   // must call checkLogin before
     *   authService.checkLogin().then((authUser: AuthUser) => {
     *     authService.getUser().then((authUser: AuthUser) => {
     *       // do something
     *     }).catch((reason) => {
     *       // do something
     *     })
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    getUser(): Promise<AuthUser> {
        return this.provider.getUser();
    }

    /**
     * log the user in
     * @param email
     * @param password
     * @returns AuthUser
     * @example
     *   authService.login(email, password).then((authUser: AuthUser) => {
     *     // do something
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    login(email: string, password: string): Promise<AuthUser> {
        return this.provider.login(email, password);
    }

    /**
     * log the user out
     * before calling this function, you need to check the login status
     * @example
     *   // must call checkLogin before
     *   authService.checkLogin().then((authUser: AuthUser) => {
     *     authService.logout().then(() => {
     *       // do something
     *     }).catch((reason) => {
     *       // do something
     *     })
     *   }).catch((reason) => {
     *     // do something
     *   })
     *
     */
    logout(): Promise<void> {
        return this.provider.logout();
    }

    /**
     * register the user
     * @param email
     * @param name
     * @param phone
     * @param password
     * @param confirmPassword
     * @returns AuthUser
     * @example
     *   authService.register(email, name, phone, password, confirmPassword).then((authUser: AuthUser) => {
     *     // do something
     *   }).catch((reason) => {
     *     // do something
     *   })
     */
    register(email: string, name: string, phone: string, password: string, confirmPassword: string): Promise<AuthUser> {
        return this.provider.register(email, name, phone, password, confirmPassword);
    }
}
