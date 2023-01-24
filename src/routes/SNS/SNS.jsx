import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AsideBox from '../../components/AsideBox/AsideBox';
import FeedBox from '../../components/FeedBox/FeedBox';
import NavBar from '../../components/NavBar/NavBar';
import Search from '../../components/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccessToken, updateRefreshToken } from '../../reducers/userData';

import './SNS.css';

function SNS() {
  const accessToken = useSelector(
    (state) => state.userData.catdogtimes_accessToken
  );
  const refreshToken = useSelector(
    (state) => state.userData.catdogtimes_refreshToken
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    let userAccessToken = params.get('accessToken');
    if (userAccessToken) {
      let words = userAccessToken.split('?');
      let userRefreshToken = words[1].slice(13);

      console.log('accesstoken', words[0]);
      console.log('resfeshtoken', userRefreshToken);
      dispatch(updateAccessToken(words[0]));
      dispatch(updateRefreshToken(userRefreshToken));
      navigate('/post');
    } else {
      return;
    }
  }, []);
  return (
    <>
      <div className='SNS'>
        <nav id='nav' className='col'>
          <NavBar />
        </nav>
        <section className='center'>
          <Search />
          <FeedBox />
        </section>
        <aside id='asideBox'>
          <AsideBox />
        </aside>
      </div>
    </>
  );
}

export default SNS;
