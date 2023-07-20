import TestClient from "./TestClient"
import { checkAgricloudPermission } from '@/app/helper/agricloud'

export default async function AgriCloudSettings({ userid }: { userid: string }){
    const result = await checkAgricloudPermission(userid)
    let shareData, premium
    if(result) {
        shareData = result.shareData
        premium = result.premium
    }

    return(
        <div>
            <p className='font-bold tracking-tighter text-5xl mb-5'>AgriCloud</p>
            <p className='text-[#DBDBDB] mb-5'>Manage AgriCloud permissions and billing</p>
            <div className='border rounded-xl border-[#B2B2B2] py-3 px-4 mb-6'>
                <p className='font-medium text-lg mb-2'>Payment is in demo mode.</p>
                <p>Our current payment system is using a Stripe test environment. You can find a list of test card numbers on the Stripe docs.</p>
            </div>
            <div className='border rounded-xl border-[#B2B2B2] py-3 px-4'>
                <p className='font-semibold tracking-tight text-xl mb-2'>Access</p>
                <div className='text-[#DBDBDB] mb-2'>
                    <p>AgriCloud Access {(premium || shareData) ? 'permitted': 'denied'}</p>
                    <p>You are currently on {premium ? 'premium': 'free'} tier</p>
                </div>
            </div>
        </div>
    )
}