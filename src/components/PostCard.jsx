import appwritService from "../appwrite/config"
import { Link } from "react-router-dom";


function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img 
                        src={appwritService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className="rounded-xl"
                    />
                </div>
                <div className="p-1 text-wrap text-center">
                    <h2 className="text-sm md:text-xl font-semibold md:text-bold">
                    {title}</h2>
                </div>
            </div>
        </Link>
    )
}
export default PostCard;