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
import Thermometer from '../demo/components/Thermometer';
import Switch from '../demo/components/Switch';
import axios from 'axios';

const DynamicComponentWithNoSSR = dynamic(
    () => import('../demo/components/Phmeter'),
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
    const [currentDevice, setCurrentDevice] = useState({ description: "", temperature: "", });
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
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Devices</span>
                            <div className="text-900 font-medium text-xl">7</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi-database text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new updates </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Remote Sensor Health</span>
                            <div className="text-900 font-medium text-xl border-4 border-indigo-200 border-x-indigo-500"> Above Average</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-red-500 font-medium">2% </span>
                    <span className="text-500">Failed Updates</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Feature</span>
                            <div className="text-900 font-medium text-xl">----</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-inbox text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">--- </span>
                    <span className="text-500">newly registered devices</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0 ">
                    {/* <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Comments</span>
                            <div className="text-900 font-medium text-xl">152 Unread</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-comment text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span> */}
                    <Battery percentage={10} />
                    <Switch />
                    
                </div>
            </div>

            {/* <div className='flex flex-row sm:flex-col'>   {sensorData.map((sensor) => (
                <li key={sensor.id}>
                    Sensor ID: {sensor.oid}, Power: {sensor.value},temperature:{sensor.temperature},  <DynamicComponentWithNoSSR value={sensor.temperature} title={sensor.location} id={undefined} />
                </li>
            ))}</div> */}
            <div className=" col-12 xl:col-6">
                {/* <div className="card"> */}
                    <div className='flex flex-row gap-8'>
                        <span className='font-[Ubuntu] font-semibold text-xl '>Device current location {currentDevice.location}</span>
                      </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className=' border flex-col'>
                            <span className='font-semibold text-base'></span>
                            <Tds value={currentDevice.temperature} title=" Nairobi " id={8} />
                        </div>
                        <div className=' border-4 border-indigo-600 border-x flex-col'>
                            <span className='font-semibold text-base'>Fluid Temp</span>
                            <Thermometer temperature={currentDevice.temperature} />
                        </div>
                    {/* </div> */}
                </div>
            </div>


            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Sensor Location</h5>
                    <Devicelocation />
                </div>
                <div className='w-full'><Devicelocation /></div>
                <div className="card">
                    <div className="flex justify-content-between align-items-center mb-5">
                        <h5>Best Selling Products</h5>
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
                    <div>

                        <h1>Sensor Data</h1>
                       
                        <Temp value={50} />
                        
                        {/* <DynamicComponentWithNoSSR value={ 67} title='ingoo'/> */}
                        {/* <Temp  value={50} title="Lowest Temp" /> */}
                        {/* <ul>
                            {sensorData.map((sensor) => (
                                <li key={sensor.id}>
                                   Power: {sensor.value},temperature:{sensor.temperature},  <DynamicComponentWithNoSSR value={sensor.temperature} title={sensor.location} id={undefined} />
                                </li>
                            ))}
                        </ul> */}

                    </div>
                </div>
            </div>
            
            {/* <div className='col-12 xl:col-6'>
                <div className="card">
            <div className=' '>
                <span className="font-['Ubuntu'] text-xl font-['Ubuntu'] font-semibold ">TDS Sensor Status</span>
                <Tds value={60} title=" Kisumu " id={8} />
                <Tds value={180} title=" Nairobi" id={9} />
                        <Tds value={180} title=" Mombasa" id={10} />
                        <Thermometer />
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
