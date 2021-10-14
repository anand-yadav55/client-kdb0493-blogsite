import { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

export default function Home(props) {
  const [allBlogs, setAllBlogs] = useState([{}]);

  useEffect(() => {
    axios
      .get('/api/blog/blogs')
      .then((data) => {
        setAllBlogs(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <div className="homeFront">
        <h1>The way you think, the way you write ....</h1>
      </div>
      <hr />
      <hr />
      <h1 className="title-2">Blogs</h1>
      <div className="all-blogs">
        {allBlogs.length > 0 ? (
          allBlogs.map((item, i) => {
            return <Blog key={i} item={item} />;
          })
        ) : (
          <Blog
            item={{
              blogTitle: 'Welcome to Blogisy',
              blogBody:
                'Welcome to blogisy this is a blog website, It will be amazing If you write some blog here',
            }}
          />
        )}
      </div>
    </div>
  );
}
