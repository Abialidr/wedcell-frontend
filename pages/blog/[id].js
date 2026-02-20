// react
import * as React from "react";
// dayjs
import dayjs from "dayjs";
// reading-time
import readingTime from "reading-time";
// @mui
import { Box, Typography, Grow, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
// import { PROXY, S3PROXY } from "../../config";
import ProjectNotFound from "../../Components/common/ProjectNotFound";
import { PROXY, S3PROXY } from "../../config";
import ContainerGrid from "../../Components/common/ContainerGrid";
import CenterBox from "../../Components/common/CenterBox";
import parse from "html-react-parser";
import BlogCard1 from "../../Components/newCard/blogcard/BlogCard1";
import { useGetAllBlogsQuery, useGetBlogQuery } from "redux/Api/others.api";

const BlogPost = (props) => {
  const { content = "stuff" } = props;

  const [blogPost, setBlogPost] = React.useState(null);

  const router = useRouter();
  const { id } = router.query;

  const [blogPosts, setBlogPosts] = React.useState(null);
  const { data: getAllBlogs } = useGetAllBlogsQuery();
  React.useEffect(() => {
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
  const { data: blog } = useGetBlogQuery(id);
  React.useEffect(() => {
    const GetBlog = async () => {
      try {
        const response = { data: blog };
        if (response?.data?.success) {
          setBlogPost(response?.data?.data[0]);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    GetBlog();
  }, [blog]);

  if (!blogPost) return <ProjectNotFound />;

  const parsedBlogPost = blogPost;
  const { text: readTime } = readingTime(content);
  const date = dayjs(parsedBlogPost.date);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          margin: "2rem 0 ",
          marginRight: "0",
          padding: "10px",
          paddingRight: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="box123"
      >
        <Box>
          <Typography
            component="h1"
            textAlign="left"
            variant="h3"
            color={"#764747"}
            textTransform={"capitalize"}
            marginBottom={"20px"}
            style={{
              textWrap: "wrap",
              wordBreak: "break-word",
            }}
          >
            {parsedBlogPost.title}
          </Typography>
        </Box>
        <Box>
          <Typography
            color="text.secondary"
            component="p"
            marginTop="1rem"
            textAlign="left"
            variant="body1"
          >
            {readTime} | Published at {date.toDate().toDateString()}
          </Typography>
        </Box>
        <Box sx={{}}>
          {parsedBlogPost.mainImage && (
            <img
              style={{
                width: "90vw",
                maxWidth: "600px",
              }}
              src={`${parsedBlogPost.mainImage}`}
              alt={parsedBlogPost.title}
              className="rounded-lg"
            />
          )}
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "1.2rem" }}
            component="paragragh"
            textAlign="left"
            variant="paragraph"
          >
            <div className="parsedescreption">
              {parse(parsedBlogPost.description)}
            </div>
          </Typography>
        </Box>
        {/* <Box sx={{ m: 3 }}>
          <Typography component="h1" textAlign="center" variant="h4">
            More like these
          </Typography>
        </Box> */}
        {/* {blogPosts ? (
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
        )} */}
      </Box>
    </Box>
  );
};

export default BlogPost;
