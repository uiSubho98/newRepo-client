export interface IPlayground {
    code?: {
        html: string, 
        css: string, 
        js: string
    }
    last_modified?: number
    linkedUrl?: string
    pg_name?: string
    pid?: string
    status?: number
    uid?: number
}

export interface IProject {
    pid: string, 
    pg_name: string
}