import { Box, Grid, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { selectLocation } from "redux/reducer/appEssentials";

const style = {
  // position: 'absolute',
  display: "flex",
  // top: '171px',
  // left: '50%',
  // transform: 'translateX(-50%)',
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  // height: "60%",
  flexWrap: "wrap",
  padding: "30px",
  flexDirection: "row",
  width: "calc(90vw)",
  maxWidth: "962px",
  textAlign: "start",
};

const columnHeader = {
  color: "#B6255A",
  fontFamily: `Poppins, sans-serif`,
  fontStyle: "ExtraLight",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "22px",
  m: 1,
  cursor: "pointer",
  textAlign: "start",
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: "initial",
  fontWeight: 100,
  fontSize: "16px",
  m: 1,
  marginTop: "10px",
  cursor: "pointer",
  textAlign: "start",
  color: "#6F6C90",
};

const gridStyle = {
  marginTop: "20px !important",
  marginLeft: "0px",
};
const imgTitle = {
  marginTop: "20px",
  paddingLeft: "0px !important",
  marginTop: "0px !important",
  paddingTop: "0px !important",

  p: {
    fontFamily: "Bahnschrift",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: " center",
    color: "#444444",
  },
  img: {
    borderRadius: "10px",
    marginBottom: "5px",
  },
};

function FormRow({ props }) {
  const location = useSelector(selectLocation);
  const router = useRouter();
  const Vendors = [
    {
      name: "Food",
      subCategories: [
        {
          name: "Chaat Counter",
          link: `/vendors/wedding/1/${location}/chaat-counter`,
        },
        {
          name: "Fruit Counter",
          link: `/vendors/wedding/1/${location}/fruit-counter`,
        },
        {
          name: "Catering services",
          link: `/vendors/wedding/1/${location}/catering-services`,
        },
        {
          name: "Pan Counter",
          link: `/vendors/wedding/1/${location}/pan-counter`,
        },
        {
          name: "Bar Tenders",
          link: `/vendors/wedding/1/${location}/bar-tenders`,
        },
        {
          name: "Cake",
          link: "/cake/wedding/1",
        },
      ],
    },

    // {
    //   name: "Photographers",
    //   subCategories: [
    //     "Cinema/Video",
    //     "Album",
    //     "Collage Maker",
    //     "Drone",
    //     "Pre Wedding Shoot",
    //   ],
    // },
    {
      name: "Music & Dance",
      subCategories: [
        {
          name: "Anchor",
          link: "/music-and-dance/wedding/1/anchor",
        },
        {
          name: "Choreographer",
          link: "/music-and-dance/wedding/1/choreographer",
        },
        {
          name: "DJ",
          link: "/music-and-dance/wedding/1/dj",
        },
        {
          name: "Live band",
          link: "/music-and-dance/wedding/1/live-band",
        },
        {
          name: "DJ based Band",
          link: "/music-and-dance/wedding/1/dj-based-band",
        },
        {
          name: "Male & Female Singer",
          link: "/music-and-dance/wedding/1/male-and-female-singer",
        },
        // {
        //   name: "Bride and Groom Entry",
        //   link: "/music-and-dance?subCategory=Bride and Groom Entry",
        // },
        {
          name: "Dhol",
          link: "/dhol",
        },
      ],
    },
    {
      name: "Invites & Gifts",
      subCategories: [
        {
          name: "Invitation Card",
          link: "/invitation-card/wedding/1",
        },
        {
          name: "Invitation Gift",
          link: "/invitation-gift/wedding/1",
        },
      ],
    },
    {
      name: "Beauty Menu",
      subCategories: [
        {
          name: "Makeup",
          link: "/makeup",
        },
        {
          name: "Mehndi",
          link: "/mehendi",
        },
      ],
    },
  ];
  const subCategotyArr = [
    // 'bridal Makeup',
    // 'Groom Makeup',
    // 'Family Makeup',
    // 'Bride Mehndi',
    // 'Family Member Mehndi',
    // 'Cinema/Video',
    // 'Album',
    // 'Collage Maker',
    // 'Drone',
    // 'Pre Wedding Shoot',
  ];

  return (
    <React.Fragment>
      {Vendors?.map((el) => (
        <Grid key={el.name} sx={imgTitle} item xs={3}>
          <Typography
            id="modal-modal-item"
            variant="h6"
            component="h2"
            sx={columnHeader}
            onClick={(e) => {
              e.preventDefault();
              if (el.name) {
                props.handleClose();

                // router.push({
                //   pathname: "/vendors/wedding/1",
                //   // query: { category: el.name },
                // });
              }
            }}
          >
            {el.name}
          </Typography>
          {el.subCategories?.map((sub) => {
            return (
              <Typography
                key={el}
                id="modal-modal-item"
                variant="h4"
                component="h2"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  props.handleClose();
                  if (typeof sub === "string") {
                    router.push({
                      pathname: `/vendors/wedding/1/${sub}`,
                      // query: { category: el.name, subCategory: sub },
                    });
                  } else {
                    router.push(sub.link);
                  }
                }}
              >
                {typeof sub === "string" ? sub : sub.name}
              </Typography>
            );
          })}
        </Grid>
      ))}
    </React.Fragment>
  );
}
export const VendorsModal = (props) => {
  const router = useRouter();
  return (
    <div>
      <Box
        spacing={2}
        sx={style}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid sx={gridStyle} container spacing={1}>
                <FormRow props={props} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
