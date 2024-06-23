import {AuthUser} from "@/service/auth/data/Type";

export abstract class AuthProvider {
    abstract isLogin: boolean
    abstract serverUrl: string
    abstract sessionToken: string | null
    abstract login(email: string, password: string): Promise<AuthUser>
    abstract register(email: string, name: string, phone: string, password: string, confirmPassword: string): Promise<AuthUser>
    abstract logout(): Promise<void>
    abstract checkLogin(): Promise<AuthUser>
    abstract getUser(): Promise<AuthUser>
    abstract checkProduct(productId: string): Promise<void>
}
