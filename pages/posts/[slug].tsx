import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Stars from "../../components/Stars";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export default function Post({ post, morePosts, preview }: any) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  console.log("post : ", post);
  return (
    <div>
      {" "}
      {router.isFallback ? (
        <h2>Loading…</h2>
      ) : (
        <>
          <Head>
            <title>{post.title}</title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <Stars />
          <ContentContainer>
            <h1 style={{ marginBottom: "0px" }}>{post.title}</h1>
            <h5 style={{ marginTop: "5px" }}>
              {new Date(post.date).toDateString()}
            </h5>
            <div style={{ textAlign: "center" }}>
              <Image
                layout="fixed"
                width={500}
                height={500}
                objectFit="cover"
                src={post.coverImage}
              />
            </div>

            <div
              className="markdown"
              //   className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ContentContainer>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
