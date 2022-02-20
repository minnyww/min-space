import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { getAllPosts } from "../lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import Stars from "../components/Stars";
import { Button, Card, Text } from "@nextui-org/react";

const NavBar = styled.div`
  padding: 1rem 1rem;
  position: sticky;
  top: 5px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;

  @media only screen and (max-width: 412px) {
    padding: 0rem 3rem;
  }
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const Astronaut = styled(motion.img)`
  position: absolute;
  right: 5%;
  bottom: 0%;
  z-index: 10;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
`;

const Home: NextPage = (query: any) => {
  const { welcomeMsg, allPosts } = query;
  const [, setWelcomeMessage] = useState("");
  // const { scrollYProgress, scrollY } = useViewportScroll();

  // const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.4]);
  // const scaleAnim2 = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   [0.7, 0.4, 0.0]
  // );
  // const input = [-1000, 500, 2000];
  // const output = [-800, 500, 1200];
  // const moveAnim = useTransform(scrollY, input, output);
  // console.log("scrollY : ", scrollY);

  // console.log("scaleAnim : ", scaleAnim);

  useEffect(() => {
    Cookies.set("isNewUser", welcomeMsg === "Welcome!" ? "false" : "true");
    setWelcomeMessage(welcomeMsg);
  }, [welcomeMsg]);

  return (
    <div id="container">
      <NavBar>
        <Text className="header-text" h1 weight="bold" color="warning">
          Min Space
        </Text>
        <motion.div
          animate={{
            rotate: [120, 300, 600],
            translateX: [0, 0, 3000],
            transition: {
              duration: 1,
              yoyo: Infinity,
            },
          }}
        >
          🚀
        </motion.div>
      </NavBar>
      <Stars />
      <Astronaut
        src="/assets/astronaut.png"
        style={{
          width: "100px",
          height: "100px",
          // x: moveAnim,
          // scale: scaleAnim2,
        }}
        animate={{
          y: [-100, -90, -80, -70, -60],
        }}
        transition={{
          duration: 0.8,
          yoyo: Infinity,
        }}
      />
      <ContentWrapper>
        <ContentContainer
          layout
          animate={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.5, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {allPosts?.map((post: any) => {
            return (
              <Card key={post.slug}>
                <Card.Body>
                  <Text h3 color="$purple400">
                    {post.title}
                  </Text>
                  <Text color="$purple100">{post.excerpt}</Text>
                </Card.Body>
                <Card.Footer>
                  <Link href={`/posts/${post.slug}`} passHref>
                    <Button color="gradient" bordered>
                      Read
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            );
          })}
        </ContentContainer>
      </ContentWrapper>
    </div>
  );
};

export default Home;

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
