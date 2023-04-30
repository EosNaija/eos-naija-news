import Head from "next/head";
import { PostCard, PostWidget, Pagination, Loader } from "../../components";
import { getPagePosts, getPosts } from "../../services";
import { useRouter } from "next/router";

const POSTS_PER_PAGE = 10;

export default function Home({ posts, currentPage, numPages }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className=" body-padding mx-auto mb-8">
      <Head>
        <title>Blog- EOS Naija</title>
        <meta
          name="description"
          content="EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language"
        />
        <link rel="icon" href="/favicon.ico" />
        <script async={false} src="/intercom.js" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:col-span-9 col-span-1">
          {posts?.map((post) => (
            <PostCard key={post.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-3 col-span-1">
          <div className="lg:sticky relative top-12">
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
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paths = pageNumbers.map((pageNumber) => ({
    params: { slug: `${pageNumber}` },
  }));
  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const page = parseInt((params && params.slug) || "1", 10);
  const skip = (page - 1) * POSTS_PER_PAGE;
  const posts = (await getPagePosts(skip)) || [];
  const numPages = posts.length < 10 ? page : page + 1;

  return {
    props: {
      posts,
      currentPage: page,
      numPages: numPages,
    },
    revalidate: 60,
  };
}
