import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AsideBox from '../../components/AsideBox/AsideBox';
import FeedBox from '../../components/FeedBox/FeedBox';
import NavBar from '../../components/NavBar/NavBar';
import Search from '../../components/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateAccessToken,
  updateDisplayName,
  updateRefreshToken,
  updateUserId,
} from '../../reducers/userData';
import { updateMemberInfo } from '../../reducers/memberInfo';

import './SNS.css';
import jwtDecode from 'jwt-decode';

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

  // 리덕스 저장소의 데이터 변경
  const addMemberInfo = (resdata) => {
    dispatch(updateMemberInfo(resdata));
  };

  useLayoutEffect(() => {
    let userAccessToken = params.get('accessToken');
    if (userAccessToken) {
      let words = userAccessToken.split('?');
      let userRefreshToken = words[1].slice(13);

      console.log('accesstoken', words[0]);
      console.log('resfeshtoken', userRefreshToken);
      const decoded = jwtDecode(userAccessToken);
      console.log('decoded', decoded);
      dispatch(updateAccessToken(words[0]));
      dispatch(updateRefreshToken(userRefreshToken));
      dispatch(updateUserId(decoded.user.id));
      dispatch(updateDisplayName(decoded.user.name));
      navigate('/post');
    } else {
      return;
    }
  }, [accessToken]);

  useEffect(() => {
    //토큰값 보내고 data 받아오기
    if (accessToken) {
      const loadData = async () => {
        const response = await fetch(`/mypage/memberinfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ACCESS_TOKEN: accessToken,
          },
        });
        let data = await response.json();

        if (response.status === 401) {
          const res = await fetch(`/mypage/memberinfo`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ACCESS_TOKEN: accessToken,
              REFRESH_TOKEN: refreshToken,
            },
          });
          data = await res.json();
        }
        console.log(data);
        addMemberInfo(data);
      };
      loadData();
    } else {
      return;
    }
  }, [accessToken]);

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
