const ReplyOriginalPost: React.FC<{
    userid: string;
    postid: string;
    title: string;
    body: string;
    url: string;
  }> = (props) => {
    
    return (
      <li className="border border-[#B2B2B2] rounded-lg shadow-md p-6 relative " key={props.userid}>
          <p className="text-white font-bold text-2xl mb-2">{props.title}</p>
          <p className="text-white mb-2">{props.body}</p>
          {props.url && <img src={props.url}/>}
          <p className="absolute bottom-0 right-0 underline mt-4 text-white">
            {props.userid}
          </p>
      </li>
    );
  };
  
  export default ReplyOriginalPost;
  