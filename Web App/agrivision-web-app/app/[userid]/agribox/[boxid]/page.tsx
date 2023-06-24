export default async function Page({ params }: { params : { boxid: string }}){
    return(
        <div>
            <h1>{params.boxid}</h1>
        </div>
    )
}