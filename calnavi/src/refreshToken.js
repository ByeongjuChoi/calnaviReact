async function refreshToken(token) {
  try {
    const response = await fetch('/api/refresh', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    if (response.ok) {
      const newToken = await response.text(); // 서버가 문자열로 토큰을 반환한다고 가정
      console.log('새 토큰:', newToken);
      sessionStorage.setItem('token', newToken); // sessionStorage에 저장
      return newToken;
    } else {
      console.error('토큰 리프레시 실패');
      return null;
    }
  } catch (error) {
    console.error('토큰 리프레시 오류', error);
    return null;
  }
}

export default refreshToken;