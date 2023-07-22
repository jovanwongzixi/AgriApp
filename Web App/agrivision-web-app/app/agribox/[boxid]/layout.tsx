export default function Layout({ children, cv } : { children: React.ReactNode, cv: React.ReactNode}){
    return(
        <div className='h-full w-full'>
            {children}
            {/* {cv} */}
        </div>
    )
}