import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function AdminLineChart() {
    const data = [
        { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 250, pv: 2230, amt: 2000 },
        { name: 'Mar', uv: 200, pv: 1000, amt: 2400 },
        { name: 'Apr', uv: 100, pv: 2100, amt: 1200 },
        { name: 'May', uv: 300, pv: 1600, amt: 1550 },
        { name: 'Jun', uv: 210, pv: 1600, amt: 1550 },
        { name: 'Aug', uv: 360, pv: 1600, amt: 1550 },
        { name: 'Sep', uv: 360, pv: 1600, amt: 1550 },
        { name: 'Oct', uv: 280, pv: 1600, amt: 1550 },
        { name: 'Nov', uv: 190, pv: 1600, amt: 1550 },
        { name: 'Dec', uv: 360, pv: 1600, amt: 1550 },
    ];
    return (    
    <LineChart width={900} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
    </LineChart>
    )
}



export default AdminLineChart
