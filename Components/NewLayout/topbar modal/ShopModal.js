import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";

const style = {
  // position: 'absolute',
  display: "flex",
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  flexDirection: "row",
  padding: "30px",
  width: "calc(90vw)",
  maxWidth: "750px",
};

const columnStyle = {
  margin: "0",
  display: "flex",
  color: "#B6255A",
  fontFamily: `Poppins, sans-serif !important`,
  fontStyle: "ExtraLight",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "22px",
  width: "100%",
  justifyContent: "space-between",

  h3: {
    fontFamily: "Bahnschrift",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#6F6C90",
  },
};

const columnHeader = {
  color: "#B6255A",
  fontFamily: `Poppins, sans-serif !important`,
  fontStyle: "ExtraLight",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "22px",
  m: 1,
  cursor: "pointer",
  textAlign: "start",
};
const columnHeaderSx = {
  color: "#E48F0E",
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: "normal",
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "22px",
  m: 1,
  fontFamily: "Bahnschrift",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#444444",
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: "normal",
  fontWeight: "200",
  fontSize: "16px",
  lineHeight: "22px",
  m: 1,
  marginTop: "10px",
  cursor: "pointer",
  h3: {
    fontFamily: "Bahnschrift",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#444444",
  },
};

const VenuesByType = [
  { venue: "Lehenga", id: "lehenga" },
  { venue: "Bridal Lehenga", id: "bridal-lehenga" },
  { venue: "Gowns", id: "gowns" },
  { venue: "Sharara", id: "sharara" },
  { venue: "Anarkali", id: "anarkali" },
  { venue: "Indo Western", id: "indo-western" },
  { venue: "Kurta", id: "kurta" },
];
const broomVenuesByType = [
  // {
  //   venue: 'Blazer for Men',
  //   id: 'Blazer for Men',
  // },
  // {
  //   venue: 'Formal',
  //   id: 'formal',
  // },
  // {
  //   venue: 'Indo Western',
  //   id: 'Indo Western',
  // },
  // {
  //   venue: 'Kids Kurt',
  //   id: 'Kids Kurta',
  // },
  // {
  //   venue: 'Kids Kurta Jacket',
  //   id: 'Kids Kurta Jacket',
  // },
  // {
  //   venue: 'Kurta Dhoti Collection',
  //   id: 'kurta dhoti collection',
  // },
  // {
  //   venue: 'Kurta Jacket Se',
  //   id: 'Kurta Jacket Set',
  // },

  // {
  //   venue: 'Kurta Pajama',
  //   id: 'Kurta Pajama',
  // },
  // {
  //   venue: 'Lower',
  //   id: 'Lower',
  // },
  // {
  //   venue: 'Men Blazers Suit',
  //   id: 'Men Blazers Suits',
  // },
  // {
  //   venue: 'Only Jacket ',
  //   id: 'Only Jacket ',
  // },
  // {
  //   venue: 'Only Kurta',
  //   id: 'Only Kurta',
  // },
  {
    venue: "Sherwani",
    id: "sherwani",
  },
  {
    venue: "Indo Western",
    id: "indo-western",
  },
  // {
  //   venue: 'Stitched Suit ',
  //   id: 'Stitched Suit',
  // },
  // {
  //   venue: 'Twamev Kurta Set ',
  //   id: 'Twamev Kurta Set',
  // },
];
const mostPop = [
  {
    venue: "Engagement Lehenga",
    id: "Engagement Lehenga",
  },
  {
    venue: "Cocktail Gowns",
    id: "Cocktail Gowns",
  },
  {
    venue: "Reception Lehenga",
    id: "Reception Lehenga",
  },
  {
    venue: "Wedding Sarees",
    id: "Wedding Sarees",
  },
  {
    venue: "Lehenga Drape Sarees",
    id: "Lehenga Drape Sarees",
  },
  {
    venue: "Silk Sarees",
    id: "Silk Sarees",
  },
  {
    venue: "Banaras Lehenga",
    id: "Banaras Lehenga",
  },
  {
    venue: "Red Bridal Lehenga",
    id: "Red Bridal Lehenga",
  },
];
const byOccasion = [
  { venue: "Engagement", id: "engagement" },
  { venue: "Haldi", id: "haldi" },
  { venue: "Mehendi", id: "mehendi" },
  { venue: "Cocktail", id: "cocktail" },
  { venue: "Wedding", id: "wedding" },
  { venue: "Reception", id: "reception" },
  { venue: "Sangeet", id: "sangeet" },
];

const bridalStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export const ShopModal = (props) => {
  const router = useRouter();
  return (
    // <Modal
    //   open={props.open}
    //   onClose={props.handleClose}
    //   aria-labelledby='modal-modal-title'
    //   aria-describedby='modal-modal-description'
    // >
    <Box sx={style}>
      <Box sx={columnStyle}>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            Bridal Wear
          </Typography>

          {VenuesByType?.map((el) => {
            return (
              <Typography
                key={el}
                id="modal-modal-item"
                variant="h4"
                component="h3"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  props.handleClose();
                  router.push({
                    pathname: `/products/wedding/1/${el.id}`,
                    // query: { category: el.id },
                  });
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
            onClick={(e) => {
              e.preventDefault();
              props.handleClose();
              router.push("/products");
            }}
          >
            Groom Wear
          </Typography>
          {broomVenuesByType?.map((el) => {
            return (
              <Typography
                key={el}
                id="modal-modal-item"
                variant="h4"
                component="h3"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  props.handleClose();
                  router.push({
                    pathname: `/products/wedding/1/${el.id}`,
                  });
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={columnHeader}
          >
            By Occasion
          </Typography>
          {byOccasion?.map((el) => {
            return (
              <Typography
                key={el}
                id="modal-modal-item"
                variant="h4"
                component="h3"
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  props.handleClose();
                  router.push(`/products/wedding/1/${el.id}`);
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box>
        {/* <Box>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={columnHeader}
          >
            Most Popular
          </Typography>
          {mostPop?.map((el) => {
            return (
              <Typography
                key={el}
                id='modal-modal-item'
                variant='h4'
                component='h3'
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: '/products',
                    query: { category: el.id },
                  });
                  props.handleClose();
                }}
              >
                {el.venue}
              </Typography>
            );
          })}
        </Box> */}
      </Box>
    </Box>
    // </Modal>
  );
};
