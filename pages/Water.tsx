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
import Phvariance from '../demo/components/Phvariance'
import Bars from '../demo/components/SparkBars'
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react'
import Serial from '../demo/components/serial'

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
    const [currentDevice, setCurrentDevice] = useState({ description: "", temperature: "", location: "", pH: "" });
    const [realTimeData, setRealTimeData] = useState([]);
    const { data } = useSession();
    
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
                    console.log(JSON.stringify(response.data));
                    console.log("Current response", response.data);
                    setCurrentDevice(response.data[0]);
                    // setRealTimeData((prevData) => [...prevData, response.data[0].pH]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

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
                            <Battery percentage={10} />
                        </div>
                    </div>

                  

                </div>
            </div>

            <div className=" col-12  xl:col-12 rounded-lg mx-12 ">
                <div className=" flex flex-row gap-5">
                <div className=' flex flex-row  -mt-6 border-none mx-3 '>
                    <Tds value={currentDevice.temperature} title=" Nairobi " id={8} />
                    <DynamicComponentCanvasGauge temperature={currentDevice.temperature} />
                        {/* <LiquidFillGauge percentage={currentDevice.temperature} /> */}
                        <Serial/>
                </div>
               {/* <Devicelocation /> */}
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
