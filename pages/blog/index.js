import { Grid, Grow, Typography } from "@mui/material";
import CenterBox from "../../Components/common/CenterBox";
import ContainerGrid from "../../Components/common/ContainerGrid";
import { PROXY, S3PROXY } from "../../config";
import { useEffect, useState } from "react";
import BlogCard1 from "../../Components/newCard/blogcard/BlogCard1";
import { useGetAllBlogsQuery } from "redux/Api/others.api";
import { MetaTags } from "Components/common/DetailPageCommonComp";

const Blog = (props) => {
  const [blogPosts, setBlogPosts] = useState(null);
  const { data: getAllBlogs } = useGetAllBlogsQuery();
  useEffect(() => {
    const GetBlogs = async () => {
      try {
        const response = { data: getAllBlogs };
        setBlogPosts(
          response?.data?.data?.length > 0 ? response?.data?.data : null
        );
      } catch (error) {
        console.error(error.message);
      }
    };
    GetBlogs();
  }, [getAllBlogs]);
  const metaTags = {
    blog: {
      description:
        "Trending Wedding tips, Wedding planning, Bridal wear trends, makeup styles, Wedding décor Ideas, shopping tips all about weddings in India – WedField Blogs.",
      title: "WedField Blog | Expert Tips & Inspiration for Weddings and Event",
      url: "https://wedfield.com/blog",
    },
    // Add other meta tags here if needed
  };
  const meta = metaTags["blog"];
  return (
    <>
      <MetaTags meta={meta} />
      <Typography
        component="h1"
        // marginTop="30%"
        sx={{
          marginTop: {
            xs: "64px",
            md: "99px",
          },
        }}
        textAlign="center"
        variant="h2"
      >
        Blog
      </Typography>
      <Typography
        color="text.secondary"
        component="p"
        marginTop="1rem"
        textAlign="center"
        variant="body1"
      >
        Be up to date with wedding trends
      </Typography>
      {blogPosts ? (
        <ContainerGrid sx={{ padding: { xs: "1rem", sm: "2rem" } }}>
          {blogPosts?.map((post, index) => (
            <Grow
              in={true}
              key={post.title + index}
              timeout={(index + 1) * 500}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <BlogCard1 data={post} readTime={5} />
              </Grid>
            </Grow>
          ))}
        </ContainerGrid>
      ) : (
        <CenterBox>
          <Typography component="p" variant="body1">
            No post availabe.
          </Typography>
        </CenterBox>
      )}
    </>
  );
};

export default Blog;
