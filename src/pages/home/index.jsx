import PostForm from '../../Components/add-posts/add-posts.tsx';
import PostsSlider from '../../Components/posts-slider/posts-slider.tsx';
import PostsList from '../../Components/posts-list/posts-list';

const Home = () => {
    return <>
        <PostForm />
        <PostsSlider />
        <PostsList />
    </>
}

export default Home;