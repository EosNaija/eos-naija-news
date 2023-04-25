import Head from "next/head";
import React from "react";
import { PostDetail, PostWidget, Author, Loader } from "../../components";
import { getPosts, getPostDetails } from "../../services";
import { useRouter } from "next/router";
const PostDetails = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container w-4/5 mx-auto px-2 mb-8">
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content="EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-BNfIB9vyH+Fy+ZWJ46FLAx/eQwTq3kIzDZP6sJocI8Rup9XfBgV7ywx92JDT1T+Txd3BqP2/F2ZMKY+u6rLd9g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className="grid drid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((categories) => categories.slug)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
