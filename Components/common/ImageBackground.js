import { Box, styled } from "@mui/material";
import { S3PROXY } from "config";

const ImageBackground = styled(Box)(({ theme, image }) => ({
  backgroundImage: `url(${S3PROXY}${image})`,
  display: "flex !important",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 10px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  height: "100%",
  width: "100%",
  position: "relative",
}));
export default ImageBackground;

