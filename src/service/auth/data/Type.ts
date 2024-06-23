export type AuthUser = {
    uid: string,
    phoneNumber: string,
    email: string,
    photoUrl: string | null,
    lastSignInAt: string,
    createdAt: string,
    emailVerified: boolean,
    disabled: boolean,
    name: string,
    sessionToken: string,
}