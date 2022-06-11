import { Text } from "@nextui-org/react";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Stars from "../../components/Stars";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 2rem 5rem 2rem;
  max-height: 100vh;
  overflow: scroll;
`;

export default function Post({ post, morePosts, preview }: any) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div id="container" style={{ overflow: "hidden" }}>
      {router.isFallback ? (
        <h2>Loading…</h2>
      ) : (
        <div>
          <Head>
            <title>{post.title}</title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <Stars />
          <ContentContainer>
            <Text
              className="header-text"
              h1
              size={60}
              weight="bold"
              css={{ textAlign: "center", marginBottom: "1rem" }}
            >
              {post.title}
            </Text>
            <Text
              h3
              css={{
                textAlign: "center", marginBottom: "1rem", cursor: 'pointer',
                textGradient: "45deg, $purple600 -20%, $pink600 100%",
              }}
              weight="bold"
              onClick={() => router.push(`${post.url}`)}
            >
              Demo Website
            </Text>
            {/* <Link href={`${post.url}`} passHref>
              <Text
                h3
                weight="bold"
                css={{

                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}

              >
                Demo Website
              </Text>
            </Link> */}
            <Text color="$red800" weight={"bold"} >
              {new Date(post.date).toDateString()}
            </Text>

            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ContentContainer>
        </div>
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
    "url"
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
