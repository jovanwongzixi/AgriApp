export function convertEmailToUserid(email : string | null | undefined){
    if (email) return email.split('@')[0]
    return ''
}