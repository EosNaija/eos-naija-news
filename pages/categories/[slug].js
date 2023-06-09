import Head from "next/head";
import { getCategories, getCategoryPosts } from "../../services";

import { Loader, Pagination, PostCard, PostWidget } from "../../components";
import { useRouter } from "next/router";

const POSTS_PER_PAGE = 6;

export default function CategoryPost({ posts, currentPage, numPages }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container body-padding mx-auto mb-8">
      <Head>
        <title>Blog- EOS Naija</title>
        <meta
          name="description"
          content="EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-0.5 my-2 bg-gray-500 w-full">
        <br />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:col-span-9 col-span-1">
          {posts?.map((post) => (
            <PostCard post={post} key={post.title} />
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

export async function getStaticProps({ params }) {
  const { posts } = (await getCategoryPosts(params.slug)) || [];
  const page = parseInt((params && params.page) || "1", 10);
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

export async function getStaticPaths() {
  const categories = await getCategories();

  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
