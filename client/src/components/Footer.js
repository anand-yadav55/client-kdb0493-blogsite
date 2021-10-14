import { Button } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { useHistory } from 'react-router';

export default function Footer(props) {
  const history = useHistory();
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '50px',
        color: 'white',
        textAlign: 'center',
        padding: '4px',
        fontSize: 'large',
      }}
    >
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => history.push('/createBlog')}
        style={{ cursor: 'pointer' }}
        style={{
          // borderRadius: 35,
          backgroundColor: 'rgb(149 224 49)',
          fontSize: 'large',
        }}
      >
        <CreateOutlinedIcon />
        New Blog
      </Button>
    </footer>
  );
}
