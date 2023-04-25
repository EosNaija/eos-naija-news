import Head from "next/head";
import {
  PostCard,
  PostWidget,
  Pagination,
  FeaturedBanner,
  Loader,
} from "../../components";
import { getPosts } from "../../services";
import { useRouter } from "next/router";

const POSTS_PER_PAGE = 6;

export default function Home({ posts, currentPage, numPages }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  console.log(posts);
  const {
    createdAt,
    author,
    featuredImage,
    excerpt,
    slug,
    title,
    read_duration,
  } = posts[0].node;
  return (
    <div className=" body-padding mx-auto mb-8">
      <Head>
        <title>Blog- EOS Naija</title>
        <meta
          name="description"
          content="EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="import" href="/script/support.html" />
      </Head>
      <FeaturedBanner
        author={author.name}
        createdAt={createdAt}
        slug={slug}
        image={featuredImage.url}
        title={title}
        excerpt={excerpt}
        read_duration={read_duration}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:col-span-9 col-span-1">
          {posts?.map((post) => (
            <PostCard key={post.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-3 col-span-1">
          <div className="lg:sticky relative top-24">
            <PostWidget />
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  console.log(params);
  const posts = (await getPosts()) || [];
  const page = parseInt((params && params.slug) || "1", 10);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const slicedPosts = posts.slice(startIndex, endIndex);

  return {
    props: {
      posts: slicedPosts,
      currentPage: page,
      numPages: numPages,
    },
    revalidate: 60,
  };
}