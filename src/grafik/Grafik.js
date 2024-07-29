import React, { useEffect, useState, useRef, useCallback } from 'react';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import Image from '../images/image.png'
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

    const [nitrogenData, setNitrogenData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Nitrogen',
                data: [],
                backgroundColor: 'transparent',
                borderColor: "#77E4C8",
                pointBorderColor: '#77E4C8',
                pointBackgroundColor: '#77E4C8',
                pointBorderWidth: 1,
                fill: false
            }
        ]
    });

    const [nitrogenData2, setNitrogenData2] = useState({
      labels: [],
      datasets: [
          {
              label: 'Nitrogen',
              data: [],
              backgroundColor: 'transparent',
              borderColor: "#77E4C8",
              pointBorderColor: '#77E4C8',
              pointBackgroundColor: '#77E4C8',
              pointBorderWidth: 1,
              fill: false
          }
      ]
  });

  const [fosforData, setFosforData] = useState({
    labels: [],
    datasets: [
        {
            label: 'Fosfor',
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

const [fosforData2, setFosforData2] = useState({
  labels: [],
  datasets: [
      {
          label: 'Fosfor',
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

const [kaliumData, setKaliumData] = useState({
    labels: [],
    datasets: [
        {
            label: 'Fosfor',
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

const [kaliumData2, setKaliumData2] = useState({
  labels: [],
  datasets: [
      {
          label: 'Fosfor',
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

        const nitrogenRef = ref(db, 'data/n');
        const fosforRef = ref(db, 'data/p');
        const kaliumRef = ref(db, 'data/k');
        
        const nitrogenRef2 = ref(db, 'data/n');
        const fosforRef2 = ref(db, 'data/p');
        const kaliumRef2 = ref(db, 'data/k');
        

        onValue(phRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const phDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0, 10),
                    y: data[key].value
                }));
        
                setPhData2({
                    labels: phDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'pH',
                            data: phDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#402E7A",
                            pointBorderColor: '#FEB941',
                            pointBackgroundColor: '#FEB941',
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
                  x: data[key].timestamp.slice(0,10),
                  y: data[key].value
              })).slice(-10);

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
                })).slice(-10); // Mengambil 10 data terbaru
                
                setKelembapanData2({
                    labels: kelembapanDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Kelembapan',
                            data: kelembapanDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#4C3BCF",
                            pointBorderColor: '#FC4100',
                            pointBackgroundColor: '#FC4100',
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
                    x: data[key].timestamp.slice(0),
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
                })) .slice(-10);// Mengambil 10 data terbaru
        
                setSuhuData2({
                    labels: suhuDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Suhu ',
                            data: suhuDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#3ABEF9",
                            pointBorderColor: '#F6995C',
                            pointBackgroundColor: '#F6995C',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(nitrogenRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const nitrogenDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0, 10),
                    y: data[key].value
                }))
        
                setNitrogenData({
                    labels: nitrogenDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'Nitrogen',
                            data: nitrogenDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#059212",
                            pointBorderColor: '#F4CE14',
                            pointBackgroundColor: '#F4CE14',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(nitrogenRef2, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const nitrogenDataItems2 = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0,10),
                    y: data[key].value
                })).slice(-10);
                setNitrogenData2({
                    labels: nitrogenDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Nitrogen',
                            data: nitrogenDataItems2.map(item => item.y),
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

          onValue(fosforRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fosforDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0,10),
                    y: data[key].value
                }));

                setFosforData({
                    labels: fosforDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'Fosfor',
                            data: fosforDataItems.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#03AED2",
                            pointBorderColor: '#03AED2',
                            pointBackgroundColor: '#03AED2',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(fosforRef2, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fosforDataItems2 = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0,10),
                    y: data[key].value
                })).slice(-10); // Mengambil 10 data terbaru
        
                setFosforData2({
                    labels: fosforDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Fosfor',
                            data: fosforDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#9BEC00",
                            pointBorderColor: '#FD9B63',
                            pointBackgroundColor: '#FD9B63',
                            pointBorderWidth: 1,
                            fill: false
                        }
                    ]
                });
            }
        });

        onValue(kaliumRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const kaliumDataItems = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(-8),
                    y: data[key].value
                }));

                setKaliumData({
                    labels: kaliumDataItems.map(item => item.x),
                    datasets: [
                        {
                            label: 'Kalium',
                            data: kaliumDataItems.map(item => item.y),
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

        onValue(kaliumRef2, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const kaliumDataItems2 = Object.keys(data).map(key => ({
                    x: data[key].timestamp.slice(0, 10),
                    y: data[key].value
                })).slice(-10); // Mengambil 10 data terbaru
        
                setKaliumData2({
                    labels: kaliumDataItems2.map(item => item.x),
                    datasets: [
                        {
                            label: 'Kalium',
                            data: kaliumDataItems2.map(item => item.y),
                            backgroundColor: 'transparent',
                            borderColor: "#8DECB4",
                            pointBorderColor: '#141E46',
                            pointBackgroundColor: '#141E46',
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

    const nitrogenOptions = {
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
                    text: 'Nitrogen'
                },
                type: 'linear',
                position: 'left'
            }
        }
    };

    const fosforOptions = {
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
                    text: 'Fosfor'
                },
                type: 'linear',
                position: 'left'
            }
        }
    };

    const kaliumOptions = {
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
                    text: 'Kalium'
                },
                type: 'linear',
                position: 'left'
            }
        }
    };

    const filteredData = phData2.labels
    .map((label, index) => ({
        timestamp: label,
        ph: phData.datasets[0].data[index],
        nitrogen: nitrogenData.datasets[0].data[index],
        fosfor: fosforData.datasets[0].data[index],
        kalium: kaliumData.datasets[0].data[index]
    }))
    .filter(item => isNumber(item.ph) && isNumber(item.nitrogen) && isNumber(item.fosfor) && isNumber(item.kalium))
    .reduce((acc, item) => {
        const existingEntry = acc.find(entry => entry.timestamp.slice(0, 10) === item.timestamp.slice(0, 10));
        if (existingEntry) {
            existingEntry.ph += item.ph;
            existingEntry.nitrogen += item.nitrogen;
            existingEntry.fosfor += item.fosfor;
            existingEntry.kalium += item.kalium;
            existingEntry.count++;
        } else {
            acc.push({
                timestamp: item.timestamp.slice(0, 10),
                ph: item.ph,
                nitrogen: item.nitrogen,
                fosfor: item.fosfor,
                kalium: item.kalium,
                count: 1
            });
        }
        return acc;
    }, [])
    .map(entry => ({
        timestamp: entry.timestamp,
        ph: parseFloat((entry.ph / entry.count).toFixed(2)),
        nitrogen: parseFloat((entry.nitrogen / entry.count).toFixed(2)),
        fosfor: parseFloat((entry.fosfor / entry.count).toFixed(2)),
        kalium: parseFloat((entry.kalium / entry.count).toFixed(2)),
    }))
    .filter(item =>
        item.timestamp.includes(searchTerm)
    )
    .reverse();

    
const filteredPompaData = suhuData.labels
    .map((label, index) => ({
        timestamp: label,
        kelembapan: kelembapanData.datasets[0].data[index],
        suhu: suhuData.datasets[0].data[index],
        status: pompaHistory[index] ? pompaHistory[index].status : null // Pastikan status diambil dengan benar
    }))
    .filter(item => isNumber(item.kelembapan) && isNumber(item.suhu))
    .reduce((acc, item) => {
        const existingEntry = acc.find(entry => 
            typeof entry.timestamp === 'string' && 
            typeof item.timestamp === 'string' &&
            entry.timestamp === item.timestamp
        );
        if (existingEntry) {
            existingEntry.kelembapan.push(item.kelembapan);
            existingEntry.suhu.push(item.suhu);
            if (item.status !== null) {
                existingEntry.status = item.status; // Pastikan status diperbarui hanya jika tidak null
            }
        } else {
            acc.push({
                timestamp: item.timestamp,
                status: item.status, // Pastikan status ditambahkan di sini
                kelembapan: [item.kelembapan],
                suhu: [item.suhu],
            });
        }
        return acc;
    }, [])
    .filter(item => 
        typeof item.timestamp === 'string' && item.timestamp.includes(searchPompa)
    )
    .reverse();

console.log(filteredPompaData); // Debugging: Periksa output data



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
        const maxButtons = 5; 
    
       
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
        
        if (endPage - startPage + 1 < maxButtons) {
            endPage = Math.min(totalPages, startPage + maxButtons - 1);
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
    
        
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
        console.log(data)
        if (data === undefined || data === null) {
            
            return "Null";
        }
        const statusText = data === 1 ? "Nyala" : "Mati";
        const statusColor = data === 1 ? "green" : "red";
        return <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusText}</span>;
    };
    
    const latestPompaStatus = pompaHistory.length > 0 ? pompaHistory[pompaHistory.length - 1].status : null;
  
    const PompaPagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageButtons = [];
    const maxButtons = 5; 

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

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
            <div className="header-container">
                <img className="logo" src={Image} alt="Logo" />
                <h3 className="title">ARABICARE</h3>
            </div>

            <div ref={componentRef} className="chart-container">
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <div className="pompa-status" style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    width: '80%',
                    maxWidth: '300px',
                    borderRadius: '10px',
                    backgroundColor: '#EEF7FF',
                    padding: '10px'
                }}>
                    <div className="pompa-status" style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        width: '80%',
                        maxWidth: '300px',
                        borderRadius: '10px',
                        backgroundColor: '#EEF7FF',
                        padding: '10px'
                    }}>
                        Pompa Status: <PompaStatus data={latestPompaStatus} />
                    </div>

                </div>
                </div>
                <div className="charts" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '10px' }}>
                    <div className="chart">
                        <h4>pH</h4>
                        <Line data={phData2} options={phOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                        <h5>pH Terakhir:</h5>
                        <p style={{ fontWeight: 'bold' }}>
                            {phData2.datasets[0].data.length > 0 
                                ? phData2.datasets[0].data[phData2.datasets[0].data.length - 1].toFixed(2) 
                                : 'Data tidak tersedia'
                            }
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <h5>Status pH:</h5>
                            <p style={{ 
                                fontWeight: 'bold',
                                color: phData2.datasets[0].data.length > 0 
                                    ? (phData2.datasets[0].data[phData2.datasets[0].data.length - 1] < 5.5 
                                        ? 'red' 
                                        : phData2.datasets[0].data[phData2.datasets[0].data.length - 1] > 6.5 
                                            ? 'red' 
                                            : 'green') 
                                    : 'black'
                                }}>
                                {phData2.datasets[0].data.length > 0 
                                    ? phData2.datasets[0].data[phData2.datasets[0].data.length - 1] < 5.5 
                                        ? 'pH Terlalu Rendah' 
                                        : phData2.datasets[0].data[phData2.datasets[0].data.length - 1] > 6.5 
                                            ? 'pH Terlalu Tinggi' 
                                            : 'Cukup' 
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Kelembapan</h4>
                        <Line data={kelembapanData2} options={kelembapanOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                        <h5>Kelembapan Terakhir:</h5>
                            <p style={{ fontWeight: 'bold' }}>
                                {kelembapanData2.datasets[0].data.length > 0 
                                    ? `${kelembapanData2.datasets[0].data[kelembapanData2.datasets[0].data.length - 1].toFixed(2)}%`
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Suhu</h4>
                        <Line data={suhuData2} options={suhuOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                            <h5>Suhu Terakhir:</h5>
                            <p style={{ fontWeight: 'bold' }}>
                                {suhuData2.datasets[0].data.length > 0 
                                    ? `${suhuData2.datasets[0].data[suhuData2.datasets[0].data.length - 1].toFixed(2)}°C`
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Nitrogen</h4>
                        <Line data={nitrogenData2} options={nitrogenOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                        <h5>Nitrogen Terakhir:</h5>
                        <p style={{ fontWeight: 'bold' }}>
                            {nitrogenData2.datasets[0].data.length > 0 
                                ? `${nitrogenData2.datasets[0].data[nitrogenData2.datasets[0].data.length - 1].toFixed(2)} mg/kg`
                                : 'Data tidak tersedia'
                            }
                        </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <h5>Status Nitrogen:</h5>
                            <p style={{ 
                                fontWeight: 'bold',
                                color: nitrogenData2.datasets[0].data.length > 0 
                                    ? (nitrogenData2.datasets[0].data[nitrogenData2.datasets[0].data.length - 1] < 150 
                                        ? 'red' 
                                        : nitrogenData2.datasets[0].data[nitrogenData2.datasets[0].data.length - 1] >= 150 
                                            ? 'green' 
                                            : 'green') 
                                    : 'black'
                                }}>
                                {nitrogenData2.datasets[0].data.length > 0 
                                    ? nitrogenData2.datasets[0].data[nitrogenData2.datasets[0].data.length - 1] < 150  
                                        ? 'Nitrogen Terlalu Rendah' 
                                        : nitrogenData2.datasets[0].data[nitrogenData2.datasets[0].data.length - 1] >= 150 
                                            ? 'Nitrogen Cukup' 
                                            : 'Cukup' 
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Fosfor</h4>
                        <Line data={fosforData2} options={fosforOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                        <h5>Fosfor Terakhir:</h5>
                        <p style={{ fontWeight: 'bold' }}>
                            {fosforData2.datasets[0].data.length > 0 
                                 ? `${fosforData2.datasets[0].data[fosforData2.datasets[0].data.length - 1].toFixed(2)} mg/kg`
                                : 'Data tidak tersedia'
                            }
                        </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <h5>Status Fosfor:</h5>
                            <p style={{ 
                                fontWeight: 'bold',
                                color: fosforData2.datasets[0].data.length > 0 
                                    ? (fosforData2.datasets[0].data[fosforData2.datasets[0].data.length - 1] < 50 
                                        ? 'red' 
                                        : fosforData2.datasets[0].data[fosforData2.datasets[0].data.length - 1] >= 50 
                                            ? 'green' 
                                            : 'green') 
                                    : 'black'
                                }}>
                                {fosforData2.datasets[0].data.length > 0 
                                    ? fosforData2.datasets[0].data[fosforData2.datasets[0].data.length - 1] < 150  
                                        ? 'Fosfor Terlalu Rendah' 
                                        : fosforData2.datasets[0].data[fosforData2.datasets[0].data.length - 1] >= 150 
                                            ? 'Fosfor Cukup' 
                                            : 'Cukup' 
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                    </div>
                    <div className="chart">
                        <h4>Kalium</h4>
                        <Line data={kaliumData2} options={kaliumOptions} style={{ width: '100%', height: '300px' }} />
                        <div style={{ textAlign: 'center' }}>
                            <h5>Kalium Terakhir:</h5>
                            <p style={{ fontWeight: 'bold' }}>
                                {kaliumData2.datasets[0].data.length > 0 
                                ? `${kaliumData2.datasets[0].data[kaliumData2.datasets[0].data.length - 1].toFixed(2)} mg/kg`
                                : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <h5>Status Kalium:</h5>
                            <p style={{ 
                                fontWeight: 'bold',
                                color: kaliumData2.datasets[0].data.length > 0 
                                    ? (kaliumData2.datasets[0].data[kaliumData2.datasets[0].data.length - 1] < 250 
                                        ? 'red' 
                                        : kaliumData2.datasets[0].data[kaliumData2.datasets[0].data.length - 1] >= 250 
                                            ? 'green' 
                                            : 'green') 
                                    : 'black'
                                }}>
                                {kaliumData2.datasets[0].data.length > 0 
                                    ? kaliumData2.datasets[0].data[kaliumData2.datasets[0].data.length - 1] < 250  
                                        ? 'Kalium Terlalu Rendah' 
                                        : kaliumData2.datasets[0].data[kaliumData2.datasets[0].data.length - 1] >= 250 
                                            ? 'Kalium Cukup' 
                                            : 'Cukup' 
                                    : 'Data tidak tersedia'
                                }
                            </p>
                        </div>
                    </div>
                    </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        width: '80%',
                        maxWidth: '300px',
                        borderRadius: '10px',
                        backgroundColor: '#EEF7FF',
                        padding: '10px'
                    }}>
                        Riwayat Monitoring
                    </h3>
                    </div>
                <div className="data-table" style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Cari Tanggal..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: '30%', outline: 'none', display: 'flex', borderRadius: '5px' }}
                    />
                    <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#39A7FF', color: ' white' }}>
                                <th>Waktu</th>
                                <th>pH</th>
                                <th>Nitrogen</th>
                                <th>Fosfor</th>
                                <th>Kalium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.timestamp}</td>
                                    <td>{item.ph}</td>
                                    <td>{item.nitrogen}</td>
                                    <td>{item.fosfor}</td>
                                    <td>{item.kalium}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        width: '80%',
                        maxWidth: '300px',
                        borderRadius: '10px',
                        backgroundColor: '#EEF7FF',
                        padding: '10px'
                    }}>
                        Riwayat Pompa
                    </h3>
                </div>
                <div className="data-table" style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="Cari Tanggal..."
                        value={searchPompa}
                        onChange={(e) => setSearchPompa(e.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', width: '30%', outline: 'none', display: 'flex', borderRadius: '5px' }}
                    />
                    <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#39A7FF', color: 'white' }}>
                                <th>Waktu</th>
                                <th>Status Pompa</th>
                                <th>Kelembapan</th>
                                <th>Suhu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItemsPompa.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.timestamp}</td>
                                    <td><PompaStatus data={item.status} /></td>
                                    <td>{item.kelembapan}</td> 
                                    <td>{item.suhu}</td> 
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
