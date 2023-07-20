'use client'
import PostForm from '@/app/components/forum/PostForm'


export default function Page({ params }: { params: { userid: string } }) {

    return (
        <div className="bg-[#11200E] min-h-screen">
            <PostForm userid={params.userid}></PostForm>
        </div>
    )
}
