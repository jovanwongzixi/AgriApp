import Link from 'next/link';

const Post: React.FC<{
  userid: string;
  postid: string;
  title: string;
  body: string;
  deleteHandler: (postUserid: string, postid: string) => void;
}> = (props) => {
  return (
    <li className="border border-[#B2B2B2] rounded-lg shadow-md p-6 relative ">
      <button
        className="cross-btn absolute top-2 right-2 bg-transparent border-none cursor-pointer text-white hover:text-[#D9D9D9]"
        onClick={() => props.deleteHandler(props.userid, props.postid)}
      >
        X
      </button>
      <Link href={`/${props.userid}/forum/${props.postid}`}>
      <div className="group">
        <p className="group-hover:text-[#D9D9D9] text-white font-bold text-2xl mb-2">{props.title}</p>
        <p className="group-hover:text-[#D9D9D9] text-white mb-2">{props.body}</p>
        <p className="absolute bottom-0 right-0 underline mt-4 text-white">
          {props.userid}
        </p>
      </div>
      </Link>
    </li>
  );
};

export default Post;
