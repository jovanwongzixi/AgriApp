import HistoricalData from "@/app/components/HistoricalData"

export default async function Page({ params }: { params : { boxid: string }}){
    const period = '1'
    const res = await fetch(`${process.env.BASE_URL}/api/line-chart-data?boxid=${params.boxid}&period=${period}`)
    const {labels, values, error} = await res.json()
    if(res.status !== 200) throw new Error(error)
    return(
        <div className='px-28 h-[calc(100vh-130px)] pt-4'>
            <HistoricalData labels={labels} values={values} boxid={params.boxid}/>
        </div>
    )
}