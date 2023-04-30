import Head from "next/head";
import {
  PostCard,
  PostWidget,
  FeaturedBanner,
  Pagination,
  FeaturedText,
} from "../components";
import { getPosts } from "../services";

const POSTS_PER_PAGE = 10;

export default function Home({ posts, currentPage, numPages }) {
  if (posts.length > 0) {
    const {
      createdAt,
      author,
      featuredImage,
      excerpt,
      slug,
      title,
      read_duration,
    } = posts && posts[0]?.node;
    return (
      <div className="">
        <Head>
          <title>Blog- EOS Naija</title>
          <meta
            name="description"
            content="EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language"
          />
          <link rel="icon" href="/favicon.ico" />
          <script async={false} src="/intercom.js" />
        </Head>
        <div className="bg-green-600 h-96 -mb-48">
          <FeaturedText />
        </div>
        <div className=" body-padding mx-auto mb-8">
          <FeaturedBanner
            author={author.name || ""}
            createdAt={createdAt}
            slug={slug}
            image={featuredImage.url}
            title={title}
            excerpt={excerpt}
            read_duration={read_duration}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:col-span-9 col-span-1">
              {posts &&
                posts
                  ?.slice(1)
                  .map((post) => (
                    <PostCard key={post.title} post={post.node} />
                  ))}
            </div>
            <div className="lg:col-span-3 col-span-1">
              <div className="lg:sticky relative top-10">
                <PostWidget />
              </div>
            </div>
          </div>
          <div className="relative top-22">
            <Pagination currentPage={currentPage} numPages={numPages} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ height: "65vh" }} className="text-center p-8 bg-white m-8">
        <h2 className="font-bold">No Posts Found</h2>
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page) || "1", 10);
  const posts = (await getPosts()) || [];
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
