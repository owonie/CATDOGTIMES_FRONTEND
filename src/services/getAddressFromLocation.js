import React from 'react';

const getAddressFromLocation = async (x, y) => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'KakaoAK 41d04f8d83bc7d29aaa1160bf57bb770',
      },
    }
  );
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data.documents[0].address.address_name;
};

export default getAddressFromLocation;
