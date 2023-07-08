import Post from "@/app/components/forum/Post";

async function getForum(){
  const res: Response = await fetch(`http://localhost:3000/api/forum`)
  const data: string[] = await res.json()
  return data
}

export default async function Page(){

  const boxArray = await getForum();
  return(
      <div
          className='
          pt-24
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8' 
      >
          {
              boxArray?.map(val => <Post id={4 + 4} author="hello" body="world"/>)
          }
      </div> 
  )
}
