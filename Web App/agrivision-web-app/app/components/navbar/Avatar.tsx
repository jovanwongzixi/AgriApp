import Image from 'next/image'

export default function Avatar({ 
    src 
} : {
    src : string | null
}
    ){
    return(
        <Image
            className='rounded-full'
            height='30'
            width='30'
            alt="Avatar"
            src={src || '/placeholder.jpg'}
        />
    )
}