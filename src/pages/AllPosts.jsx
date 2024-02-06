import { useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    appwriteService.getPosts([])
    .then((posts) => {
        if(posts) {
            setPosts(posts.documents)
        }
    })
  
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col text-ellipsis md:flex-row flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/4'> 
                            <PostCard {...post} /> 
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts