import PropTypes from 'prop-types';
// material  `0 8px 16px 0 ${alpha(color, 0.24)}`
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';
// component
import Iconify from '../common/Iconify';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: `0 8px 16px 0 rgba(145, 158, 171, 0.24)`,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  onClick,
  onClick1,
  onClick2,
  onClick3,
  type,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          component='div'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder='Search user...'
          startAdornment={
            <InputAdornment position='start'>
              <Iconify
                icon='eva:search-fill'
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
      {numSelected > 0 ? (
        <>
          {/* <Button onClick={onClick} variant="outlined">UPDATE TO POPULAR</Button> */}
          {type !== 'Users' ? (
            <>
              {type !== 'Student' ? (
                <div>
                  <Button
                    id='fade-button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    UPDATE IN POPULAR
                  </Button>
                  <Menu
                    id='fade-menu'
                    MenuListProps={{
                      'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={onClick}>Add</MenuItem>
                    <MenuItem onClick={onClick}>Remove</MenuItem>
                  </Menu>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Button
                  id='fade-button1'
                  aria-controls={open1 ? 'fade-menu1' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                >
                  UPDATE IN ALLOWED
                </Button>
                <Menu
                  id='fade-menu1'
                  MenuListProps={{
                    'aria-labelledby': 'fade-button1',
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={onClick1}>Add</MenuItem>
                  <MenuItem onClick={onClick1}>Remove</MenuItem>
                </Menu>
              </div>
              <div>
                <Button
                  id='fade-button3'
                  aria-controls={open3 ? 'fade-menu3' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open3 ? 'true' : undefined}
                  onClick={handleClick3}
                >
                  UPDATE IN EXCLUSIVE
                </Button>
                <Menu
                  id='fade-menu3'
                  MenuListProps={{
                    'aria-labelledby': 'fade-button3',
                  }}
                  anchorEl={anchorEl3}
                  open={open3}
                  onClose={handleClose3}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={onClick3}>Add</MenuItem>
                  <MenuItem onClick={onClick3}>Remove</MenuItem>
                </Menu>
              </div>
              <IconButton
                id='fade-button2'
                aria-controls={open2 ? 'fade-menu1' : undefined}
                aria-haspopup='true'
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick2}
              >
                <Iconify icon='eva:trash-2-fill' />
              </IconButton>
              <Menu
                id='fade-menu2'
                MenuListProps={{
                  'aria-labelledby': 'fade-button1',
                }}
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={onClick2}>Add</MenuItem>
                <MenuItem onClick={onClick2}>Remove</MenuItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <Iconify icon='ic:round-filter-list' />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
