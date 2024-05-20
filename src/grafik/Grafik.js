import React, { useEffect, useState, useRef, useCallback } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale
);

export default function Grafik() {
  const collectionBukuTelepon = collection(db, 'bukutelepon');

  const componentRef = useRef(null);

  const [phData, setPhData] = useState({
    labels: [],
    datasets: [
      {
        label: 'pH',
        data: [],
        backgroundColor: 'transparent',
        borderColor: "#A0DEFF",
        pointBorderColor: '#A0DEFF',
        pointBackgroundColor: '#A0DEFF',
        pointBorderWidth: 1,
        fill: false
      }
    ]
  });

  const [kelembapanData, setKelembapanData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Kelembapan',
        data: [],
        backgroundColor: 'transparent',
        borderColor: "#0E46A3",
        pointBorderColor: '#0E46A3',
        pointBackgroundColor: '#0E46A3',
        pointBorderWidth: 1,
        fill: false
      }
    ]
  });

  const [cobaData, setCobaData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Suhu',
        data: [],
        backgroundColor: 'transparent',
        borderColor: "#5755FE",
        pointBorderColor: '#5755FE',
        pointBackgroundColor: '#5755FE',
        pointBorderWidth: 1,
        fill: false
      }
    ]
  });

  const getData = useCallback(async () => {
    try {
      const snapshot = await getDocs(collectionBukuTelepon);
      const dataItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched Data:', dataItems);

      const phDataItems = dataItems.map(item => ({
        x: item.ph,
        y: item.timestamp.toDate(),
        label: `ID: ${item.id}`
      }));

      const kelembapanDataItems = dataItems.map(item => ({
        x: item.kelembapan,
        y: item.timestamp.toDate(),
        label: `ID: ${item.id}`
      }));

      const cobaDataItems = dataItems.map(item => ({
        x: item.coba,
        y: item.timestamp.toDate(),
        label: `ID: ${item.id}`
      }));

      console.log('Combined Data:', phDataItems); 
      console.log('Combined Data:', kelembapanDataItems); 

      setPhData({
        datasets: [
          {
            label: 'pH',
            data: phDataItems,
            backgroundColor: 'transparent',
            borderColor: "#A0DEFF",
            pointBorderColor: '#A0DEFF',
            pointBackgroundColor: '#A0DEFF',
            pointBorderWidth: 1,
            fill: false
          }
        ]
      });

      setKelembapanData({
        datasets: [
          {
            label: 'Kelembapan',
            data: kelembapanDataItems,
            backgroundColor: 'transparent',
            borderColor: "#0E46A3",
            pointBorderColor: '#0E46A3',
            pointBackgroundColor: '#0E46A3',
            pointBorderWidth: 1,
            fill: false
          }
        ]
      });

      setCobaData({
        datasets: [
          {
            label: 'Suhu',
            data: cobaDataItems,
            backgroundColor: 'transparent',
            borderColor: "#5755FE",
            pointBorderColor: '#5755FE',
            pointBackgroundColor: '#5755FE',
            pointBorderWidth: 1,
            fill: false
          }
        ]
      });
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  }, [collectionBukuTelepon]);

  useEffect(() => {
    getData();
  }, [getData]);

  const phOptions = {
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'pH'
        },
        type: 'linear',
        position: 'bottom'
      },
      y: {
        title: {
          display: true,
          text: 'Time'
        },
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      }
    }
  };

  const kelembapanOptions = {
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Kelembapan'
        },
        type: 'linear',
        position: 'bottom'
      },
      y: {
        title: {
          display: true,
          text: 'Time'
        },
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      }
    }
  };

  const cobaOptions = {
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Suhu'
        },
        type: 'linear',
        position: 'bottom'
      },
      y: {
        title: {
          display: true,
          text: 'Time'
        },
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm'
          }
        }
      }
    }
  };

  return (
    <div>
      <div ref={componentRef} className="chart-container">
        <h3>Data Buku Telepon</h3>
        <div className="charts" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="chart">
            <h4>pH</h4>
            <Line data={phData} options={phOptions} style={{ width: '400px', height: '300px'}}/>
          </div>
          <div className="chart">
            <h4>Kelembapan</h4>
            <Line data={kelembapanData} options={kelembapanOptions} style={{ width: '400px', height: '300px'}}/>
          </div>
          <div className="chart">
            <h4>Suhu</h4>
            <Line data={cobaData} options={cobaOptions} style={{ width: '400px', height: '300px'}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
