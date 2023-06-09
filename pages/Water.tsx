/* eslint-disable @next/next/no-img-element */

import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
import { LayoutContext } from '../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '../types/types';
import dynamic from 'next/dynamic';
import Battery from '../demo/components/Battery';
import Temp from '../demo/components/Temp';
import { ChartData, ChartOptions } from 'chart.js';
import Tds from '../demo/components/Tds';
import Devicelocation from '../demo/components/Devicelocation';
import LiquidFillGauge from '../demo/components/Liquidgauge';
import Switch from '../demo/components/Switch';
import Spark from '../demo/components/Sparklines'
import Loading from '../demo/components/LoadingHive'
import Phvariance from '../demo/components/Phvariance'
import Bars from '../demo/components/SparkBars'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, signOut } from 'next-auth/react'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../demo/components/Phmeter'),
    { ssr: false }
);

const DynamicComponentCanvasGauge = dynamic(
    () => import('../demo/components/CanvasTemp'),
    { ssr: false }
);

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);
    const [humidity, setHumidity] = useState()
    const [sensorData, setSensorData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentDevice, setCurrentDevice] = useState({ description: "", temperature: "", location: "", pH: "", waterlevel:"" });
    const [realTimeData, setRealTimeData] = useState([]);
    const { data } = useSession();
    const [deviceEnabled, setDeviceEnabled] = useState(true);
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const notify = () => toast("Alert threshold surpassed!");
    useEffect(() => {
        async function fetchLocation() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    setLocation(data);

                    console.log("Geo position target latitude", data.latitude)
                    console.log("Geo position target longitude", data.longitude)
                    setLatitude(data.latitude)
                    setLongitude(data.longitude)
                } else {
                    // Handle error
                }
            } catch (error) {
                // Handle error
            }
        }

        fetchLocation();
    }, []);

    console.log("dataaa",data)
    const logout = () => {
        signOut()
    }
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get('https://watersensorsapi.herokuapp.com/api/sensors')
                .then((response) => {
                   
                    console.log(JSON.stringify(response.data));
                    console.log("Sensors response", response.data);
                    setSensorData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get('https://watersensorsapi.herokuapp.com//api/sensors?sensor_id=collection3')
                .then((response) => {
                    setIsLoaded(true)
                    console.log(JSON.stringify(response.data));
                    console.log("Current response from device", response.data);
                    setCurrentDevice(response.data[0]);
                    setDeviceEnabled(response.data[0].enabled) //check if device enabled
                    // setRealTimeData((prevData) => [...prevData, response.data[0].pH]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    const [turned, setTurned] = useState(false);
 
    
    // useEffect(() => {
    //     if (!turned) {
    //         setTimeout(() => {
    //             setTurned(true);
    //         }, 60000); // 60 seconds (in milliseconds)
    //     }
    // }, [deviceEnabled]);

    useEffect(() => {
        if (deviceEnabled) {
            toast.success('Device Status changed', { autoClose: 60000 }); // Show toast for 60 seconds
        }
    }, [deviceEnabled]);
    

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    return (

        <div className="grid">
            <div className="col-12 lg:col-12 xl:col-12  rounded-xl">

                <div className="flex flex-row  -gap-6">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="card bg-none">
                            <Phvariance />
                        </div>
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="card ">
                            <Bars />
                        </div>
                    </div>
                    
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="card ">
                            <div style={{ transform: 'rotate(-90deg)' }}>
                            <Battery percentage={50} /></div>
                        </div>
                    </div>

                  

                </div>
            </div>

            <div className=" col-12  xl:col-12 rounded-lg mx-12 ">
              
                <div className="grid grid-flow-row auto-rows-max">
                    {isLoaded ? <>
                    <div className='   -mt-6 border-none mx-auto '>
                            <div className='flex flex-row'>
                                {deviceEnabled && (
                                    <ToastContainer />
                                )}
                                {/* @ts-ignore */}
                            <Tds value={currentDevice.TDS} title=" TDS " id={8} /><DynamicComponentCanvasGauge temperature={currentDevice.temperature} /><LiquidFillGauge percentage={currentDevice.waterlevel} />
                           </div>
                      
                        </div> 
                        <Devicelocation latitude={latitude}
                            longitude={longitude} />
                    </> :
                        <div className='   -mt-6 border-none mx-auto '><Loading />
                        </div>}
                    </div>
                   
             
            </div>
           


            {/* <div className=" col-12  xl:col-11 rounded-lg mx-9 ">
                <div className="flex flex-row gap-5">
                    <Devicelocation />
                    <div className=' my-auto'><LiquidFillGauge percentage={currentDevice.temperature} /></div>

                </div>
            </div> */}
           
            {/* <div className="col-12 xl:col-6">
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Temperature  </h5>
                        <div>
                            <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-plain" onClick={(event) => menu1.current?.toggle(event)} />
                            <Menu
                                ref={menu1}
                                popup
                                model={[
                                    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                                    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                                ]}
                            />
                        </div>
                    </div>


                    <h1>Sensor Data</h1>
                    <Temp value={50} />

                </div>
            </div> */}

            {/* <div className='col-12 xl:col-6'>
                <div className="card">
            <div className=' '>
                <span className="font-['Ubuntu'] text-xl font-['Ubuntu'] font-semibold ">TDS Sensor Status</span>
                <Tds value={60} title=" Kisumu " id={8} />
                <Tds value={180} title=" Nairobi" id={9} />
                        <Tds value={180} title=" Mombasa" id={10} />
                        <DynamicComponentCanvasGauge />
                    </div></div></div> */}
            {/* <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Sales Overview</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>


            </div> */}
        </div>
    );
};

export default Dashboard;
