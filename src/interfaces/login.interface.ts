export interface SessionStoragePayloadInterface {
    objetoResposta: {
        name :string
        email :string
        role :string
        id :string
        token :string
    },
    error :boolean
}

export interface LoginResponseInterface {
    token :string
}

export interface TokenPayload {
    name :string
    email :string
    role :string
    id :string
    iat :number
    exp :number
}