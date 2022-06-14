import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Cookies from "js-cookie";
import { getAllPosts } from "../lib/api";
import { motion } from "framer-motion";
import Stars from "../components/Stars";
import { Button, Card, Col, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import Head from "next/head";

const NavBar = styled.div`
  padding: 1rem 1rem;
  position: sticky;
  top: 5px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2;
  justify-content: space-between;
`;

const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;

  @media only screen and (max-width: 412px) {
    padding: 0rem 3rem;
  }
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
  padding: 1rem 0rem;
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

const typing = keyframes`
  from { width: 0;opacity:1 }
  to { width: 100% ;opacity:1}
`;

const blink = keyframes`
 from, 
 to { border-color: transparent }
 50% { border-color: orange }
`;

const TypingWrapper = styled(motion.div) <{
  textLength: number;
  delay?: number;
}>`
  width: fit-content;

  h4 {
    opacity: 0;
    font-family: monospace;
    overflow: hidden;
    border-right: 0.15em solid orange;
    white-space: nowrap;
    ${({ textLength, delay }) => {
    return css`
        animation: ${typing} 3.5s steps(${textLength}, end),
          ${blink} 0.5s step-end infinite alternate;
        animation-delay: ${delay}s;
        animation-fill-mode: forwards;
      `;
  }}
  }
`;

const Home: NextPage = (query: any) => {
  const { welcomeMsg, allPosts } = query;
  const [, setWelcomeMessage] = useState("");
  const router = useRouter()
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

  const GREETING_MESSAGE = "Hi i'm Apisit Amnuworrabut";
  const GREETING_MESSAGE_2 = "I'm Software engineer at Vonder";

  return (
    <div
      id="container"
      style={{ height: "100%", maxWidth: "900px", margin: "0 auto" }}
    >
      <Head>
        <title>Welcom To Min Space</title>
        <meta name="description" content="My name is Apisit Amnuayworrabut" />
      </Head>
      <NavBar>
        <Text className="header-text" h1 weight="bold" color="warning">
          Welcom To Min Space
        </Text>
        <motion.div
          animate={{
            rotate: [120, 300, 600],
            transition: {
              repeat: Infinity
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
        {/* <TextTyping h2>Hi Alien</TextTyping> */}
        <TypingWrapper textLength={GREETING_MESSAGE.length}>
          <Text h4 color="warning">
            {GREETING_MESSAGE}
          </Text>
        </TypingWrapper>
        <TypingWrapper textLength={GREETING_MESSAGE_2.length} delay={3.5}>
          <Text h4 color="warning">
            {GREETING_MESSAGE_2}
          </Text>
        </TypingWrapper>

        <ContentContainer
          layout
          animate={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.5, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{ paddingTop: "2rem" }}
        >
          {allPosts?.map((post: any) => {
            return (
              <Card key={post.slug} isPressable onClick={() => {
                router.push(`/posts/${post.slug}`)
              }}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                      {new Date(post.date).toDateString()}
                    </Text>
                    <Text h4 color="white">
                      {post.title}
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Image
                  src={post.coverImage}
                  objectFit="cover"
                  width="100%"
                  height={340}
                  alt="Card image background"
                />
              </Card>
              // <Card key={post.slug}>
              //   <Card.Body>
              //     <Text h3 color="$purple400">
              //       {post.title}
              //     </Text>
              //     <Text color="$purple100">{post.excerpt}</Text>
              //   </Card.Body>
              //   <Card.Footer>
              //     <Link href={`/posts/${post.slug}`} passHref>
              //       <Button color="gradient" bordered>
              //         Read
              //       </Button>
              //     </Link>
              //   </Card.Footer>
              // </Card>
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

  return {
    props: { allPosts },
  };
}
