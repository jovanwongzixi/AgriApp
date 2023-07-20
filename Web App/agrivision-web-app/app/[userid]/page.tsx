import { LandingPage } from "../LandingPage";

export default function Page({ params }: { params : { userid: string }}) {
    return(
        <LandingPage userid={params.userid}/>
    )
}
