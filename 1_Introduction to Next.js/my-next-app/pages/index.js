import Header from '../components/Header';
import BlogPost from '../components/BlogPost';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <BlogPost 
        title="Getting Started with Next.js" 
        content="Learn how to build a blog with Next.js..." 
      />
      <BlogPost 
        title="Why Next.js is Awesome" 
        content="Discover the benefits of server-side rendering..." 
      />
    </div>
  );
}