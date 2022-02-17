import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { getAllPosts } from "../lib/api";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Stars from "../components/Stars";

const NavBar = styled.div`
  padding: 0rem 1rem;
  color: rgb(255, 214, 10);
  position: absolute;
  top: 0%;
  z-index: 1;
`;

const PageContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`;

const BlogCard = styled(motion.div)`
  border-radius: var(--border-radius);
  color: white;
  min-height: 280px;
  max-height: 350px;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  /* max-width: 70%; */
`;

const BlogTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  font-weight: 700;
  /* padding-top: 5rem;
  background: linear-gradient(0deg, #21124ad1 36.77%, rgb(51 35 96 / 0%) 100%); */
`;

const ReadmoreButton = styled.div`
  border-radius: var(--border-radius);

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  padding: 10px;
  width: fit-content;
  font-size: 14px;
`;

const BlogCoverImage = styled(motion.img)`
  border-radius: var(--border-radius);
  filter: brightness(0.6);
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media only screen and (max-width: 412px) {
    padding: 0rem 4rem;
  }
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

const SpaceShipWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Astronaut = styled(motion.img)`
  position: absolute;
  left: 10%;
  top: 20%;
`;

const Home: NextPage = (query: any) => {
  const { welcomeMsg, allPosts } = query;
  const [welComeMessage, setWelcomeMessage] = useState("");
  const { scrollYProgress, scrollY } = useViewportScroll();

  const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.4]);
  const scaleAnim2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7, 0.4, 0.0]
  );
  const input = [-1000, 500, 2000];
  const output = [-800, 500, 1200];
  const moveAnim = useTransform(scrollY, input, output);
  console.log("scrollY : ", scrollY);

  // console.log("scaleAnim : ", scaleAnim);

  useEffect(() => {
    Cookies.set("isNewUser", welcomeMsg === "Welcome!" ? "false" : "true");
    setWelcomeMessage(welcomeMsg);
  }, [welcomeMsg]);

  return (
    <div id="container" style={{ position: "relative" }}>
      <SpaceShipWrapper>
        <NavBar>
          <h2>{welComeMessage}Welcome to Min Space</h2>
        </NavBar>
        <motion.img
          src="/assets/space-ship.jpg"
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
            filter: "brightness(0.7)",
            scale: scaleAnim,
            objectFit: "cover",
          }}
        />
        <Astronaut
          src="/assets/astronaut.png"
          style={{
            width: "300px",
            height: "300px",
            x: moveAnim,
            scale: scaleAnim2,
          }}
        />
      </SpaceShipWrapper>
      <Stars />

      <PageContent>
        <div style={{ margin: "0 auto" }}>
          <h2>Blogs</h2>
        </div>
        <ContentContainer>
          {allPosts?.map((post: any) => {
            return (
              <BlogCard key={post.slug}>
                <BlogCoverImage
                  alt="cover image"
                  src={post.coverImage}
                  width={"100%"}
                  height="100%"
                  // style={{ scale: scaleAnim }}
                />

                <CardContent>
                  <BlogTitle>{post.title}</BlogTitle>
                  <Link href={`/posts/${post.slug}`}>
                    <ReadmoreButton>Read</ReadmoreButton>
                  </Link>
                </CardContent>
              </BlogCard>
            );
          })}
        </ContentContainer>
      </PageContent>
    </div>
  );
};

export default Home;

// export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
//   console.log("query :: ", query);
//   return {
//     props: query,
//   };
// };

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);
  console.log("allPosts : ", allPosts);

  return {
    props: { allPosts },
  };
}
