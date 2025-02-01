export default function BlogPost({ title, content }) {
    return (
      <article>
        <h2>{title}</h2>
        <p>{content}</p>
      </article>
    );
  }