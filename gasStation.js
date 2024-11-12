// App.js
 //여기서 더미데이터를 가지고 최소값을 가지는 주유소 출력 기능 구현해야함
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

const App = () => {
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.9784 }); // 초기 위치
  const [stations, setStations] = useState([
    // 더미 주유소 데이터 (테스트용)
    {
      id: 1,
      name: '주유소1',
      fuelType: 'Gasoline',
      price: 1500,
      lat: 37.5675,
      lng: 126.9774,
      address: '서울특별시 중구 세종대로 110'
    },
    {
      id: 2,
      name: '주유소2',
      fuelType: 'Diesel',
      price: 1400,
      lat: 37.5650,
      lng: 126.9750,
      address: '서울특별시 중구 세종대로 120'
    },
    {
      id: 3,
      name: '주유소3',
      fuelType: 'Premium Gasoline',
      price: 1600,
      lat: 37.5630,
      lng: 126.9730,
      address: '서울특별시 중구 세종대로 130'
    }
  ]);

  const [selectedStation, setSelectedStation] = useState(null); // 선택된 주유소 정보

  // 마커 클릭 시 주유소 정보 업데이트
  const handleMarkerClick = (station) => {
    setSelectedStation(station);
  };

  // 검색 버튼 클릭 시 호출될 함수
  const handleSearch = async () => {
    try {
      const data = {
        latitude: position.lat,
        longitude: position.lng,
        radius: 5, // 검색할 반경 (단위: km)
      };

      const response = await fetch('http://서버주소/주유소-검색', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setStations(jsonResponse.stations); // 서버 응답 데이터로 stations 업데이트
      } else {
        console.error('데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  // 현재 위치 버튼 클릭 시 위치 설정
  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setPosition({ lat, lng });
      });
    } else {
      alert("Geolocation을 사용할 수 없습니다.");
    }
  };

  return (
    <div className="app">
      <Sidebar 
        position={position} 
        onLocateClick={handleLocateClick} 
        onSearchClick={handleSearch} 
        selectedStation={selectedStation} // 선택된 주유소 정보를 Sidebar로 전달
      />
      <Map 
        position={position} 
        setPosition={setPosition} 
        stations={stations} 
        handleMarkerClick={handleMarkerClick} // 마커 클릭 시 정보 업데이트
      />
    </div>
  );
};

export default App;
