export default function Layout({ children, cv }: { children: React.ReactNode, cv: React.ReactNode }){
    return(
        <div>
            {children}
            {cv}
        </div>
    )
}