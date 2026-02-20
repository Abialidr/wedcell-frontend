import NewHead from "../Components/landing/home-top-div/New";
import OurVideos from "../Components/landing/OurVideos";
import Section12 from "../Components/landing/Section12/Section12";
import FrameComponent6 from "../Components/landing/new companonents/FrameComponent6";
import FrameComponent22 from "../Components/landing/new companonents/FrameComponent22";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NewHead />
        <div
          style={{
            paddingTop: "50px",
          }}
        >
          <OurVideos />
        </div>
        <Section12 />
        <FrameComponent6 />
        <FrameComponent22 />
      </div>
    </>
  );
}
