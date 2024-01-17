import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function User() {
 
  const [userData, setUserData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState(null);

  const router = useRouter();
  const username = router.query.username;

  const getUserData = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (response.status === 404) {
          return setError({ active: true, type: 404 });
        }
        if (response.status === 403) {
          return setError({ active: true, type: 403 });
        }
        return response.json();
      })
      .then(json => setUserData(json))
      .catch(error => {
        setError({ active: true, type: 400 });
        console.error('Error:', error);
      });
  };

  useEffect(()=> {
    getUserData();
  }, []);
  return (
    <div>{ userData && userData.name}</div>
  )
}
