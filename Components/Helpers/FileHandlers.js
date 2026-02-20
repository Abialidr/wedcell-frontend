import { useDeletes3ImageMutation } from "redux/Api/others.api";

export const ImageDelete = async (keySource) => {
  const [deletes3Image] = useDeletes3ImageMutation();
  // const [data, setData] = useState(null);
  const key = keySource
    .replaceAll("25%", "%")
    .replaceAll("https://wedfield-s3-1.s3.ap-south-1.amazonaws.com/", "")
    .replaceAll("+", " ");
  const res = await deletes3Image({ fileName: key });
  let message = res.data.message;
  // setData(message);
  // return data;
};
