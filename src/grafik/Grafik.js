import React, { useEffect, useState, useRef, useCallback } from 'react';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
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
import { isNumber } from 'chart.js/helpers';

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

    const [phData2, setPhData2] = useState({
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

    const [kelembapanData2, setKelembapanData2] = useState({
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

    const [suhuData, setSuhuData] = useState({
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

    const [suhuData2, setSuhuData2] = useState({
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

    const [pompaStatus, setPompaStatus] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [pompaHistory, setPompaHistory] = useState([]);
    const [searchPompa, setSearchPompa] = useState("");
    const [currentPagePompa, setCurrentPagePompa] = useState(1);
    const itemsPerPagePompa = 10;


    const itemsPerPage = 10;

    const getData = useCallback(() => {
        const phRef = ref(db, 'data/pH tanah');
        const kelembapanRef = ref(db, 'data/Kelembapan Tanah');
        const suhuRef = ref(db, 'data/suhu');
        const pompaRef = ref(db, 'data/pompa');

        const phRef2 = ref(db, 'data/pH tanah');
        const kelembapanRef2 = ref(db, 'data/Kelembapan Tanah');
        const suhuRef2 = ref(db, 'data/suhu');

        onValue(phRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const phDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                })).slice(-10);

                setPhData2({
                    labels: phDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'pH',
                            data: phDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#A0DEFF",
                            pointBorderColor: '#A0DEFF',
                            pointBackgroundColor: '#A0DEFF',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(phRef2, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              const phDataItems2 = Object.keys(data).map(key => ({
                  x: data[key].timestamp.slice(0,20),
                  y: data[key].value
              }));

              setPhData({
                  labels: phDataItems2.map(item => item.x),
                  datasets: [
                      {
                          label: 'pH',
                          data: phDataItems2.map(item => item.y),
                          backgroundColor: 'transparent',
                          borderColor: "#A0DEFF",
                          pointBorderColor: '#A0DEFF',
                          pointBackgroundColor: '#A0DEFF',
                          pointBorderWidth: 1,
                          fill: false
                      }
                  ]
              });
          }
      });

        onValue(kelembapanRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const kelembapanDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                }));

                setKelembapanData({
                    labels: kelembapanDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'Kelembapan',
                            data: kelembapanDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#0E46A3",
                            pointBorderColor: '#0E46A3',
                            pointBackgroundColor: '#0E46A3',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(kelembapanRef2, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const kelembapanDataItems2 = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                })).slice(-10);

                setKelembapanData2({
                    labels: kelembapanDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Kelembapan',
                            data: kelembapanDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#0E46A3",
                            pointBorderColor: '#0E46A3',
                            pointBackgroundColor: '#0E46A3',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(suhuRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const suhuDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                }));

                setSuhuData({
                    labels: suhuDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'Suhu',
                            data: suhuDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#5755FE",
                            pointBorderColor: '#5755FE',
                            pointBackgroundColor: '#5755FE',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(suhuRef2, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const suhuDataItems2 = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                })).slice(-10);

                setSuhuData2({
                    labels: suhuDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Suhu',
                            data: suhuDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#5755FE",
                            pointBorderColor: '#5755FE',
                            pointBackgroundColor: '#5755FE',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(pompaRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              const pompaData = Object.keys(data).map(key => ({
                  timestamp: data[key].timestamp,
                  status: data[key].value
              }));
              setPompaHistory(pompaData);
          }
      });
    }, []);

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
            x: [{
                gridLines: {
                    display: false,
                    color: "black"
                },
                scaleLabel: {
                    display: true,
                    labelString: "time",
                    fontColor: "red"
                }
            }],
            y: {
                title: {
                    display: true,
                    text: 'pH'
                },
                type: 'linear',
                position: 'left'
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
            x: [{
                gridLines: {
                    display: false,
                    color: "black"
                },
                scaleLabel: {
                    display: true,
                    labelString: "Time in Seconds",
                    fontColor: "red"
                }
            }],
            y: {
                title: {
                    display: true,
                    text: 'Kelembapan'
                },
                type: 'linear',
                position: 'left'
            }
        }
    };

    const suhuOptions = {
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            x: [{
                gridLines: {
                    display: false,
                    color: "black"
                },
                scaleLabel: {
                    display: true,
                    labelString: "Time in Seconds",
                    fontColor: "red"
                }
            }],
            y: {
                title: {
                    display: true,
                    text: 'Suhu'
                },
                type: 'linear',
                position: 'left'
            }
        }
    };

    const filteredData = phData.labels
        .map((label, index) => ({
            timestamp: label,
            ph: phData.datasets[0].data[index],
            kelembapan: kelembapanData.datasets[0].data[index],
            suhu: suhuData.datasets[0].data[index]
        }))
        .filter(item => isNumber(item.ph) && isNumber(item.kelembapan) && isNumber(item.suhu))
        .filter(item =>
            item.ph.toString().includes(searchTerm) ||
            item.kelembapan.toString().includes(searchTerm) ||
            item.suhu.toString().includes(searchTerm) ||
            item.timestamp.toString().includes(searchTerm)
        );

    // Sort filteredData by timestamp
    filteredData.reverse();

    const filteredPompaData = pompaHistory
    .filter(item =>
        item.timestamp.toString().includes(searchPompa) ||
        item.status.toString().includes(searchPompa)
    );

    filteredPompaData.reverse();

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const indexOfLastItemPompa = currentPagePompa * itemsPerPagePompa;
    const indexOfFirstItemPompa = indexOfLastItemPompa - itemsPerPagePompa;
    const currentItemsPompa = filteredPompaData.slice(indexOfFirstItemPompa, indexOfLastItemPompa);
    const totalPagesPompa = Math.ceil(filteredPompaData.length / itemsPerPagePompa);

    const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
        const pageButtons = [];
        const maxButtons = 5; // Maximum number of pagination buttons to display
    
        // Calculate start and end page buttons to display
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
        // Adjust startPage and endPage if there are not enough buttons
        if (endPage - startPage + 1 < maxButtons) {
            endPage = Math.min(totalPages, startPage + maxButtons - 1);
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
    
        // Generate page buttons
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        backgroundColor: currentPage === i ? '#39A7FF' : 'white',
                        color: currentPage === i ? 'white' : '#39A7FF',
                        border: '1px solid #39A7FF',
                        borderRadius: '5px'
                    }}
                >
                    {i}
                </button>
            );
        }
    
        return (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                {currentPage > 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            backgroundColor: '#39A7FF',
                            color: 'white',
                            border: '1px solid #39A7FF',
                            borderRadius: '5px'
                        }}
                    >
                        Previous
                    </button>
                )}
                {pageButtons}
                {currentPage < totalPages && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            backgroundColor: '#39A7FF',
                            color: 'white',
                            border: '1px solid #39A7FF',
                            borderRadius: '5px'
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        );
    };


    const PompaStatus = ({ data }) => {
      if (data === undefined || data === null) {
          return "Null";
      }
      return data === 1 ? "Nyala" : "Mati";
  };
  
  
  const PompaPagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageButtons = [];
    const maxButtons = 5; // Maximum number of pagination buttons to display

    // Calculate start and end page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust startPage and endPage if there are not enough buttons
    if (endPage - startPage + 1 < maxButtons) {
        endPage = Math.min(totalPages, startPage + maxButtons - 1);
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Generate page buttons
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    backgroundColor: currentPage === i ? '#39A7FF' : 'white',
                    color: currentPage === i ? 'white' : '#39A7FF',
                    border: '1px solid #39A7FF',
                    borderRadius: '5px'
                }}
            >
                {i}
            </button>
        );
    }

    return (
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            {currentPage > 1 && (
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        backgroundColor: '#39A7FF',
                        color: 'white',
                        border: '1px solid #39A7FF',
                        borderRadius: '5px'
                    }}
                >
                    Previous
                </button>
            )}
            {pageButtons}
            {currentPage < totalPages && (
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        backgroundColor: '#39A7FF',
                        color: 'white',
                        border: '1px solid #39A7FF',
                        borderRadius: '5px'
                    }}
                >
                    Next
                </button>
            )}
        </div>
    );
};


    return (
        <div>
            <h3 style={{ fontSize: '30px', backgroundColor: '#39A7FF', margin: '0px 0px', color: 'white', padding: '8px' }}>ARABICARE</h3>
            <div ref={componentRef} className="chart-container">

                <div style={{ padding: '10px', display: 'flex', justifyContent:'center' }}>
                    <div className="pompa-status" style={{ textAlign: 'center', fontSize: '20px', width:'15%', borderRadius: '10px', backgroundColor: '#EEF7FF', padding: '10px' }}>
                        Pompa Status: {pompaStatus ? <span style={{ color: 'green', fontWeight: 'bold' }}>Nyala</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>Mati</span>}
                    </div>
                </div>
                <div className="charts" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className="chart">
                        <h4>pH</h4>
                        <Line data={phData2} options={phOptions} style={{ width: '400px', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                            <h5>pH Terakhir:</h5>
                            <p style={{ fontWeight:'bold' }}>{phData2.datasets[0].data.length > 0 ? phData2.datasets[0].data[phData2.datasets[0].data.length - 1] : 'Data tidak tersedia'}</p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Kelembapan</h4>
                        <Line data={kelembapanData2} options={kelembapanOptions} style={{ width: '400px', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                            <h5>Kelembapan Terakhir:</h5>
                            <p style={{ fontWeight:'bold' }}>{kelembapanData2.datasets[0].data.length > 0 ? kelembapanData2.datasets[0].data[kelembapanData2.datasets[0].data.length - 1] : 'Data tidak tersedia'}</p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Suhu</h4>
                        <Line data={suhuData2} options={suhuOptions} style={{ width: '400px', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                            <h5>Suhu Terakhir:</h5>
                            <p style={{ fontWeight:'bold' }}>{suhuData2.datasets[0].data.length > 0 ? suhuData2.datasets[0].data[suhuData2.datasets[0].data.length - 1] : 'Data tidak tersedia'}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent:'center' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '20px', width:'15%', borderRadius: '10px', backgroundColor: '#EEF7FF', padding: '10px' }}>Riwayat Monitoring</h3>
                </div>
                <div className="data-table" style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Cari berdasarkan pH, Kelembapan, Suhu, atau Timestamp..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: '30%', outline: 'none', display: 'flex', borderRadius: '5px' }}
                    />
                    <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#39A7FF', color: ' white' }}>
                                <th>Waktu</th>
                                <th>pH</th>
                                <th>Kelembapan</th>
                                <th>Suhu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.timestamp}</td>
                                    <td>{item.ph}</td>
                                    <td>{item.kelembapan}</td>
                                    <td>{item.suhu}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
                <div style={{ display: 'flex', justifyContent:'center', marginTop: '50px' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '20px', width:'15%', borderRadius: '10px', backgroundColor: '#EEF7FF', padding: '10px' }}>Riwayat Pompa</h3>
                </div>
                <div className="data-table" style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Cari berdasarkan waktu..."
                        value={searchPompa}
                        onChange={(e) => setSearchPompa(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: '30%', outline: 'none', display: 'flex', borderRadius: '5px' }}
                    />
                    <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#39A7FF', color: ' white' }}>
                                <th>Waktu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItemsPompa.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.timestamp}</td>
                                    <td><PompaStatus data={item.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PompaPagination totalPages={totalPagesPompa} currentPage={currentPagePompa} setCurrentPage={setCurrentPagePompa} />
                </div>
            </div>
        </div>
    );
}
