import PostForm from '../../Components/add-posts/add-posts';
import PostsSlider from '../../Components/posts-slider/posts-slider';
import PostsList from '../../Components/posts-list/posts-list';

const Home = () => {
    return <>
        <PostForm />
        <PostsSlider />
        <PostsList />
    </>
}

export default Home;